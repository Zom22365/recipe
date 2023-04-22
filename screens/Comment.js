import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';

const Comment = () => {

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }


    useEffect(() => {
        if (requestUserPermission()) {
            messaging().getToken().then(token => {
                console.log(token)

            });
        } else {
            console.log("Failed token status", authStatus);
        }

        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;

    }, [])

    return (
        <View className="flex-1 my-20">
            <Text>Test</Text>
        </View>
    )


}


export default Comment