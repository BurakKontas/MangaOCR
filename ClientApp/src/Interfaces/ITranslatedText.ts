import { IDetectedLanguage } from "./IDetectedLanguage";
import { ITranslation } from "./ITranslation";

export interface ITranslatedText {
  detectedLanguage: IDetectedLanguage | null;
  translations: ITranslation[] | null;
}
