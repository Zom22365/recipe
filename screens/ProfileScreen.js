import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { EllipsisHorizontalIcon } from 'react-native-heroicons/outline';
import CardFoodComponent from '../components/CardFoodComponent';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getProfile } from '../api/apiAcount';
import FooterComponent from '../components/FooterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { Alert } from 'react-native';

const ProfileScreen = () => {
    data = [1, 2, 3, 4, 5, 6]
    data1 = [1, 2, 3, 4,]
    const [active, setActive] = useState('post');
    const [openSetting, setOpenSetting] = useState(false)
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
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
    const navigation = useNavigation();

    const handleSelect = (value) => {
        if (value == "EditProfile") {
            navigation.navigate("EditProfile")
        } else if (value == "Logout") {
            Alert.alert("Thông báo", "Bạn có muốn đăng xuất?", [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => {
                        SecureStore.deleteItemAsync('accessToken').then(
                            navigation.navigate('Login')
                        )
                    }
                },

            ])
        } else if (value === "ChangePassword") {
            navigation.navigate("ChangePassword")

        }
        setOpenSetting(false)
    }

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
                    setAvatar({ uri: res.data.avatar })
                }
                ).catch(
                )
            }

        }

        getToken()
    }, [])



    return (
        <SafeAreaView className="flex-1 bg-white" >


            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                <HeaderComponent />

                <View className="bg-[#efefef] p-3 mx-3">

                    <View style={style.profile} className="flex-row justify-between bg-[#efefef] ">
                        <View>
                            <Image
                                className='rounded-full w-20 h-20'
                                source={avatar}
                            />
                        </View>
                        <View className="justify-center">
                            <Text style={style.title} >{profile.username}</Text>
                            <Text>896 bài viết | 100 yêu thích</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setOpenSetting(true)}>
                                <EllipsisHorizontalIcon size="24" color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className='flex-row gap-5 justify-center'>
                        <TouchableOpacity
                            onPress={() => setActive('post')}>
                            <Text style={`${active}` == 'post' ? style.menu : ""} className="pt-3">Bài viết</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setActive('provite')}>
                            <Text style={`${active}` == 'provite' ? style.menu : ""} className="pt-3">Yêu thích</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="pt-10">
                        <View className='flex-row justify-between flex-wrap'>
                            {active == 'post' &&
                                data.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={index} />
                                    )
                                })
                            }
                            {active == 'provite' &&
                                data1.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={index} />
                                    )
                                })
                            }

                        </View>
                    </View>
                </View>

            </ScrollView>
            <FooterComponent />


            {
                openSetting &&
                <TouchableOpacity
                    onPress={() => setOpenSetting(false)}
                    className="flex-1 bg-[#5a5a5ada] justify-center"
                    style={{ position: 'absolute', width: '100%', zIndex: 100 }}>
                    <FlatList
                        className='my-80 mx-10 bg-white rounded-md'
                        data={[
                            {
                                key: 'Đổi mật khẩu',
                                value: 'ChangePassword'
                            },
                            {
                                key: 'Sửa thông tin cá nhân',
                                value: 'EditProfile'
                            },
                            {
                                key: 'Đăng xuất',
                                value: 'Logout'
                            }
                        ]}

                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                                onPress={() => handleSelect(item.value)}>
                                <View style={style.item}>
                                    <Text style={style.select}>
                                        {item.key}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )

                        }
                    />

                </TouchableOpacity>
            }
            {/* </View> */}
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    title: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10
    },
    profile: {
        paddingBottom: 24,
        borderWidth: 1,
        borderColor: '#efefef',
        borderBottomColor: '#898989'
    },
    menu: {
        fontWeight: 700
    },
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
    },
})


export default ProfileScreen