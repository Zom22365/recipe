import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const CategoryComponent = (props) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Category', {
                id: props.category.id
            })}
        >
            <View className="my-2 mx-2" style={{ width: 110, alignItems: 'center' }}>
                <View >
                    <Image style={{ borderRadius: 100, width: 100, height: 100 }} source={props?.category?.img} />
                </View>
                <Text className="text-center py-1 font-bold">{props.category.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryComponent