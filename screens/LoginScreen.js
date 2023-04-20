import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Platform, Button } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import axios from 'axios';
import { ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { login } from '../api/apiAuth';
import { handleResLogin } from '../api/handleResponse';


const LoginScreen = () => {

    const navigation = useNavigation();
    const [account, setAccount] = useState({
        username: "",
        password: ""
    })
    const [isLoanding, setLoanding] = useState(false);


    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const handleSubmit = async () => {
        if (account.username === "") {
            Alert.alert("Nhập tên tài khoản.")
        } else if (account.password === "") {
            Alert.alert("Nhập mật khẩu.")
        } else {
            setLoanding(true)
            await login(account)
                .then(res => {
                    setLoanding(false);
                    SecureStore.setItemAsync('accessToken', res.data.accessToken);
                    navigation.navigate('Home')
                }).catch(err => {
                    setLoanding(false);
                    alert('Đăng nhập không thành công.')
                })
        }

    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >

            <TouchableWithoutFeedback
                onPress={handleDismissKeyboard}>
                <View className="flex-1 bg-white" style={{
                    backgroundColor: themeColors.bg
                }}
                >
                    <View >
                        <View className="flex-row justify-start mt-12 mb-5">
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                                <ArrowLeftIcon size="20" color="black" />
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row justify-center  mb-2">
                            <Image source={require('../assets/images/login.png')}
                                style={{ width: 300, height: 200 }} />
                        </View>
                    </View>

                    {
                        isLoanding &&
                        <View
                            className="flex-1 bg-[#ffffffa1] justify-center"
                            style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 100 }}>
                            <ActivityIndicator size="large" color='hsl(210,95%,69%)'
                            />
                        </View>
                    }

                    <View
                        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                        className="flex-1 bg-white px-8 pt-8">
                        <View className="form space-y-2">
                            <Text className="text-gray-700 ml-4">Email hoặc tên tài khoản</Text>

                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                placeholder="john@gmail.com"
                                onChangeText={text => setAccount({ ...account, username: text })}
                            />
                            <Text className="text-gray-700 ml-4">Mật khẩu</Text>

                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                secureTextEntry
                                placeholder="........"
                                onChangeText={text => setAccount({ ...account, password: text })}

                            />
                            <TouchableOpacity className="flex items-end"
                                onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text className="text-gray-700 mb-3">Quên mật khẩu?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl"
                                onPress={handleSubmit}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">Đăng nhập</Text>
                            </TouchableOpacity>
                        </View>

                        <Text className="text-xl text-gray-700 font-bold text-center py-3">Or</Text>
                        <View className="flex-row justify-center space-x-12">
                            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                                <Image source={require('../assets/icons/google.png')} className="w-10 h-10" />
                            </TouchableOpacity>
                        </View>

                        <View className="flex-row justify-center mt-7">
                            <Text className="text-gray-500 font-semibold">
                                Bạn chưa có tài khoản?
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                                <Text className="font-semibold text-yellow-500"> Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default LoginScreen