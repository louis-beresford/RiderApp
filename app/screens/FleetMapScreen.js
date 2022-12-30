import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import FleetMap from "../components/fleetMapPage/fleetMap";
import Ionicons from "react-native-vector-icons/Ionicons";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";

import CameraButton from "../components/buttons/openCameraButton";

const RouteScreen = (props) => {
  const [fleetInfo, setFleetInfo] = useState();
  const [bikeIndex, setBikeIndex] = useState(0);

  const getFleet = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/bikes", {
        method: "GET",
      });
      const json = await response.json();
      setFleetInfo(json);
    } catch (error) {
      console.error(error);
    }
  };

  const getBikeIndex = (id) => {
    const index = fleetInfo.findIndex((x) => x.id === id);
    console.log("id: " + id + " . Index: " + index);
    setBikeIndex(index);
    sheetRef.current.snapToIndex(0);
  };

  useEffect(() => {
    const fleet = getFleet();
    // return fleet;
  }, []);

  // Set up bottom sheet
  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["12%", "75%"], []);

  const openPhone = (phoneNumber) => {
    const str = phoneNumber.replace(/\s+/g, "");

    Linking.openURL(`tel:${str}`);
  };

  const openMessage = (phoneNumber) => {
    const str = phoneNumber.replace(/\s+/g, "");
    Linking.openURL(`sms:${str}`);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {fleetInfo ? (
          <>
            <FleetMap
              fleetInfo={fleetInfo}
              bikeIndex={bikeIndex}
              getBikeIndex={getBikeIndex}
            />
          </>
        ) : (
          <></>
        )}
      </View>

      {fleetInfo ? (
        <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={0}>
          <View style={styles.panel}>
            {/* Header for style sheet */}
            <View style={styles.intitialViewContainer}>
              <View
                style={{
                  flex: 1,

                  alignItems: "center",
                }}
              >
                <Text>{fleetInfo[bikeIndex].name} </Text>

                {fleetInfo[bikeIndex].fullname ? (
                  <>
                    <Text style={{ color: "green" }}>In use</Text>
                  </>
                ) : (
                  <>
                    <Text style={{ color: "red" }}>Unavaliable</Text>
                  </>
                )}
              </View>

              <View style={{ flex: 1, alignItems: "center" }}>
                {fleetInfo[bikeIndex].fullname ? (
                  <>
                    <Text>{fleetInfo[bikeIndex].fullname}</Text>
                    <Text style={{ color: "blue", fontWeight: "bold" }}>
                      Stop: {fleetInfo[bikeIndex].activeStop}
                    </Text>
                  </>
                ) : (
                  <>
                    <Text style={{ fontWeight: "bold" }}>NO RIDER</Text>
                  </>
                )}
              </View>

              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <TouchableOpacity
                  onPress={() => openPhone(fleetInfo[bikeIndex].phoneNumber)}
                >
                  <Ionicons name="call" style={{ fontSize: 30 }} />
                </TouchableOpacity>
              </View>
              {/* <View style={{backgroundColor: "black", padding:20}}></View> */}
            </View>
            {/* <View
            style={{
              justifyContent: "space-evenly",
              backgroundColor: "red",
              flex: 1,
            }}
          > */}
            <Text
              style={{
                fontWeight: "bold",
                color: "green",
                padding: 10,
                alignSelf: "center",
              }}
            >
              Live data
            </Text>

            <View
              style={{
                backgroundColor: "#00000040",
                borderRadius: 5,
                margin: 10,
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {fleetInfo[bikeIndex].name}
              </Text>
              <Text>
                Battery: {fleetInfo[bikeIndex].attributes.batteryLevel}%
              </Text>
              <Text>Speed: {fleetInfo[bikeIndex].speed} mph</Text>
              <Text>
                Current distance: {fleetInfo[bikeIndex].attributes.distance}KM
              </Text>

              <Text>
                Lat:{" "}
                {JSON.stringify(fleetInfo[bikeIndex].latitude).substring(0, 6)},
                Long:{" "}
                {JSON.stringify(fleetInfo[bikeIndex].longitude).substring(0, 6)}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#00000040",
                borderRadius: 5,
                margin: 10,
                padding: 10,
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Report Info</Text>
              <Text>Bike Status: {fleetInfo[bikeIndex].status}</Text>
              <Text>Unfixed Faults: {fleetInfo[bikeIndex].numOfFaults}</Text>
            </View>

            {fleetInfo[bikeIndex].fullname && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <View
                  style={{
                    backgroundColor: "#00000040",
                    borderRadius: 5,
                    margin: 10,
                    padding: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "red" }}>
                    Rider Information
                  </Text>
                  <Text>Name: {fleetInfo[bikeIndex].fullname}</Text>
                  <Text>Mobile Number: {fleetInfo[bikeIndex].phoneNumber}</Text>
                  <Text>Round Name: {fleetInfo[bikeIndex].roundName}</Text>
                  <Text>Next Stop no: {fleetInfo[bikeIndex].activeStop}</Text>
                  <Text>Total Stops: {fleetInfo[bikeIndex].numOfStops}</Text>
                </View>
                <View
                  style={{
                    // backgroundColor: "black",
                    // margin: 10,
                    padding: 10,
                    justifyContent: "space-evenly",
                    alignContent: "center",
                    flex: 1,
                    height: "100%",
                    // backgroundColor: "blue",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => openPhone(fleetInfo[bikeIndex].phoneNumber)}
                  >
                    <View
                      style={{
                        backgroundColor: "#00000040",
                        borderRadius: 5,
                        // margin: 10,
                        padding: 10,
                        paddingVertical: 22,
                        alignItems: "center",
                        width: "100%",
                        // top: 0,
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                        Phone Rider
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      openMessage(fleetInfo[bikeIndex].phoneNumber)
                    }
                  >
                    <View
                      style={{
                        backgroundColor: "#00000040",
                        borderRadius: 5,
                        // margin: 10,
                        padding: 10,
                        paddingVertical: 22,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                        Message Rider
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {/* </View> */}
          </View>
        </BottomSheet>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  intitialViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    justifyContent: "space-between",
    padding: 10,
  },
  header: {
    backgroundColor: "white",
    shadowColor: "#000000",
    paddingTop: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panel: {
    flex: 1,

    // padding: 20,
    backgroundColor: "white",
  },
});

export default RouteScreen;
