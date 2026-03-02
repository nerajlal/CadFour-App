import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Image,
} from 'react-native';
import APP_CONFIG from '../config/app.config';

const { width, height } = Dimensions.get('window');

const slides = [
    {
        id: 1,
        title: 'Welcome to Cadfour',
        subtitle: 'Your complete shopping experience, now in your pocket.',
        icon: '🛍️',
    },
    {
        id: 2,
        title: 'Browse & Shop',
        subtitle: 'Explore our full collection of products anytime, anywhere.',
        icon: '📦',
    },
    {
        id: 3,
        title: 'Stay Updated',
        subtitle: 'Get push notifications on your orders, deals, and promotions.',
        icon: '🔔',
    },
];

export default function OnboardingScreen({ navigation }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            navigation.replace('Main');
        }
    };

    const handleSkip = () => {
        navigation.replace('Main');
    };

    const slide = slides[currentSlide];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={APP_CONFIG.PRIMARY_COLOR} />

            {/* Skip button */}
            {currentSlide < slides.length - 1 && (
                <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
                    <Text style={styles.skipText}>Skip</Text>
                </TouchableOpacity>
            )}

            {/* Slide content */}
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Text style={styles.icon}>{slide.icon}</Text>
                </View>
                <Text style={styles.title}>{slide.title}</Text>
                <Text style={styles.subtitle}>{slide.subtitle}</Text>
            </View>

            {/* Dots indicator */}
            <View style={styles.dotsContainer}>
                {slides.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            index === currentSlide ? styles.activeDot : styles.inactiveDot,
                        ]}
                    />
                ))}
            </View>

            {/* Next / Get Started button */}
            <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Text style={styles.buttonText}>
                    {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_CONFIG.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 60,
        paddingHorizontal: 32,
    },
    skipBtn: {
        alignSelf: 'flex-end',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    skipText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255,255,255,0.15)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
    },
    icon: {
        fontSize: 64,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 16,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.85)',
        textAlign: 'center',
        lineHeight: 24,
    },
    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 32,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#ffffff',
        width: 24,
    },
    inactiveDot: {
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    button: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    buttonText: {
        color: APP_CONFIG.PRIMARY_COLOR,
        fontSize: 17,
        fontWeight: '700',
    },
});
