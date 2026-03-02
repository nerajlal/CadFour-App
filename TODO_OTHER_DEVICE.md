# ✅ CadFour App — To-Do on Other Device

## 1. Pull Latest Code
```bash
cd CadFour-App
git pull origin main
```

---

## 2. Install Dependencies (if not done)
```bash
npm install
```

---

## 3. Preview the App on Your Phone
```bash
npx expo start
```
- Install **Expo Go** app on your phone
- Scan the QR code → Cadfour store loads inside the app ✅

---

## 4. Set Up Firebase (Push Notifications)
1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create project → **"Cadfour App"**
3. Add Android app → package: `com.cadfour.app`
4. Add iOS app → bundle ID: `com.cadfour.app`
5. Copy the config values into `src/config/app.config.js` under `FIREBASE_CONFIG`

---

## 5. Set Up EAS Build (App Store Builds)
```bash
npm install -g eas-cli
eas login
eas build:configure
```
> This auto-updates `projectId` in `app.json`

---

## 6. Build for Android (Google Play)
```bash
eas build --platform android --profile production
```
- Download the `.aab` file when done
- Upload to [Google Play Console](https://play.google.com/console)
- Cost: $25 one-time developer account

---

## 7. Build for iOS (App Store)
```bash
eas build --platform ios --profile production
```
- Download the `.ipa` file when done
- Upload via [App Store Connect](https://appstoreconnect.apple.com)
- Cost: $99/year Apple Developer account

---

## 8. After Each Change — Push to GitHub
```bash
git add .
git commit -m "your message"
git push origin main
```
Then on this Mac: `git pull origin main`

---

> **Note:** Steps 1–3 are enough to preview the app. Steps 4–7 are only needed when you're ready to publish to the App Stores.
