using MangaOCR.Contracts;
//using Tesseract;

namespace MangaOCR.Repository.OCR
{
    public class OCR : IOCR
    {
        private readonly string _filePath;

        public OCR(string filePath)
        {
            _filePath = filePath;
        }

        public string ReadData()
        {
            //var ocr = new TesseractEngine(Directory.GetCurrentDirectory()+"/tessdata", "eng", EngineMode.Default);
            //using var image = Pix.LoadFromFile(_filePath);
            //using var page = ocr.Process(image);
            //return page.GetText();
            throw new NotImplementedException();
        }

        public string ReplaceData()
        {
            throw new NotImplementedException();
        }
    }
}
