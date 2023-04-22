import { View, Text } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const BannerComponent = (props) => {
    const navigation = useNavigation()
    return (

        <TouchableWithoutFeedback onPress={() => navigation.navigate('Detail', {
            id: props?.id
        })}>
            <View className="rounded-md mx-3" style={{ backgroundColor: themeColors.bg }}>
                <View className="flex-row">
                    <Image className="flex-1 rounded-md" style={{ height: 250 }} source={props?.img} />
                </View>
                <Text className="font-bold text-2xl text-black mx-8 my-5"
                >{props?.name}</Text>
                <Text className="mx-8 pb-5 overflow-hidden" style={{ height: 80 }}>{props?.decr}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BannerComponent