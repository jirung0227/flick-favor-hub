// NewPost.js
import { dbService, storageService } from "fbase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useState } from "react";
import { FaImage, FaRegTimesCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import styles from "./NewPost.module.css";

export const NewPost = ({ userObj }) => {
  const [post, setPost] = useState("");
  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, "data_url");
      attachmentUrl = await getDownloadURL(attachmentRef);
    }

    try {
      await addDoc(collection(dbService, "posts"), {
        text: post,
        createdAt: Date.now(),
        creatorId: userObj.uid,
        creatorName: userObj.displayName,
        attachmentUrl,
      });
      setPost("");
      setAttachment("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;

    setPost(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;

    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => {
    setAttachment("");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        className={styles.input}
        value={post}
        onChange={onChange}
        placeholder='영화 후기를 남겨주세요.'
        maxLength={120}
      />
      <label className={styles.fileInput}>
        <span className={styles.fileLabel}>
          <FaImage className={styles.fileIcon} />
          사진 추가
        </span>
        <input
          className={styles.fileInputField}
          type='file'
          accept='image/*'
          onChange={onFileChange}
        />
      </label>
      <button className={styles.postButton} type='submit'>
        게시
      </button>
      {attachment && (
        <div className={styles.preview}>
          <img className={styles.previewImg} src={attachment} alt='preview' />
          <button
            className={styles.clearButton}
            type='button'
            onClick={onClearAttachment}
          >
            <FaRegTimesCircle />
          </button>
        </div>
      )}
    </form>
  );
};
