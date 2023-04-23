import { View, Text, Keyboard, TextInput, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon, CalendarDaysIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import SelectDropdown from 'react-native-select-dropdown'
import { getProfile, upLoadAvatar } from '../api/apiAcount'
import { FlatList } from 'react-native'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native'
import { ActivityIndicator } from 'react-native'
import { API_URL, POST_CLOUDING_UPLOAD_AVATAR } from '../api/constant'



const UploadImage = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [isLoanding, setLoanding] = useState(false);
    const [file, setFile] = useState(null);
    const [token, setToken] = useState("")
    const [isSelect, setIsSelect] = useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setIsSelect(true)
        }
    };


    async function getToken() {
        accessToken = await SecureStore.getItemAsync('accessToken')
        if (accessToken) {
            setToken(accessToken)
            return accessToken
        }

    }




    const handleSubmit = async () => {
        if (image != null) {
            let filename = image.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const data = new FormData();
            data.append('file', { uri: image, name: filename, type });
            const token = await getToken()
            setLoanding(true)
            await upLoadAvatar(data, token).then(res => {
                setLoanding(false)
                alert("Cập nhật ảnh thành công.")
            }).catch(err => {
                setLoanding(false)
                alert("Cập nhật ảnh không thành công.")
            })

        } else {
            alert('Please Select File first');
        }
    }

    return (
        <View className="flex-1">
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

                <View className="flex-row justify-start  mt-12 mb-5">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('EditProfile')}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                    <Text className='ml-16 mt-2 text-lg font-semibold'>Thay đổi ảnh cá nhân</Text>
                </View>


                <View className="mt-10" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Button title="Chọn một ảnh từ thư viện" onPress={pickImage} />
                    {image && <Image className="mt-4" source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                    {
                        isSelect &&
                        <TouchableOpacity
                            className="mt-10 py-3 px-5 bg-yellow-400 rounded-xl"
                            onPress={handleSubmit}
                        >
                            <Text className="text-xl font-bold text-center text-gray-700">Cập nhật ảnh</Text>
                        </TouchableOpacity>
                    }

                </View>

            </View>
        </View>

    )
}

export default UploadImage