using MangaOCR.Models;

namespace MangaOCR.Contracts
{
    public interface ITranslator
    {
        Task<string> Translate(string text);
    }
}
