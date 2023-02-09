import { ImageBackground } from "react-native";

export const Background = ({ children, img, styleBtn }) => {
  return (
    <ImageBackground style={styleBtn} source={img}>
      {children}
    </ImageBackground>
  );
};
