import { View, Text } from 'react-native'
import React from 'react'
import { themeColors } from '../theme'
import { Image } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

const BannerComponent = () => {
    return (

        <TouchableWithoutFeedback onPress={() => alert("ok")}>
            <View className="rounded-md mx-3" style={{ backgroundColor: themeColors.bg }}>
                <View className="flex-row">
                    <Image className="flex-1 rounded-md" style={{ height: 250 }} source={require('../assets/images/food_11.png')} />
                </View>
                <Text className="font-bold text-2xl text-black mx-8 my-5"
                >Bánh Kem Tươi Mứt Dâu</Text>
                <Text className="mx-8 pb-5 overflow-hidden" style={{ height: 80 }}>Look no further for a creamy and ultra smooth classic cheesecake recipe! no one ca deny its simple decadence. Look no further for a creamy and ultra smooth classic cheesecake recipe! no one ca deny its simple decadence.</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default BannerComponent