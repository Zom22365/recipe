import axios from "axios"
import { API_URL, GET_RECIPE_BY_KEYWORD } from './constant'
import trending from '../data/Trendding'


export const getRecipeByKeyWord = (keyword) => {
    return axios.get(
        API_URL + GET_RECIPE_BY_KEYWORD,
        {
            params: {
                keyword: keyword
            }
        }
    )
    // return trending;
}