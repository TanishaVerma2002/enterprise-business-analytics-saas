using Microsoft.AspNetCore.Mvc;

namespace EnterpriseAnalytics.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestController: ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Enterprise backend running");
        }
    }
    
}