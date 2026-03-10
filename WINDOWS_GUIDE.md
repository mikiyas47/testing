# 🪟 Windows User's Guide - Build Android APK

## ✅ Good News for Windows Users!

You **CAN** build Android APKs on Windows using EAS Cloud Build. The build happens on Expo's servers (Linux), not your PC, so it works perfectly!

---

## 🚀 Quick Start (Windows)

### Step 1: Login to Expo
```powershell
eas login
```

### Step 2: Build APK (Cloud Build)
```powershell
npm run build:apk
```

Or use the PowerShell script:
```powershell
.\build-apk.ps1
```

### Step 3: Wait for Build
- First build takes 5-10 minutes
- Build happens in the cloud (Expo servers)
- APK downloads automatically when done
- You'll find it in: `C:\Users\hp\Desktop\app\`

### Step 4: Install on Phone
See installation methods below ↓

---

## 💡 Why This Works on Windows

**Old way (doesn't work on Windows):**
- ❌ Required Android Studio + Gradle locally
- ❌ Needed macOS/Linux for some tools
- ❌ Built APK on your computer

**New way (EAS Cloud Build):**
- ✅ Build happens on Expo's Linux servers
- ✅ Your Windows PC just uploads code & downloads APK
- ✅ No Android Studio needed
- ✅ Works on any OS (Windows, macOS, Linux)

---

## 📱 Installation Methods for Windows

### Method 1: USB Cable Transfer (Easiest)

1. **Build completes** → You get `.apk` file in project folder
2. **Connect phone** via USB cable to PC
3. **Copy APK** to phone:
   - Open File Explorer
   - Find your phone under "This PC"
   - Copy APK to Downloads folder (or anywhere)
4. **On phone:**
   -Settings → Security → Enable "Install from Unknown Sources"
   - Open Files app
   - Find APK → Tap to install

### Method 2: Using ADB (If Installed)

**Install ADB on Windows:**
1. Download: https://developer.android.com/studio/releases/platform-tools
2. Extract ZIP to `C:\platform-tools`
3. Open PowerShell there
4. Run: `.\adb.exe devices` (should show your phone)
5. Install: `.\adb.exe install C:\Users\hp\Desktop\app\your-app.apk`

**Or add to PATH:**
1. Search "Environment Variables" in Windows
2. Edit "Path" variable
3. Add: `C:\platform-tools`
4. Restart terminal
5. Now `adb install your-app.apk` works anywhere!

### Method 3: Cloud Storage

1. Upload APK to Google Drive/OneDrive/Dropbox
2. Open cloud app on your phone
3. Download APK
4. Tap to install

### Method 4: Email/Social Media

1. Email APK to yourself
2. Or send via WhatsApp/Telegram
3. Download on phone
4. Install directly

---

## 🔧 Complete Windows Workflow

```powershell
# Navigate to project
cd C:\Users\hp\Desktop\app

# Login (one time only)
eas login

# Build APK in the cloud
npm run build:apk

# Wait 5-10 minutes...
# Build logs will show in terminal
# APK downloads when complete

# Check current directory for APK file
dir *.apk

# Now install using one of the methods above
```

---

## ⚙️ Configuration

Your project is configured for cloud builds:

**eas.json:**
```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk"
      },
      "distribution": "internal",
      "withoutCredentials": true
    }
  }
}
```

This tells EAS to:
- Build APK (not AAB)
- Use internal distribution (for testing/sharing)
- Work without signing credentials (perfect for development)

---

## 🎯 What Happens During Build

1. **Upload:**Your code is uploaded to Expo servers (~1 min)
2. **Install:** Dependencies installed on server (~2 min)
3. **Build:** Native Android app compiled (~5 min)
4. **Download:**APK downloaded to your PC (~1 min)

**Total time:** 8-12 minutes (first build)
**Subsequent builds:** 5-7 minutes

---

## 📊 Build Progress

When you run `npm run build:apk`, you'll see:

```
✔ Logged in
✔ Using EAS account
⠋ Creating build
⠙ Uploading your code...
⠹ Building in the cloud...
⠸ Installing dependencies...
⠼ Compiling Android app...
⠴ Generating APK...
✔ Build completed!
⬇️  Downloading APK...
```

---

## 🛠️ Troubleshooting (Windows)

### "eas: command not found"
```powershell
npm install -g eas-cli
```

### "npm: command not found"
- Install Node.js from: https://nodejs.org
- Restart terminal
- Try again

### "PowerShell scripts disabled"
```powershell
Set-ExecutionPolicy-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### "Build failed"
- Check internet connection
- Make sure logged in: `eas whoami`
- Try: `eas build --platform android --profile preview --clear-cache`

### "Can't find APK"
- Check Downloads folder
- Look in project root: `dir *.apk`
- Check build logs for download location

### "Phone not recognized"
- Enable USB Debugging (see main guides)
- Accept RSA key prompt on phone
- Try different USB port
- Use original USB cable

---

## 📁 File Locations (Windows)

**Project folder:**
```
C:\Users\hp\Desktop\app\
```

**APK will be in:**
```
C:\Users\hp\Desktop\app\*.apk
```

**EAS config:**
```
C:\Users\hp\Desktop\app\eas.json
```

**Android native code (if needed):**
```
C:\Users\hp\Desktop\app\android\
```

---

## ✨ Benefits of Cloud Build

✅ **No Android Studio** required (saves 3GB+)  
✅ **No Gradle** setup headaches  
✅ **Works on Windows** without hacks  
✅ **Faster builds** (powerful servers)  
✅ **Consistent results** (clean environment every time)  
✅ **Easy sharing** (download APK anywhere)  

---

## 🎉 Success Checklist

- [ ] Node.js installed
- [ ] EAS CLI installed (`npm install -g eas-cli`)
- [ ] Expo account created (free)
- [ ] Logged in (`eas login`)
- [ ] Ran `npm run build:apk` or `.\build-apk.ps1`
- [ ] Waited for build to complete
- [ ] Found APK file
- [ ] Transferred to phone
- [ ] Installed successfully
- [ ] App running on phone! ✅

---

## 🔄 Rebuilding After Changes

Made changes to your app?

```powershell
# Just run the same command again
npm run build:apk

# Or
.\build-apk.ps1
```

Each build creates a new APK with your latest changes!

---

## 📞 Enable USB Debugging (Reminder)

**Before installing via ADB:**

1. Settings → About Phone
2. Tap "Build Number" 7 times
3. Go back → Developer Options
4. Turn ON "USB Debugging"
5. Connect to PC via USB

---

## 💾 Backup Your APK

Once built, save the APK file:
- Upload to Google Drive
- Email to yourself
- Save to external drive
- Share with friends!

You can install this same APK on multiple devices!

---

**You're all set!** Run these commands now:

```powershell
eas login
npm run build:apk
```

Then enjoy your Counter App on Android! 🎊📱
