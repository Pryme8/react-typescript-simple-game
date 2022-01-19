export class Styles {
  static Apply(element: any, style: any): void {
    Object.keys(style).forEach((key) => {
      element[key] = style[key];
    });
  }
  static WhiteTextBlackOutline = {
    color: "white",
    textShadow:
      "rgb(0, 0, 0) 1px 0px 0px, rgb(0, 0, 0) 0.540302px 0.841471px 0px, rgb(0, 0, 0) -0.416147px 0.909297px 0px, rgb(0, 0, 0) -0.989992px 0.14112px 0px, rgb(0, 0, 0) -0.653644px -0.756802px 0px, rgb(0, 0, 0) 0.283662px -0.958924px 0px, rgb(0, 0, 0) 0.96017px -0.279415px 0px"
  };
}
