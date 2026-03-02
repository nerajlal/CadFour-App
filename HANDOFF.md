# CadFour App — Handoff Guide (Continue from Another Device)

This document tells you exactly what to do when you switch to your **other device** that has Node.js, Expo CLI, and Git installed. The code is already written and pushed to GitHub.

---

## Step 1: Clone the Repository
```bash
git clone https://github.com/nerajlal/CadFour-App.git
cd CadFour-App
```

---

## Step 2: Install Dependencies
```bash
npm install
```

---

## Step 3: Add App Assets
You need to add these image files to the `/assets/` folder before building:

| File | Size | Notes |
|------|------|-------|
| `icon.png` | 1024×1024 | App icon — your Cadfour logo, no transparency |
| `splash.png` | 1242×2436 | Splash screen image — logo on #185ba4 background |
| `adaptive-icon.png` | 1024×1024 | Android adaptive icon |
| `favicon.png` | 48×48 | Web favicon |
| `notification-icon.png` | 96×96 | White icon for Android push notifications |

---

## Step 4: Test on Your Phone (Instant Preview)
```bash
npx expo start
```
- Install **Expo Go** app on your phone
- Scan the QR code shown in terminal
- The Cadfour store will load inside the app

---

## Step 5: Configure Firebase (for Push Notifications)
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project → name it **"Cadfour App"**
3. Add Android app: package name = `com.cadfour.app`
4. Add iOS app: bundle ID = `com.cadfour.app`
5. Open `src/config/app.config.js` and replace the `FIREBASE_CONFIG` values

---

## Step 6: Update EAS Project ID
1. Create an Expo account at [https://expo.dev](https://expo.dev)
2. Run:
   ```bash
   npm install -g eas-cli
   eas login
   eas build:configure
   ```
3. This will auto-update the `projectId` in `app.json`

---

## Step 7: Build for Android (Google Play)
```bash
eas build --platform android --profile production
```
- Downloads a signed `.aab` file
- Upload to [https://play.google.com/console](https://play.google.com/console)
- Requires Google Play Developer account ($25 one-time)

---

## Step 8: Build for iOS (App Store)
```bash
eas build --platform ios --profile production
```
- Downloads a signed `.ipa` file
- Upload via [App Store Connect](https://appstoreconnect.apple.com)
- Requires Apple Developer account ($99/year)

---

## Important Files to Know

| File | Purpose |
|------|---------|
| `src/config/app.config.js` | ⚙️ Change store URL, colors, app name here |
| `app.json` | Expo config — bundle IDs, icons, splash |
| `src/screens/MainScreen.js` | The WebView that loads cadfour.com |
| `src/screens/OnboardingScreen.js` | 3-slide onboarding (App Store required) |
| `src/screens/OfflineScreen.js` | No internet screen |
| `App.js` | Root — push notification registration |

---

## Troubleshooting
- **Metro bundler issues**: `npx expo start --clear`
- **Dependency issues**: Delete `node_modules/` and run `npm install` again
- **Build failures on EAS**: Check EAS dashboard at [https://expo.dev](https://expo.dev) for logs

---

> All Shopify store changes (products, prices, theme, apps) **automatically reflect** in the app with no app update needed — the WebView always loads the live store.
