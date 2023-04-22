import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ArrowLeftIcon, BookmarkIcon, EllipsisHorizontalIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import Comment from './Comment';

const DetailScreen = () => {
    const [avatar, setAvatar] = useState(require('../assets/images/user_default.png'))
    const [thumnail, setThumnail] = useState(require('../assets/images/food_11.png'))

    const detailPost = {
        id: '1',
        name: "Bánh kem tươi mức dâu",
        use: {
            'id': 1,
            'usemane': 'Tom haley',
            'avatar': null,
        },
        decr: 'Tôi đã tìm ra công thức hết sức tuyệt vời cho món bánh kem dâu. Tôi muốn chi sẻ đến mọi người',
        img: '../ assets / images / user_default.png',
        time: '20 phút',
        mainFood: [
            '400g bột mì',
            '3 quản trứng'
        ],
        branchFood: [
            '200g đường',
            '500ml sữa tươi'
        ],
        guide: [
            'Cho bột vào tô, đổ nước vừa đủ, nhào đều',
            'Bột mịn cho thêm trứng, đường, sữa vào tiếp tục nhào',
            'Cho men nở vào nhào đểu, và ủ 2 tiếng',
            'Bột nở cho vào lò nướng',
            'Nướng trong vòng 1 tiếng là có thể thưởng thức',
            'Cho bột vào tô, đổ nước vừa đủ, nhào đều',
            'Bột mịn cho thêm trứng, đường, sữa vào tiếp tục nhào',
            'Cho men nở vào nhào đểu, và ủ 2 tiếng',
            'Bột nở cho vào lò nướng',
            'Nướng trong vòng 1 tiếng là có thể thưởng thức',
            'Cho bột vào tô, đổ nước vừa đủ, nhào đều',
            'Bột mịn cho thêm trứng, đường, sữa vào tiếp tục nhào',
            'Cho men nở vào nhào đểu, và ủ 2 tiếng',
            'Bột nở cho vào lò nướng',
            'Nướng trong vòng 1 tiếng là có thể thưởng thức'
        ]
    }
    const router = useRoute()
    const navigation = useNavigation();

    const { id } = router.params
    console.log(id)
    return (
        <SafeAreaView
            className="bg-white flex-1">
            <ScrollView className=" bg-white" showsVerticalScrollIndicator={false}>
                <View className="flex-row justify-start mb-3"
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Profile')}
                        className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-3">
                        <ArrowLeftIcon size="20" color="black" />
                    </TouchableOpacity>
                    <Text className='ml-16 mt-2 text-lg font-semibold'>Chi tiết công thức</Text>
                </View>
                <View className="mx-3">
                    <View style={style.border}>
                        <View className="flex-row justify-end mb-1">

                            <TouchableOpacity
                                className='bg-yellow-400 p-2 rounded-full'>
                                <BookmarkIcon size="24" color="black" />
                            </TouchableOpacity>
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
                                <Text className="text-base" >{detailPost.use.usemane}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text className="mx-3 text-base my-3">{detailPost.decr}</Text>
                <View className="mx-3 mb-3">
                    <Image style={{ width: '100%' }} source={thumnail} />
                </View>
                <Text className="mx-3 mb-3 text-gray-400">Thời gian thực hiện: {detailPost.time}</Text>
                <View>
                    <Text className="mx-3 mb-3 font-semibold text-2xl">Nguyên liệu</Text>
                    <Text className="mx-3 mb-2 font-semibold text-xl">Nguyên liệu chính</Text>
                    {
                        detailPost.mainFood.map((item, index) => {
                            return (
                                <View className="mx-3 mb-2 flex-row items-center">
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
                    {
                        detailPost.branchFood.map((item, index) => {
                            return (
                                <View className="mx-3 mb-2 flex-row items-center">
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
                    {
                        detailPost.guide.map((step, index) => {
                            return (
                                <View className="flex-row  mb-2">
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
                <Comment />
            </ScrollView>
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
    },
})



export default DetailScreen