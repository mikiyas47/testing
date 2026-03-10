# Install APK on Your Android Phone via USB

## Option 1: Using EAS Build (Recommended - No Android Studio needed)

### Step 1: Create Expo Account
```bash
eas login
```
If you don't have an account, create one at https://expo.dev

### Step 2: Configure the build
```bash
eas build:configure
```

### Step 3: Build APK locally
```bash
eas build --platform android --local
```

This will create an `.apk` file in your project directory.

### Step 4: Install on your phone
1. Enable **USB Debugging** on your Android phone:
   - Go to Settings → About Phone
   - Tap "Build Number" 7 times to enable Developer Options
   - Go back to Settings → System → Developer Options
   - Turn ON "USB Debugging"

2. Connect your phone to computer via USB

3. Install the APK:
```bash
adb install app-release.apk
```

---

## Option 2: Using Android Studio (Faster for development)

### Requirements:
- Android Studio installed
- Android SDK installed

### Step 1: Open project in Android Studio
1. Open Android Studio
2. Click "Open an Existing Project"
3. Select the `android` folder in this project

### Step 2: Build APK
1. In Android Studio, click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
2. Wait for the build to complete
3. The APK will be at: `android/app/build/outputs/apk/debug/app-debug.apk`

### Step 3: Install via USB
1. Enable USB Debugging on your phone (see Option 1, Step 4)
2. Connect phone via USB
3. Run in terminal:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Option 3: Direct Transfer (No ADB needed)

### Step 1: Build the APK using Option 1 or 2

### Step 2: Transfer to phone
1. Copy the APK file to your phone (via USB, Google Drive, Dropbox, etc.)
2. On your phone, go to Settings → Security
3. Enable"Install from Unknown Sources"
4. Use a file manager to find the APK and tap to install

---

## Quick Start (Easiest Method)

If you want the simplest way without installing anything:

1. **Create Expo account**: https://expo.dev
2. **Login**: `eas login`
3. **Build**: `eas build --platform android --local`
4. **Transfer APK to phone** and install

The APK will work on any Android device!

---

## Troubleshooting

**"USB Debugging not showing"**
- Make sure you tapped Build Number 7 times in About Phone

**"ADB not recognized"**
- Install Android Studio or Platform Tools from Google
- Add ADB to your system PATH

**"Installation blocked by Play Protect"**
- Go to Google Play Store → Play Protect → Settings
- Turn OFF "Scan apps with Play Protect" temporarily
- Or choose "Install anyway" when prompted

**"App won't open after install"**
- Make sure you built in Development mode for testing
- Check that your phone's Android version is compatible (Android 6.0+)

---

## Notes

- First build may take 5-10 minutes
- Development builds are larger but allow debugging
- For production, use: `eas build --platform android --profile production`
- Keep your phone connected during installation
- Make sure USB Debugging stays enabled
