import { View, Text } from 'react-native'
import React, { useState } from 'react'
import com from '../data/Comment.json'
import { SafeAreaView } from 'react-native'
import { TextInput } from 'react-native'

const Comment = () => {
    const [comment, setComment] = useState(com)

    const areaComment = comment.map((item, index) => {
        return (
            <View key={item.commentId}>
                <View className="flex-row mb-5 items-center">
                    <Text className="mr-3 bg-red-200 px-3 py-2 ">{item.userId}</Text>
                    <Text className="">{item.commet}</Text>
                </View>
                <View>
                    {
                        item.reply.map((rep, index) => {
                            return (
                                <View className="ml-10 mb-4 flex-row items-center" key={rep.commentId}>
                                    <Text className="mr-3 bg-red-200 px-3 py-2 ">{rep.userId}</Text>
                                    <Text>{rep.commet}</Text>
                                </View>
                            )
                        })
                    }
                    <TextInput
                        className="ml-10 py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                        placeholder="Nhập bình luận" />
                </View>
            </View>
        )
    })

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className='p-3'>
                <Text className="mb-10">Ví dụ comment đây</Text>
                <View>
                    <TextInput
                        className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"

                        placeholder='Nhập bình luận' />
                </View>
                <View>{areaComment}</View>

            </View>

        </SafeAreaView>
    )
}

export default Comment