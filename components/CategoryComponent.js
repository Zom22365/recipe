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
            <View className="my-3 mx-2" style={{ width: 110, alignItems: 'center' }}>
                {/* <View >
                    <Image style={{ borderRadius: 100, width: 100, height: 100 }} source={props?.category?.img} />
                </View> */}
                <View className="bg-slate-100 px-2 py-3" style={{ borderRadius: 50, width: 100 }} >
                    {/* <Text className="text-center py-1 font-bold">Bánh kem</Text> */}
                    <Text className="text-center py-1 font-bold">{props.category.name}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryComponent