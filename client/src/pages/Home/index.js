import React, { useEffect, useState } from "react";
import styles from "./home.module.css";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import Bookmarks from "../../components/Bookmarks";
import { FaPlus } from "react-icons/fa";

function Home() {
  const [actualPage, setActualPage] = useState(1);
  const [pages, setPages] = useState([]);
  const { data: bookmarksPaginated, refetch } = useQuery(`/bookmarks?page=${actualPage}`);
  const [addBookmark] = useMutation("/bookmarks", "post", refetch);
  const [deleteBookmark] = useMutation("/bookmarks", "delete", refetch);
  const [bookmarksState, setBookmarksState] = useState([]);
  const [url, setUrl] = useState("");

  const handleEditUrl = (e) => {
    setUrl(e.target.value);
  };

  const handleDelete = (id) => async () => {
    await deleteBookmark({ variables: { id } });
  };

  const handleClick = async () => {
    await addBookmark({ variables: { url } });
    setUrl("");
  };

  const changePage = (newPage) => () => {
    setActualPage(newPage);
  };

  useEffect(() => {
    if (bookmarksPaginated) {
      setBookmarksState(bookmarksPaginated.bookmarks);
      // create an array with the number page like [1, 2, 3 ...]
      setPages(Array.from({ length: bookmarksPaginated.nbPages }, (_, i) => i + 1));
    }
  }, [bookmarksPaginated]);

  return (
    <div className={styles.root}>
      <h2>
        Ajouter un lien <a href="https://oembed.com/">oembed</a>
      </h2>
      <div className={styles.actions}>
        <input type="text" value={url} onChange={handleEditUrl} />
        <button onClick={handleClick}>
          <FaPlus />
        </button>
      </div>
      <Bookmarks bookmarks={bookmarksState} handleDelete={handleDelete} />
      <div className={styles.pagination}>
        {pages.map((page) => (
          <div key={page} onClick={changePage(page)}>
            {page}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
