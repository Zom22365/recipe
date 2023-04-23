import React, { useEffect, useState } from 'react';
import AppNavigation from './navigation/appNavigation';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from './api/apiAcount';
import messaing from "@react-native-firebase/messaging"
import { Alert } from 'react-native';
export default function App() {
  const tokenDevice = async () => {
    return await messaing().getToken()
  }
  console.log(tokenDevice)
  messaing().onMessage(async remoteMessage => {
    Alert.alert('Bạn có một thông báo mới!', JSON.stringify(remoteMessage));
  });
  return (
    <AppNavigation />
  );
}

