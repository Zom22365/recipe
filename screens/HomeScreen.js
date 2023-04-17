import { View, Text } from 'react-native'
import React from 'react'
import HeaderComponent from '../components/HeaderComponent';
import Swiper from 'react-native-swiper';

import { ScrollView } from 'react-native';
import BannerComponent from '../components/BannerComponent';
import CategoryComponent from '../components/CategoryComponent';
import CardFoodComponent from '../components/CardFoodComponent';
import FooterComponent from '../components/FooterComponent';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    data = [1, 2, 3, 4]
    return (
        <SafeAreaView className="flex-1 bg-white" >
            {/* <View className="flex-1 bg-white" > */}

            <ScrollView showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>
                <HeaderComponent />

                <View style={{ height: 418 }}>
                    <Swiper autoplay={false} >
                        {data.map((item, index) => {
                            return (<BannerComponent key={index} />)
                        })}
                    </Swiper>
                </View>
                <View>
                    <Text className="font-bold text-2xl mx-3">Danh mục</Text>

                    <ScrollView horizontal={true}
                        showsHorizontalScrollIndicator={false} >
                        {
                            data.map((item, index) => {
                                return (
                                    <CategoryComponent key={index} />
                                )
                            })
                        }
                    </ScrollView>
                </View>
                <View className="mx-3 pb-10">
                    <Text className="font-bold text-2xl mb-3">Công thức mới nhất</Text>
                    <View className='flex-row justify-between flex-wrap'>
                        {
                            data.map((item, index) => {
                                return (
                                    <CardFoodComponent key={index} />
                                )
                            })
                        }

                    </View>
                </View>
            </ScrollView>
            <FooterComponent />
            {/* </View> */}
        </SafeAreaView>

    )
}



export default HomeScreen