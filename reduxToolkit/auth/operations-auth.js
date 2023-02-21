import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/config";

import { authSlice } from "./slice-auth";
import { uploadPhotoToServer } from "../../components/uploadPhoto";
const { updateUserProfile, authStateChange, authLogoutUser } =
  authSlice.actions;

export const authRegister =
  ({ name, email, password, avatar }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const uploadAvatarURL = await uploadPhotoToServer(avatar);
      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: name,
        photoURL: uploadAvatarURL,
      });

      const { uid, displayName, photoURL } = auth.currentUser;

      dispatch(
        updateUserProfile({
          name: displayName,
          email,
          userId: uid,
          avatar: photoURL,
        })
      );
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

export const authLogin =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const auth = getAuth();
      const user = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    }
  };

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authStateChange({ isLogin: true }));
        dispatch(
          updateUserProfile({
            name: user.displayName,
            userId: user.uid,
            email: user.email,
            avatar: user.photoURL,
          })
        );
      }
    });
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  }
};

export const authLogout = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authLogoutUser());
};
