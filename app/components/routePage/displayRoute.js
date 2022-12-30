import React, { useCallback, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Alert, Linking } from "react-native";
// import BottomSheet from "reanimated-bottom-sheet";
import BottomSheet, {
  BottomSheetFlatList,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import RouteMap from "./routingMap";
import { createOpenLink } from "react-native-open-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import FufilOrderButton from "../buttons/fufilOrderButton";
import { combineTransition } from "react-native-reanimated";

const DisplayRoute = (props) => {
  const [routeData, setRouteData] = useState();
  const [roundNumber, setRoundNumber] = useState(1);
  const [totalStops, setTotalStops] = useState(0);
  const [stopInfo, setStopInfo] = useState();
  const [compeletedStops, setCompletedStops] = useState(0);
  const [distance, setDistance] = useState();
  const [time, setTime] = useState();
  const [hub, setHub] = useState(false);

  // get Round Data

  const getRound = async () => {
    const url = proccess.env.FLEET_API + "getRound?id=" + String(props.round);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      setRouteData(json);
      setTotalStops(json.length);
      setStopInfo(json.find((x) => x.stopNo == 1));
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    RoundData = getRound();
  }, []);

  // const totalStops = routeData.length;
  const i = { i: 0 };

  const nextStop = (stopNo, stopType) => {
    console.log(stopType);
    setCompletedStops(compeletedStops + 1);
    id = routeData.find((x) => x.stopNo == roundNumber).id;
    updateStop(id, stopType);
    if (roundNumber == totalStops) {
      sheetRef.current.snapToIndex(0);
      Alert.alert("Round completed", "Make sure you attempted every delivery", [
        {
          text: "Go to hub",
          onPress: () => goHub(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Continue Rounds"),
          style: "cancel",
        },
      ]);
    } else {
      // setRoundNumber(roundNumber + 1);
      setStopInfo(routeData.find((x) => x.stopNo == roundNumber + 1));
      setRoundNumber(roundNumber + 1);
      sheetRef.current.snapToIndex(0);
    }
  };

  const updateStop = async (id, type) => {
    console.log(id, type);
    const url =
      proccess.env.FLEET_API + "/updateStop?id=" + id + "&status=" + type;
    try {
      const response = await fetch(url, {
        method: "GET",
        id: String(id),
        status: String(type),
      });
      const json = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const goHub = () => {
    setHub(true);
    props.setRouteCompleted(true);
    setStopInfo({
      latitude: 51.52938095269291,
      longitude: -0.07681549074657586,
      stopNo: "Hub",
    });
  };

  const flatListRef = React.useRef(null);

  // Set up bottom sheet
  const sheetRef = React.useRef(null);
  const snapPoints = React.useMemo(() => ["12%", "75%"], []);

  const [showNextStop, setShowNextStop] = useState(true);

  const changeBottomSheetView = async () => {
    await sheetRef.current?.forceClose();
    setShowNextStop(!showNextStop);
    // await delay(1000);
    sheetRef.current.snapToIndex(0);
  };

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // scrolll to place in list on click on stop number
  const scrollToStop = async (index) => {
    await sheetRef.current?.expand();
    await delay(500);
    flatListRef.current?.scrollToIndex({ index: index - 1, animated: true });
  };

  // change to selected stop
  const selectStop = async (id) => {
    await sheetRef.current?.forceClose();
    setShowNextStop(showNextStop);
    sheetRef.current.snapToIndex(0);
    setRoundNumber(id);
    setStopInfo(routeData.find((x) => x.stopNo == id));
    setHub(false);
  };

  const renderStopPanel = useCallback(
    ({ item }) => (
      <TouchableOpacity onPress={() => selectStop(item.stopNo)}>
        <View
          style={{
            backgroundColor: "#00000040",
            borderRadius: 5,
            margin: 10,
            padding: 10,
          }}
        >
          <Text style={{ fontWeight: "bold" }}>Stop Number {item.stopNo}</Text>
          <Text>{item.clientName}</Text>
          <Text style={{ fontSize: 10 }}>{item.firstLine}</Text>
          <Text style={{ fontSize: 10 }}>{item.secondLine}</Text>
          <Text>Parcel ID : {item.id}</Text>
          <Text style={{ fontSize: 10, color: "grey" }}>{item.postcode}</Text>
          <Text>Time Slot: {item.timeSlot}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              // alignItems: "flex-start",
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 10, color: "grey", marginRight: "auto" }}>
              {item.Client}
            </Text>
            <Text style={{ fontSize: 10, color: "grey" }}>
              Drop id: {item.id}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ),
    []
  );

  // open native maps app

  const openMaps = (lat, lng) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = `${lat},${lng}`;
    const label = "Stop No. " + stopInfo.stopNo;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, zIndex: -1 }}>
        {stopInfo && (
          <RouteMap
            stopInfo={stopInfo}
            showNextStop={showNextStop}
            round={routeData}
            scrollToStop={scrollToStop}
            showsMyLocationButton={true}
            setDistance={setDistance}
            setTime={setTime}
            bike={props.bike}
          />
        )}

        {/* Map buttons ------------------------------------------------------------- */}

        <View
          style={{
            backgroundColor: "white",
            margin: 5,
            position: "absolute", //use absolute position to show button on top of the map
            top: "2%",
            alignSelf: "flex-end", //for align to right
            borderRadius: 10,
            right: 2,
          }}
        >
          <TouchableOpacity onPress={() => changeBottomSheetView()}>
            <Ionicons
              name="list"
              color="grey"
              style={{ fontSize: 26, padding: 5 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom sheet ------------------------------------------------------------- */}

      {showNextStop && stopInfo ? (
        <>
          <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={0}>
            <View style={styles.panel}>
              {/* Header for style sheet */}
              <View style={styles.intitialViewContainer}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Fufilled</Text>
                  <Text>
                    {compeletedStops}/{totalStops}
                  </Text>
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Current</Text>
                  <Text>{stopInfo.stopNo}</Text>
                </View>

                <View style={{ flex: 1, alignItems: "center" }}>
                  <TouchableOpacity
                    onPress={() =>
                      openMaps(stopInfo.latitude, stopInfo.longitude)
                    }
                  >
                    <Ionicons
                      name="map-outline"
                      color="red"
                      style={{ paddingVertical: 10, fontSize: 26 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {hub && (
                <TouchableOpacity onPress={() => props.setNewRound(false)}>
                  <View
                    style={{
                      backgroundColor: "#00000040",
                      paddingHorizontal: 15,
                      paddingVertical: 10,
                      borderRadius: 20,
                      alignItems: "center",
                      alignSelf: "center",
                      top: 30,
                      height: "80%",
                      width: "90%",
                      justifyContent: "centre",
                      alignContent: "centre",
                      // alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        top: 90,
                        fontSize: "30",
                        fontWeight: "bold",
                      }}
                    >
                      Finish Round
                    </Text>
                  </View>
                </TouchableOpacity>
              )}

              {!hub && (
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                  <View
                    style={{
                      backgroundColor: "#00000040",
                      borderRadius: 5,
                      marginHorizontal: 10,
                      marginVertical: 10,
                      padding: 10,
                      flex: 3,
                      justifyContent: "space-around",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        textDecorationLine: "underline",
                      }}
                    >
                      Stop Number {stopInfo.stopNo}
                    </Text>
                    <Text>{stopInfo.clientName}</Text>
                    <Text>{stopInfo.clientNumber}</Text>
                    <Text style={{ fontSize: 10 }}>{stopInfo.firstLine}</Text>
                    <Text style={{ fontSize: 10 }}>{stopInfo.secondLine}</Text>
                    <Text>Parcel ID : {stopInfo.id}</Text>
                    <Text style={{ fontSize: 10, color: "grey" }}>
                      {stopInfo.postcode}
                    </Text>
                    <Text>Time Slot: {stopInfo.timeSlot}</Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "grey",
                          marginRight: "auto",
                        }}
                      >
                        {stopInfo.Client}
                      </Text>
                      <Text style={{ fontSize: 10, color: "grey" }}>
                        Drop id: {stopInfo.id}
                      </Text>
                    </View>
                  </View>

                  {distance && time && (
                    <View
                      style={{
                        backgroundColor: "#00000040",
                        borderRadius: 5,
                        marginHorizontal: 10,
                        // marginVertical: 20,
                        padding: 10,
                        flex: 1,
                        justifyContent: "space-around",
                      }}
                    >
                      <Text style={{}}>
                        Distance: {JSON.stringify(distance).substring(0, 3)} KM
                      </Text>

                      <Text style={{}}>
                        Time: {JSON.stringify(time).substring(0, 2)} mins
                      </Text>
                    </View>
                  )}

                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ flex: 1, padding: 10 }}>
                        <FufilOrderButton
                          func={nextStop}
                          stopNo={stopInfo.stopNo}
                          stopType={1}
                          description={"Successful"}
                          icon={"checkmark"}
                          colour={"green"}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 10 }}>
                        <FufilOrderButton
                          func={nextStop}
                          stopNo={stopInfo.stopNo}
                          stopType={1}
                          description={"Safe Place"}
                          icon={"lock-closed"}
                          colour={"green"}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <View style={{ flex: 1, padding: 10 }}>
                        <FufilOrderButton
                          func={nextStop}
                          stopNo={stopInfo.stopNo}
                          stopType={1}
                          description={"With Neighbour"}
                          icon={"person-add"}
                          colour={"green"}
                        />
                      </View>
                      <View style={{ flex: 1, padding: 10 }}>
                        <FufilOrderButton
                          func={nextStop}
                          stopNo={stopInfo.stopNo}
                          stopType={0}
                          description={"Unsuccessful"}
                          icon={"close"}
                          colour={"red"}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          </BottomSheet>
        </>
      ) : (
        <>
          {stopInfo && (
            <>
              <BottomSheet ref={sheetRef} snapPoints={snapPoints} index={0}>
                <View style={styles.panel}>
                  {/* Header for style sheet */}
                  <View style={styles.intitialViewContainer}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>
                        Current Stop Selected
                      </Text>
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
                    </View>
                  </View>
                  <BottomSheetFlatList
                    ref={flatListRef}
                    data={routeData}
                    renderItem={renderStopPanel}
                  ></BottomSheetFlatList>
                </View>
              </BottomSheet>
            </>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  intitialViewContainer: {
    flexDirection: "row",
    width: "100%",

    // alignSelf: "stretch",
    // alignItems: "center",
    // alignContent: "space-between",
    justifyContent: "space-evenly",
    paddingBottom: 10,
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
    height: "100%",

    backgroundColor: "white",
  },
});

export default DisplayRoute;
