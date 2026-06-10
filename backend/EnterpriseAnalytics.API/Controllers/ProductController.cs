using Microsoft.AspNetCore.Mvc;
using EnterpriseAnalytics.API.Data;
using EnterpriseAnalytics.API.DTOs;
using EnterpriseAnalytics.API.Models;
using Microsoft.AspNetCore.Authorization;
using EnterpriseAnalytics.API.Services;
using EnterpriseAnalytics.API.Services.Interfaces;

namespace EnterpriseAnalytics.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
       {       
          _productService = productService;
       }

        [HttpPost]

        public async Task<IActionResult> CreateProduct(CreateProductDto request)
        {
            await _productService.CreateProductAsync(request);

            return Ok(new
            {
                Message = "Product registered successfully"
            });
        }

        [HttpGet]

        public async Task<IActionResult> GetProducts()
        {
            var products = await _productService.GetAllProductsAsync();

            return Ok(products);
        }

    }
}
