import { login } from "./apiAuth"
import * as SecureStore from 'expo-secure-store';


export const handleResLogin = async (body) => {
    await login(body)
        .then(res => {
            SecureStore.setItemAsync('accessToken', res.data.accessToken);
        }).catch(err => {
            alert('Đăng nhập không thành công.')
        })
}