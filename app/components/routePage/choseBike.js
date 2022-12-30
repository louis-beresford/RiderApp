import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

import QrCamera from "./qrCodeScanner";

export default function App(props) {
  const [qrCamera, setQrCamera] = useState(false);
  // const [bikeID, setBikeID] = useState();

  // Bike Picker
  const [openBike, setOpenBike] = useState(false);
  const [bikeID, setBikeID] = useState(null);
  const [bikes, setBikes] = useState([
    { value: 1, label: "LDN - Arrow - 06" },
    { value: 2, label: "LDN - Arrow - 07" },
    { value: 3, label: "CAM - Kelly" },
  ]);

  const getBikes = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/freeBikes", {
        method: "GET",
      });
      const json = await response.json();
      setBikes(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Battery Picker
  const [openBattery, setOpenBattery] = useState(false);
  const [batteryID, setBatteryID] = useState(null);
  const [batterys, setBatterys] = useState([
    { value: 1, label: "Battery 1" },
    { value: 2, label: "Battery 2" },
  ]);

  // Round Picker
  const [openRound, setOpenRound] = useState(false);
  const [roundID, setRoundID] = useState(null);
  const [rounds, setRounds] = useState([
    { label: "32192", value: "32192" },
    { label: "32193", value: "32193" },
    { label: "32194", value: "32194" },
    { label: "32195", value: "32195" },
    { label: "32196", value: "32196" },
  ]);

  const getRounds = async () => {
    try {
      const response = await fetch(
        proccess.env.FLEET_API + "/getRounds?riderID=" + props.userID,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setRounds(json);
    } catch (error) {
      console.error(error);
    }
  };

  //  Pre checks
  const [typePressue, setTypePressure] = useState(false);
  const [brakes, setBrakes] = useState(false);
  const [toolKit, setToolKit] = useState(false);
  const [chainTension, setChainTension] = useState(false);
  const [lights, setLights] = useState(false);

  // Bike condition

  const [openCondition, setOpenCondition] = useState(false);
  const [conditionID, setConditionID] = useState(null);
  const [conditions, setConditons] = useState([
    { label: "Road worthy", value: 0 },
    { label: "Usable but issue to report", value: 1 },
    { label: "Bike not useable", value: 2 },
  ]);

  const getCondition = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/bikeStatus", {
        method: "GET",
      });
      const json = await response.json();
      setConditons(json);
    } catch (error) {
      console.error(error);
    }
  };

  // const [text, onChangeText] = React.useState("Useless Text");

  const closeCamera = (name) => {
    setQrCamera(false);
    if (name) {
      setBikeID(name);
    }
  };

  const openCamera = () => {
    setQrCamera(true);
  };

  useEffect(() => {
    getRounds();
    getBikes();
    getCondition();
  }, []);

  // Check fields are completed

  const checkFieldsStart = async (
    roundID,
    bikeID,
    conditionID,
    typePressue,
    brakes,
    toolKit,
    chainTension,
    lights
  ) => {
    if (!!roundID === false || !!conditionID === false) {
      Alert.alert("Incomplete form", "Please fill in missing fields", [
        {
          text: "Continue",
          style: "cancel",
        },
      ]);
    } else {
      props.startRoute(roundID, bikeID, batteryID, conditionID);
    }
  };

  const checkFieldsEnd = async (
    conditionID,
    typePressue,
    brakes,
    toolKit,
    chainTension,
    lights
  ) => {
    if (!!conditionID === false || !!brakes === false) {
      Alert.alert("Incomplete form", "Please fill in missing fields", [
        {
          text: "Continue",
          style: "cancel",
        },
      ]);
    } else {
      setBrakes(false);
      setTypePressure(false);
      setToolKit(false);
      setChainTension(false);
      setLights(false);
      setConditionID();
      getRounds();
      getBikes();
      getCondition();
      props.endRoute(conditionID);
    }
  };

  // Return the View
  return (
    <View style={styles.container}>
      {/* <View> */}
      <Modal animationType="slide" transparent={true} visible={qrCamera}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Scan QR code</Text>

            <QrCamera closeCamera={closeCamera} setBikeID={setBikeID} />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeCamera()}
            >
              <Text style={styles.textStyle}>Close Camera</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <ScrollView>
        {!props.routeCompleted ? (
          <>
            <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
              Fill in all details to check out bike
            </Text>
          </>
        ) : (
          <>
            <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
              Fill in all details to check In bike
            </Text>
          </>
        )}

        {!props.routeCompleted && (
          <>
            <View style={{ flexDirection: "row", zIndex: 3 }}>
              <View
                style={{
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Select Bike</Text>

                  <TouchableOpacity onPress={() => openCamera(true)}>
                    <Ionicons
                      name="camera"
                      color="red"
                      style={{ padding: 10, fontSize: 20, width: "auto" }}
                    />
                  </TouchableOpacity>
                </View>

                <DropDownPicker
                  schema={{
                    label: "bikeName",
                    value: "id",
                  }}
                  searchable={true}
                  placeholder={bikeID}
                  open={openBike}
                  value={bikeID}
                  items={bikes}
                  setOpen={setOpenBike}
                  setValue={setBikeID}
                  listMode="SCROLLVIEW"
                  containerStyle={{
                    width: "90%",
                    height: 70,
                    alignSelf: "center",
                  }}
                  style={{ width: "auto" }}
                />
              </View>
            </View>

            <View
              style={{
                zIndex: 2,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 20,
                  paddingVertical: 10,
                }}
              >
                Select Round
              </Text>

              <DropDownPicker
                searchable={false}
                schema={{ label: "roundName", value: "id" }}
                placeholder={roundID}
                open={openRound}
                value={roundID}
                items={rounds}
                setOpen={setOpenRound}
                setValue={setRoundID}
                listMode="SCROLLVIEW"
                containerStyle={{
                  width: "90%",
                  height: 70,
                  alignSelf: "center",
                }}
                style={{ width: "auto" }}
              />
            </View>
            {/* </View> */}
          </>
        )}

        <View style={{ zIndex: 1 }}>
          <Text style={{ padding: 20, fontWeight: "bold" }}>
            Have you checked
          </Text>

          <TouchableOpacity
            onPress={() => {
              setTypePressure(!typePressue);
            }}
          >
            <View style={styles.checkBoxItemContainer}>
              <Checkbox.Android
                status={typePressue ? "checked" : "unchecked"}
              />
              <Text style={styles.checkBoxItemText}>Tyre Presure</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setBrakes(!brakes);
            }}
          >
            <View style={styles.checkBoxItemContainer}>
              <Checkbox.Android status={brakes ? "checked" : "unchecked"} />
              <Text style={styles.checkBoxItemText}>Brakes</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setToolKit(!toolKit);
            }}
          >
            <View style={styles.checkBoxItemContainer}>
              <Checkbox.Android status={toolKit ? "checked" : "unchecked"} />
              <Text style={styles.checkBoxItemText}>Tool Kit</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setChainTension(!chainTension);
            }}
          >
            <View style={styles.checkBoxItemContainer}>
              <Checkbox.Android
                status={chainTension ? "checked" : "unchecked"}
              />
              <Text style={styles.checkBoxItemText}>Chain Tension</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setLights(!lights);
            }}
          >
            <View style={styles.checkBoxItemContainer}>
              <Checkbox.Android status={lights ? "checked" : "unchecked"} />
              <Text style={styles.checkBoxItemText}>Lights</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={{ paddingVertical: 10, zIndex: 2 }}>
          <Text style={{ padding: 20, fontWeight: "bold" }}>
            Bike condition
          </Text>

          <DropDownPicker
            searchable={false}
            schema={{
              label: "description",
              value: "id",
            }}
            placeholder={conditionID}
            open={openCondition}
            value={conditionID}
            items={conditions}
            setOpen={setOpenCondition}
            setValue={setConditionID}
            listMode="SCROLLVIEW"
            dropDownDirection="BOTTOM"
            containerStyle={{
              width: "90%",
              height: 70,
              alignSelf: "center",
              // marginBottom: 30,
            }}
            style={{ width: "auto" }}
          />
        </View>

        {!props.routeCompleted ? (
          <View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() =>
                checkFieldsStart(
                  roundID,
                  bikeID,
                  conditionID,
                  typePressue,
                  brakes,
                  toolKit,
                  chainTension,
                  lights
                )
              }
            >
              <View>
                <Text>Start Round</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() =>
                checkFieldsEnd(
                  conditionID,
                  typePressue,
                  brakes,
                  toolKit,
                  chainTension,
                  lights
                )
              }
            >
              <View>
                <Text>Submit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      {/* </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: "center",
    justifyContent: "space-around",
  },
  checkBoxItemContainer: {
    alignSelf: "center",
    width: "80%",
    backgroundColor: "#FAF7F6",
    borderRadius: 20,
    padding: 5,
    marginBottom: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  checkBoxItemText: {
    marginLeft: 10,
  },
  conditionCheckBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    padding: 10,
  },
  conditionCheckBoxItem: {
    alignItems: "center",
  },
  conditionCheckBoxItemText: {},
  roundText: {
    alignSelf: "flex-start",
    // margin: 20,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  pickerView: {
    padding: 30,
  },
  startButton: {
    backgroundColor: "pink",
    alignSelf: "center",
    padding: 20,
    marginBottom: 50,
    borderRadius: 20,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
