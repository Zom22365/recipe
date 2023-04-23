import axios from "axios"
import { API_URL, GET_RECIPE_BY_ID } from './constant'
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