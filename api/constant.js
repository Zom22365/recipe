import Config from "react-native-config";

export const API_URL = "https://positum.serveo.net"


export const GET_ACCOUNT_PROFILE = "/account/profile"
export const POST_ACCOUNT_CHANGE_PASSWORD = "/account/change-password"
export const PUT_ACCOUNT_UPDATE_PROFILE = "/account/updateProfile"


export const POST_AUTH_LOGIN = "/auth/login"
export const POST_AUTH_REGISTER = "/auth/register"
export const GET_AUTH_GOOGLE = "/auth/google"
export const GET_AUTH_GOOGLE_CALLBACK = "/auth/google/callback"

export const GET_MAILER_FORGOT_PASSWORD = "/mailer/forgotPassword"

export const POST_CLOUDING_UPLOAD_AVATAR = "/clouding/upload/avatar"
export const PUT_CLOUDING_UPDATE_AVATAR = "/clouding/update/avatar"

export const GET_CATEGORIES = "/category"
export const GET_CATEGORIES_BY_ID = "/category"

export const GET_RECIPE_BY_ID = "/post/getFood"
export const POST_RECIPE = "/post/newFood"

export const GET_COMMENT_BY_POST_ID = "/comment/"
export const GET_COMMENT_BY_ID = "/"
export const POST_COMMENT = "/comment/newComment"

export const GET_RECIPE_TRENDING = "/trending/topViewFood"
export const GET_RECIPE_TRENDING_BY_LIKE = "/trending/topLikeFood"

export const GET_RECIPE_BY_KEYWORD = "/"