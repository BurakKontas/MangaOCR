namespace MangaOCR.Contracts
{
    public interface IFileUpload
    {
        void IfFileUploaded();
        void CreateDirectoryIfNotExists();
        Task<string> CopyFileAsync();
    }
}
