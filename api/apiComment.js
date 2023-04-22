import axios from "axios"
import { API_URL, GET_COMMENT_BY_POST_ID, GET_COMMENT_BY_ID } from './constant'
import comment from '../data/Comment'

export const getCommentByPostId = (id) => {
    // return axios.get(
    //     API_URL + GET_COMMENT_BY_POST_ID,
    //  {
    //     params: {
    //         id: id
    //     }
    // }
    // )
    return comment;
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