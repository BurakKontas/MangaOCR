using MangaOCR.Models;

namespace MangaOCR.Contracts
{
    public interface IOCR
    {
        void CheckIfFileExists();
        Task<List<TranslatedText>> ReadData(string language = "eng");
        Task<List<TranslatedText>> TranslateData();
        Task<string> ReplaceData();
    }
}
