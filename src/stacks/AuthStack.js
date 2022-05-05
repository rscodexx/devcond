import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import PreLoadScreen from '../screens/PreLoadScreen'
import LoginScreen from "../screens/LoginScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='PreLoadScreen'
                component={PreLoadScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='LoginScreen'
                component={LoginScreen}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}
