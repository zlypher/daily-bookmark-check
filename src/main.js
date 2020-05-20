import "core-js/stable";
import "regenerator-runtime/runtime";
import { h, render } from "preact";
import { Popup } from "./components/popup";

(async () => {
  render(<Popup />, document.getElementById("root"));
})();
