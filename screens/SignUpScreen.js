import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [account, setAccount] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const handleSubmit = () => {
        if (account.username === "") {
            Alert.alert("Nhập tên tài khoản.")
        } else if (account.email === "") {
            Alert.alert("Nhập địa chỉ email.")
        } else if (account.password === "" || account.confirmPassword === "") {
            Alert.alert("Nhập mật khẩu.")
        } else if (account.password !== account.confirmPassword) {
            Alert.alert("Mật khẩu không khớp.")
        }
    }

    return (
        <TouchableWithoutFeedback
            onPress={handleDismissKeyboard}>
            <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
                <View className="flex">
                    <View className="flex-row justify-start  mt-12 mb-5">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
                        >
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="flex-1 bg-white px-8 pt-8"
                    style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                >
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">Tên tài khoản</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder='john'
                            onChangeText={text => setAccount({ ...account, username: text })}

                        />
                        <Text className="text-gray-700 ml-4">Địa chỉ email</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                            placeholder='john@gmail.com'
                            onChangeText={text => setAccount({ ...account, email: text })}

                        />
                        <Text className="text-gray-700 ml-4">Mật khẩu</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                            secureTextEntry
                            placeholder='........'
                            onChangeText={text => setAccount({ ...account, password: text })}

                        />
                        <Text className="text-gray-700 ml-4">Xác nhận mật khẩu</Text>
                        <TextInput
                            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
                            secureTextEntry
                            placeholder='........'
                            onChangeText={text => setAccount({ ...account, confirmPassword: text })}

                        />
                        <TouchableOpacity
                            className="py-3 bg-yellow-400 rounded-xl"
                            onPress={handleSubmit}
                        >
                            <Text className="font-xl font-bold text-center text-gray-700">
                                Đăng ký
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-xl text-gray-700 font-bold text-center py-5">
                        Or
                    </Text>
                    <View className="flex-row justify-center space-x-12">
                        <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
                            <Image source={require('../assets/icons/google.png')}
                                className="w-10 h-10" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center mt-7">
                        <Text className="text-gray-500 font-semibold">Bạn đã có tài khoản?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text className="font-semibold text-yellow-500"> Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}