// Home.js

import { NewPost } from "components/NewPost/NewPost";
import { Post } from "components/Post/Post";
import { dbService } from "fbase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";

export const Home = ({ userObj }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postRef = collection(dbService, "posts");
    const sortedQuery = query(postRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(sortedQuery, (querySnapshot) => {
      const newArray = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setPosts(newArray);
    });
    return () => unsubscribe;
  }, []);

  return (
    <div className={styles.container}>
      <NewPost userObj={userObj} className={styles.newPost} />
      <ul className={styles.postList}>
        {posts.map((post) => (
          <Post
            key={post.id}
            postObj={post}
            isOwner={post.creatorId === userObj.uid}
          />
        ))}
      </ul>
    </div>
  );
};
