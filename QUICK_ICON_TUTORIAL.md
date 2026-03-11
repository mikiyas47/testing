# Quick Icon Change Tutorial

## 🎯 EASIEST WAY - Follow These Steps:

### **Step 1: Create Your Icon**

Use any of these free tools:
- **Canva**: https://www.canva.com/create/logos/
- **Paint** (already on your PC)
- **Photopea**: https://www.photopea.com/ (free Photoshop alternative)

**What you need:**
- Square image (same width & height)
- At least 1024x1024 pixels
- PNG format works best

### **Step 2: Save Your Icon**

Save it as: `icon.png`

### **Step 3: Replace the Old Icon**

1. Go to: `C:\Users\hp\Desktop\app\assets\`
2. You'll see: `icon.png` (current icon)
3. **Replace it** with your new icon
4. Make sure it's named exactly: `icon.png`

### **Step 4: Rebuild Your App**

Open PowerShell in the app folder and run:
```powershell
npm run build:apk
```

Wait 5-10 minutes, then you'll get a new APK with your custom icon!

---

## 📸 Visual Guide:

```
Your Computer → C:\Users\hp\Desktop\app\assets\
                                     ↓
                              [icon.png] ← Replace this!
                                     ↓
                        Run: npm run build:apk
                                     ↓
                    New APK has your custom icon! ✅
```

---

## ✨ Example: Change to Blue Star Icon

Want to try it now? Here's a quick test:

1. Open **Paint**
2. Create 1024x1024 canvas
3. Draw a blue star (or anything!)
4. Save as `icon.png`
5. Put in `C:\Users\hp\Desktop\app\assets\`
6. Run `npm run build:apk`

Next build will have your blue star icon! ⭐

---

## 🔄 Where Icons Appear:

After rebuild, your new icon shows on:
- ✅ Phone home screen
- ✅ App drawer
- ✅ Recent apps
- ✅ Settings → Apps
- ✅ Google Play Store (when you publish)

---

## ❓ Common Questions:

**Q: What size should my icon be?**  
A: 1024x1024 pixels is perfect!

**Q: Can I use JPG instead?**  
A: PNG is better, but JPG works too

**Q: Do I need transparent background?**  
A: Not required, but looks more professional

**Q: How do I test before building?**  
A: You must rebuild APK to see changes

**Q: Can I use emoji as icon?**  
A: Yes! Just make it 1024x1024 and save as PNG

---

## 🚀 Ready to Try?

1. Design your icon (any image editor)
2. Save as `icon.png` 
3. Replace file in `assets/` folder
4. Run `npm run build:apk`
5. Install new APK on your phone
6. Enjoy your custom icon! 🎉

**File to replace:** `C:\Users\hp\Desktop\app\assets\icon.png`
