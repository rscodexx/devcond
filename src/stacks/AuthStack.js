import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import PreLoadScreen from '../screens/PreLoadScreen'
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#F5F6FA',
                elevation: 0,
                shadowOpacity: 0
            }
        }}>
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
            <Stack.Screen
                name='RegisterScreen'
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}
