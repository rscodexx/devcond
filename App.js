import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import {StateProvider} from "./src/contexts/StateContext";
import AuthStack from "./src/stacks/AuthStack";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default () => {
    return (
        <StateProvider>
            <NavigationContainer>
                <AuthStack />
            </NavigationContainer>
        </StateProvider>
    )
}
