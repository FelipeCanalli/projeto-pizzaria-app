import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/HomeScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        // screenOptions={{
        //   headerStyle: {
        //     backgroundColor: "#4b4b4b",
        //   },
        // }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Pizzaria Romero",
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "rgb(0,0,0)",
            headerStyle: { backgroundColor: "rgb(255,255,255)" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
