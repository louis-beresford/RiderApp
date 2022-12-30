import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Ionicons from "react-native-vector-icons/Ionicons";
import DropDownPicker from "react-native-dropdown-picker";

const FleetMap = (props) => {
  // Bike Picker
  const [openBike, setOpenBike] = useState(false);
  const [bikeID, setBikeID] = useState(props.bikeIndex);
  const [selected, setSelected] = useState();
  const [bikes] = useState(props.fleetInfo);

  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8587761,
      longitude: 2.2362781,
    },
    {
      latitude: 48.8587751,
      longitude: 2.2169761,
    },
  ]);

  const selectBike = (id) => {
    props.getBikeIndex(id);
    setSelected(id);
  };

  const getIconColour = (bike) => {
    if (bike.fullname) {
      return "green";
    } else if (bike.status === "Unusable") {
      return "red";
    } else {
      return "grey";
    }
  };

  const getIconSize = (id) => {
    if (id == selected) {
      return 38;
    } else {
      return 24;
    }
  };

  const getFontSize = (id) => {
    if (id == selected) {
      return 30;
    } else {
      return 12;
    }
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        schema={{
          label: "name",
          value: "id",
        }}
        searchable={true}
        placeholder={bikes[props.bikeIndex].name}
        open={openBike}
        value={bikeID}
        items={bikes}
        setOpen={setOpenBike}
        setValue={setBikeID}
        onSelectItem={(item) => {
          props.getBikeIndex(item.id);
          setSelected(item.id);
        }}
        listMode="SCROLLVIEW"
        containerStyle={{
          width: "90%",
          height: 70,
          alignSelf: "center",
          paddingTop: 10,
        }}
        style={{ width: "auto" }}
      />
      <MapView
        style={styles.maps}
        initialRegion={{
          latitude: 51.509865,
          longitude: -0.118092,
          latitudeDelta: 0.1622,
          longitudeDelta: 0.2121,
        }}
      >
        {/* {console.log(props.fleetInfo)} */}
        {props.fleetInfo.map((item) => (
          <Marker
            key={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            onSelect={() => selectBike(item.id)}
            // description={item.name.toString()}
            // onclick={() => console.log(item.id)}
          >
            <View
              style={{
                // backgroundColor: "grey",
                backgroundColor: getIconColour(item),
                borderRadius: 50,
                padding: 2,
                width: getIconSize(item.id),
                height: getIconSize(item.id),
                justifyContent: "center",
                borderWidth: 1,
              }}
            >
              <Ionicons
                name="bicycle"
                style={{ alignSelf: "center", fontSize: getFontSize(item.id) }}
              />
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maps: {
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});

export default FleetMap;
