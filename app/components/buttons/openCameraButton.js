import { usePropsResolution } from "native-base";
import React, { useState } from "react";
import { Text, View } from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/Ionicons";

const CameraButton = (props) => {
  return (
    <TouchableOpacity onPress={() => alert("Opening camera")}>
      <View
        style={{
          backgroundColor: "#dfdfdf",
          paddingHorizontal: 15,
          paddingVertical: 10,
          borderRadius: 20,
          flexDirection: "row",
          alignItems: "center",
          //   justifyContent: "space-evenly",
        }}
      >
        <View style={{ flex: 1 }}>
          <Ionicons
            name={props.icon}
            color={props.colour}
            style={{ padding: 10, fontSize: 20 }}
          />
        </View>
        <View style={{ flex: 3 }}>
          <Text style={{ textAlign: "center" }}>{props.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CameraButton;
