# Quick APK Build Script
# Run this to build your APK quickly

Write-Host "=== Building Android APK ===" -ForegroundColor Green
Write-Host ""

# Check if logged in
$loggedIn = eas whoami 2>&1
if ($loggedIn -like "*Not logged in*") {
    Write-Host "Please login to Expo first:" -ForegroundColor Yellow
    Write-Host "  eas login" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or create account at: https://expo.dev" -ForegroundColor Yellow
    exit
}

Write-Host "Building APK in the cloud..." -ForegroundColor Green
Write-Host "(This works on Windows - build happens on Expo servers)" -ForegroundColor Cyan
Write-Host ""
eas build --platform android --profile preview

Write-Host ""
Write-Host "=== Build Complete! ===" -ForegroundColor Green
Write-Host "Look for .apk file in this directory" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Enable USB Debugging on your phone" -ForegroundColor White
Write-Host "2. Connect phone via USB" -ForegroundColor White
Write-Host "3. Install with: adb install <filename>.apk" -ForegroundColor White
