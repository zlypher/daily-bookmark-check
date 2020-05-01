import "core-js/stable";
import "regenerator-runtime/runtime";
import { h, render } from "preact";
import { Popup } from "./components/popup";

const getLastCheckedDate = async () => {
  const { lastCheckedDate } = await browser.storage.local.get(
    "lastCheckedDate",
  );
  return lastCheckedDate;
};

const setLastCheckedDate = async (date) =>
  await browser.storage.local.set({
    lastCheckedDate: date,
  });

(async () => {
  render(<Popup />, document.getElementById("root"));
  const lastCheckedDate = await getLastCheckedDate();
  console.log(lastCheckedDate); // undefined, if not set

  await setLastCheckedDate(new Date());
})();
