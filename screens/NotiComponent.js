import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
import { TextInput } from 'react-native'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { TouchableOpacity } from 'react-native'
import CardFoodComponent from '../components/CardFoodComponent'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { getRecipeTrending, getRecipeTrendingByLike } from '../api/apiTrending'
import { getRecipeByKeyWord } from '../api/apiSearch'

const NotiComponent = () => {
    const [trending, setTrending] = useState([])
    const [searchResult, setSearchResult] = useState("")

    useEffect(() => {


        getRecipeTrendingByLike().then(
            res => {
                const data = res.data
                setTrending(data)
            }
        ).catch(err => {
            console.log("failed");
        })

    }, [])

    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <SafeAreaView className="flex-1 bg-white" >
                <HeaderComponent />
                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View className="mx-3 mt-2">
                        <View className="flex-row">

                            <Image className="w-7 h-7 mr-2" source={require('../assets/images/heart-app-icon-3.jpg')} />
                            <Text className="font-bold text-2xl mb-3">Xu hướng</Text>
                        </View>

                        <View className='flex-row justify-between flex-wrap'>
                            {
                                trending.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={index} {...item} />
                                    )
                                })

                            }

                        </View>
                    </View>

                </ScrollView>

                <FooterComponent />
            </SafeAreaView>
        </TouchableWithoutFeedback>

    )
}

export default NotiComponent