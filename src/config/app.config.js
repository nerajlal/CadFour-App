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
        apiKey: 'YOUR_FIREBASE_API_KEY',
        authDomain: 'YOUR_PROJECT.firebaseapp.com',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_PROJECT.appspot.com',
        messagingSenderId: 'YOUR_SENDER_ID',
        appId: 'YOUR_APP_ID',
    },
};

export default APP_CONFIG;
