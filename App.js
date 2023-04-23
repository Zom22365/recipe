import React, { useEffect, useState } from 'react';
import AppNavigation from './navigation/appNavigation';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile } from './api/apiAcount';

export default function App() {

  return (
    <AppNavigation />
  );
}

