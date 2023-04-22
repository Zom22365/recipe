import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { PaperAirplaneIcon } from 'react-native-heroicons/solid';

import com from '../data/Comment.json'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native';

const Comment = () => {
    const [comment, setComment] = useState(com)
    const [countReply, setCountReply] = useState([])
    const [isShort, setIsShort] = useState(true)
    const [textComment, setTextComment] = useState("");

    for (let i = 0; i < com.length; i++) {
        countReply.push(false)
        // console.log(countReply)
    }

    const handleOpenComment = async (i) => {
        const newList = []
        await countReply.map((item, index) => {
            if (index == i) {
                newList.push(true)
            } else {
                newList.push(false)
            }
        })

        console.log(newList)

        setCountReply(newList)


    }
    const areaComment = comment.map((item, index) => {
        return (
            <View key={item.commentId}>
                <View className=" mb-5">
                    <View className="flex-row items-start">
                        <Text className="mr-3 bg-red-200 px-3 py-2 ">{item.userId}</Text>
                        <View
                            className="py-4 px-4 flex-1 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                        >
                            <Text
                            >{item.commet}</Text>

                        </View>

                    </View>
                    <TouchableOpacity
                        onPress={() => handleOpenComment(index)}>
                        <Text className="ml-14 text-gray-400">Phản hồi</Text>
                    </TouchableOpacity>

                </View>
                <View>
                    {
                        item.reply.map((rep, index) => {
                            return (
                                <View className="ml-10  mb-4 " key={rep.commentId}>
                                    <View
                                        className="flex-row items-start"
                                    >

                                        <Text className="mr-3 bg-red-200 px-3 py-2 ">{rep.userId}</Text>
                                        <View
                                            className="py-4 px-4 flex-1 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                                        >
                                            <Text
                                            >{rep.commet}</Text>

                                        </View>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => handleOpenComment(index)}>
                                        <Text className="ml-14 text-gray-400">Phản hồi</Text>
                                    </TouchableOpacity>
                                </View>

                            )
                        })
                    }

                </View>
                {
                    countReply[index] &&

                    <View className="ml-10 flex-row items-center px-4   mb-3 bg-gray-100 justify-between rounded-2xl">
                        <TextInput
                            className=" py-4 mr-2 flex-1 text-gray-700"
                            onChangeText={text => setTextComment(text)}
                            placeholder='Nhập bình luận' />

                        <TouchableOpacity
                            onPress={() => console.log(textComment)}
                        >
                            <PaperAirplaneIcon color="rgb(250 204 21)" />
                        </TouchableOpacity>
                    </View>
                }
            </View>
        )
    })

    const shortComment = comment.map((item, index) => {
        if (index == 0) {
            return (
                <View key={item.commentId}>
                    <View className=" mb-5">
                        <View className="flex-row items-start">
                            <Text className="mr-3 bg-red-200 px-3 py-2 ">{item.userId}</Text>
                            <View
                                className="py-4 px-4 flex-1 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                            >
                                <Text
                                >{item.commet}</Text>

                            </View>

                        </View>
                        <TouchableOpacity
                            onPress={() => handleOpenComment(index)}>
                            <Text className="ml-14 text-gray-400">Phản hồi</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        {
                            item.reply.map((rep, index) => {
                                if (index == 0) {

                                    return (
                                        <View className="ml-10  mb-4 " key={rep.commentId}>
                                            <View
                                                className="flex-row items-start"
                                            >

                                                <Text className="mr-3 bg-red-200 px-3 py-2 ">{rep.userId}</Text>
                                                <View
                                                    className="py-4 px-4 flex-1 bg-gray-100 text-gray-700 rounded-2xl mb-1"
                                                >
                                                    <Text
                                                    >{rep.commet}</Text>

                                                </View>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => handleOpenComment(index)}>
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
                                onChangeText={text => setTextComment(text)}
                                placeholder='Nhập bình luận' />

                            <TouchableOpacity
                                onPress={() => console.log(textComment)}
                            >
                                <PaperAirplaneIcon color="rgb(250 204 21)" />
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            )
        }
    })



    return (
        <SafeAreaView className="bg-white flex-1">
            <View className='p-3'>
                <View className="flex-row items-center px-4   mb-3 bg-gray-100 justify-between rounded-2xl">
                    <TextInput
                        className=" py-4 mr-2 flex-1 text-gray-700"
                        onChangeText={text => setTextComment(text)}
                        placeholder='Nhập bình luận' />

                    <TouchableOpacity
                        onPress={() => console.log(textComment)}
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
                            onPress={() => setIsShort(false)}>
                            <Text className="text-center">Xem thêm</Text>
                        </TouchableOpacity>
                    ) :
                        <></>
                }
            </View>

        </SafeAreaView>
    )


}


export default Comment