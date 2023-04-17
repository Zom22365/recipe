import { View, Text } from 'react-native'
import React, { useState } from 'react'
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

const SearchScreen = () => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    list = [1, 2, 3, 4]
    const [keyword, setKeyword] = useState("")
    const [searchResult, setSearchResult] = useState("")
    const handleSearch = () => {
        Keyboard.dismiss()
        if (keyword !== "") {
            console.log(keyword)
            const result = list.map((item, index) => {
                return (
                    <CardFoodComponent key={index} />
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
                                <Text className="font-bold text-xl mb-3">Kết quả: {keyword}</Text> : ""
                        }
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                searchResult ?
                                    searchResult :
                                    data.map((item, index) => {
                                        return (
                                            <CardFoodComponent key={index} />
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