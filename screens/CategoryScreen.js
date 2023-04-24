import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import { ArrowLeftIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import { ScrollView } from 'react-native'
import FooterComponent from '../components/FooterComponent'
import CardFoodComponent from '../components/CardFoodComponent'
import { getCategoryById } from '../api/apiCategory'
import { getRecipeis } from '../api/apiRecipe'

const CategoryScreen = ({ }) => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const [recipes, setRecipes] = useState({})
    const [nameCate, setNameCate] = useState("")
    const router = useRoute()
    const navigation = useNavigation();

    const { id } = router.params

    useEffect(() => {
        getCategoryById(id).then(res => {
            setNameCate(res?.data?.name)
        })

        getRecipeis(id).then(res => {
            console.log(res?.data);
            setRecipes({ ...recipes, listRecipe: res?.data })
        })

    }, [])
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <SafeAreaView className="flex-1 bg-white" >
                <HeaderComponent />

                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View className="mx-3">
                        <Text className="font-bold text-xl mb-3">Danh mục: {nameCate}</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {
                                recipes.listRecipe &&
                                recipes.listRecipe.map((item, index) => {
                                    return (
                                        <CardFoodComponent key={item.id} {...item} />
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

export default CategoryScreen