import { View, Text } from 'react-native'
import React from 'react'
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

const CategoryScreen = ({ }) => {
    data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    const router = useRoute()
    const navigation = useNavigation();

    const { id } = router.params

    console.log(id);
    return (
        <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}>
            <SafeAreaView className="flex-1 bg-white" >
                <HeaderComponent />

                <ScrollView showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>

                    <View className="mx-3">
                        <Text className="font-bold text-xl mb-3">Danh mục:</Text>
                        <View className='flex-row justify-between flex-wrap'>
                            {
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

export default CategoryScreen