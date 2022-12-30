import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { round, set } from "react-native-reanimated";
import ChoseBike from "../components/routePage/choseBike";
import DisplayRoute from "../components/routePage/displayRoute";

const RouteScreen = (props) => {
  const [newRound, setNewRound] = useState();
  const [routeCompleted, setRouteCompleted] = useState();

  const startRoute = async (round, bike, battery, bikeCondition) => {
    const url =
      proccess.env.FLEET_API +
      "/startRound?" +
      new URLSearchParams({
        roundID: round,
        bikeID: bike,
        riderID: props.userID,
        condition: bikeCondition,
        checktype: "Check_out",
      });
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const json = await response.json();
      setNewRound(round);
      props.setRound(round);
      props.setBike(bike);
    } catch (error) {
      console.error(error);
    }
  };

  const endRoute = async (bikeCondition) => {
    try {
      const response = await fetch(
        proccess.env.FLEET_API +
          "/endRound?" +
          new URLSearchParams({
            roundID: props.round,
            bikeID: props.bike,
            riderID: props.userID,
            condition: bikeCondition,
            checktype: "Check In",
          }),
        {
          method: "GET",
        }
      );
      const json = await response.json();
      props.setRound();
      props.setBike();
      setRouteCompleted(false);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(bike, round);

  return (
    <View style={styles.container}>
      {newRound && (
        <DisplayRoute
          round={newRound}
          setRouteCompleted={setRouteCompleted}
          routeCompleted={routeCompleted}
          setNewRound={setNewRound}
          bike={props.bike}
        />
      )}
      {!newRound && (
        <ChoseBike
          startRoute={startRoute}
          endRoute={endRoute}
          routeCompleted={routeCompleted}
          userID={props.userID}
        />
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
});

export default RouteScreen;
