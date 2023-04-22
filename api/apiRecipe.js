import axios from "axios"
import { API_URL, GET_RECIPE_BY_ID } from './constant'
import recipe from '../data/DetailRecipe'

export const getRecipeyById = (id) => {
    // return axios.get(
    //     API_URL + GET_RECIPE_BY_ID,
    //  {
    //     params: {
    //         id: id
    //     }
    // }
    // )
    return recipe;
}