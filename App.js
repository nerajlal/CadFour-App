import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AppNavigator from './src/navigation/AppNavigator';

// Keep splash screen visible until we're ready
SplashScreen.preventAutoHideAsync();

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

async function registerForPushNotificationsAsync() {
    if (!Device.isDevice) return null;

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        console.log('Push notification permission not granted');
        return null;
    }

    try {
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('Expo Push Token:', token);
        return token;
    } catch (e) {
        console.log('Error getting push token:', e);
        return null;
    }
}

export default function App() {
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        // Register for push notifications
        registerForPushNotificationsAsync();

        // Listener for incoming notifications (when app is foregrounded)
        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            console.log('Notification received:', notification);
        });

        // Listener for notification taps
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            const url = response.notification.request.content.data?.url;
            if (url) {
                // Deep link into the WebView — handled by MainScreen
                console.log('Deep link URL from notification:', url);
            }
        });

        // Hide expo splash after init
        SplashScreen.hideAsync();

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    return <AppNavigator />;
}
