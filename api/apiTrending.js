import axios from "axios"
import { API_URL, GET_RECIPE_TRENDING } from './constant'
import trending from '../data/Trendding'


export const getRecipeTrending = () => {
    // return axios.get(
    //     API_URL + GET_RECIPE_TRENDING
    // )
    return trending;
}