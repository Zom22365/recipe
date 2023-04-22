import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderComponent from '../components/HeaderComponent';
import Swiper from 'react-native-swiper';

import { ScrollView } from 'react-native';
import BannerComponent from '../components/BannerComponent';
import CategoryComponent from '../components/CategoryComponent';
import CardFoodComponent from '../components/CardFoodComponent';
import FooterComponent from '../components/FooterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getCategories } from '../api/apiCategory';
import { getRecipeTrending } from '../api/apiTrending';

const HomeScreen = () => {
    const [categories, setCategoies] = useState([])
    const [trending, setTrending] = useState([])

    useEffect(() => {
        const res = getCategories();
        setCategoies(res);

        const resTrending = getRecipeTrending();
        setTrending(resTrending)

    }, [])


    return (
        <SafeAreaView className="flex-1 bg-white" >

            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <HeaderComponent />

                <View style={{ height: 418 }}>
                    <Swiper autoplay={false} >
                        {trending.map((item, index) => {
                            if (index < 3) {
                                return (<BannerComponent key={index} {...item} />)
                            }
                        })}
                    </Swiper>
                </View>
                <View>
                    <Text className="font-bold text-2xl mx-3">Danh mục</Text>

                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} >
                        {
                            categories.map((item, index) => {
                                return (
                                    <CategoryComponent key={item.id} category={item} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View className="mx-3 pb-10">
                    <Text className="font-bold text-2xl mb-3">Công thức được xem nhiều</Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {
                            trending.map((item, index) => {
                                return (
                                    <CardFoodComponent key={index} {...item} />
                                )
                            })
                        }

                    </View>
                </View>
            </ScrollView>
            <FooterComponent />
        </SafeAreaView>

    )
}



export default HomeScreen