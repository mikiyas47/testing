# 🎨 How to Change Your App Icon

## 📱 Quick Method (Using expo-asset)

### Step 1: Prepare Your Icon Image

**Requirements:**
- Format: PNG or SVG
- Size: **1024x1024 pixels** (recommended)
- Background: Transparent or solid color
- Name it: `app-icon.png`

### Step 2: Replace the Icon File

1. **Save your new icon** as `app-icon.png`
2. **Replace** the file at: `assets/icon.png`
3. **Rebuild** your APK

```bash
npm run build:apk
```

That's it! Your new icon will be in the next build! ✨

---

## 🛠️ Detailed Method (Update All Sizes)

### Create Multiple Sizes:

Your app needs icons in different sizes for Android:

| Folder | Size | Purpose |
|--------|------|---------|
| `android/app/src/main/res/mipmap-mdpi/` | 48x48 | Low density |
| `android/app/src/main/res/mipmap-hdpi/` | 72x72 | Medium density |
| `android/app/src/main/res/mipmap-xhdpi/` | 96x96 | High density |
| `android/app/src/main/res/mipmap-xxhdpi/` | 144x144 | Extra high |
| `android/app/src/main/res/mipmap-xxxhdpi/` | 192x192 | Ultra high |

### Using an Online Tool:

1. Go to https://romannurik.github.io/AndroidAssetStudio/
2. Upload your 1024x1024 icon
3. Download generated icons
4. Replace files in the folders above

---

## ⚡ Easiest Way (Recommended)

Just replace **one file** and rebuild:

```
1. Create/update: assets/icon.png (1024x1024)
2. Run: npm run build:apk
3. Done! ✅
```

The build process automatically generates all sizes!

---

## 📋 Current Icon Files

Your current icon is at:
- `assets/icon.png` ← Main icon source
- `assets/adaptive-icon.png` ← Adaptive icon (Android 8.0+)

---

## 🔄 After Changing Icon

**Always rebuild your APK:**

```bash
npm run build:apk
```

Then install the new APK on your phone!

---

## 💡 Pro Tips

✅ Use **1024x1024** PNG with transparency  
✅ Keep it simple and recognizable at small sizes  
✅ Test on actual device before distributing  
✅ Avoid thin lines or small details  
✅ Use contrasting colors for visibility  

---

## 🎯 Quick Example

Want to change to a red circle icon?

1. Open any image editor (Paint, Photoshop, Canva, etc.)
2. Create 1024x1024 canvas
3. Draw a red circle
4. Save as `icon.png`
5. Put in `assets/` folder
6. Run `npm run build:apk`

Done! 🔴
