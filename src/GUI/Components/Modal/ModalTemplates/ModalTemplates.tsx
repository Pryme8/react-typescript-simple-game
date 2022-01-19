import { Nullable } from "@babylonjs/core";
import ModalBasic from "./Assets/ModalBasic.png";

export interface IModalTemplateProps {
  url: string;
  cached?: Nullable<HTMLImageElement>;
  tw: number; //templateWidth
  th: number; //templateHeight
  cs: number; //cornerSize
}
export class ModalTemplates {
  static Basic: IModalTemplateProps = {
    url: ModalBasic,
    cached: null,
    tw: 64, //templateWidth
    th: 64, //templateHeight
    cs: 20 //cornerSize
  };
}
