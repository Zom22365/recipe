import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { themeColors } from '../theme'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../api/apiAcount';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const [initialRouteName, setInitialRouteName] = useState("Welcome")
    const isFirst = AsyncStorage.getItem('notFirst') || true;
    useEffect(() => {
        let token = ''
        async function getToken() {
            console.log("here");
            token = await SecureStore.getItemAsync('accessToken') || ""
            if (token && isFirst !== true) {
                console.log("here1");

                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
                getProfile(config).then(res =>
                    navigation.navigate("Home")
                ).catch(
                )
            } else if (token === "" && isFirst !== true) {
                console.log("here2");
                navigation.navigate("Login")
            }

        }

        getToken()

    }, [])

    const handleLogin = async () => {
        await AsyncStorage.setItem('notFirst', 'false')
        navigation.navigate('Login')
    }
    return (
        <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
            <View className="flex-1 flex justify-around mb-5 mt-10">
                <Text
                    className="text-white font-bold text-4xl text-center">
                    Let's Get Started!
                </Text>
                <View className="flex-row justify-center" >
                    <Image source={require("../assets/welcome.png")}
                        style={{ width: 350, height: 350 }} />
                </View>
                <View className="space-y-4">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        className="py-3 bg-yellow-400 mx-7 rounded-xl">
                        <Text className="text-xl font-bold text-center text-gray-700">Đăng ký</Text>
                    </TouchableOpacity>
                    <View className="flex-row justify-center">
                        <Text className="text-white font-semibold">Bạn đã có tài khoản? </Text>
                        <TouchableOpacity
                            onPress={handleLogin}>
                            <Text className="font-semibold text-yellow-400">Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default WelcomeScreen