import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { nanoid } from "nanoid";
import { storage } from "../firebase/config";

export const uploadPhotoToServer = async (photo) => {
  try {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", photo, true);
      xhr.send(null);
    });
    const id = nanoid();
    const storageRef = ref(storage, `avatarImage/${id}`);
    const result = await uploadBytes(storageRef, blob);
    blob.close();

    const processedPhoto = await getDownloadURL(
      ref(storage, `avatarImage/${id}`)
    );
    console.log(processedPhoto);
    return processedPhoto;
  } catch (error) {
    console.error(error);
  }
};

export const uploadPhotoToServerBlob = async (photo) => {
  try {
    const response = await fetch(photo);
    const file = await response.blob();
    const id = nanoid();
    const storageRef = ref(storage, `postImage/${id}`);
    await uploadBytes(storageRef, file);
    const processedPhoto = await getDownloadURL(
      ref(storage, `postImage/${id}`)
    );
    return processedPhoto;
  } catch (error) {
    console.error(error);
  }
};
