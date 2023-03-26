using Microsoft.AspNetCore.Mvc;
using MangaOCR.Repository;

namespace MangaOCR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            //dosyayı doğrudan pythondaki OCR'a göndericez burada (kaydetmeden)
            //sonrasında OCR dan gelen text ile çeviri işlemine tabii tutucaz
            //sonrasında texti geri döndürücez

            return Ok("OK");
        }
    }
}