import { View, Text, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfile from '../screens/EditProfile';
import UploadImage from '../screens/UploadImage';
import SearchScreen from '../screens/SearchScreen';
import ChangePassword from '../screens/ChangePassword';
import CategoryScreen from '../screens/CategoryScreen';
import DetailScreen from '../screens/DetailScreen';
import Comment from '../screens/Comment';
import FormPostScreen from '../screens/FormPostScreen';
import NotiComponent from '../screens/NotiComponent';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from '../api/apiAcount';
import messaing from '@react-native-firebase/messaging'
const Stack = createNativeStackNavigator();

export default function AppNavigation(props) {

    messaing().getToken().then(token=>{
        console.log(token)
    }).catch(e=>{
        console.log(e)
    })
    messaing().onMessage(async remoteMessage => {
        Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      });

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" >
                <Stack.Screen name="Home" options={{ headerShown: false, gestureEnabled: false }} component={HomeScreen} />
                <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
                <Stack.Screen name="Login" options={{ headerShown: false, gestureEnabled: false }} component={LoginScreen} />
                <Stack.Screen name="SignUp" options={{ headerShown: false, gestureEnabled: false }} component={SignUpScreen} />
                <Stack.Screen name="ForgotPassword" options={{ headerShown: false, gestureEnabled: false }} component={ForgotPasswordScreen} />
                <Stack.Screen name="Profile" options={{ headerShown: false, gestureEnabled: false }} component={ProfileScreen} />
                <Stack.Screen name="EditProfile" options={{ headerShown: false, gestureEnabled: false }} component={EditProfile} />
                <Stack.Screen name="UploadImage" options={{ headerShown: false, gestureEnabled: false }} component={UploadImage} />
                <Stack.Screen name="Search" options={{ headerShown: false, gestureEnabled: false }} component={SearchScreen} />
                <Stack.Screen name="ChangePassword" options={{ headerShown: false, gestureEnabled: false }} component={ChangePassword} />
                <Stack.Screen name="Category" options={{ headerShown: false, gestureEnabled: false }} component={CategoryScreen} />
                <Stack.Screen name="Detail" options={{ headerShown: false, gestureEnabled: true }} component={DetailScreen} />
                <Stack.Screen name="Bell" options={{ headerShown: false, gestureEnabled: true }} component={NotiComponent} />
                <Stack.Screen name="Add" options={{ headerShown: false, gestureEnabled: true }} component={FormPostScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}