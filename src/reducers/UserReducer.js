import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    token: '',
    user: {},
    property: {}
}

export default (state = initialState, action = {}) => {

    switch (action.type){
        case 'setToken':
            AsyncStorage.setItem('token', action.payload.token).then()
            return {...state, token: action.payload.token}

        case 'setUser':
            return {...state, user: action.payload.user}

        case 'setProperty':
            return {...state, property: action.payload.property}
    }

    return state;
}
