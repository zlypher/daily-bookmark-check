import { h } from "preact";
import "./toggle.scss";

export const Toggle = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`toggle ${props.on ? "toggle--on" : "toggle--off"}`}
      role="switch"
      tabindex="0"
    >
      <span className="toggle__bg"></span>
      <span className="toggle__btn"></span>
    </div>
  );
};
