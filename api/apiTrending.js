import axios from "axios"
import { API_URL, GET_RECIPE_TRENDING, GET_RECIPE_TRENDING_BY_LIKE } from './constant'
import * as SecureStore from 'expo-secure-store';


export const getRecipeTrending = async () => {

    token = await SecureStore.getItemAsync('accessToken') || ""

    console.log(token)
    return axios.get(
        API_URL + GET_RECIPE_TRENDING, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
}

export const getRecipeTrendingByLike = async () => {

    token = await SecureStore.getItemAsync('accessToken') || ""

    console.log(token)
    return axios.get(
        API_URL + GET_RECIPE_TRENDING_BY_LIKE, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
}