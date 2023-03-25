using Azure.AI.Translation;
using Azure;
using MangaOCR.Contracts;
using Tesseract;
using System.Text.Json;
using System.Text;
using MangaOCR.Models;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Routing;
using System.Globalization;

namespace MangaOCR.Repository.OCR
{
    public class OCR : IOCR
    {
        private readonly string _filePath;
        private Pix? _image;
        private Page? _page;
        private TesseractEngine? _ocr;
        private string? _text;
        private List<TranslatedText>? _translatedText;


        public OCR(string fileName)
        {
            _filePath = FileUpload.CombinePath(@$"./data/{fileName}");
        }

        public void CheckIfFileExists()
        {
            bool ifExists = File.Exists(_filePath);
            if (!ifExists)
                throw new FileNotFoundException();
        }

        public async Task<List<TranslatedText>> ReadData(string language = "eng")
        {
            string path = FileUpload.CombinePath("tessdata");
            _ocr = new(path, language, EngineMode.Default);
            _image = Pix.LoadFromFile(_filePath);
            _page = _ocr.Process(_image);
            _text = _page.GetText();
            List<TranslatedText>? result = await TranslateData();
            return result;
        }

        public async Task<List<TranslatedText>> TranslateData()
        {
            string result = await Translate(_text!);
            _translatedText = JsonSerializer.Deserialize<List<TranslatedText>>(result);
            return _translatedText!;
            
        }

        public async Task<string> ReplaceData()
        {
            throw new NotImplementedException();
        }

        private async static Task<string> Translate(string text,string to = "tr")
        {
            string key = "7d1492285bea4f588f2442665c711a45";
            string endpoint = "https://api.cognitive.microsofttranslator.com";
            string location = "westeurope";

            string route = @$"/translate?api-version=3.0&to={to}";
            object[] body = new object[] { new { Text = text } };
            string requestBody = JsonSerializer.Serialize(body);

            var client = new HttpClient();
            var request = new HttpRequestMessage();
            request.Method = HttpMethod.Post;
            request.RequestUri = new Uri(endpoint + route);
            request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
            request.Headers.Add("Ocp-Apim-Subscription-Key", key);
            request.Headers.Add("Ocp-Apim-Subscription-Region", location);

            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            string result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }
}
