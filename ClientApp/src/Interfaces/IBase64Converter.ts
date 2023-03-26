export interface IBase64Converter {
  base64ToBlob(base64: string): Promise<Blob>;
  base64ToImage(base64: string): HTMLImageElement;
  base64ToFile(base64: string, fileName: string): Promise<File>;
}
