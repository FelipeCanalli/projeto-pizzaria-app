import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: "#AB1900",
        //   },
        // }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "",
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "rgb(0,0,0)",
            headerStyle: {
              backgroundColor: "#AB1900",
              height: "3.5%",
            },
          }}
        />
      </Stack.Navigator>
      <StatusBar style="dark" animated={true} />
    </NavigationContainer>
  );
}
