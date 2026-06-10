using EnterpriseAnalytics.API.DTOs;
using EnterpriseAnalytics.API.Models;

namespace EnterpriseAnalytics.API.Services.Interfaces
{
    public interface IProductService
    {
        Task CreateProductAsync(CreateProductDto request);
        Task<List<Product>> GetAllProductsAsync();
    }
}