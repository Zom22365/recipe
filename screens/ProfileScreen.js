import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { EllipsisHorizontalIcon } from 'react-native-heroicons/outline';
import CardFoodComponent from '../components/CardFoodComponent';
import { FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getPostLike, getPostUser, getProfile } from '../api/apiAcount';
import FooterComponent from '../components/FooterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { Alert } from 'react-native';

const ProfileScreen = () => {
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
    const [post, setPost] = useState([])
    const [listLike, setListLike] = useState([])
    const [countPost, setCountPost] = useState(0)
    const navigation = useNavigation();
    const isFocused = useIsFocused();

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
        getProfile().then(res => {
            setProfile(res.data)
            if (res.data.avatar) {
                setAvatar({ uri: res.data.avatar })
            }
        })

        getPostUser().then(res => {
            const data = res?.data
            setPost(data?.post)
        }).catch(err => {
            console.log(err)
        }
        )

        getPostLike().then(res => {
            console.log(res.data);
            setListLike(res.data)
        }).catch(err => {
            console.log(err)
        }
        )

    }, [isFocused, active])



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
                            <Text>{post.length} bài viết | {listLike.length} yêu thích</Text>
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
                                post.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={index} {...item} />
                                    )
                                })
                            }
                            {active == 'provite' &&
                                listLike.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={index} {...item} />
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