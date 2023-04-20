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
import { changePassword } from '../api/apiAcount';


const ChangePassword = () => {

    const navigation = useNavigation();
    const [account, setAccount] = useState({
        passwordold: "",
        passwordnew: "",
        confirmpasswordnew: ""
    })
    const [isLoanding, setLoanding] = useState(false);


    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    async function getToken() {
        accessToken = await SecureStore.getItemAsync('accessToken')
        if (accessToken) {
            return accessToken
        }

    }

    const handleSubmit = async () => {
        Keyboard.dismiss()
        if (account.passwordold === "") {
            Alert.alert("Nhập mật khẩu cũ.")
        } else if (account.passwordnew === "") {
            Alert.alert("Nhập mật khẩu mới.")
        } else if (account.confirmpasswordnew === "") {
            Alert.alert("Mật khẩu mới không khớp.")
        } else {
            setLoanding(true)
            const body = {
                "oldPassword": account.passwordold,
                "newPasswrod": account.passwordnew
            }
            const accessToken = await getToken();
            await changePassword(body, accessToken).then(res => {
                setLoanding(false);
                alert('Đổi mật khẩu thành công.')

            }).catch(err => {
                console.log(accessToken);
                setLoanding(false);
                alert('Đổi mật khẩu không thành công.')

            })

        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
            className="flex-1 bg-white"
        >

            <TouchableWithoutFeedback
                onPress={handleDismissKeyboard}>
                <View className="flex-1 bg-white" style={{
                    backgroundColor: themeColors.bg
                }}
                >
                    <View className="flex-row justify-start mt-12 mb-5">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
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
                            <Text className="text-gray-700 ml-4">Mật khẩu cũ</Text>

                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                secureTextEntry
                                placeholder="........"
                                onChangeText={text => setAccount({ ...account, passwordold: text })}
                            />
                            <Text className="text-gray-700 ml-4">Mật khẩu mới</Text>

                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                secureTextEntry
                                placeholder="........"
                                onChangeText={text => setAccount({ ...account, passwordnew: text })}

                            />

                            <Text className="text-gray-700 ml-4">Nhập lại mật khẩu mới</Text>

                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                                secureTextEntry
                                placeholder="........"
                                onChangeText={text => setAccount({ ...account, confirmpasswordnew: text })}

                            />

                            <TouchableOpacity className=" py-3 bg-yellow-400 rounded-xl"
                                onPress={handleSubmit}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">Đổi mật khẩu</Text>
                            </TouchableOpacity>

                            <TouchableOpacity className="flex items-start"
                                onPress={() => navigation.navigate('ForgotPassword')}>
                                <Text className="text-yellow-400 my-3">Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View >
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default ChangePassword