import axios from "axios"
import { API_URL, GET_CATEGORIES, GET_CATEGORIES_BY_ID } from './constant'
import categories from '../data/Category'
import category from '../data/DetailCategory'
import * as SecureStore from 'expo-secure-store';

export const getCategories = async () => {
    token = await SecureStore.getItemAsync('accessToken') || ""

    console.log(token)
    return axios.get(
        API_URL + GET_CATEGORIES, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
    // return categories;
}

export const getCategoryById = async (id) => {
    token = await SecureStore.getItemAsync('accessToken') || ""

    console.log(token)
    return axios.get(
        API_URL + GET_CATEGORIES_BY_ID + "/" + id, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
    return category;
}