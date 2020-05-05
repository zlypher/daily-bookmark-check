import { h } from "preact";
import { Toggle } from "./toggle";
import "./bookmark-item.scss";
import { ExternalLink } from "./external-link";

export const BookmarkItem = (props) => {
  const { bookmark, status, toggleDelete } = props;
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
          on={toggleDelete}
        />
      </div>
    </div>
  );
};
