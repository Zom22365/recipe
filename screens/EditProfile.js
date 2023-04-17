import { View, Text, Keyboard, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon, CalendarDaysIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'


const EditProfile = () => {

    // const [isLoanding, setLoanding] = useState(false);
    const [profile, setProfile] = useState({
        id: 1,
        username: 'oanhpham',
        dob: '20/12/2023',
        email: 'phamoanh22365@gmail.com',
        phone: '0941176021',
        gender: 1
    })
    const navigation = useNavigation();
    const [date, setDate] = useState(new Date());
    const [openDate, setOpenDate] = useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    function formatDate(dateString) {
        var subDateStr = dateString.split(',');
        return subDateStr[0];
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1"
        >

            <TouchableWithoutFeedback
                onPress={handleDismissKeyboard}
            >
                <ScrollView className=" bg-white">
                    <View className="flex-1 bg-white justify-around ">

                        <View >
                            <View className="flex-row justify-start  mt-12 mb-5">
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Home')}
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
                                        source={require('../assets/images/chef_6.png')}
                                    />
                                </View>
                                <Text className="self-center color-[#3578E5] font-bold">Thay đổi ảnh cá nhân</Text>
                            </View>

                            <View className="form space-y-2 mt-10">
                                <Text className="text-gray-700 ml-4">Tên tài khoản</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                    placeholder="john@gmail.com"
                                // onChangeText={text => setAccount({ ...account, username: text })}
                                />
                                <Text className="text-gray-700 ml-4">Email</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    secureTextEntry
                                    placeholder="........"
                                // onChangeText={text => setAccount({ ...account, password: text })}

                                />

                                <Text className="text-gray-700 ml-4">Ngày sinh</Text>
                                {/* <View
                                    className="flex-row justify-between items-center py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                > */}
                                <TouchableOpacity
                                    className="flex-row justify-between items-center py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    onPress={() => setOpenDate(!openDate)}
                                >
                                    <Text>
                                        {formatDate(date.toLocaleString())}</Text>
                                    <CalendarDaysIcon size="24" color="black" />
                                </TouchableOpacity>
                                {
                                    openDate &&

                                    <DateTimePicker
                                        value={date}
                                        onChange={onChange}
                                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    />
                                }

                                <Text className="text-gray-700 ml-4">Số điện thoại</Text>

                                <TextInput
                                    className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                    secureTextEntry
                                    placeholder="........"
                                // onChangeText={text => setAccount({ ...account, password: text })}

                                />

                                <Text className="text-gray-700 ml-4">Giới tính</Text>
                                <SelectDropdown
                                    data={[
                                        "Nam",
                                        "Nữ"
                                    ]}>

                                </SelectDropdown>


                                <TouchableOpacity className=" py-3 bg-yellow-400 rounded-xl"

                                >
                                    <Text className="text-xl font-bold text-center text-gray-700">Xác nhận</Text>
                                </TouchableOpacity>
                            </View>
                        </View>


                        {/* {
                        isLoanding &&
                        <View
                            className="flex-1 bg-[#ffffffa1] justify-center"
                            style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 100 }}>
                            <ActivityIndicator size="large" color='hsl(210,95%,69%)'
                            />
                        </View>
                    } */}


                    </View >
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView >
    )
}

export default EditProfile