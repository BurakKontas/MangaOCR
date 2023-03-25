namespace MangaOCR.Models
{
    public class TranslatedText
    {
        public DetectedLanguage? detectedLanguage { get; set; }
        public List<Translation>? translations { get; set; }
    }
}
