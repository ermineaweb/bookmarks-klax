import React from "react";
import styles from "./keyword.module.css";
import { FaTimes } from "react-icons/fa";

function Keyword({ keyword, deleteKeyword, editKeywords, index }) {
  return (
    <div className={styles.root}>
      <input type="text" value={keyword} onChange={editKeywords(index)} />
      <button onClick={deleteKeyword(keyword)}>
        <FaTimes />
      </button>
    </div>
  );
}

export default React.memo(Keyword);
