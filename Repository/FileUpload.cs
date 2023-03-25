using MangaOCR.Contracts;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;

namespace MangaOCR.Repository
{
    public class FileUpload : IFileUpload
    {
        private readonly IFormFile _file;
        private readonly string? _uploadPath;
        private string? _fileName;


        public FileUpload(IFormFile file,string uploadPath) 
        {
            _file = file;
            _uploadPath = uploadPath;
        }

        public void IfFileUploaded()
        {
            if (_file == null || _file.Length == 0)
            {
                throw new BadHttpRequestException("No File Uploaded", 400);
            }
            _fileName = $"{DateTime.Now.Ticks}_{_file.FileName}";
        }

        public void CreateDirectoryIfNotExists()
        {
            if (!Directory.Exists(_uploadPath))
            {
                Directory.CreateDirectory(_uploadPath!);
            }
        }

        public async Task<string> CopyFileAsync()
        {
            string filePath = CombinePath(@$"./{_uploadPath}/{_fileName!}");
            try
            {
                FileStream? stream = new(filePath, FileMode.Create);
                await _file.CopyToAsync(stream);
                return _fileName!;
            }
            catch(Exception ex)
            {
                throw new BadHttpRequestException(ex.Message, 400);
            }
        }

        public static string CombinePath(string path)
        {
            string basePath = Directory.GetCurrentDirectory();
            string result = Path.Combine(basePath, path);
            return result;
        }


    }
}
