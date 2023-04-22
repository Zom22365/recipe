import { View, TouchableOpacity, Image, Text } from 'react-native'
import React, { useState } from 'react'
import { MagnifyingGlassIcon, BellIcon, HomeIcon, UserCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import { BellIcon as Bell, UserCircleIcon as User, PlusCircleIcon as Plus, HomeIcon as Home } from 'react-native-heroicons/outline';
import { FlatList } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { style } from 'deprecated-react-native-prop-types/DeprecatedTextPropTypes';
import { StyleSheet } from 'react-native';

const FooterComponent = () => {
    const navigation = useNavigation();
    const route = useRoute()


    const [activeScreen, setActiveScreen] = useState(route.name)
    return (
        <View style={styles.border} className="flex-row justify-between px-5 pt-3 bg-white">
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
                {activeScreen === "Home" ? <HomeIcon size="28" color="black" /> :
                    <Home size="28" color="gray" />

                }
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate('Search')}>
                {activeScreen === "Search" ? <MagnifyingGlassIcon size="28" color="black" /> :
                    <MagnifyingGlassIcon size="28" color="gray" />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Add')}
            >
                {activeScreen === "Add" ? <PlusCircleIcon size="28" color="black" /> :
                    <Plus size="28" color="black" />

                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Bell')}>
                {activeScreen === "Bell" ? <BellIcon size="28" color="black" /> :
                    <Bell size="28" color="gray" />
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
            >
                {activeScreen === "Profile" ? <UserCircleIcon size="28" color="black" /> :
                    <User size="28" color="gray" />
                }
            </TouchableOpacity>

        </View>
    )
}
const styles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderColor: '#fff',
        borderTopColor: '#adabab'
    },

    btnAdd: {
        position: 'absolute',
        top: '-100%',
        // backgroundColor: '#fff',
        alignSelf: 'center',
    }
})

export default FooterComponent