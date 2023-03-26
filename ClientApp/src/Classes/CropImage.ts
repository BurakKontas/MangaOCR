import { Crop } from "react-image-crop";
import { IScale } from "../Interfaces/IScale";
import { ICropImage } from "../Interfaces/ICropImage";

export class CropImage implements ICropImage {
  private image: HTMLImageElement;
  private crop: Crop;
  private outputType: string;

  constructor(image: HTMLImageElement, crop: Crop, outputType: string) {
    this.image = image;
    this.crop = crop;
    this.outputType = outputType;
  }

  private createCanvas(pixelRatio: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    canvas.width = this.crop.width;
    canvas.height = this.crop.height;
    canvas.width = this.crop.width * pixelRatio;
    canvas.height = this.crop.height * pixelRatio;
    return canvas;
  }

  private createContext(
    pixelRatio: number,
    canvas: HTMLCanvasElement
  ): CanvasRenderingContext2D {
    const ctx = canvas.getContext("2d");
    ctx!.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx!.imageSmoothingQuality = "high";
    return ctx!;
  }

  private createScale(): IScale {
    const scaleX = this.image.naturalWidth / this.image.width;
    const scaleY = this.image.naturalHeight / this.image.height;
    const obj = {
      X: scaleX,
      Y: scaleY,
    };
    return obj;
  }

  private drawImage(pixelRatio: number, scale: IScale): HTMLCanvasElement {
    let canvas = this.createCanvas(pixelRatio);
    let ctx = this.createContext(pixelRatio, canvas);
    ctx?.drawImage(
      this.image,
      this.crop.x * scale.X,
      this.crop.y * scale.Y,
      this.crop.width * scale.X,
      this.crop.height * scale.Y,
      0,
      0,
      this.crop.width,
      this.crop.height
    );
    return canvas;
  }

  cropImage(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const pixelRatio = window.devicePixelRatio;
      const scale = this.createScale();
      const canvas = this.drawImage(pixelRatio, scale);

      const base64Image = canvas.toDataURL(this.outputType);
      resolve(base64Image);
    });
  }
}
