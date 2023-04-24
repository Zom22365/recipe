import axios from "axios"
import { API_URL, GET_RECIPE_BY_ID, POST_RECIPE, POST_CLOUDING_POST, GET_POST_CATEGORY, DELETE_POST, PUT_RECIPE } from './constant'
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
}

export const postFoodNew = async (body) => {
    token = await SecureStore.getItemAsync('accessToken') || ""
    axios.post(API_URL + POST_RECIPE, body, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }
    )
}


export const updateFood = async (body) => {
    // token = await SecureStore.getItemAsync('accessToken') || ""
    axios.post(API_URL + PUT_RECIPE, body)
}


export const deleteFood = async (id) => {
    // token = await SecureStore.getItemAsync('accessToken') || ""
    axios.delete(API_URL + DELETE_POST + id)
}

export const upLoadPostImg = async (data) => {
    token = await SecureStore.getItemAsync('accessToken') || ""

    return fetch(
        API_URL + POST_CLOUDING_POST,
        {
            method: 'post',
            body: data,
            headers: {
                'Content-Type': 'multipart/form-data; ',
                'Authorization': `Bearer ${token}`
            },
        }
    )
}

export const getRecipeis = async (id) => {
    console.log(API_URL + GET_POST_CATEGORY + "/" + id);
    return axios.get(
        API_URL + GET_POST_CATEGORY + "/" + id
    )
}