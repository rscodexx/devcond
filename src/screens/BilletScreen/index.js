import React, {useEffect, useState} from "react";
import C from './style';
import {useNavigation} from "@react-navigation/native";
import {useStateValue} from "../../contexts/StateContext";
import api from "../../services/api";
import DocItem from "../../components/DocItem";

export default () => {

    const navigation = useNavigation();
    const [context, dispatch] = useStateValue();

    const [loading, setLoading] = useState(true);
    const [billetList, setBilletList] = useState([]);

    useEffect(()=>{
        navigation.setOptions({
            headerTitle: 'Boletos'
        });

        getBillets().then();

    }, []);

    const getBillets = async () => {
        setLoading(true);

        const result = await api.getBillets();

        setLoading(false);

        if(result.error === ''){
            setBilletList(result.list)
        } else {
            alert(result.error)
        }
    }

    return (
        <C.Container>
            {!loading && billetList.length === 0 &&
                <C.NoListArea>
                    <C.NoListText>Não há boletos desta propriedade.</C.NoListText>
                </C.NoListArea>
            }
            <C.List
                data={billetList}
                onRefresh={getBillets}
                refreshing={loading}
                renderItem={({item})=><DocItem data={item} />}
                keyExtractor={(item)=>item.id.toString()}
            />
        </C.Container>
    );
}
