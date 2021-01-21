import React from "react";
import styles from "./bookmark.module.css";
import { FaTimes, FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils";

function Bookmark({ bookmark, handleDelete }) {
  return (
    <div className={styles.root}>
      <div className={styles.infos}>
        <div>Titre : {bookmark.title}</div>
        <div>Ajouté le {formatDate(bookmark.date)}</div>
        <div>Auteur : {bookmark.author}</div>
        <div>Lien oembed : {bookmark.url}</div>
        {bookmark.keywords.length > 0 && (
          <div>
            <strong>Mots-clés : </strong>
            {bookmark.keywords.toString()}
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <div onClick={handleDelete(bookmark.id)}>
          <FaTimes />
        </div>
        <Link to={`/edit/${bookmark.id}`}>
          <FaPen />
        </Link>
      </div>
    </div>
  );
}

export default React.memo(Bookmark);
