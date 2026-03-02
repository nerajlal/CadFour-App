import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    BackHandler,
    StatusBar,
    Platform,
    Linking,
    TouchableOpacity,
    Text,
} from 'react-native';
import { WebView } from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';
import OfflineScreen from './OfflineScreen';
import APP_CONFIG from '../config/app.config';

export default function MainScreen() {
    const webViewRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isConnected, setIsConnected] = useState(true);
    const [canGoBack, setCanGoBack] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    // Network status listener
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected);
        });
        return () => unsubscribe();
    }, []);

    // Android hardware back button handler
    useEffect(() => {
        const backAction = () => {
            if (canGoBack && webViewRef.current) {
                webViewRef.current.goBack();
                return true; // prevent app from closing
            }
            return false; // allow app to close
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => backHandler.remove();
    }, [canGoBack]);

    const handleRetry = useCallback(() => {
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
        setIsLoading(true);
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        if (webViewRef.current) {
            webViewRef.current.reload();
        }
        setTimeout(() => setRefreshing(false), 1500);
    }, []);

    // Handle external links
    const handleNavigationStateChange = useCallback((navState) => {
        setCanGoBack(navState.canGoBack);
        const url = navState.url;

        // Open external links in system browser
        if (
            !url.startsWith(APP_CONFIG.SHOPIFY_STORE_URL) &&
            !url.includes('cadfour.com') &&
            !url.includes('shopify.com') &&
            !url.includes('cdn.shopify.com') &&
            !url.startsWith('about:blank')
        ) {
            if (webViewRef.current) webViewRef.current.stopLoading();
            Linking.openURL(url).catch(() => { });
            if (canGoBack && webViewRef.current) {
                webViewRef.current.goBack();
            }
        }
    }, [canGoBack]);

    // Handle mailto: and tel: links
    const handleShouldStartLoadWithRequest = useCallback((request) => {
        const { url } = request;
        if (url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('sms:')) {
            Linking.openURL(url).catch(() => { });
            return false;
        }
        return true;
    }, []);

    if (!isConnected) {
        return <OfflineScreen onRetry={handleRetry} />;
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor={APP_CONFIG.PRIMARY_COLOR} />

            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor={APP_CONFIG.PRIMARY_COLOR}
                        colors={[APP_CONFIG.PRIMARY_COLOR]}
                    />
                }
                scrollEnabled={false}
            >
                <WebView
                    ref={webViewRef}
                    source={{ uri: APP_CONFIG.SHOPIFY_STORE_URL }}
                    style={styles.webview}
                    onLoadStart={() => setIsLoading(true)}
                    onLoadEnd={() => setIsLoading(false)}
                    onNavigationStateChange={handleNavigationStateChange}
                    onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    allowsInlineMediaPlayback={true}
                    mediaPlaybackRequiresUserAction={false}
                    sharedCookiesEnabled={true}
                    thirdPartyCookiesEnabled={true}
                    allowsBackForwardNavigationGestures={true}
                    pullToRefreshEnabled={false}
                    cacheEnabled={true}
                    startInLoadingState={true}
                    renderLoading={() => (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={APP_CONFIG.PRIMARY_COLOR} />
                        </View>
                    )}
                    userAgent={`CadfourApp/1.0 ${Platform.OS === 'ios' ? 'iOS' : 'Android'}`}
                />
            </ScrollView>

            {isLoading && (
                <View style={styles.loadingOverlay} pointerEvents="none">
                    <ActivityIndicator size="large" color={APP_CONFIG.PRIMARY_COLOR} />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_CONFIG.SECONDARY_COLOR,
    },
    scrollContainer: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: APP_CONFIG.SECONDARY_COLOR,
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255,255,255,0.85)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
    },
});
