import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, BookmarkIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon as BookMark, EllipsisHorizontalIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Comment from './Comment';
import { daleteFood, deleteFood, getRecipeyById } from '../api/apiRecipe';
import { KeyboardAvoidingView } from 'react-native';
import { FlatList } from 'react-native';
import { TextInput } from 'react-native';
import { Alert } from 'react-native';

const DetailScreen = () => {
    const [detailPost, setDetailPost] = useState({})
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
    const [openSetting, setOpenSetting] = useState(false)
    const [userId, setUserId] = useState('')
    const [openSelect, setOpenSelect] = useState(false)
    const [editComment, setEditComment] = useState({})
    const [openEdit, setOpenEdit] = useState(false)
    const [status, setStatus] = useState(false)
    const [thumnail, setThumnail] = useState(require('../assets/images/user_default.png'))

    const router = useRoute()
    const navigation = useNavigation();

    const { id } = router.params
    // console.log(id)
    const handleOpenSetting = (id, content) => {
        setOpenSetting(true)
        console.log(id, content)
        setEditComment({
            ...editComment,
            commentId: id,
            commet: content
        })

    }

    const handleSelect = (value) => {
        if (value == "Edit") {
            setOpenEdit(true)
        } else if (value == "Delete") {
            Alert.alert("Thông báo", "Bạn có chắc chắn xóa bình luận?", [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    // onPress: () => {
                    //     SecureStore.deleteItemAsync('accessToken').then(
                    //         navigation.navigate('Login')
                    //     )
                    // }
                },

            ])
        } else if (value === "Cancel") {
            setOpenSetting(false)

        }
        setOpenSetting(false)
    }


    const handleSelectWithPost = (value) => {
        if (value == "Edit") {
            navigation.navigate("UpdatePost", {
                id: id
            })

        } else if (value == "Delete") {
            Alert.alert("Thông báo", "Bạn có chắc chắn xóa bài viết?", [
                {
                    text: 'Không',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Có',
                    onPress: () => {
                        deleteFood(id).then(res =>
                            console.log(res)).catch(err => console.log(err))
                        // SecureStore.deleteItemAsync('accessToken').then(
                        //     navigation.navigate('Login')
                        // )
                    }
                },

            ])
        } else if (value === "Cancel") {
            setOpenSelect(false)
        }
        setOpenSelect(false)
    }
    const handleChangeSave = () => {
        console.log(status)
        if (status == 1) {
            setStatus(0)

        } else {
            setStatus(1)
            // postStatusChange()

        }
    }


    useEffect(() => {
        getRecipeyById(id).then(res => {
            const data = res.data
            console.log(data);
            setDetailPost(data)
            if (res?.user?.avatar) {
                setAvatar(res.user.avatar)
            }
            setUserId(res?.user?.id)
            // console.log(data.post.img);
            setThumnail({ uri: `${data.post.img}` })
        }
        ).catch(err => {
            console.log("failed");
        })


    }, [])

    const check = status === 1 ?
        <TouchableOpacity
            className='bg-yellow-400 p-2 rounded-full'
            onPress={handleChangeSave}>
            <BookMark size="24" color="black" />
        </TouchableOpacity>
        :
        <TouchableOpacity
            className='bg-yellow-400 p-2 rounded-full'
            onPress={handleChangeSave}>
            <BookmarkIcon size="24" color="black" />
        </TouchableOpacity>

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
                                {/* thieu */}
                                {
                                    detailPost.owner ? <View>
                                        <TouchableOpacity
                                            onPress={() => setOpenSelect(true)}>
                                            <EllipsisHorizontalIcon size="24" color="black" />
                                        </TouchableOpacity>
                                    </View> : check
                                }


                            </View>
                            <Text className="font-semibold text-3xl w-64">{detailPost?.post?.content}</Text>
                            <View className="flex-row items-center gap-2 mt-3">
                                <View>
                                    <Image
                                        className='rounded-full w-8 h-8'
                                        source={avatar}
                                    />
                                </View>
                                <View >
                                    <Text className="text-base" >{detailPost?.user?.username}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text className="mx-3 text-base my-3">{detailPost?.post?.description}</Text>
                    <View className="mx-3 mb-3">
                        {detailPost?.post?.img &&
                            <Image style={{ height: 250, width: '100%' }} source={{ uri: `${detailPost.post.img}` }} />
                        }
                    </View>
                    <Text className="mx-3 mb-3 text-gray-400">Thời gian thực hiện: {detailPost?.post?.timeCooking}</Text>
                    <View>
                        <Text className="mx-3 mb-3 font-semibold text-2xl">Nguyên liệu</Text>
                        <Text className="mx-3 mb-2 font-semibold text-xl">Nguyên liệu chính</Text>
                        {detailPost?.post?.mainFood &&
                            detailPost?.post?.mainFood.map((item, index) => {
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
                        {detailPost?.post?.subFood &&
                            detailPost?.post?.subFood.map((item, index) => {
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
                        {detailPost?.post?.guideCooking &&
                            detailPost?.post?.guideCooking.map((step, index) => {
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
                    <Comment id={id} handleOpenSetting={handleOpenSetting} userId={userId} />



                </ScrollView>


            </SafeAreaView>
            {
                openEdit &&

                <View

                    className="w-full h-full flex bg-[#5a5a5ada] justify-center"
                >
                    <View
                        className='p-7 mx-5 bg-white rounded-md'
                    >
                        <Text className="mb-3 font-medium">Sửa bình luận</Text>
                        <TextInput
                            className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                            value={editComment?.commet}
                            onChangeText={text => setEditComment({ ...editComment, commet: text })}

                        />
                        <View className="flex-row gap-2 justify-center mt-5">
                            <TouchableOpacity
                                className="py-3 flex-1  bg-slate-400  rounded-xl"
                                onPress={() => setOpenEdit(false)}
                            >
                                <Text className="text-xl font-bold text-center text-white">
                                    Hủy
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                className="py-3  flex-1 bg-yellow-400 rounded-xl"
                                onPress={() => console.log(editComment)}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            }

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
                                value: 'Delete'
                            },
                            {
                                key: 'Sửa bình luận',
                                value: 'Edit'
                            },
                            {
                                key: 'Hủy',
                                value: 'Cancel'
                            }
                        ]}

                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                                onPress={() => handleSelect(item.value)}
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

            {
                openSelect &&
                <TouchableOpacity
                    onPress={() => setOpenSetting(false)}
                    className="flex-1 bg-[#5a5a5ada] justify-center"
                    style={{ position: 'absolute', width: '100%', zIndex: 100 }}>
                    <FlatList
                        className='my-80 mx-10 bg-white rounded-md'
                        data={[
                            {
                                key: 'Xóa bài viết',
                                value: 'Delete'
                            },
                            {
                                key: 'Sửa bài viết',
                                value: 'Edit'
                            },
                            {
                                key: 'Hủy',
                                value: 'Cancel'
                            }
                        ]}

                        renderItem={({ item }) =>
                        (
                            <TouchableOpacity
                                onPress={() => handleSelectWithPost(item.value)}
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



        </KeyboardAvoidingView >
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