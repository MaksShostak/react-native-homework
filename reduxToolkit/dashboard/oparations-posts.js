import { db, storage } from "../../firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
  onSnapshot,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import {
  addPost,
  delPost,
  getPosts,
  getUsersPosts,
  getComments,
  createComments,
  addLikes,
} from "./slise-posts";

export const createPost =
  ({ photo, title, latitude, longitude, userId, name, place }) =>
  async (dispatch, getState) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        photo,
        title,
        latitude,
        longitude,
        userId,
        name,
        place,
      });
      console.log("Document written with ID: ", docRef.id);
      const posts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      dispatch(addPost(posts));
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

export const featchAllPosts = () => async (dispatch, getState) => {
  try {
    const posts = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      posts.push({ ...doc.data(), id: doc.id });
    });

    dispatch(getPosts(posts));
  } catch (error) {
    console.error("Error featcing document: ", error);
  }
};

export const featchUsersPosts = (userId) => async (dispatch, getState) => {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (querySnapshot) => {
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        userPosts.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      dispatch(getUsersPosts(userPosts));
    });
  } catch (error) {
    console.error("Error featcing users document: ", error);
  }
};

export const deletePost =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      const wayToPosts = doc(db, "posts", id);
      await deleteDoc(wayToPosts);
      const posts = [];
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });

      dispatch(delPost(posts));
    } catch (error) {
      console.error("Error deliting users document: ", error);
    }
  };

export const updatePost =
  ({ userId, postId, inputComent, avatar }) =>
  async (dispatch, getState) => {
    try {
      const wayToPosts = doc(db, "posts", postId);
      await addDoc(collection(wayToPosts, "comments"), {
        comment: inputComent,
        userId,
        userAvatar: avatar,
        postId,
        createdat: Timestamp.now().toDate().toLocaleString(),
      });
      const comments = [];
      const querySnapshot = await getDocs(collection(wayToPosts, "comments"));
      querySnapshot.forEach((doc) => {
        comments.push({ ...doc.data(), id: doc.id });
      });
      await updateDoc(wayToPosts, {
        commentsCount: comments.length,
      });

      dispatch(createComments(comments));
    } catch (error) {
      console.error("Error updating users document: ", error);
    }
  };

export const getUpdatedComments = (postId) => async (dispatch, getState) => {
  try {
    const wayToPosts = doc(db, "posts", postId);
    const comments = [];
    const querySnapshot = await getDocs(collection(wayToPosts, "comments"));
    querySnapshot.forEach((doc) => {
      comments.push({ ...doc.data(), id: doc.id });
    });
    dispatch(getComments(comments));
  } catch (error) {
    console.error("Error getting updated users document: ", error);
  }
};

export const createLike =
  ({ postId, like }) =>
  async (dispatch, getState) => {
    try {
      const wayToPosts = doc(db, "posts", postId);
      const likes = [];
      if (like === true) {
        likes.push(like);
        console.log(likes);

        await updateDoc(wayToPosts, {
          likes: likes,
        });
      } else if (like === false) {
        likes.pop();
        console.log(likes);
        await updateDoc(wayToPosts, {
          likes: likes,
        });
      }

      const docSnap = await getDoc(wayToPosts);

      if (docSnap.exists()) {
        dispatch(addLikes(docSnap.data().likes));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error createLike: ", error);
    }
  };
