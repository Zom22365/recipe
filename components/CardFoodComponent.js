import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { BookmarkIcon as BookMark } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

const CardFoodComponent = (props) => {
    const navigation = useNavigation();
    const avatar = props?.chef?.img ? { uri: `${props?.chef?.img}` } : require('../assets/images/user_default.png')


    return (
        <TouchableOpacity
            className="bg-white rounded-md"
            style={[style.shadow, { width: '48%' }, { marginBottom: 16 }]}
            onPress={() => navigation.navigate('Detail', {
                id: props.id
            })}>
            <View >
                <View>
                    <View >
                        <Image
                            className="rounded-md"
                            style={{ width: "100%", height: 150 }}
                            source={{ uri: `${props?.img}` }} />
                    </View>
                    <Text
                        className='px-1 pt-2'
                        style={{ color: '#E42C2C', fontWeight: '500' }}
                    >
                        {props.timeCooking}
                    </Text>
                    <Text
                        className='px-1 pb-1 text-lg'
                        style={{ fontWeight: '700' }}
                    >
                        {props.content}
                    </Text>
                </View>
                {/* <View className='px-1 pb-2 flex-row'>
                    <Image
                        className='rounded-full w-6 h-6 mr-2'
                        source={avatar} />
                    <Text className='pt-1'>{props?.chef?.name}</Text>
                </View> */}
            </View>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    shadow: {
        shadowColor: '#171717',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
    }
})

export default CardFoodComponent