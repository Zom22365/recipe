import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, BookmarkIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon as BookMark } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Comment from './Comment';
import { getRecipeyById } from '../api/apiRecipe';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native';

const DetailScreen = () => {
    const [detailPost, setDetailPost] = useState({})
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
    const [openSetting, setOpenSetting] = useState(false)
    const [thumnail, setThumnail] = useState(require('../assets/images/food_11.png'))

    const router = useRoute()
    const navigation = useNavigation();

    const { id } = router.params

    useEffect(() => {
        async function getRecById() {
            const res = await getRecipeyById(id);
            setDetailPost(res)
            if (res?.use?.avatar) {
                setAvatar(res.use.avatar)
            }
        }
        getRecById()

    }, [])

    const handleOpenSetting = () => {
        setOpenSetting(true)
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
            className="flex-1 bg-white"
        >
            <SafeAreaView
                className="bg-white flex-1">
                <ScrollView className=" bg-white" showsVerticalScrollIndicator={false}>
                    <View className="flex-row justify-start mb-3"
                    >
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-3">
                            <ArrowLeftIcon size="20" color="black" />
                        </TouchableOpacity>
                        <Text className='ml-16 mt-2 text-lg font-semibold'>Chi tiết công thức</Text>
                    </View>
                    <View className="mx-3">
                        <View style={style.border}>
                            <View className="flex-row justify-end mb-1">
                                {detailPost?.status === 1 ?
                                    <TouchableOpacity
                                        className='bg-yellow-400 p-2 rounded-full'>
                                        <BookMark size="24" color="black" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        className='bg-yellow-400 p-2 rounded-full'>
                                        <BookmarkIcon size="24" color="black" />
                                    </TouchableOpacity>
                                }

                            </View>
                            <Text className="font-semibold text-3xl w-64">{detailPost.name}</Text>
                            <View className="flex-row items-center gap-2 mt-3">
                                <View>
                                    <Image
                                        className='rounded-full w-8 h-8'
                                        source={avatar}
                                    />
                                </View>
                                <View >
                                    <Text className="text-base" >{detailPost?.use?.usemane}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text className="mx-3 text-base my-3">{detailPost.decr}</Text>
                    <View className="mx-3 mb-3">
                        <Image style={{ width: '100%' }} source={detailPost.img} />
                    </View>
                    <Text className="mx-3 mb-3 text-gray-400">Thời gian thực hiện: {detailPost.time}</Text>
                    <View>
                        <Text className="mx-3 mb-3 font-semibold text-2xl">Nguyên liệu</Text>
                        <Text className="mx-3 mb-2 font-semibold text-xl">Nguyên liệu chính</Text>
                        {detailPost?.mainFood &&
                            detailPost?.mainFood.map((item, index) => {
                                return (
                                    <View key={index} className="mx-3 mb-2 flex-row items-center">
                                        <View className="w-4 h-4 rounded-full" style={style.circle}>
                                        </View>
                                        <Text className="ml-2 text-base">
                                            {item}
                                        </Text>
                                    </View>

                                )
                            })
                        }

                        <Text className="mx-3 mb-2 font-semibold text-xl">Nguyên liệu phụ</Text>
                        {detailPost?.branchFood &&
                            detailPost?.branchFood.map((item, index) => {
                                return (
                                    <View key={index} className="mx-3 mb-2 flex-row items-center">
                                        <View className="w-4 h-4 rounded-full" style={style.circle}>
                                        </View>
                                        <Text className="ml-2 text-base">
                                            {item}
                                        </Text>
                                    </View>

                                )
                            })
                        }



                    </View>
                    <View style={style.bottomPost} className='my-3 pb-3 mx-3'>
                        <Text className="mb-3 font-semibold text-2xl">Hướng dẫn nấu</Text>
                        {detailPost.guide &&
                            detailPost.guide.map((step, index) => {
                                return (
                                    <View key={index} className="flex-row  mb-2">
                                        <View
                                            className="mr-3 bg-yellow-400 px-2 py-1 h-6 rounded-full">
                                            <Text >{index + 1}</Text>
                                        </View>
                                        <Text className="text-base mr-6" >{step}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View className="mx-3">
                        <Text className="mb-3 font-semibold text-2xl w-72">Hãy cho tôi biết cảm nhận của bạn.</Text>
                    </View>
                    <Comment id={id} handleOpenSetting={handleOpenSetting} />
                </ScrollView>

            </SafeAreaView>
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
                                key: 'Xóa bình luận',
                                value: 'ChangePassword'
                            },
                            {
                                key: 'Sửa bình luận',
                                value: 'EditProfile'
                            },
                            {
                                key: 'Hủyt',
                                value: 'Logout'
                            }
                        ]}

                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                            >
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
        </KeyboardAvoidingView>
    )
}

const style = StyleSheet.create({
    title: {
        fontWeight: 700,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 10
    },
    border: {
        paddingBottom: 24,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: '#898989',
    },
    circle: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#000',
    },
    bottomPost: {
        borderWidth: 3,
        borderColor: '#fff',
        borderBottomColor: 'rgb(250 204 21)',
    }, item: {
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



export default DetailScreen