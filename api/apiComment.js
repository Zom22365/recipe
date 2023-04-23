import axios from "axios"
import { API_URL, GET_COMMENT_BY_POST_ID, GET_COMMENT_BY_ID, POST_COMMENT } from './constant'
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

export const postComment = async (body) => {
    token = await SecureStore.getItemAsync('accessToken') || ""
    return axios.post(
        API_URL + POST_COMMENT, body,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
}