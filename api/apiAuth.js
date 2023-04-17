import axios from "axios"
import { API_URL, POST_AUTH_LOGIN, GET_AUTH_GOOGLE, GET_AUTH_GOOGLE_CALLBACK, POST_AUTH_REGISTER } from './constant'

export const login = (body) => {
    return axios.post(
        "https://sequor.serveo.net" + POST_AUTH_LOGIN, body
    )
}