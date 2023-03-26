using MangaOCR.Contracts;
using System.Text.Json;
using System.Text;
using MangaOCR.Models;
using Microsoft.AspNetCore.DataProtection.KeyManagement;
using Microsoft.AspNetCore.Routing;
using static System.Net.Mime.MediaTypeNames;

namespace MangaOCR.Repository.Translator
{
    public class Translator : ITranslator
    {
        private static HttpRequestMessage CreateTranslateRequest(string text,string to="tr") 
        {
            string key = "7d1492285bea4f588f2442665c711a45";
            string endpoint = "https://api.cognitive.microsofttranslator.com";
            string location = "westeurope";
            string route = @$"/translate?api-version=3.0&to={to}";
            object[] body = new object[] { new { Text = text } };
            string requestBody = JsonSerializer.Serialize(body);

            HttpRequestMessage request = new()
            {
                Method = HttpMethod.Post,
                RequestUri = new Uri(endpoint + route),
                Content = new StringContent(requestBody, Encoding.UTF8, "application/json")
            };
            request.Headers.Add("Ocp-Apim-Subscription-Key", key);
            request.Headers.Add("Ocp-Apim-Subscription-Region", location);

            return request;
        }


        public async Task<string> Translate(string text)
        {
            HttpClient client = new();
            HttpRequestMessage request = CreateTranslateRequest(text);
            HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
            string result = await response.Content.ReadAsStringAsync();
            return result;
        }
    }
}
