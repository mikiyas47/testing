# 📱 How to Install Your App on Android Phone via USB

## ✅ Quick Start (3 Steps)

### Step 1: Login to Expo (One-time setup)
```bash
eas login
```
Create account at https://expo.dev if you don't have one

### Step 2: Build the APK
```bash
npm run build:apk
```
Or use the PowerShell script:
```powershell
.\build-apk.ps1
```

This will create an `.apk` file in your project folder (takes 5-10 minutes first time)

**Note for Windows users:** The build happens on Expo's cloud servers, so it works perfectly on Windows! No macOS/Linux required.

### Step 3: Install on Phone

**Option A - Using ADB (USB Debugging):**
1. Enable USB Debugging on phone:
   -Settings → About Phone → Tap "Build Number" 7 times
   -Settings → Developer Options → Turn ON "USB Debugging"
2. Connect phone to PC via USB
3. Run: `adb install your-app.apk`

**Option B - Direct Transfer (No ADB):**
1. Copy APK to your phone (USB cable, Google Drive, etc.)
2. On phone: Settings → Security → Enable"Install from Unknown Sources"
3. Use file manager to find and tap the APK to install

---

## 🚀 Alternative: Development Build

For faster development with live reload:

```bash
npx expo run:android
```

This builds and installs directly to your device/emu.

**Requirements:**
- Android Studio installed
- USB Debugging enabled
- Phone connected via USB

---

## 📋 What You Need

### Minimum Requirements:
- ✅ Expo account(free)
- ✅ Node.js installed
- ✅ EAS CLI installed (`npm install -g eas-cli`)
- ✅ Android phone with USB Debugging enabled

### Optional (for advanced features):
- Android Studio (for ADB and emulator)
- Platform Tools from Google

---

## 🔧 Troubleshooting

**Problem: "Command not found: eas"**
```bash
npm install -g eas-cli
```

**Problem: "ADB not recognized"**
- Install Android Studio OR
- Download Platform Tools: https://developer.android.com/studio/releases/platform-tools
- Add to system PATH

**Problem: "Device not found"**
- Check USB cable is connected properly
- Make sure USB Debugging is enabled
- Try different USB port
- Accept RSA key prompt on phone if shown

**Problem: "App not installing"**
- Enable "Install from Unknown Sources" in phone settings
- Check phone has enough storage
- Make sure APK matches your phone's architecture (most are universal now)

---

## 📞 Enable USB Debugging

**For most Android phones:**
1. Settings → About Phone
2. Find "Build Number"
3. Tap it 7 times quickly
4. Go back → System → Developer Options
5. Turn ON "USB Debugging"

**For Samsung:**
1. Settings → About Phone → Software Information
2. Tap "Build Number" 7 times
3. Go back → Developer Options
4. Enable "USB Debugging"

**For Xiaomi:**
1. Settings → About Phone
2. Tap "MIUI Version" 7 times
3. Settings → Additional Settings → Developer Options
4. Enable "USB Debugging"

---

## ✨ Features

Your Counter App includes:
- ✅ Beautiful modern UI
- ✅ Increment/Decrement counter
- ✅ Reset button
- ✅ Works offline after install
- ✅ No ads, no tracking
- ✅ Fully yours!

---

## 🎯 Next Steps After Installation

1. **Test the app** - Open it and try the counter buttons
2. **Share with friends** -Send them the APK file
3. **Customize** - Change colors, add features in `App.tsx`
4. **Rebuild** - Run `npm run build:apk` again after changes

---

## 💡 Pro Tips

- Keep the APK file to share with others
- Development builds are larger but allow hot reloading
- For production release, use: `eas build --profile production`
- Test on multiple devices before sharing widely
- Android may warn about "Unknown apps" - this is normal for self-built apps

---

**Need help?** Check the full guide: [INSTALL_APK.md](INSTALL_APK.md)
