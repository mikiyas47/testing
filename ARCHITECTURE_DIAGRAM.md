# 📊 Laravel + React Native Architecture

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    USER'S MOBILE PHONE                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           REACT NATIVE APP (Frontend)                │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │   Counter   │  │    Login    │  │   User   │  │   │
│  │  │  Screen     │  │   Screen    │  │  Profile  │  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  │                                                        │   │
│  │  ┌──────────────────────────────────────────────────┐ │   │
│  │  │          Axios (HTTP Client)                     │ │   │
│  │  └──────────────────────────────────────────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↓
                    HTTP/HTTPS Requests
                    (JSON Format)
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  YOUR COMPUTER / SERVER                      │
│  ┌──────────────────────────────────────────────────────┐   │
│  │        LARAVEL BACKEND (API)                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │   Routes     │  │ Controllers  │  │ Models    │  │   │
│  │  │  api.php     │  │  CounterCtrl │  │ Counter  │  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  │                                                        │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │ Middleware   │  │   Sanctum    │  │ Validators│  │   │
│  │  │    CORS      │  │    Auth      │  │  Request  │  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
│                            ↓                                 │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              MySQL / SQLite Database                 │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌───────────┐  │   │
│  │  │    users     │  │  counters   │  │  history  │  │   │
│  │  │  - id        │  │  - id        │  │  - id     │  │   │
│  │  │  - name     │  │  - user_id   │  │  - value  │  │   │
│  │  │  - email     │  │  - name     │  │  - action │  │   │
│  │  │  - password  │  │  - value     │  │  - time  │  │   │
│  │  └──────────────┘  └──────────────┘  └───────────┘  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow Example

### **User Increments Counter:**

```
1. User taps "+" button on phone
   ↓
2. React Native calls updateCounter(42)
   ↓
3. Axios sends: PUT /api/counters/1
   Body: { "value": 42 }
   Headers: Authorization: Bearer {token}
   ↓
4. Laravel receives request
   ↓
5. Sanctum validates auth token
   ↓
6. CounterController.update() runs
   ↓
7. Counter model updates database
   ↓
8. Laravel returns: { "id": 1, "value": 42 }
   ↓
9. React Native updates UI
   ✅ Counter shows "42" on screen
```

---

## 📁 Project Structure

### **React Native App:**
```
app/
├── src/
│   ├── screens/
│   │   ├── CounterScreen.js   ← Main counter UI
│   │   ├── LoginScreen.js      ← User login
│   │   └── ProfileScreen.js    ← User settings
│   ├── services/
│   │   └── api.js              ← Axios configuration
│   ├── components/
│   │   ├── CounterButton.js    ← Reusable buttons
│   │   └── CounterCard.js      ← Counter display
│   └── utils/
│       └── storage.js           ← AsyncStorage helpers
├── App.tsx                       ← Main app entry
└── package.json                 ← Dependencies
```

### **Laravel Backend:**
```
counter-backend/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── CounterController.php  ← API logic
│   │   │   └── AuthController.php     ← Login/Register
│   │   └── Middleware/
│   │       └── Authenticate.php       ← Token check
│   └── Models/
│       ├── Counter.php                ← Counter model
│       └── User.php                   ← User model
├── database/
│   ├── migrations/
│   │   ├── create_users_table.php
│   │   └── create_counters_table.php
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php                        ← API endpoints
├── .env                               ← Configuration
└── composer.json                     ← PHP dependencies
```

---

## 🎯 API Endpoints

### **Authentication:**
```
POST /api/register
Body: { name, email, password }
Response: { user, token }

POST /api/login
Body: { email, password }
Response: { user, token }

POST /api/logout
Headers: Authorization: Bearer {token}
Response: { message: "Logged out" }
```

### **Counters:**
```
GET /api/counters
Headers: Authorization: Bearer {token}
Response: [
  { id: 1, name: "My Counter", value: 42 },
  { id: 2, name: "Steps", value: 1000 }
]

POST /api/counters
Headers: Authorization: Bearer {token}
Body: { name: "New Counter", value: 0 }
Response: { id: 3, name: "New Counter", value: 0 }

PUT /api/counters/{id}
Headers: Authorization: Bearer {token}
Body: { value: 50 }
Response: { id: 3, name: "New Counter", value: 50 }

DELETE /api/counters/{id}
Headers: Authorization: Bearer {token}
Response: { message: "Deleted" }
```

---

## 🔒 Security Flow

```
React Native App
        ↓
    User Login
        ↓
    Email + Password
        ↓
Laravel Backend
        ↓
  Validate Credentials
        ↓
  Generate API Token (Sanctum)
        ↓
  Return Token to App
        ↓
App Stores Token (AsyncStorage)
        ↓
Include Token in Every Request
        ↓
Laravel Validates Token
        ↓
Return Protected Data
```

---

## 🚀 Deployment Options

### **Backend Hosting:**
- ✅ **Laravel Forge** ($12/month) - Easy Laravel deployment
- ✅ **DigitalOcean** ($5/month) - VPS hosting
- ✅ **Heroku** (Free tier) - Simple deployment
- ✅ **AWS/Azure** - Enterprise scale

### **Database:**
- ✅ **SQLite** - Development/testing
- ✅ **MySQL** - Production (free on most hosts)
- ✅ **PostgreSQL** - Advanced features

### **Frontend Distribution:**
- ✅ Build APK with your backend URL
- ✅ Upload to Google Play Store
- ✅ Share APK directly

---

## 💡 Best Practices

✅ **Use environment variables** for API URLs  
✅ **Implement error handling** for offline mode  
✅ **Add loading indicators** during API calls  
✅ **Cache data locally** with AsyncStorage  
✅ **Use HTTPS** in production 
✅ **Validate all inputs** on backend  
✅ **Rate limit** your API endpoints  
✅ **Log errors** with Laravel Log  

---

## 🎨 Example: Full Counter Sync

```javascript
// React Native Component
const CounterScreen = () => {
  const [count, setCount] = useState(0);

  // Load from backend on mount
  useEffect(() => {
    api.get('/counters/1')
      .then(res => setCount(res.data.value))
      .catch(err => console.error(err));
  }, []);

  // Update backend on change
  const increment = () => {
   const newValue = count + 1;
    setCount(newValue);
    
    api.put('/counters/1', { value: newValue })
      .catch(() => {
        // Revert on error
        setCount(count);
        Alert.alert('Error', 'Could not save');
      });
  };

 return <Button onPress={increment} title={`Count: ${count}`} />;
};
```

---

**You now have a full-stack mobile app!** 🎉

- **Frontend:**React Native (beautiful UI)
- **Backend:** Laravel (powerful API)
- **Database:** MySQL/SQLite(data persistence)
- **Auth:** Sanctum (secure tokens)

Start with `composer create-project laravel/laravel counter-backend`! 🚀
