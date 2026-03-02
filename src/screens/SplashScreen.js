import React, { useEffect } from 'react';
import { View, Image, StyleSheet, StatusBar } from 'react-native';
import * as SplashScreenExpo from 'expo-splash-screen';
import APP_CONFIG from '../config/app.config';

export default function SplashScreen() {
    useEffect(() => {
        // Keep splash visible for 2.5 seconds then navigate
        const timer = setTimeout(() => {
            SplashScreenExpo.hideAsync();
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={APP_CONFIG.PRIMARY_COLOR} />
            <View style={styles.logoContainer}>
                {/* Replace with your actual logo image */}
                <View style={styles.logoPlaceholder}>
                    <Image
                        source={require('../../assets/icon.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </View>
                <View style={styles.brandBar} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_CONFIG.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoPlaceholder: {
        width: 160,
        height: 160,
        borderRadius: 32,
        backgroundColor: APP_CONFIG.SECONDARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
    },
    logo: {
        width: 130,
        height: 130,
    },
    brandBar: {
        marginTop: 24,
        width: 60,
        height: 4,
        borderRadius: 2,
        backgroundColor: APP_CONFIG.SECONDARY_COLOR,
        opacity: 0.7,
    },
});
