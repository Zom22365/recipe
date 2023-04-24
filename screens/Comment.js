import React, { useEffect, useState } from 'react';
import { View, Text, Image, KeyboardAvoidingView, FlatList } from 'react-native';

import { PaperAirplaneIcon } from 'react-native-heroicons/solid';

import com from '../data/Comment'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { getCommentByPostId, postComment } from '../api/apiComment';
import { EllipsisHorizontalIcon } from 'react-native-heroicons/outline';
import { getProfile } from '../api/apiAcount';
import { useNavigation } from '@react-navigation/native';

const Comment = (props) => {
    const avatarDefault = require('../assets/images/user_default.png')
    const [comment, setComment] = useState([])
    const [countReply, setCountReply] = useState([])
    const [isShort, setIsShort] = useState(true)
    const [textComment, setTextComment] = useState("");
    const [userId, setUserId] = useState("")
    const [parentId, setParentId] = useState(0);
    const [newComment, setNewComment] = useState(false)

    const navigation = useNavigation()
    useEffect(() => {
        getProfile().then(res => {
            setUserId(res.data.id)

        }
        ).catch(
        )
        getCommentByPostId(props.id).then(
            res => {
                setComment(res.data)
                for (let i = 0; i < res?.data?.length; i++) {
                    countReply.push(false)
                }
            }
        )

    }, [newComment])

    function handleOpenSetting(id, comment) {
        props.handleOpenSetting(id, comment)

    }

    const handleOpenComment = async (i, id) => {
        setParentId(id)
        const newList = []
        await countReply.map((item, index) => {
            if (index == i) {
                newList.push(true)
            } else {
                newList.push(false)
            }
        })
        setCountReply(newList)


    }

    const onViewProfile = (id) => {
        if (id == props.userId) {
            navigation.navigate("Profile")
        } else {
            navigation.navigate("ProfileOther", {
                id: id
            })
        }
    }

    const areaComment = comment?.map((item, index) => {
        return (
            <View key={item.id}>
                <View className=" mb-5">
                    <View className="flex-row items-start">
                        <View className="mr-3">
                            <Image
                                className='rounded-full w-8 h-8'
                                source={item?.userId?.avatar ? { uri: item?.userId?.avatar } : avatarDefault}
                            />
                        </View>
                        <View className=" px-2 py-1 bg-gray-100 text-gray-700 rounded-2xl mb-1 flex-row">
                            <View
                                className="py-3 px-2 mr-2 flex-initial"
                            >
                                <Text className="font-semibold pb-2">{item?.userId?.username}</Text>
                                <Text>{item?.comment}</Text>

                            </View>
                            {item.isEdit == 1 &&

                                <View>
                                    <TouchableOpacity
                                        onPress={() => handleOpenSetting(item?.id, item?.comment)}
                                    >
                                        <EllipsisHorizontalIcon color="black" />
                                    </TouchableOpacity>

                                </View>
                            }

                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => handleOpenComment(index, item.id)}>
                        <Text className="ml-14 text-gray-400">Phản hồi</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    {
                        item?.children?.map((rep) => {
                            return (
                                <View className="ml-10  mb-4 " key={rep.id}>
                                    <View
                                        className="flex-row items-start"
                                    >

                                        {/* <Text className="mr-3 bg-red-200 px-3 py-2 ">{rep.userId}</Text> */}
                                        <View className="mr-3">
                                            <Image
                                                className='rounded-full w-8 h-8'
                                                source={rep?.userId?.avatar ? { uri: rep?.userId?.avatar } : avatarDefault}
                                            />
                                        </View>
                                        <View className=" px-2 py-1 bg-gray-100 text-gray-700 rounded-2xl mb-1 flex-row">
                                            <View
                                                className="py-3 px-2 mr-2 flex-initial"
                                            >
                                                <Text className="font-semibold pb-2">{rep?.userId?.username}</Text>
                                                <Text>{rep?.comment}</Text>

                                            </View>
                                            {rep.isEdit == 1 &&

                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => handleOpenSetting(rep?.id, rep?.comment)}
                                                    >
                                                        <EllipsisHorizontalIcon color="black" />
                                                    </TouchableOpacity>

                                                </View>
                                            }

                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleOpenComment(index, item.id)}>
                                        <Text className="ml-14 text-gray-400">Phản hồi</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        })
                    }
                    {
                        countReply[index] &&

                        <View className="ml-10 flex-row items-center px-4   mb-3 bg-gray-100 justify-between rounded-2xl">
                            <TextInput
                                className=" py-4 mr-2 flex-1 text-gray-700"
                                onChangeText={text => setTextComment(text)}
                                value={textComment}
                                placeholder='Nhập bình luận' />

                            <TouchableOpacity
                                onPress={() => handleSubmitComment()}
                            >
                                <PaperAirplaneIcon color="rgb(250 204 21)" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>

            </View>
        )
    })

    const shortComment = comment?.map((item, index) => {
        if (index == 0) {
            return (
                <View key={item.id}>
                    <View className=" mb-5">
                        <View className="flex-row items-start">
                            <TouchableOpacity className="mr-3"
                                onPress={() => onViewProfile(item.id)}>
                                <Image
                                    className='rounded-full w-8 h-8'

                                    source={item?.userId?.avatar ? { uri: item?.userId?.avatar } : avatarDefault}
                                />
                            </TouchableOpacity>
                            <View className=" px-2 py-1 bg-gray-100 text-gray-700 rounded-2xl mb-1 flex-row">
                                <View
                                    className="py-3 px-2 mr-2 flex-initial"
                                >
                                    <Text className="font-semibold pb-2">{item?.userId?.username}</Text>
                                    <Text>{item?.comment}</Text>

                                </View>
                                {item.isEdit == 1 &&

                                    <View>
                                        <TouchableOpacity
                                            onPress={() => handleOpenSetting(item?.id, item?.comment)}
                                        >
                                            <EllipsisHorizontalIcon color="black" />
                                        </TouchableOpacity>

                                    </View>
                                }

                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => handleOpenComment(index, item?.id)}>
                            <Text className="ml-14 text-gray-400">Phản hồi</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        {
                            item?.children?.map((rep, index) => {
                                if (index == 0) {

                                    return (
                                        <View className="ml-10  mb-4 " key={rep.id}>
                                            <View
                                                className="flex-row items-start"
                                            >

                                                {/* <Text className="mr-3 bg-red-200 px-3 py-2 ">{rep.userId}</Text> */}
                                                <TouchableOpacity className="mr-3">
                                                    <Image
                                                        className='rounded-full w-8 h-8'
                                                        source={rep?.userId?.avatar ? { uri: rep?.userId?.avatar } : avatarDefault}
                                                    />
                                                </TouchableOpacity>
                                                <View className=" px-2 py-1 bg-gray-100 text-gray-700 rounded-2xl mb-1 flex-row">
                                                    <View
                                                        className="py-3 px-2 mr-2 flex-initial"
                                                    >
                                                        <Text className="font-semibold pb-2">{rep?.userId?.username}</Text>
                                                        <Text>{rep?.comment}</Text>

                                                    </View>
                                                    {rep.isEdit == 1 &&

                                                        <View>
                                                            <TouchableOpacity
                                                                onPress={() => handleOpenSetting(rep?.id, rep?.comment)}
                                                            >
                                                                <EllipsisHorizontalIcon color="black" />
                                                            </TouchableOpacity>

                                                        </View>
                                                    }

                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => handleOpenComment(index, item.id)}>
                                                <Text className="ml-14 text-gray-400">Phản hồi</Text>
                                            </TouchableOpacity>
                                        </View>

                                    )
                                }
                            })
                        }

                    </View>
                    {
                        countReply[index] &&

                        <View className="ml-10 flex-row items-center px-4   mb-3 bg-gray-100 justify-between rounded-2xl">
                            <TextInput
                                className=" py-4 mr-2 flex-1 text-gray-700"
                                value={textComment}
                                onChangeText={text => setTextComment(text)}
                                placeholder='Nhập bình luận' />

                            <TouchableOpacity
                                onPress={() => handleSubmitComment()}
                            >
                                <PaperAirplaneIcon color="rgb(250 204 21)" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )
        }
    })


    const handleSubmitComment = () => {
        const body = {
            "userId": userId,
            "postId": props.id,
            "comment": textComment,
            "parentId": parentId
        }
        console.log(body);
        setTextComment("")
        postComment(body).then(res => {
            setNewComment(!newComment)

        }).catch(err => {
            setTextComment("")
            alert("Đăng tải bình luận không thành công")
        })


    }

    return (

        <SafeAreaView className="bg-white flex-1">
            <View className='p-3'>
                <View className="flex-row items-center px-4   mb-3 bg-gray-100 justify-between rounded-2xl">
                    <TextInput
                        className=" py-4 mr-2 flex-1 text-gray-700"
                        value={textComment}
                        onChangeText={text => { setTextComment(text), setParentId(0) }}
                        placeholder='Nhập bình luận' />
                    <TouchableOpacity
                        onPress={() => handleSubmitComment()}
                    >
                        <PaperAirplaneIcon color="rgb(250 204 21)" />
                    </TouchableOpacity>
                </View>
                {isShort &&
                    <View>{shortComment}</View>
                }
                {!isShort &&
                    <View>
                        {areaComment}
                    </View>
                }
                {
                    comment.length > 1 && isShort ? (
                        <TouchableOpacity
                            onPress={() => setIsShort(false)}
                            className="mb-5 mt-3">
                            <Text className="text-center">Xem thêm</Text>
                        </TouchableOpacity>
                    ) :
                        <View className="mb-5"></View>
                }
            </View>



        </SafeAreaView>

    )


}


export default Comment