import { Platform } from 'react-native';

// Central app configuration — edit this file to customize the app

const APP_CONFIG = {
    // Shopify store URL
    SHOPIFY_STORE_URL: 'https://cadfour.com/',

    // App display name
    APP_NAME: 'Cadfour',

    // Brand colors
    PRIMARY_COLOR: '#185ba4',
    SECONDARY_COLOR: '#ffffff',

    // Feature flags
    ENABLE_BIOMETRIC_LOGIN: true,

    // Firebase push notification config
    // Replace with your actual Firebase project config
    FIREBASE_CONFIG: {
        apiKey: Platform.select({
            ios: 'AIzaSyBJiEByz6AKFrbdjZH_498_OcE9JcV1ByM',
            android: 'AIzaSyB7NAWzVLNcD7XVpBCpgoVARxvdnWmVq1o',
        }),
        authDomain: 'cadfour-app.firebaseapp.com',
        projectId: 'cadfour-app',
        storageBucket: 'cadfour-app.firebasestorage.app',
        messagingSenderId: '962581900304',
        appId: Platform.select({
            ios: '1:962581900304:ios:0980f4c3790d270ba46e95',
            android: '1:962581900304:android:03bc95acde5be2c5a46e95',
        }),
    },
};

export default APP_CONFIG;
