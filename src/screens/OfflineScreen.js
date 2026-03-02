import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';
import APP_CONFIG from '../config/app.config';

export default function OfflineScreen({ onRetry }) {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={APP_CONFIG.PRIMARY_COLOR} />
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>📡</Text>
            </View>
            <Text style={styles.title}>No Internet Connection</Text>
            <Text style={styles.subtitle}>
                Please check your network connection and try again.
            </Text>
            <TouchableOpacity style={styles.button} onPress={onRetry}>
                <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_CONFIG.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
    },
    icon: {
        fontSize: 52,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 15,
        color: 'rgba(255,255,255,0.8)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 12,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: {
        color: APP_CONFIG.PRIMARY_COLOR,
        fontSize: 16,
        fontWeight: '700',
    },
});
