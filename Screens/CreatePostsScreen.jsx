import { Camera, CameraType } from "expo-camera";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { nanoid } from "nanoid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import {
  FontAwesome,
  AntDesign,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";

import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import { storage, db } from "../firebase/config";
import { selectStateAuth } from "../reduxToolkit/auth/selectot-auth";

export const CreatePostsScreen = ({ navigation }) => {
  const [buttonStyle, setButtonStyle] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);
  const [title, setTitle] = useState("");
  const [place, setPlace] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { userId, name } = useSelector(selectStateAuth);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  // if (!permission) {
  //   return (
  //     <View>
  //       <Text>Grant permission </Text>
  //     </View>
  //   );
  // }

  // if (!permission.granted) {
  //   return (
  //     <View>
  //       <Text>Access is denied</Text>
  //     </View>
  //   );
  // }

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      const lat = JSON.stringify(location.coords.latitude);
      const long = JSON.stringify(location.coords.longitude);
      setLatitude(lat);
      setLongitude(long);
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const useCamera = async () => {
    const { uri } = await camera.takePictureAsync();
    setPhoto(uri);
  };
  const uploadPhotoToServer = async () => {
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

  const titleHandler = (text) => setTitle(text);
  const placeHandler = (text) => setPlace(text);

  const onSubmit = () => {
    uploadPostsToServer();
    navigation.navigate("PostsScreen");
    setTitle("");
    setPlace("");
    setButtonStyle(false);
  };
  const uploadPostsToServer = async () => {
    const photo = await uploadPhotoToServer();
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
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const changeButtonStyle = () => {
    setButtonStyle(true);
  };
  const clearAllFields = () => {
    setPhoto(null);
    setTitle("");
    setPlace("");
    setButtonStyle(false);
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <View style={styles.wrapper}>
        <Camera style={styles.camera} type={type} ref={setCamera}>
          <View style={styles.cameraInner}>
            <View style={styles.changeCamera}>
              <TouchableOpacity
                style={styles.changeCameraButton}
                onPress={toggleCameraType}
              >
                <MaterialIcons name="flip-camera-ios" size={40} color="black" />
              </TouchableOpacity>
            </View>
            {camera && (
              <View style={styles.imageWrapper}>
                <Image source={{ uri: photo }} style={styles.image} />
              </View>
            )}
            <TouchableOpacity style={styles.container} onPress={useCamera}>
              <FontAwesome name="camera" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>

        <Text style={styles.text}> Upload a photo </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          value={title}
          style={styles.input}
          placeholder="Title"
          onChangeText={titleHandler}
          onFocus={changeButtonStyle}
        />

        <TextInput
          value={place}
          style={{ ...styles.input, paddingLeft: 24 }}
          placeholder="Location"
          onChangeText={placeHandler}
          onFocus={changeButtonStyle}
        />
        <EvilIcons
          name="location"
          size={24}
          color="black"
          style={{ position: "absolute", top: 100, left: 16 }}
          onPress={() => {
            navigation.navigate("MapScreen", { longitude, latitude });
          }}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.button,
            backgroundColor: buttonStyle ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={onSubmit}
        >
          <Text
            style={{
              ...styles.buttonText,
              color: buttonStyle ? "#FFFFFF" : "#BDBDBD",
            }}
          >
            Publish
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            ...styles.buttonDel,
            backgroundColor: buttonStyle ? "#FF6C00" : "#F6F6F6",
          }}
          onPress={clearAllFields}
        >
          <AntDesign name="delete" size={24} color="black" sty />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  cameraInner: {
    height: 240,
    width: 343,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "E8E8E8",
    borderRadius: 8,
    marginHorizontal: 16,
  },
  camera: {
    marginTop: 32,
    height: 240,
    width: 327,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  container: {
    height: 60,
    width: 60,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  text: {
    alignSelf: "flex-start",
    marginHorizontal: 24,
    marginBottom: 16,
  },
  image: {
    width: 136,
    height: 120,
    borderRadius: 8,
    borderColor: "red",
  },
  imageWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 130,
    height: 120,

    borderRadius: 8,
  },
  changeCamera: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
  },
  changeCameraButton: {},
  form: {
    paddingHorizontal: 16,
    backgroundColor: "#FFF",
  },
  button: {
    borderRadius: 100,
    marginHorizontal: 16,
    marginTop: 32,
  },
  buttonText: {
    paddingTop: 16,
    paddingBottom: 16,

    fontSize: 16,
    textAlign: "center",
  },
  input: {
    paddingLeft: 5,
    marginTop: 16,
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: " #E8E8E8;",
  },
  buttonDel: {
    height: 40,
    width: 70,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 60,
  },
});
