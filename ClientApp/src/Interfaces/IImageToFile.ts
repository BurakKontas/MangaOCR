export interface IImageToFile {
  convertCanvasToFile: (image: HTMLImageElement) => Promise<File>;
}
