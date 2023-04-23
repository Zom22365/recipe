import axios from "axios"
import { API_URL, GET_RECIPE_BY_ID, POST_RECIPE } from './constant'
import * as SecureStore from 'expo-secure-store';
import recipe from '../data/DetailRecipe'

export const getRecipeyById = async (id) => {
    console.log(API_URL + GET_RECIPE_BY_ID + "/" + id);
    token = await SecureStore.getItemAsync('accessToken') || ""
    return axios.get(
        API_URL + GET_RECIPE_BY_ID + "/" + id, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
    // return recipe;
}

export const postFoodNew = async (body) => {
    token = await SecureStore.getItemAsync('accessToken') || ""
    console.log(token)
    axios.post(API_URL + POST_RECIPE, body, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    // return fetch(
    //     API_URL + POST_RECIPE,
    //     {
    //         method: 'post',
    //         body: JSON.stringify(body),
    //         headers: {
    //             'Accept': 'application/json',
    //             'Authorization': `Bearer ${token}`
    //         },
    //     }
    // )
}