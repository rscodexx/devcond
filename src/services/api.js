import AsyncStorage from "@react-native-async-storage/async-storage";

const baseUrl = 'https://api.b7web.com.br/devcond/api';

const request = async (method, endpoint, params, token = null) => {

    method = method.toLowerCase();

    let fullUrl = `${baseUrl}${endpoint}`

    let body = null;

    switch (method){
        case 'get':
            let queryString = new URLSearchParams(params).toString();
            fullUrl += `?${queryString}`
        break;

        case 'post':
        case 'put':
        case 'delete':
            body = JSON.stringify(params);
        break;
    }

    let headers = {'Content-Type': 'application/json'};

    if(token){
        headers.Authorization = `Bearer ${token}`
    }

    let req = await fetch(fullUrl, { method, headers, body });

    return await req.json();
}

export default {

    getToken: async () => {
        return await AsyncStorage.getItem('token');
    },
    validateToken: async () => {
        let token = await AsyncStorage.getItem('token');
        return await request('post', '/auth/validate', {}, token);
    },
    login: async (cpf, password) => {
        return await request('post', '/auth/login', {cpf, password});
    },
    logout: async () => {
        let token = await AsyncStorage.getItem('token');
        let json = await request('post', '/auth/logout', {}, token);
        await AsyncStorage.removeItem('token');
        await AsyncStorage.removeItem('property');
        return json;
    },
    register: async (name, email, cpf, password, password_confirm) => {
        return await request('post', '/auth/register', {
            name, email, cpf, password, password_confirm
        })
    },
    getWall: async () => {
        let token = await AsyncStorage.getItem('token');
        return await request('get', '/walls', {}, token)
    },
    likeWallPost: async (id) => {
        let token = await AsyncStorage.getItem('token');
        return await request('post', `/wall/${id}/like`, {}, token);
    },
    getDocs: async () => {
        let token = await AsyncStorage.getItem('token');
        return await request('get', '/docs', {}, token)
    },
    getBillets: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        return await request('get', '/billets', {
            property: property.id
        }, token)
    },
    getWarnings: async () => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        return await request('get', '/warnings', {
            property: property.id
        }, token)
    },
    addWarningFile: async (file) => {
        let token = await AsyncStorage.getItem('token');
        let formData = new FormData();
        formData.append('photo', {
            uri: file.assets[0].uri,
            type: file.assets[0].type,
            name: file.assets[0].fileName
        });
        let req = await fetch(`${baseUrl}/warning/file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        return await req.json();
    },
    addWarning: async (title, list) => {
        let token = await AsyncStorage.getItem('token');
        let property = await AsyncStorage.getItem('property');
        property = JSON.parse(property);
        return await request('post', '/warning', {
            title,
            list,
            property: property.id
        }, token)
    },

};
