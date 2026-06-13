using CsvHelper;
using ClosedXML.Excel;
using EnterpriseAnalytics.API.Data;
using EnterpriseAnalytics.API.DTOs;
using EnterpriseAnalytics.API.Models;
using EnterpriseAnalytics.API.Services.Interfaces;
using System.Globalization;

namespace EnterpriseAnalytics.API.Services
{
    public class CsvImportService : ICsvImportService
    {
        private readonly AppDbContext _context;

        public CsvImportService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> ImportProductsAsync(IFormFile file)
        {
            var extension = Path
                .GetExtension(file.FileName)
                .ToLower();

            var existingProducts =
                _context.Products
                    .Select(p => p.Name.ToLower().Trim())
                    .ToHashSet();

            int addedCount = 0;
            int skippedCount = 0;

            if (extension == ".csv")
            {
                using var reader = new StreamReader(
                    file.OpenReadStream()
                );

                using var csv = new CsvReader(
                    reader,
                    CultureInfo.InvariantCulture
                );

                var records = csv
                    .GetRecords<ProductCsvDto>()
                    .ToList();

                foreach (var record in records)
                {
                    var product = new Product
                    {
                        Name = record.Name,
                        Category = record.Category,
                        Price = record.Price,
                        StockQuantity = record.StockQuantity
                    };

                    var productName =
                        product.Name.ToLower().Trim();

                    if (existingProducts.Contains(productName))
                    {
                        skippedCount++;
                    }
                    else
                    {
                        existingProducts.Add(productName);

                        _context.Products.Add(product);

                        addedCount++;
                    }
                }
            }
            else if (extension == ".xlsx")
            {
                using var stream = new MemoryStream();

                await file.CopyToAsync(stream);

                using var workbook = new XLWorkbook(stream);

                var worksheet = workbook.Worksheet(1);

                var rows = worksheet
                    .RowsUsed()
                    .Skip(1);

                foreach (var row in rows)
                {
                    var product = new Product
                    {
                        Name = row.Cell(1).GetValue<string>(),
                        Category = row.Cell(2).GetValue<string>(),
                        Price = row.Cell(3).GetValue<decimal>(),
                        StockQuantity = row.Cell(4).GetValue<int>()
                    };

                    var productName =
                        product.Name.ToLower().Trim();

                    if (existingProducts.Contains(productName))
                    {
                        skippedCount++;
                    }
                    else
                    {
                        existingProducts.Add(productName);

                        _context.Products.Add(product);

                        addedCount++;
                    }
                }
            }
            else
            {
                throw new Exception(
                    "Unsupported file format"
                );
            }

            await _context.SaveChangesAsync();

            return
                $"Products uploaded successfully. Added: {addedCount}, Skipped: {skippedCount} duplicate(s).";
        }

      public async Task<string> ImportSalesAsync(IFormFile file)
        {
            var extension = Path
                .GetExtension(file.FileName)
                .ToLower();

            var existingProducts =
                _context.Products
                    .Select(p => p.Name.ToLower().Trim())
                    .ToHashSet();

            int addedCount = 0;
            int skippedCount = 0;

            if (extension == ".csv")
            {
                using var reader = new StreamReader(
                    file.OpenReadStream()
                );

                using var csv = new CsvReader(
                    reader,
                    CultureInfo.InvariantCulture
                );

                var records = csv
                    .GetRecords<SaleCsvDto>()
                    .ToList();

                foreach (var record in records)
                {
                    var productName =
                        record.ProductName
                            .ToLower()
                            .Trim();

                    if (!existingProducts.Contains(productName))
                    {
                        skippedCount++;
                        continue;
                    }

                    var saleDate =
                        DateTime.Parse(
                            record.SaleDate,
                            CultureInfo.InvariantCulture
                        );

                    var sale = new Sale
                    {
                        ProductName = record.ProductName,
                        Quantity = record.Quantity,
                        TotalAmount = record.TotalAmount,

                        SaleDate = DateTime.SpecifyKind(
                            saleDate,
                            DateTimeKind.Utc
                        )
                    };

                    _context.Sales.Add(sale);

                    addedCount++;
                }
            }

            else if (extension == ".xlsx")
            {
                using var stream = new MemoryStream();

                await file.CopyToAsync(stream);

                using var workbook = new XLWorkbook(stream);

                var worksheet = workbook.Worksheet(1);

                var rows = worksheet
                    .RowsUsed()
                    .Skip(1);

                foreach (var row in rows)
                {
                    var productName =
                        row.Cell(1)
                        .GetValue<string>()
                        .ToLower()
                        .Trim();

                    if (!existingProducts.Contains(productName))
                    {
                        skippedCount++;
                        continue;
                    }

                    DateTime saleDate;

                    if (row.Cell(4).DataType == XLDataType.DateTime)
                    {
                        saleDate =
                            row.Cell(4)
                            .GetDateTime();
                    }
                    else
                    {
                        saleDate =
                            DateTime.Parse(
                                row.Cell(4)
                                .GetValue<string>(),
                                CultureInfo.InvariantCulture
                            );
                    }

                    var sale = new Sale
                    {
                        ProductName =
                            row.Cell(1).GetValue<string>(),

                        Quantity =
                            row.Cell(2).GetValue<int>(),

                        TotalAmount =
                            row.Cell(3).GetValue<decimal>(),

                        SaleDate = DateTime.SpecifyKind(
                            saleDate,
                            DateTimeKind.Utc
                        )
                    };

                    _context.Sales.Add(sale);

                    addedCount++;
                }
            }

            else
            {
                throw new Exception(
                    "Unsupported file format"
                );
            }

            await _context.SaveChangesAsync();

            return
                $"Sales uploaded successfully. Added: {addedCount}, Skipped: {skippedCount} invalid product(s).";
        }
    }
}