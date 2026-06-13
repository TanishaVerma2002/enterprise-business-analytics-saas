using EnterpriseAnalytics.API.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

namespace EnterpriseAnalytics.API.Controllers
{
    [ApiController]

    [Route("api/[controller]")]

    [Authorize(Roles = "Admin")]
    public class UploadController : ControllerBase
    {
        private readonly ICsvImportService _csvImportService;

        public UploadController(ICsvImportService csvImportService)
        {
            _csvImportService = csvImportService;
        }

        [HttpPost("products")]
        [Consumes("multipart/form-data")]

        public async Task<IActionResult> UploadProducts(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new
                {
                    Message = "No file uploaded"
                });
            }

            var result =
                await _csvImportService
                    .ImportProductsAsync(file);

            return Ok(new
            {
                Message = result
            });
        }

        [HttpPost("sales")]
        [Consumes("multipart/form-data")]

        public async Task<IActionResult> UploadSales(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest(new
                {
                    Message = "No file uploaded"
                });
            }

            var result =
                await _csvImportService
                    .ImportSalesAsync(file);

            return Ok(new
            {
                Message = result
            });
        }
    }
}