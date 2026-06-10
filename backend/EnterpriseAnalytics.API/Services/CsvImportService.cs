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

        public async Task ImportProductsAsync(IFormFile file)
        {
            var extension = Path
                .GetExtension(file.FileName)
                .ToLower();

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

                    _context.Products.Add(product);
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

                    _context.Products.Add(product);
                }
            }

            else
            {
                throw new Exception(
                    "Unsupported file format"
                );
            }

            await _context.SaveChangesAsync();
        }

        public async Task ImportSalesAsync(IFormFile file)
        {
            var extension = Path
                .GetExtension(file.FileName)
                .ToLower();

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
                    var sale = new Sale
                    {
                        ProductName = record.ProductName,

                        Quantity = record.Quantity,

                        TotalAmount = record.TotalAmount,

                        SaleDate = DateTime.ParseExact(
                            record.SaleDate,
                            "dd-MM-yyyy",
                            CultureInfo.InvariantCulture
                        )
                    };

                    _context.Sales.Add(sale);
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
                    var sale = new Sale
                    {
                        ProductName = row.Cell(1)
                            .GetValue<string>(),

                        Quantity = row.Cell(2)
                            .GetValue<int>(),

                        TotalAmount = row.Cell(3)
                            .GetValue<decimal>(),

                       SaleDate = DateTime.Parse(row.Cell(4).GetValue<string>()
)
                    };

                    _context.Sales.Add(sale);
                }
            }

            else
            {
                throw new Exception(
                    "Unsupported file format"
                );
            }

            await _context.SaveChangesAsync();
        }
    }
}