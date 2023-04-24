import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent'
import { EllipsisHorizontalIcon } from 'react-native-heroicons/outline';
import CardFoodComponent from '../components/CardFoodComponent';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { getPostUser, getProfile, getProfileOther } from '../api/apiAcount';
import FooterComponent from '../components/FooterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import { Alert } from 'react-native';

const ProfileOther = () => {
    const [active, setActive] = useState('post');
    const [openSetting, setOpenSetting] = useState(false)
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
    const [profile, setProfile] = useState({})
    const [post, setPost] = useState([])
    const [countPost, setCountPost] = useState(0)
    const navigation = useNavigation();

    const router = useRoute()

    const { id } = router.params

    useEffect(() => {
        getProfileOther(id).then(
            res => {
                console.log(res.data);
                if (res.data.user?.avatar) {
                    setAvatar({ uri: res.data.avatar })
                }
                setProfile(res.data.user)
                setPost(res.data.post)
            }
        )

    }, [])



    return (
        <SafeAreaView className="flex-1 bg-white" >


            <ScrollView
                showsHorizontalScrollIndicator={false}
            >
                <HeaderComponent />

                <View className="bg-[#efefef] p-3 mx-3">

                    <View style={style.profile} className="flex-row justify-start items-center gap-3 bg-[#efefef] ">
                        <View>
                            <Image
                                className='rounded-full w-20 h-20'
                                source={avatar}
                            />
                        </View>
                        <View className="">
                            <Text style={style.title} >{profile?.username}</Text>
                            <Text>{post.length} bài viết</Text>
                        </View>
                    </View>

                    <View className='flex-row gap-5 justify-center'>
                        <TouchableOpacity
                            onPress={() => setActive('post')}>
                            <Text style={`${active}` == 'post' ? style.menu : ""} className="pt-3">Bài viết</Text>
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


                        </View>
                    </View>
                </View>

            </ScrollView>
            <FooterComponent />

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


export default ProfileOther