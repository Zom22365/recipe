import { View, Text, Keyboard, TextInput, ScrollView, StyleSheet, StatusBar, SafeAreaView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon, CalendarDaysIcon, ChevronDownIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native'
import * as SecureStore from 'expo-secure-store';
import SelectDropdown from 'react-native-select-dropdown'
import { getProfile } from '../api/apiAcount'
import { FlatList } from 'react-native'
import { Button } from 'react-native'
import RNDateTimePicker from '@react-native-community/datetimepicker'



const EditProfile = () => {

    // const [fileResponse, setFileResponse] = useState([]);

    // const handleDocumentSelection = useCallback(async () => {
    //     try {
    //         const response = await DocumentPicker.pick({
    //             presentationStyle: 'fullScreen',
    //         });
    //         setFileResponse(response);
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }, []);
    const [profile, setProfile] = useState({
        "id": '',
        "username": '',
        "password": null,
        "name": '',
        "email": '',
        "phonenumber": '',
        "address": null,
        "dob": null,
        "sex": '',
        "role": '',
        "avatar": "",
        "active": '',
        "createdAt": "",
        "updatedAt": ""
    })
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
    const sex = ['Nữ', 'Nam']
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [dataAvatar, setDataAvatar] = useState([
        {
            key: 'Thay đổi ảnh đại diện',
            value: 'UploadImage'
        },
        {
            key: 'Hủy',
            value: 'EditProfile'
        }
    ])
    const [openDate, setOpenDate] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setOpenDate(false);
        }
        setDate(currentDate);
        setProfile({ ...profile, dob: currentDate })
    };

    useEffect(() => {
        let token = ''
        async function getToken() {
            token = await SecureStore.getItemAsync('accessToken')
            if (token) {
                const config = {
                    headers: { 'Authorization': `Bearer ${token}` }
                }
                getProfile(config).then(res => {
                    setProfile(res.data)
                    if (res.data.avatar) {
                        setDataAvatar([
                            {
                                key: 'Thay đổi ảnh đại diện',
                                value: 'UploadImage'
                            },
                            {
                                key: 'Xóa ảnh hiện tại',
                                value: 'RemoveCurrentImage'
                            },
                            {
                                key: 'Hủy',
                                value: 'EditProfile'
                            }
                        ])
                        setAvatar({ uri: res.data.avatar })
                    }
                    if (res.data.dob) {
                        setDate(new Date(res.data.dob))
                    }
                }
                ).catch(
                )
            }

        }

        getToken()
    }, [])

    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    function formatDate(dateString) {
        var subDateStr = dateString.split(',');
        return subDateStr[0];
    }

    const handleSubmit = () => {
        console.log(profile);
    }

    const handleOpen = () => {
        setIsOpen(true)
    }
    const handleSelect = (value) => {
        if (value === "UploadImage") {
            navigation.navigate("UploadImage")
        } else if (value === "RemoveCurrentImage") {

        } else {
            navigation.navigate("EditProfile")

        }
        setIsOpen(false)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
            className="flex-1 bg-white"
        >
            <TouchableWithoutFeedback
                onPress={handleDismissKeyboard}
            >
                <ScrollView className=" bg-white">
                    <View className="flex-1 bg-white justify-around ">

                        <View >
                            <View className="flex-row justify-start  mt-12 mb-5">
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Profile')}
                                    className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4">
                                    <ArrowLeftIcon size="20" color="black" />
                                </TouchableOpacity>
                                <Text className='ml-16 mt-2 text-lg font-semibold'>Sửa thông tin cá nhân</Text>
                            </View>

                        </View>

                        <View className="p-4 ">
                            <View className="flex-row ">
                                <View className="mr-5">
                                    <Image
                                        className='rounded-full w-20 h-20'
                                        source={avatar}
                                    />
                                </View>
                                <TouchableWithoutFeedback
                                    onPress={handleOpen}>
                                    <Text className="self-center color-[#3578E5] font-bold">Thay đổi ảnh cá nhân</Text>
                                </TouchableWithoutFeedback>
                            </View>

                            <View className="form space-y-2 mt-10">
                                <Text className="text-gray-700 ml-4">Tên tài khoản</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    placeholder="john@gmail.com"
                                    value={profile.username}
                                    onChangeText={text => setProfile({ ...profile, username: text })}
                                />
                                <Text className="text-gray-700 ml-4">Email</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    placeholder="john@gmail.com"
                                    value={profile.email}
                                    onChangeText={text => setProfile({ ...profile, email: text })}

                                />

                                <Text className="text-gray-700 ml-4">Ngày sinh</Text>
                                <TouchableOpacity
                                    className="flex-row justify-between items-center py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    onPress={() => setOpenDate(!openDate)}
                                >
                                    <Text>
                                        {profile.dob ? formatDate(date.toLocaleString()) : ""}
                                    </Text>
                                    <CalendarDaysIcon size="24" color="black" />
                                </TouchableOpacity>
                                {
                                    openDate &&

                                    <DateTimePicker
                                        mode={'date'}
                                        is24Hour={true}
                                        value={date}
                                        onChange={onChange}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    />
                                }

                                <Text className="text-gray-700 ml-4">Số điện thoại</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    placeholder="Số điện thoại"
                                    value={profile.phonenumber}
                                    onChangeText={text => setProfile({ ...profile, phonenumber: text })}

                                />

                                <Text className="text-gray-700 ml-4">Giới tính</Text>

                                <SelectDropdown
                                    data={sex}
                                    onSelect={(selectedItem, index) => {
                                        setProfile({ ...profile, sex: index })
                                    }}
                                    buttonStyle={styles.dropdown1BtnStyle}
                                    buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                    rowStyle={styles.dropdown1RowStyle}
                                    rowTextStyle={styles.dropdown1RowTxtStyle}
                                    defaultValue={sex[profile.sex]}
                                    defaultButtonText={'--Lựa chọn giới tính--'}
                                    renderDropdownIcon={() => {
                                        return <ChevronDownIcon color="black" />
                                    }}
                                >

                                </SelectDropdown>


                                <TouchableOpacity
                                    className=" py-3 bg-yellow-400 rounded-xl"
                                    onPress={handleSubmit}
                                >
                                    <Text className="text-xl font-bold text-center text-gray-700">Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                    </View >
                </ScrollView>

            </TouchableWithoutFeedback>

            {
                isOpen &&
                <TouchableOpacity
                    onPress={() => setIsOpen(false)}
                    className="flex-1 bg-[#5a5a5ada] justify-center"
                    style={{ position: 'absolute', width: '100%', zIndex: 100 }}
                >
                    <FlatList
                        className='my-96 mx-10 bg-white rounded-md'
                        data={dataAvatar}

                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity onPress={() => handleSelect(item.value)}>
                                <View style={styles.item}>
                                    <Text style={styles.select}>
                                        {item.key}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )

                        }
                    />

                </TouchableOpacity>


            }

        </KeyboardAvoidingView >
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(243 244 246)',
        borderRadius: 16,
        marginTop: 5,
        marginBottom: 10
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    item: {
        paddingTop: 15,
        paddingBottom: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: 'rgb(221 221 221)'
    },
    select: {
        fontSize: 16,
        textAlign: 'center'
    }
})

export default EditProfile