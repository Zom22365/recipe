import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import { BookmarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';

const CardFoodComponent = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            className="bg-white rounded-md"
            style={[style.shadow, { width: '48%' }, { marginBottom: 16 }]}
            onPress={() => navigation.navigate('Detail', {
                id: 2
            })}>
            <View>
                <View >
                    <Image
                        className="rounded-md"
                        style={{ width: "100%", height: 150 }}
                        source={require('../assets/images/food_4.png')} />
                    <TouchableOpacity
                        className='bg-white rounded-full'
                        style={{ position: 'absolute', right: 8, top: 8, padding: 5 }} >

                        <BookmarkIcon size="20" color="black" />

                    </TouchableOpacity>
                </View>
                <Text
                    className='px-1 pt-2'
                    style={{ color: '#E42C2C', fontWeight: '500' }}
                >
                    20 phút
                </Text>
                <Text
                    className='px-1 pb-1 text-lg'
                    style={{ fontWeight: '700' }}
                >Cá hồi sốt mayo</Text>
                <View className='px-1 pb-2 flex-row'>
                    <Image
                        className='rounded-full w-6 h-6 mr-2'
                        source={require('../assets/images/chef_6.png')} />
                    <Text className='pt-1'>Tome haley</Text>
                </View>
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