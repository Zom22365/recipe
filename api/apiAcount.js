import axios from "axios"
import { API_URL, GET_ACCOUNT_PROFILE, POST_ACCOUNT_CHANGE_PASSWORD, POST_CLOUDING_UPLOAD_AVATAR, PUT_ACCOUNT_UPDATE_PROFILE } from './constant'
import * as SecureStore from 'expo-secure-store';

export const getProfile = async () => {
    token = await SecureStore.getItemAsync('accessToken') || ""
    return axios.get(
        API_URL + GET_ACCOUNT_PROFILE, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
}

export const upLoadAvatar = (data, accessToken) => {
    return fetch(
        API_URL + POST_CLOUDING_UPLOAD_AVATAR,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data; ',
                'Authorization': `Bearer ${accessToken}`
            },
        }
    )
}

export const upDateProfile = async (body) => {
    token = await SecureStore.getItemAsync('accessToken') || ""
    return axios.put(
        API_URL + PUT_ACCOUNT_UPDATE_PROFILE, body,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export const changePassword = (body, headers) => {
    return axios.post(
        API_URL + POST_ACCOUNT_CHANGE_PASSWORD, body,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${headers}`
            }
        }
    )
}