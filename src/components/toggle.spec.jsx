import { h } from "preact";
import { Toggle, ToggleStatus } from "./toggle";
import { fireEvent, render, screen } from "@testing-library/preact";

test("toggle should ignore clicks while unset", () => {
  const onClickFn = jest.fn();
  render(<Toggle status={ToggleStatus.Unset} onClick={onClickFn} />);

  fireEvent.click(screen.getByRole("button"));

  expect(onClickFn).not.toHaveBeenCalled();
});

test("toggle should process clicks while on/off", () => {
  const onClickFn = jest.fn();
  render(<Toggle status={ToggleStatus.On} onClick={onClickFn} />);

  fireEvent.click(screen.getByRole("button"));
  fireEvent.click(screen.getByRole("button"));

  expect(onClickFn).toHaveBeenCalledTimes(2);
});
