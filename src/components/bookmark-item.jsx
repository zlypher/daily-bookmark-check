import { h } from "preact";
import { Toggle } from "./toggle";
import "./bookmark-item.scss";
import { ExternalLink } from "./external-link";

export const BookmarkStatus = {
  Active: "active",
  Deleted: "deleted",
  Empty: "empty",
};

export const BookmarkItem = (props) => {
  const { bookmark, status, toggleStatus } = props;
  return (
    <div className={`bookmark-item js-bookmark-item bookmark-item--${status}`}>
      <ExternalLink className="bookmark-item__external" href={bookmark.url} />
      <div className="bookmark-item__wrapper">
        <div className="bookmark-item__title" title={bookmark.title}>
          {bookmark.title}
        </div>
        <div className="bookmark-item__url" title={bookmark.url}>
          {bookmark.url}
        </div>
      </div>
      <div>
        <Toggle
          onClick={() => props.onToggleStatus(bookmark.id)}
          status={toggleStatus}
        />
      </div>
      {status === BookmarkStatus.Deleted && (
        <div class="bookmark-item__delete-overlay">✔️ Bookmark removed</div>
      )}
    </div>
  );
};
