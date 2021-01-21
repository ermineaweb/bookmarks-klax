import React from "react";
import styles from "./bookmarks.module.css";
import Bookmark from "../Bookmark";

function Bookmarks({ bookmarks, ...props }) {
  return (
    <div className={styles.root}>
      {bookmarks?.map((bookmark) => (
        <Bookmark bookmark={bookmark} key={bookmark.id} {...props} />
      ))}
    </div>
  );
}

export default React.memo(Bookmarks);
