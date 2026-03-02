# Cadfour Mobile App

A React Native (Expo) mobile app that wraps the [Cadfour](https://cadfour.com/) Shopify store in a native branded mobile shell for iOS and Android.

---

## Tech Stack
- **React Native** + **Expo** (managed workflow)
- **react-native-webview** — loads the Shopify store
- **Firebase FCM** — push notifications
- **React Navigation** — screen navigation
- **@react-native-community/netinfo** — network detection

---

## Project Structure
```
/App.js                         ← Root app entry (push notifications setup)
/app.json                       ← Expo config (name, icon, splash, bundle IDs)
/package.json                   ← Dependencies
/src/
  config/app.config.js          ← ⚙️ All configurable values (URL, colors, etc.)
  screens/
    SplashScreen.js             ← Branded launch screen
    OnboardingScreen.js         ← 3-slide onboarding (required for App Store)
    OfflineScreen.js            ← No internet screen with retry
    MainScreen.js               ← Main WebView loading cadfour.com
  navigation/
    AppNavigator.js             ← Navigation stack
/assets/                        ← icon.png, splash.png, adaptive-icon.png
```

---

## Setup & Run

### Prerequisites
- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- EAS CLI (for builds): `npm install -g eas-cli`

### Install & Start
```bash
npm install
npx expo start
```
Scan the QR code with **Expo Go** app on your phone to preview instantly.

---

## Configuration
Edit **`src/config/app.config.js`** to customize:

| Variable | Value |
|---|---|
| `SHOPIFY_STORE_URL` | `https://cadfour.com/` |
| `APP_NAME` | `Cadfour` |
| `PRIMARY_COLOR` | `#185ba4` |
| `SECONDARY_COLOR` | `#ffffff` |
| `ENABLE_BIOMETRIC_LOGIN` | `true` |
| `FIREBASE_CONFIG` | Add your Firebase project config |

---

## Firebase Push Notifications Setup
1. Go to [Firebase Console](https://console.firebase.google.com/) → Create project → "Cadfour App"
2. Add Android app: package `com.cadfour.app` → download `google-services.json` → place in `/android/app/`
3. Add iOS app: bundle ID `com.cadfour.app` → download `GoogleService-Info.plist` → place in `/ios/`
4. Copy Firebase config values into `src/config/app.config.js`

---

## Building for App Stores

### Setup EAS Build
```bash
npm install -g eas-cli
eas login
eas build:configure
```

### Android (Google Play)
```bash
eas build --platform android --profile production
```
Produces a signed `.aab` for Play Store submission.

### iOS (App Store)
```bash
eas build --platform ios --profile production
```
Produces a signed `.ipa` for App Store submission via App Store Connect.

---

## App Store Submission

### Google Play
- One-time developer fee: **$25**
- Upload AAB to [Google Play Console](https://play.google.com/console)
- Review time: 1–3 days

### Apple App Store
- Annual fee: **$99/year**
- Upload IPA via [App Store Connect](https://appstoreconnect.apple.com)
- Requires: Privacy Policy URL
- Review time: 1–3 days

---

## Assets Required
Place these in `/assets/`:
- `icon.png` — 1024×1024 app icon (PNG, no transparency for iOS)
- `splash.png` — 1242×2436 splash image
- `adaptive-icon.png` — 1024×1024 Android adaptive icon foreground
- `favicon.png` — 48×48 web favicon
- `notification-icon.png` — 96×96 white notification icon (Android)

---

## No Ongoing Fees
After launch, the only cost is the Apple Developer Program ($99/year). No third-party app fees. No Shopify plan changes needed.
