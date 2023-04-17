import axios from "axios"
import { API_URL, GET_ACCOUNT_PROFILE, POST_ACCOUNT_CHANGE_PASSWORD, PUT_ACCOUNT_UPDATE_PROFILE } from './constant'

export const getProfile = (headers) => {
    return axios.get(
        "https://sequor.serveo.net" + GET_ACCOUNT_PROFILE, headers
    )
}