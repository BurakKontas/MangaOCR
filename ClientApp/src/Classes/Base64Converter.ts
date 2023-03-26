import { IBase64Converter } from "../Interfaces/IBase64Converter";

export class Base64Converter implements IBase64Converter {
  async base64ToBlob(base64: string): Promise<Blob> {
    const parts = base64.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const b64 = window.atob(parts[1]);
    let byteNumbers = new Array(b64.length);
    for (let i = 0; i < b64.length; i++) {
      byteNumbers[i] = b64.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }

  base64ToImage(base64: string): HTMLImageElement {
    const image = new Image();
    image.src = base64;
    return image;
  }

  async base64ToFile(base64: string, fileName: string): Promise<File> {
    const blob = await this.base64ToBlob(base64);
    return new File([blob], fileName, { type: blob.type });
  }
}
