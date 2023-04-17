import { View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import { MagnifyingGlassIcon, Bars3Icon } from 'react-native-heroicons/solid';
import { BellIcon, UserCircleIcon } from 'react-native-heroicons/outline';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { StyleSheet } from 'react-native';

const HeaderComponent = () => {
    const navigation = useNavigation();

    return (
        // <View className="flex-row justify-between mt-7 px-3 py-3 bg-white">
        // <View>
        <TouchableOpacity
            // className="mt-7 px-3 py-3"
            className="px-3 pb-3"
            onPress={() => navigation.navigate('Home')}>
            <Image source={require('../assets/images/logo.png')}
                style={{ width: 80, height: 24 }} />
        </TouchableOpacity>
        // </View>

        // </View>
    )
}



export default HeaderComponent