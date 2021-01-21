import React from "react";
import styles from "./keywords.module.css";
import Keyword from "../Keyword";

function Keywords({ keywords, ...props }) {
  return (
    <div className={styles.root}>
      {keywords?.map((keyword, index) => (
        <Keyword keyword={keyword} index={index} {...props} />
      ))}
    </div>
  );
}

export default React.memo(Keywords);
