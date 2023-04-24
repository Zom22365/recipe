import { View, Text, TouchableOpacity, Image, TextInput, Keyboard, TouchableWithoutFeedback, Alert, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { forgotPassword } from '../api/apiMail';


const ForgotPasswordScreen = () => {

    const navigation = useNavigation();
    const [account, setAccount] = useState({
        email: ""
    })
    const [isLoanding, setLoanding] = useState(false)

    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const handleSubmit = async () => {
        if (account.email === "") {
            Alert.alert("Nhập địa chỉ email.")
        } else {
            setLoanding(true)
            await forgotPassword(account.email).then(res => {
                setLoanding(false)
                alert("Vui lòng kiểm tra mail.")
            }).catch(err => {
                setLoanding(false)
                alert("Lấy mật khẩu không thành công. Vui lòng thử lại")
            })
        }

    }

    return (
        <TouchableWithoutFeedback
            onPress={handleDismissKeyboard}>
            <View className="flex-1 bg-white" style={{
                backgroundColor: themeColors.bg
            }}
            >
                {
                    isLoanding &&
                    <View
                        className="flex-1 bg-[#ffffffa1] justify-center"
                        style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 100 }}>
                        <ActivityIndicator size="large" color='hsl(210,95%,69%)'
                        />
                    </View>
                }
                <View className="flex">
                    <View className="flex-row justify-start mt-12 mb-5">
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className="flex-row justify-center  mb-2">
                        <Image source={require('../assets/images/forgot.png')}
                            style={{ width: 200, height: 250 }} />
                    </View>
                </View>

                <View
                    style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
                    className="flex-1 bg-white px-8 pt-8">
                    <View className="form space-y-2">
                        <Text className="text-gray-700 ml-4">Địa chỉ email</Text>

                        <TextInput
                            className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
                            placeholder="john@gmail.com"
                            onChangeText={text => setAccount({ ...account, email: text })}
                        />

                        <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl"
                            onPress={handleSubmit}
                        >
                            <Text className="text-xl font-bold text-center text-gray-700">Gửi mã</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View >
        </TouchableWithoutFeedback>
    )
}

export default ForgotPasswordScreen