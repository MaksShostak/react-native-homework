import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useEffect, useState } from "react";

export const MapScreen = ({ route }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    if (route.params) {
      setLatitude(Number(route.params.latitude));
      setLongitude(Number(route.params.latitude));
    }
  }, [route.params]);

  return (
    latitude && (
      <View style={styles.wrapper}>
        <MapView
          style={styles.mapStyle}
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType="standard"
          minZoomLevel={15}
          onMapReady={() => console.log("Map is ready")}
        >
          <Marker
            title="travel photo"
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
            description="the photo was taken here"
          />
        </MapView>
      </View>
    )
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
