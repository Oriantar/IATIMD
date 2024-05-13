import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import  Weather  from "./src/weather.js";
import Home from "./src/home.js";


export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
          headerShown: false,
          }}
        />
        <Stack.Screen
          name="Weather"
          component={Weather}
          options={{
            headerShown: false,
          }}
        />
        </Stack.Navigator>
        
    </NavigationContainer>
  );
}