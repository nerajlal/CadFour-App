# ✅ CadFour App — To-Do on Other Device

## 1. Pull Latest Code
```bash
cd CadFour-App
git pull origin main
```

---

## 2. ⚠️ ADD MISSING FIREBASE FILES
Your `app.json` now expects these files in the root folder. You **MUST** add them before building:
1.  **`google-services.json`** (for Android)
2.  **`GoogleService-Info.plist`** (for iOS)

Get these from your [Firebase Console](https://console.firebase.google.com).

---

## 3. Install Dependencies
```bash
npm install
```

---

## 4. ⚠️ USE DEVELOPMENT CLIENT (Not Expo Go)
Because the app now uses **Expo SDK 54** and has custom native configurations, it will **NOT** work in the standard Expo Go app. 

### To test on your phone:
1.  **Build the Development Client**:
    ```bash
    eas build --profile development --platform android
    # or
    eas build --profile development --platform ios
    ```
2.  **Install the resulting APK/IPA** on your device.
3.  **Start the dev server**:
    ```bash
    npx expo start --dev-client
    ```
4.  Open the app you installed in step 1 and scan the QR code.

---

## 5. Set Up EAS Build (Standalone Apps)
```bash
npm install -g eas-cli
eas login
eas build:configure
```

---

## 6. Build for Production (App Stores)
### Android:
```bash
eas build --platform android --profile production
```
### iOS:
```bash
eas build --platform ios --profile production
```

---

## 7. After Each Change — Push to GitHub
```bash
git add .
git commit -m "your message"
git push origin main
```

---

> **Note:** The "error on device" is likely because you were trying to use Expo Go or were missing the Firebase credential files. Following Step 2 and Step 4 should fix it.
