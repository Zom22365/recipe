import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CategoryComponent = () => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Category', {
                id: 2
            })}
        >
            <View className="my-2 mx-2" style={{ width: 110, alignItems: 'center' }}>
                <View >
                    <Image style={{ borderRadius: 100, width: 100, height: 100 }} source={require('../assets/images/food_3.png')} />
                </View>
                <Text className="text-center py-1 font-bold">Mì</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryComponent