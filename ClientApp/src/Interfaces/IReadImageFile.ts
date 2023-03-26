export interface IReadImageFile {
  readAsDataURL: (file: File) => Promise<HTMLImageElement>;
}
