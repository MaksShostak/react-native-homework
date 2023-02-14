import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPyoDegFt0Q4DiY1gMfIpOy5Nb3qtBqZs",
  authDomain: "postsimg.firebaseapp.com",
  projectId: "postsimg",
  storageBucket: "postsimg.appspot.com",
  messagingSenderId: "514317442461",
  appId: "1:514317442461:web:05834e804c3b64fec1a374",
  measurementId: "G-3FMFHKQYK1",
};
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
