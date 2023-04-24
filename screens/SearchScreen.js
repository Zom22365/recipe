import { View, Text } from 'react-native'
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
import { getRecipeTrending } from '../api/apiTrending'
import { getRecipeByKeyWord } from '../api/apiSearch'

const SearchScreen = () => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    list = [1, 2, 3, 4]
    const [trending, setTrending] = useState([])
    const [keyword, setKeyword] = useState("")
    const [keysearch, setKeySearch] = useState("")
    const [searchResult, setSearchResult] = useState("")

    useEffect(() => {


        getRecipeTrending().then(
            res => {
                const data = res.data
                setTrending(data)
            }
        ).catch(err => {
            console.log("failed");
        })

    }, [])


    const handleSearch = async () => {
        Keyboard.dismiss()
        if (keyword !== "") {
            setKeySearch(keyword)
            const res = await getRecipeByKeyWord(keyword)
            const data = await res.data;
            const result = data.map((item, index) => {
                return (
                    <CardFoodComponent key={index} {...item} />
                )
            })
            setSearchResult(
                result
            )
        } else {
            setSearchResult("")
        }
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <SafeAreaView className="flex-1 bg-white" >
                <HeaderComponent />
                <View className="flex-row  justify-between items-center mx-3  px-4 bg-gray-100 text-gray-700 rounded-2xl mb-3" >
                    <TextInput
                        className=" py-4 flex-grow"
                        placeholder="Nhập từ tìm kiếm..."
                        onChangeText={text => setKeyword(text)}
                    />
                    <TouchableOpacity
                        onPress={handleSearch}>
                        <MagnifyingGlassIcon width={40} size="20" color="black" />
                    </TouchableOpacity>

                </View>
                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View className="mx-3">
                        {
                            searchResult ?
                                <Text className="font-bold text-xl mb-3">Kết quả: {keysearch}</Text> : ""
                        }
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                searchResult ?
                                    searchResult :
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

export default SearchScreen