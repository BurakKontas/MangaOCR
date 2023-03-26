import { IReadImageFile } from "../Interfaces/IReadImageFile";
import { Base64Converter } from "./Base64Converter";

export class ReadImageFile implements IReadImageFile {
  async readAsDataURL(file: File): Promise<HTMLImageElement> {
    return new Promise((_, reject) => {
      const reader = new FileReader();
      let base64Converter = new Base64Converter();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        return base64Converter.base64ToImage(e.target?.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
}
