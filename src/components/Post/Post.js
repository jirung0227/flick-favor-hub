// Post.js
import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import { FaPen, FaSave, FaTimes, FaTrash } from "react-icons/fa";
import styles from "./Post.module.css";

export const Post = ({ postObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newPost, setNewPost] = useState(postObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "posts", postObj.id));

      if (postObj.attachmentUrl !== "") {
        const desertRef = ref(storageService, postObj.attachmentUrl);
        await deleteObject(desertRef);
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const washingtonRef = doc(dbService, "posts", postObj.id);

    await updateDoc(washingtonRef, {
      text: newPost,
    });

    setEditing(false);
  };

  const onCancel = () => {
    setNewPost(postObj.text);
    toggleEditing();
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  return (
    <>
      <div className={styles.post}>
        {editing ? (
          <div className={styles.editForm}>
            <textarea
              className={styles.editInput}
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              required
            />
            <div className={styles.buttonGroup}>
              <button
                className={`${styles.iconButton} ${styles.saveButton}`}
                type='submit'
                onClick={onSubmit}
              >
                <FaSave />
              </button>
              <button
                className={`${styles.iconButton} ${styles.cancelButton}`}
                type='button'
                onClick={onCancel}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.postContent}>
              {postObj.attachmentUrl && (
                <img
                  className={styles.img}
                  src={postObj.attachmentUrl}
                  alt='img'
                />
              )}
              <div className={styles.postText}>{postObj.text}</div>
            </div>
            <div className={styles.postInfo}>
              {postObj.creatorName ? (
                <h6 className={styles.postCreatorName}>
                  @{postObj.creatorName}
                </h6>
              ) : (
                ""
              )}

              <h6 className={styles.postCreatedAt}>
                {new Date(parseInt(postObj.createdAt)).toLocaleDateString()}
              </h6>
            </div>

            {isOwner && (
              <div className={styles.buttonGroup}>
                <button
                  className={`${styles.iconButton} ${styles.deleteButton}`}
                  onClick={onDeleteClick}
                >
                  <FaTrash />
                </button>
                <button
                  className={`${styles.iconButton} ${styles.editButton}`}
                  onClick={toggleEditing}
                >
                  <FaPen />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
