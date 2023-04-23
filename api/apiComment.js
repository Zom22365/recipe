import axios from "axios"
import { API_URL, GET_COMMENT_BY_POST_ID, GET_COMMENT_BY_ID } from './constant'
import comment from '../data/Comment'
import * as SecureStore from 'expo-secure-store';

export const getCommentByPostId = async (id) => {
    token = await SecureStore.getItemAsync('accessToken') || ""

    console.log(API_URL + GET_COMMENT_BY_POST_ID + id)
    return axios.get(
        API_URL + GET_COMMENT_BY_POST_ID + id
        , {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}

export const getCommentById = (id) => {
    // return axios.get(
    //     API_URL + GET_COMMENT_BY_ID,
    //  {
    //     params: {
    //         id: id
    //     }
    // }
    // )
}