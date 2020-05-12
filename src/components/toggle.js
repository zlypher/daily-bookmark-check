import { h } from "preact";
import "./toggle.scss";

export const ToggleStatus = {
  On: "on",
  Off: "off",
  Unset: "unset",
};

export const Toggle = (props) => {
  const onClick = (...args) => {
    // Don't forward click event if toggle status is unset
    if (props.status === ToggleStatus.Unset) {
      return;
    }

    props.onClick(...args);
  }
  return (
    <div
      onClick={onClick}
      className={`toggle toggle--${props.status}`}
      role="switch"
      tabindex="0"
    >
      <span className="toggle__bg"></span>
      <span className="toggle__btn"></span>
    </div>
  );
};
