import React, {useEffect, useState} from "react";
import C from './style';
import {useNavigation} from "@react-navigation/native";
import {useStateValue} from "../../contexts/StateContext";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);

    return (
        <C.Container>
            <C.Scroller>
                {loading &&
                    <C.LoadingIcon color='#8863E6' size='large'/>
                }
            </C.Scroller>
        </C.Container>
    );
}
