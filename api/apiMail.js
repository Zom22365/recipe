import axios from "axios"
import { API_URL, GET_MAILER_FORGOT_PASSWORD } from './constant'

export const forgotPassword = (mail) => {
    return axios.get(
        API_URL + GET_MAILER_FORGOT_PASSWORD + "/" + mail
    )
}
