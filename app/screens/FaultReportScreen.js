import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Checkbox } from "react-native-paper";
import { round } from "react-native-reanimated";

export default function App(props) {
  console.log(props.bike + "  " + props.round);

  // Bike Picker
  const [openBike, setOpenBike] = useState(false);
  const [bikeID, setBikeID] = useState(props.bike);
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

  // Fault type
  const [openFaults, setOpenFaults] = useState(false);
  const [faultsID, setFaultsID] = useState(null);
  const [faults, setFaults] = useState([
    { value: 1, label: "Puncture" },
    { value: 2, label: "Brakes" },
    { value: 3, label: "Battery" },
  ]);

  const getFaultTypes = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/getFaultTypes", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setFaults(json);
    } catch (error) {
      console.error(error);
    }
  };

  // Causes
  const [openCauses, setOpenCauses] = useState(false);
  const [causeID, setCauseID] = useState(null);
  const [causes, setCauses] = useState([
    { value: 1, label: "Puncture" },
    { value: 2, label: "Brakes" },
    { value: 3, label: "Battery" },
  ]);

  const getCauses = async () => {
    try {
      const response = await fetch(proccess.env.FLEET_API + "/getCauses", {
        method: "GET",
      });
      const json = await response.json();
      console.log(json);
      setCauses(json);
    } catch (error) {
      console.error(error);
    }
  };

  // comment
  const [comment, setComment] = useState("");

  useEffect(() => {
    getBikes();
    getFaultTypes();
    getCauses();
  }, []);

  // Send report

  const checkFields = (type, cause, bikeID, riderID, roundID, comment) => {
    if (!!bikeID === false || !!type === false) {
      Alert.alert("Incomplete form", "Please fill in missing field", [
        {
          text: "Continue",
          style: "cancel",
        },
      ]);
    } else {
      sendReport(type, cause, bikeID, riderID, roundID, comment);
    }
  };

  const sendReport = async (type, cause, bikeID, riderID, roundID, comment) => {
    console.log(type, cause, bikeID, riderID, roundID, comment);

    try {
      url =
        proccess.env.FLEET_API +
        "/addFault?type=" +
        type +
        "&cause=" +
        cause +
        "&bikeID=" +
        bikeID +
        "&riderID=" +
        riderID +
        "&roundID=" +
        0 +
        "&comment=" +
        comment;
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        type: String(type),
      });
      const json = await response.json();
      console.log(json);
      Alert.alert("Success", "Fault recorded", [
        {
          text: "Continue",
          style: "cancel",
        },
      ]);
      setBikeID();
      setCauseID();
      setFaultsID();
      setComment("");
    } catch (error) {
      console.error(error);
    }
  };

  // Return the View
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={{ fontWeight: "bold", fontSize: 20, padding: 10 }}>
          Fill in report details
        </Text>

        {!props.bike && (
          <View style={{ zIndex: 3 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  marginLeft: 20,
                  paddingVertical: 10,
                }}
              >
                Select Bike
              </Text>

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
        )}

        <View
          style={{
            // minWidth: "100%",
            zIndex: 2,
            // flex: 1,
          }}
        >
          <Text
            style={{ fontWeight: "bold", marginLeft: 20, paddingVertical: 10 }}
          >
            Select area with an issue:
          </Text>

          <DropDownPicker
            schema={{
              label: "description",
              value: "id",
            }}
            searchable={true}
            placeholder={faultsID}
            open={openFaults}
            value={faultsID}
            items={faults}
            setOpen={setOpenFaults}
            setValue={setFaultsID}
            onChangeValue={(value) => setFaultsID(value)}
            listMode="SCROLLVIEW"
            containerStyle={{
              width: "90%",
              height: 70,
              alignSelf: "center",
              zIndex: 2,
            }}
            style={{ width: "auto" }}
            zIndex={2000}
            zIndexInverse={2000}
          />
        </View>

        {/* <View style={{ alignItems: "center", padding: 20 }}>
        <TouchableOpacity onPress={() => alert("Opening camera")}>
          <View
            style={{
              backgroundColor: "#dfdfdf",
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 20,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Ionicons
              name="camera"
              color="red"
              style={{ padding: 10, fontSize: 20, width: "auto" }}
            />
            <Text>Take Photo</Text>
          </View>
        </TouchableOpacity>
      </View> */}

        <View style={{ zIndex: 1 }}>
          <Text
            style={{ fontWeight: "bold", marginLeft: 20, paddingVertical: 10 }}
          >
            What were you doing when the problem occured?
          </Text>

          <DropDownPicker
            schema={{
              label: "description",
              value: "id",
            }}
            searchable={true}
            placeholder={causeID}
            open={openCauses}
            value={causeID}
            items={causes}
            setOpen={setOpenCauses}
            setValue={setCauseID}
            onChangeValue={(value) => setCauseID(value)}
            listMode="SCROLLVIEW"
            containerStyle={{
              width: "90%",
              height: 70,
              alignSelf: "center",
            }}
            dropDownContainerStyle={{
              height: 190,
            }}
            style={{ width: "auto" }}
          />
        </View>

        <View>
          <Text
            style={{ fontWeight: "bold", marginLeft: 20, paddingVertical: 10 }}
          >
            Additional Comments
          </Text>
          <TextInput
            value={comment}
            style={styles.textInput}
            onTextInput={(e) => setComment(e)}
          />
        </View>

        <View>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() =>
              checkFields(
                faultsID,
                causeID,
                bikeID,
                props.userID,
                props.round,
                comment
              )
            }
          >
            <View>
              <Text>Submit Report</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "space-evenly",
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
    // height:250,
  },

  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    marginHorizontal: 20,
    paddingLeft: 10,
  },
  startButton: {
    backgroundColor: "pink",
    alignSelf: "center",
    padding: 20,
    marginBottom: 250,
    borderRadius: 20,
  },
});
