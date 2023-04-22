import axios from "axios"
import { API_URL, GET_CATEGORIES, GET_CATEGORIES_BY_ID } from './constant'
import categories from '../data/Category'
import category from '../data/DetailCategory'

export const getCategories = () => {
    // return axios.get(
    //     API_URL + GET_CATEGORIES
    // )
    return categories;
}

export const getCategoryById = (id) => {
    // return axios.get(
    //     API_URL + GET_CATEGORIES_BY_ID,
    //  {
    //     params: {
    //         id: id
    //     }
    // }
    // )
    return category;
}