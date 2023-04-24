import { View, Text, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { themeColors } from '../theme'
import { ArrowLeftIcon, CalendarDaysIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import { StyleSheet } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/outline';
import { register } from '../api/apiAuth';

// subscribe for more videos like this :)
export default function SignUpScreen() {
    const navigation = useNavigation();
    const [openDate, setOpenDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isLoanding, setLoanding] = useState(false);
    const [account, setAccount] = useState({
        email: "",
        username: "",
        dob: "",
        password: "",
        confirmPassword: "",
        phonenumber: "",
        name: "",
        sex: ""
    })
    const sex = ['Nữ', 'Nam']


    const handleDismissKeyboard = () => {
        Keyboard.dismiss()
    }

    const handleSubmit = () => {
        if (account.username === "") {
            Alert.alert("Nhập tên tài khoản.")
        } else if (account.email === "") {
            Alert.alert("Nhập địa chỉ email.")
        } else if (account.dob === "") {
            Alert.alert("Nhập ngày sinh.")
        } else if (account.phonenumber === "") {
            Alert.alert("Nhập số điện thoại.")
        } else if (account.name === "") {
            Alert.alert("Nhập họ tên.")
        } else if (account.password === "" || account.confirmPassword === "") {
            Alert.alert("Nhập mật khẩu.")
        } else if (account.password !== account.confirmPassword) {
            Alert.alert("Mật khẩu không khớp.")
        } else {

            const body = {
                email: account.email,
                username: account.username,
                dob: account.dob,
                password: account.password,
                phonenumber: account.phonenumber,
                name: account.name,
                sex: account.sex
            }
            setLoanding(true)
            register(body).then(res => {
                setLoanding(false)
                alert(`Đăng tài khoản ${res.data?.username} thành công`)
            }).catch(err => {
                setLoanding(false)
                alert("Đăng ký tài khoản không thành công")
            })
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        if (Platform.OS === 'android') {
            setOpenDate(false);
        }
        setDate(currentDate);
        setAccount({ ...account, dob: currentDate })
    };

    function formatDate(dateString) {
        var subDateStr = dateString.split(',');
        return subDateStr[0];
    }

    return (
        <TouchableWithoutFeedback
            onPress={handleDismissKeyboard}>
            <View className="flex-1 bg-white" style={{ backgroundColor: themeColors.bg }}>
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
                    <ScrollView showsVerticalScrollIndicator={false} className="mb-10">
                        <View className="form space-y-2">

                            <Text className="text-gray-700 ml-4">Tên tài khoản</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                placeholder='john'
                                onChangeText={text => setAccount({ ...account, username: text })}

                            />
                            <Text className="text-gray-700 ml-4">Họ và tên</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                placeholder='john pham'
                                onChangeText={text => setAccount({ ...account, name: text })}

                            />
                            <Text className="text-gray-700 ml-4">Địa chỉ email</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                placeholder='john@gmail.com'
                                onChangeText={text => setAccount({ ...account, email: text })}

                            />
                            <Text className="text-gray-700 ml-4">Ngày sinh</Text>
                            <TouchableOpacity
                                className="flex-row justify-between items-center py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                onPress={() => setOpenDate(!openDate)}
                            >
                                <Text>
                                    {account?.dob ? formatDate(date.toLocaleString()) : ""}
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
                            <Text className="text-gray-700 ml-4">Nhập số điện thoại</Text>
                            <TextInput
                                className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                                placeholder=''
                                onChangeText={text => setAccount({ ...account, phonenumber: text })}
                            />

                            <Text className="text-gray-700 ml-4">Giới tính</Text>

                            <SelectDropdown
                                data={sex}

                                onSelect={(selectedItem, index) => {
                                    setAccount({ ...account, sex: index })
                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                defaultValue={sex[1]}
                                defaultButtonText={'--Lựa chọn giới tính--'}
                                renderDropdownIcon={() => {
                                    return <ChevronDownIcon color="black" />
                                }}
                            >

                            </SelectDropdown>




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
                    </ScrollView>
                </View>

            </View>
        </TouchableWithoutFeedback >
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