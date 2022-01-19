import { Nullable } from "@babylonjs/core";
import ButtonA from "./Assets/GUIButtonA.png";
import ButtonA_Hover from "./Assets/GUIButtonA_Hover.png";
import ButtonA_Active from "./Assets/GUIButtonA_Active.png";

export interface IButtonATemplateProps {
  urls: { normal: string; hover: string; active: string };
  cached?: {
    normal: Nullable<HTMLImageElement>;
    hover: Nullable<HTMLImageElement>;
    active: Nullable<HTMLImageElement>;
  };
  tw: number; //templateWidth
  th: number; //templateHeight
  cs: number; //cornerSize
}
export class ButtonATemplates {
  static Basic: IButtonATemplateProps = {
    urls: { normal: ButtonA, hover: ButtonA_Hover, active: ButtonA_Active },
    cached: { normal: null, hover: null, active: null },
    tw: 64, //templateWidth
    th: 64, //templateHeight
    cs: 16 //cornerSize
  };
}
