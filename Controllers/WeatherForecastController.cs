using Microsoft.AspNetCore.Mvc;
using MangaOCR.Repository;
using MangaOCR.Repository.OCR;
using MangaOCR.Models;

namespace MangaOCR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        [HttpPost("Upload")]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            FileUpload fileUpload = new(file, "data");
            fileUpload.IfFileUploaded();
            fileUpload.CreateDirectoryIfNotExists();
            string fileName = await fileUpload.CopyFileAsync();

            return Ok(fileName);
        }

        [HttpGet("GetText")]
        public async Task<IActionResult> GetText([FromQuery(Name = "fileName")] string fileName)
        {
            OCR ocr = new(fileName);
            ocr.CheckIfFileExists();
            List<TranslatedText> textData = await ocr.ReadData();
            return Ok(textData);
        }
    }
}