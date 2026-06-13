using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using EnterpriseAnalytics.API.Data;

namespace EnterpriseAnalytics.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    [Authorize]
    public class AnalyticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AnalyticsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("total-revenue")]

        public IActionResult GetTotalRevenue(
            DateTime? startDate,
            DateTime? endDate)
        {
            var salesQuery = _context.Sales.AsQueryable();

            if (startDate.HasValue)
            {
                salesQuery = salesQuery
                    .Where(s => s.SaleDate >= startDate.Value);
            }

            if (endDate.HasValue)
            {
                salesQuery = salesQuery
                    .Where(s => s.SaleDate <= endDate.Value);
            }

            var totalRevenue = salesQuery
                .Sum(s => s.TotalAmount);

            return Ok(new
            {
                TotalRevenue = totalRevenue
            });
        }

        [HttpGet("total-sales")]

        public IActionResult GetTotalSales()
        {
            var totalSales = _context.Sales.Count();

            return Ok(new
            {
                TotalSales = totalSales
            });
        }

        [HttpGet("top-products")]

        public IActionResult GetTopProducts()
        {
            var topProducts = _context.Sales
                .GroupBy(s => s.ProductName)

                .Select(g => new
                {
                    ProductName = g.Key,

                    TotalQuantity = g.Sum(x => x.Quantity)
                })

                .OrderByDescending(x => x.TotalQuantity)

                .Take(5)

                .ToList();

            return Ok(topProducts);
        }

        [HttpGet("revenue-by-product")]

        public IActionResult GetRevenueByProduct()
        {
            var revenueData = _context.Sales
                .GroupBy(s => s.ProductName)

                .Select(g => new
                {
                    ProductName = g.Key,

                    Revenue = g.Sum(x => x.TotalAmount)
                })

                .OrderByDescending(x => x.Revenue)

                .ToList();

            return Ok(revenueData);
        }

        [HttpGet("stock-by-product")]
        public IActionResult GetStockByProduct()
        {
            var stockData = _context.Products

                .Select(p => new
                {
                    ProductName = p.Name,

                    Stock = p.StockQuantity
                })

                .OrderByDescending(x => x.Stock)

                .ToList();

            return Ok(stockData);
        }

        [HttpGet("monthly-revenue")]
        public IActionResult GetMonthlyRevenue(int? year)
        {
            var salesQuery = _context.Sales.AsQueryable();

            if (year.HasValue)
            {
                salesQuery = salesQuery
                    .Where(x => x.SaleDate.Year == year.Value);
            }

            var monthlyRevenue = salesQuery

                .GroupBy(x => x.SaleDate.Month)

                .Select(g => new
                {
                    MonthNumber = g.Key,
                    Revenue = g.Sum(x => x.TotalAmount)
                })

                .OrderBy(x => x.MonthNumber)

                .ToList();

            var result = monthlyRevenue
                .Select(x => new
                {
                    Month = new DateTime(
                        2000,
                        x.MonthNumber,
                        1
                    ).ToString("MMM"),

                    x.Revenue
                });

            return Ok(result);
        }

        [HttpGet("dashboard-summary")]

        public IActionResult GetDashboardSummary()
        {
            var totalRevenue = _context.Sales
                .Sum(s => s.TotalAmount);

            var totalSales = _context.Sales
                .Count();

            var totalProducts = _context.Products
                .Count();

            var topProduct = _context.Sales

                .GroupBy(s => s.ProductName)

                .Select(g => new
                {
                    ProductName = g.Key,

                    TotalQuantity = g.Sum(x => x.Quantity)
                })

                .OrderByDescending(x => x.TotalQuantity)

                .FirstOrDefault();
            
             var totalOrders = _context.Sales.Count();

             var topProd = topProduct?.ProductName;


            return Ok(new
            {
                TotalRevenue = totalRevenue,

                TotalSales = totalSales,

                TotalProducts = totalProducts,

                TopProduct = topProd,

                TotalOrders = totalOrders
            });
        }

        [HttpGet("available-years")]
        public IActionResult GetAvailableYears()
        {
            var years = _context.Sales

                .Select(x => x.SaleDate.Year)

                .Distinct()

                .OrderByDescending(x => x)

                .ToList();

            return Ok(years);
        }

        [HttpGet("insights")]

        public IActionResult GetInsights()
        {
            var insights = new List<string>();

            var totalRevenue = _context.Sales
                .Sum(s => s.TotalAmount);

            var totalSales = _context.Sales.Count();

            var currentMonth = DateTime.Now.Month;

            var previousMonth = currentMonth - 1;

            var currentRevenue = _context.Sales

                .Where(s => s.SaleDate.Month == currentMonth)

                .Sum(s => s.TotalAmount);

            var previousRevenue = _context.Sales

                .Where(s => s.SaleDate.Month == previousMonth)

                .Sum(s => s.TotalAmount);

            if (previousRevenue > 0)
            {
                var growth =
                    ((currentRevenue - previousRevenue)/ previousRevenue) * 100;

                if (growth > 0)
                {
                    insights.Add(
                        $"Revenue increased by {growth:F2}% compared to last month."
                    );
                }
                else
                {
                    insights.Add(
                        $"Revenue decreased by {Math.Abs(growth):F2}% compared to last month."
                    );
                }

                var totalOrders = _context.Sales.Count();

                if(totalOrders > 0)
                {
                    var avgOrderValue =
                        totalRevenue /
                        totalOrders;

                    insights.Add(
                        $"Average order value is ₹{avgOrderValue:F2}"
                    );
                }

                var highestRevenueProduct = _context.Sales

                .GroupBy(
                    x => x.ProductName
                )

                .Select(
                    g => new
                    {
                        ProductName = g.Key,

                        Revenue =
                        g.Sum(
                            x => x.TotalAmount
                        )
                    }
                )

                .OrderByDescending(
                    x => x.Revenue
                )

                .FirstOrDefault();
            }


            var topProduct = _context.Sales

                .GroupBy(s => s.ProductName)

                .Select(g => new
                {
                    ProductName = g.Key,
                    Quantity = g.Sum(x => x.Quantity)
                })

                .OrderByDescending(x => x.Quantity)

                .FirstOrDefault();

            if (totalRevenue > 10000)
            {
                insights.Add(
                    "Revenue is performing strongly."
                );
            }

            if (totalSales < 10)
            {
                insights.Add(
                    "Sales volume is low. Consider promotions."
                );
            }

            if (topProduct != null)
            {
                insights.Add(
                    $"Top selling product is {topProduct.ProductName}. Increase inventory."
                );
            }

            var lowProducts = _context.Sales

                .GroupBy(s => s.ProductName)

                .Select(g => new
                {
                    ProductName = g.Key,
                    Quantity = g.Sum(x => x.Quantity)
                })

                .OrderBy(x => x.Quantity)

                .Take(2)

                .ToList();

            foreach (var product in lowProducts)
            {
                insights.Add(
                    $"Low sales detected for {product.ProductName}. Consider discounts."
                );
            }

            //var totalSales = _context.Sales.Count();
            return Ok(insights);
        }

    }
}