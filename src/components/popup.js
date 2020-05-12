import { getRandom } from "../utils";
import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { BookmarkList } from "./bookmark-list";
import "./popup.scss";
import { getAllBookmarks, removeBookmarks, getMessage } from "../extension-api";
import { BookmarkStatus } from "./bookmark-item";
import { ToggleStatus, Toggle } from "./toggle";

const toItem = (bookmark) => {
  return {
    status: BookmarkStatus.Active,
    toggleStatus: ToggleStatus.Off,
    id: bookmark.id,
    bookmark: bookmark,
  };
};

const loadBookmarks = async () => {
  const allBookmarks = await getAllBookmarks();
  console.log(allBookmarks);

  const numBookmarks = allBookmarks.length;
  const emptyItems =
    numBookmarks < 3
      ? new Array(3 - numBookmarks).fill(getEmptyBookmarkItem())
      : [];

  const selectedBookmarks =
    numBookmarks <= 3 ? allBookmarks : getRandom(allBookmarks, 3);

  return [...selectedBookmarks.map(toItem), ...emptyItems];
};

const getEmptyBookmarkItem = () => {
  return {
    status: BookmarkStatus.Empty,
    toggleStatus: ToggleStatus.Unset,
    bookmark: {
      title: "-",
      url: "-",
      id: "-",
    },
  };
};

export const Popup = () => {
  const [bookmarks, setBookmarks] = useState([]);
  useEffect(async () => {
    const data = await loadBookmarks();
    setBookmarks(data);
  }, []);

  const onToggleItemStatus = (bookmarkId) => {
    const idx = bookmarks.findIndex((b) => b.bookmark.id === bookmarkId);
    const bm = bookmarks[idx];
    const newBookmarks = [
      ...bookmarks.slice(0, idx),
      {
        ...bm,
        toggleStatus:
          bm.toggleStatus === ToggleStatus.On
            ? ToggleStatus.Off
            : ToggleStatus.On,
      },
      ...bookmarks.slice(idx + 1),
    ];

    setBookmarks(newBookmarks);
  };

  const onLoadClick = async () => {
    const data = await loadBookmarks();
    setBookmarks(data);
  };

  const onCleanClick = async () => {
    const idsToDelete = bookmarks
      .filter((b) => b.toggleStatus === ToggleStatus.On)
      .filter((b) => b.status !== BookmarkStatus.Deleted)
      .map((b) => b.id);

    const newBookmarks = bookmarks.map((b) => {
      const isDeleted = idsToDelete.includes(b.id);
      return {
        toggleStatus: isDeleted ? ToggleStatus.Unset : b.toggleStatus,
        status: isDeleted ? BookmarkStatus.Deleted : b.status,
        bookmark: {
          ...b.bookmark,
        },
      };
    });

    setBookmarks(newBookmarks);
    await removeBookmarks(idsToDelete);
  };

  const isCleanEnabled = bookmarks.some(
    (b) =>
      b.toggleStatus === ToggleStatus.On && b.status === BookmarkStatus.Active,
  );

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
          {getMessage("buttonLoad")}
        </button>
        <button
          className="js-popup__clean-btn popup__clean-btn popup__btn"
          onClick={onCleanClick}
          disabled={isCleanEnabled ? null : "disabled"}
        >
          {getMessage("buttonClean")}
        </button>
      </div>
    </div>
  );
};
