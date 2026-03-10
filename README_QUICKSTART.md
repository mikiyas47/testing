# 🚀 Quick Start: Build & Install Your Android App

## ⚡ Fastest Way (3 Commands)

```bash
# 1. Login to Expo (create free account)
eas login

# 2. Build APK
npm run build:apk

# 3. Install on phone (after enabling USB debugging)
adb install <your-app>.apk
```

---

## 📱 Enable USB Debugging on Your Phone

**One-time setup:**

1. **Settings → About Phone**
2. **Tap "Build Number" 7 times** (you'll see "You are now a developer!")
3. **Go back → System → Developer Options**
4. **Turn ON "USB Debugging"**

That's it! Your phone is ready for USB installation.

---

## 🎯 Step-by-Step Guide

### Step 1: Create Expo Account
- Go to https://expo.dev
- Sign up (free)
- Or just run `eas login` and follow prompts

### Step 2: Build the APK
Run in your terminal:
```bash
npm run build:apk
```

Or use the script:
```powershell
.\build-apk.ps1
```

**What happens:**
- EAS will ask you to configure (choose "Internal" distribution)
- It will build your app **in the cloud** (works on Windows!)
- Takes 5-10 minutes
- Downloads `.apk` file to your project folder

### Step 3: Install via USB

**Connect phone → Run command:**
```bash
adb install SimpleReactNativeApp.apk
```

If ADB is not installed, see troubleshooting below.

---

## 🔧 No ADB? No Problem!

### Alternative Installation Methods:

**Method 1: Direct Transfer**
1. Copy APK to phone (USB cable, Google Drive, Dropbox, etc.)
2. On phone: Settings → Security → Enable "Install from Unknown Sources"
3. Use file manager to find APK → Tap to install

**Method 2: Email/Message**
1. Email the APK to yourself
2. Download on phone
3. Tap to install

**Method 3: Cloud Storage**
1. Upload APK to Google Drive/Dropbox
2. Open on phone
3. Download and install

---

## 💻 What You've Built

✅ **Counter App Features:**
- Beautiful modern interface
- Increment button (+)
- Decrement button (-)
- Reset button
- Clean design with colors
- Works completely offline
- No ads, no tracking
- 100% yours!

---

## 🛠️ Troubleshooting

### "eas login doesn't work"
```bash
npm install -g eas-cli
```

### "ADB not recognized"
**Option 1:** Install Android Studio  
**Option 2:** Download Platform Tools only:
- https://developer.android.com/studio/releases/platform-tools
- Extract folder
- Add to PATH or run from that folder

**Quick test:**
```bash
adb devices
```
Should show your connected device

### "Device unauthorized"
- Check your phone screen
- Accept the "Allow USB debugging?" prompt
- Tap "Always allow from this computer"

### "App not installing"
- Settings → Security → Enable "Install from Unknown Sources"
- Make sure APK downloaded completely
- Try restarting phone

### "Build failed"
- Make sure you're logged in: `eas whoami`
- Check internet connection
- Try: `eas build --platform android --local --clear-cache`

---

## 📦 Files Created

After running build, you'll have:

```
app/
├── android/           # Native Android project
├── eas.json         # EAS Build configuration
├── *.apk            # Your built app (share this!)
├── HOW_TO_INSTALL.md # Detailed guide
└── INSTALL_APK.md   # Full installation guide
```

---

## 🎉 Success Checklist

- [ ] Expo account created
- [ ] Logged in with `eas login`
- [ ] USB Debugging enabled on phone
- [ ] APK built successfully
- [ ] App installed on phone
- [ ] Tested the counter buttons ✅

---

## 🔄 Update & Reinstall

Made changes to the app?

```bash
# Rebuild
npm run build:apk

# Reinstall
adb install -r <new-app>.apk
```

The `-r` flag replaces the existing app.

---

## 📞 Need Help?

**Detailed guides:**
- `HOW_TO_INSTALL.md` - Quick reference
- `INSTALL_APK.md` - Complete documentation

**Common issues solved:**
- Play Protect warnings → "Install anyway"
- Unknown sources → Enable in Security settings
- Device not found → Check USB + debugging

---

## ✨ Share Your App

Once you have the APK:
- Send to friends via WhatsApp, email, etc.
- Upload to Google Drive and share link
- Post on social media
- Distribute however you want!

**Note:** Users may need to enable "Install from Unknown Sources" on their phones.

---

**Ready?** Run these commands now:

```bash
eas login
npm run build:apk
```

Then connect your phone and enjoy your app! 🎊
