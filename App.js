import React, { useState } from "react";
import { TouchableOpacity, Image, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import RouteScreen from "./app/screens/RouteScreen";

import FaultReport from "./app/screens/FaultReportScreen";
import FleetMap from "./app/screens/FleetMapScreen";
import SignInScreen from "./app/screens/signInScreen";

// const Stack = createStackNavigator();

//Screen names
const routeGuidance = "Route";
const faultReport = "Fault Report";
const fleetMap = "Fleet Map";

const Tab = createBottomTabNavigator();

const App = () => {
  const [username, setUsername] = useState();
  const [loggedIn, setLoggedIn] = useState(true);
  const [userID, setUserID] = useState(2);
  const [bike, setBike] = useState();
  const [round, setRound] = useState();

  const signIn = (username) => {
    setUsername(username);
  };

  const logOut = () => {
    Alert.alert("Logout", "Do you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => setLoggedIn(),
      },
    ]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={routeGuidance}
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 100 },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === routeGuidance) {
              iconName = focused ? "location" : "location-outline";
            } else if (rn === fleetMap) {
              iconName = focused ? "md-globe" : "md-globe-outline";
            } else if (rn === faultReport) {
              iconName = focused ? "md-construct" : "md-construct-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        {!loggedIn ? (
          <>
            <Tab.Screen
              name="Sign In"
              options={{
                headerShown: false,
                tabBarStyle: { display: "none" },
              }}
              children={() => (
                <SignInScreen
                  setUsername={setUsername}
                  signIn={signIn}
                  setLoggedIn={setLoggedIn}
                />
              )}
            />
          </>
        ) : (
          <>
            <Tab.Screen
              name={routeGuidance}
              children={() => (
                <RouteScreen
                  userID={userID}
                  bike={bike}
                  round={round}
                  setRound={setRound}
                  setBike={setBike}
                />
              )}
              options={{
                headerLeft: () => (
                  <TouchableOpacity onPress={() => logOut()}>
                    <Image
                      style={{ width: 40, height: 40, left: 20 }}
                      source={require("./app/assets/1.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ),
              }}
            />

            <Tab.Screen
              name={faultReport}
              children={() => (
                <FaultReport userID={userID} round={round} bike={bike} />
              )}
              options={{
                headerLeft: () => (
                  <TouchableOpacity onPress={() => logOut()}>
                    <Image
                      style={{ width: 40, height: 40, left: 20 }}
                      source={require("./app/assets/1.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ),
              }}
            />

            <Tab.Screen
              name={fleetMap}
              children={() => <FleetMap />}
              options={{
                headerLeft: () => (
                  <TouchableOpacity onPress={() => logOut()}>
                    <Image
                      style={{ width: 40, height: 40, left: 20 }}
                      source={require("./app/assets/1.png")}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
