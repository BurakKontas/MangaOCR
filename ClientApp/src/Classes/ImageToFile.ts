import { IImageToFile } from "../Interfaces/IImageToFile";
export class ImageToFile implements IImageToFile {
  private checkIfImageExists(image: HTMLImageElement): void {
    if (!image) throw new Error("Image element is not valid.");
  }

  private createCanvas(image: HTMLImageElement): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    return canvas;
  }

  private drawCanvas(canvas: HTMLCanvasElement, image: HTMLImageElement): void {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Context is not valid.");

    ctx.drawImage(image, 0, 0, image.width, image.height);
  }

  private async convertToFile(canvas: HTMLCanvasElement): Promise<File> {
    let fileType = "image/png";
    const dataURL = canvas.toDataURL(fileType);
    const blob = await (await fetch(dataURL)).blob();
    return new File([blob], "croppedImage.png", { type: fileType });
  }

  async convertCanvasToFile(image: HTMLImageElement): Promise<File> {
    this.checkIfImageExists(image);
    let canvas = this.createCanvas(image);
    this.drawCanvas(canvas, image);
    return await this.convertToFile(canvas);
  }
}
