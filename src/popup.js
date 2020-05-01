import "core-js/stable";
import "regenerator-runtime/runtime";
import { getRandom } from "./utils";
import { h, render } from "preact";
import { useState, useEffect } from "preact/hooks";
import { BookmarkList } from "./components/bookmark-list";

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

const toItem = (bookmark) => {
  return {
    status: "active",
    id: bookmark.id,
    bookmark: bookmark,
  };
};

const loadBookmarks = async () => {
  const allBookmarks = (await browser.bookmarks.search({})).filter(
    (b) => b.type === "bookmark",
  );

  const numBookmarks = allBookmarks.length;
  const emptyItems =
    numBookmarks < 3
      ? new Array(3 - numBookmarks).fill(getEmptyBookmarkItem())
      : [];

  const selectedBookmarks =
    numBookmarks <= 3 ? allBookmarks : getRandom(allBookmarks, 3);

  return [...selectedBookmarks, ...emptyItems].map(toItem);
};

const getEmptyBookmarkItem = () => {
  return {
    status: "empty",
    bookmark: {
      title: "-",
      url: "-",
      id: "-",
    },
  };
};

const Popup = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(async () => {
    const data = await loadBookmarks();
    setBookmarks(data);
  }, []);

  const onToggleItemStatus = () => {
    console.log("toggle item status");
  };

  const onLoadClick = () => {
    console.log("load");
  };

  const onCleanClick = () => {
    console.log("clean");
  };

  return (
    <div className="popup">
      <BookmarkList
        bookmarks={bookmarks}
        onToggleItemStatus={onToggleItemStatus}
      />
      <div className="popup__btns">
        <button
          className="js-popup__load-btn popup__load-btn popup__btn"
          onClick={onLoadClick}
        >
          Load New
        </button>
        <button
          className="js-popup__clean-btn popup__clean-btn popup__btn"
          onClick={onCleanClick}
        >
          Clean
        </button>
      </div>
    </div>
  );
};

(async () => {
  render(<Popup />, document.getElementById("root"));
  const lastCheckedDate = await getLastCheckedDate();
  console.log(lastCheckedDate); // undefined, if not set

  await setLastCheckedDate(new Date());
})();
