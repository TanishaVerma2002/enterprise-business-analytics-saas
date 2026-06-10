using EnterpriseAnalytics.API.Data;
using EnterpriseAnalytics.API.DTOs;
using EnterpriseAnalytics.API.Models;
using EnterpriseAnalytics.API.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EnterpriseAnalytics.API.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task CreateProductAsync(CreateProductDto request)
        {
            var product = new Product
            {
                Name = request.Name,
                Category = request.Category,
                Price = request.Price,
                StockQuantity = request.StockQuantity
            };

            _context.Products.Add(product);

            await _context.SaveChangesAsync();
        }
        public async Task<List<Product>> GetAllProductsAsync()
        {
            return await _context.Products.ToListAsync();
        }
    }
}