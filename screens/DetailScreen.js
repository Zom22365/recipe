import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';

const DetailScreen = () => {
    const router = useRoute()
    const navigation = useNavigation();

    const { idPost } = router.params
    return (
        <View>
            <Text>DetailScreen</Text>
        </View>
    )
}

export default DetailScreen