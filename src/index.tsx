import { Core } from "./Core";
import { render } from "react-dom";
import { App } from "./App";

const core = new Core();
const getCore = (): Core => {
  return core;
};

const rootElement = document.getElementById("root");
render(<App getCore={getCore} />, rootElement);
