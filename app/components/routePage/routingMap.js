import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions, Button, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import Ionicons from "react-native-vector-icons/Ionicons";

const RouteMap = ({
  stopInfo,
  showNextStop,
  round,
  scrollToStop,
  setDistance,
  setTime,
  bike,
}) => {
  const [hubCoords] = useState({
    latitude: 51.52938095269291,
    longitude: -0.07681549074657586,
  });

  const [delCoords, setDelCoords] = useState({
    latitude: stopInfo.latitude,
    longitude: stopInfo.longitude,
  });

  useEffect(() => {
    setDelCoords({
      latitude: stopInfo.latitude,
      longitude: stopInfo.longitude,
    });
  }, [stopInfo.latitude, stopInfo.longitude]);

  const [user, setUser] = useState(bike);

  const getUserLocation = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/bikes", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setUser(json.find((x) => x.bikeID === bike));
      console.log(json.find((x) => x.bikeID === bike));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: hubCoords.latitude,
          longitude: hubCoords.longitude,
          latitudeDelta: 0.1622,
          longitudeDelta: 0.1121,
        }}
      >
        <Marker coordinate={hubCoords}>
          <View
            style={{
              backgroundColor: "grey",
              borderRadius: 12,
              padding: 2,
              width: 24,
              height: 24,
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",

              borderWidth: 1,
            }}
          >
            <Text style={{ left: 2, fontSize: 8 }}>Hub</Text>
          </View>
        </Marker>

        <Marker
          coordinate={{
            latitude: user.latitude,
            longitude: user.longitude,
          }}
        >
          <View
            style={{
              backgroundColor: "grey",
              borderRadius: 12,
              padding: 2,
              width: 24,
              height: 24,
              justifyContent: "center",
              borderWidth: 1,
            }}
          >
            <Ionicons
              name="person-outline"
              color="black"
              style={{ alignSelf: "center" }}
            />
          </View>
        </Marker>

        {showNextStop ? (
          <>
            <Marker coordinate={delCoords}>
              <View
                style={{
                  backgroundColor: "grey",
                  borderRadius: 12,
                  padding: 2,
                  width: 24,
                  height: 24,
                  justifyContent: "center",
                  borderWidth: 1,
                }}
              >
                <Text style={{ textAlign: "center", fontSize: 10 }}>
                  {stopInfo.stopNo}
                </Text>
              </View>
            </Marker>
            <MapViewDirections
              origin={{
                latitude: user.latitude,
                longitude: user.longitude,
              }}
              destination={delCoords}
              apikey="AIzaSyBKHuCXHkf57iN31VnYQSxIf4iJQejk9sc" // insert your API Key here
              strokeWidth={4}
              strokeColor="red"
              onReady={(result) => {
                setDistance(result.distance);
                setTime(result.duration);
                console.log(result.distance);
                console.log(result.duration);
              }}
            />
          </>
        ) : (
          <>
            {round.map((item, i) => (
              <Marker
                key={i}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
                onSelect={() => scrollToStop(item.stopNo)}
              >
                <View
                  style={{
                    backgroundColor: "grey",
                    borderRadius: 12,
                    padding: 2,
                    width: 24,
                    height: 24,
                    justifyContent: "center",
                    borderWidth: 1,
                  }}
                >
                  <Text style={{ textAlign: "center", fontSize: 10 }}>
                    {item.stopNo}
                  </Text>
                </View>
              </Marker>
            ))}
          </>
        )}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});

export default RouteMap;
