import { h } from "preact";
import { BookmarkItem } from "./bookmark-item";

export const BookmarkList = (props) => {
  return (
    <ul className="bookmark-list">
      {props.bookmarks.map((bm) => (
        <li key={bm.id} className="bookmark-list__item">
          <BookmarkItem
            bookmark={bm.bookmark}
            status={bm.status}
            onToggleStatus={props.onToggleItemStatus}
          />
        </li>
      ))}
    </ul>
  );
};
