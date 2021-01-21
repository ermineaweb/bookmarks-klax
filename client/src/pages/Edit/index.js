import React, { useCallback, useEffect, useState } from "react";
import styles from "./edit.module.css";
import { useHistory, useParams } from "react-router";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Keywords from "../../components/Keywords";

function Edit() {
  const { id } = useParams();
  const { data: bookmark, loading, refetch } = useQuery(`/bookmarks/${id}`);
  const [updateBookmark] = useMutation("/bookmarks", "put", refetch);
  const [keywordsState, setKeywordsState] = useState([]);
  const [keyword, setKeyword] = useState("");
  const history = useHistory();

  const changeKeyword = (e) => {
    setKeyword(e.target.value);
  };

  const editKeywords = useCallback(
    (index) => (e) => {
      const newKeywordsState = [...keywordsState];
      newKeywordsState[index] = e.target.value;
      setKeywordsState(newKeywordsState);
    },
    [keywordsState, setKeywordsState]
  );

  const addKeyword = () => {
    setKeywordsState((prev) => [...prev, keyword]);
    setKeyword("");
  };

  const deleteKeyword = useCallback(
    (deletedKeyword) => () => {
      setKeywordsState((prev) => prev.filter((k) => k !== deletedKeyword));
    },
    [setKeywordsState]
  );

  const handleSave = async () => {
    await updateBookmark({ variables: { id, keywords: keywordsState } });
    history.push("/");
  };

  useEffect(() => {
    if (bookmark) setKeywordsState(bookmark.keywords);
  }, [bookmark]);

  if (loading) return null;
  return (
    <div className={styles.root}>
      <h2>
        Ajouter des mots-clés au bookmark <strong>{bookmark.title}</strong>
      </h2>
      <div className={styles.actions}>
        <input type="text" value={keyword} onChange={changeKeyword} placeholder={"nouveau mot clé"} />
        <button onClick={addKeyword}>
          <FaPlus />
        </button>
      </div>
      <h2>Mots-clés existants :</h2>
      <Keywords keywords={keywordsState} deleteKeyword={deleteKeyword} editKeywords={editKeywords} />
      <div className={styles.submit}>
        <Link to={"/"}>Annuler</Link>
        <button onClick={handleSave}>Sauvegarder</button>
      </div>
    </div>
  );
}

export default Edit;
