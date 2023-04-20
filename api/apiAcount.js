import axios from "axios"
import { API_URL, GET_ACCOUNT_PROFILE, POST_ACCOUNT_CHANGE_PASSWORD, POST_CLOUDING_UPLOAD_AVATAR, PUT_ACCOUNT_UPDATE_PROFILE } from './constant'

export const getProfile = (headers) => {
    return axios.get(
        API_URL + GET_ACCOUNT_PROFILE, headers
    )
}

export const upLoadAvatar = (data, accessToken) => {
    return fetch(
        API_URL + POST_CLOUDING_UPLOAD_AVATAR,
        {
            method: 'post',
            body: data,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data; ',
                'Authorization': `Bearer ${accessToken}`
            },
        }
    )
}

export const upDateProfile = (data, accessToken) => {
    return ""
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