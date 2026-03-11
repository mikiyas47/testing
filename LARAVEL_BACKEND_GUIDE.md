# 🔧 How to Add Laravel Backend to Your React Native App

## 📊 Complete Integration Guide

---

## 🎯 **Architecture Overview**

```
React Native App (Frontend)
        ↓
    Axios/Fetch
        ↓
    HTTP Requests (JSON)
        ↓
Laravel API (Backend)
        ↓
    MySQL Database
```

---

## 📦 **Step 1: Install Laravel**

### Option A: Using Composer (Recommended)

```bash
# Install Composer first: https://getcomposer.org/download/

# Create Laravel project
composer create-project laravel/laravel counter-backend

# Navigate to project
cd counter-backend

# Start development server
php artisan serve
```

Your Laravel API will run at: `http://localhost:8000`

### Option B: Using Laravel Installer

```bash
composer global require laravel/installer
laravel new counter-backend
cd counter-backend
php artisan serve
```

---

## 🔐 **Step 2: Set Up API Authentication**

Install Laravel Sanctum (simple API token auth):

```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
php artisan migrate
```

Update `.env` file:
```
SANCTUM_STATEFUL_DOMAINS=localhost,localhost:3000,127.0.0.1
SESSION_DRIVER=cookie
```

---

## 📝 **Step 3: Create API Routes**

Edit `routes/api.php`:

```php
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CounterController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/counters', [CounterController::class, 'index']);
    Route::post('/counter', [CounterController::class, 'store']);
    Route::put('/counter/{id}', [CounterController::class, 'update']);
    Route::delete('/counter/{id}', [CounterController::class, 'destroy']);
    
    // Get current user
    Route::get('/user', function (Request $request) {
       return $request->user();
    });
});
```

---

## 🗄️ **Step 4: Create Database Models**

Create Counter model:

```bash
php artisan make:model Counter-m
```

Edit migration `database/migrations/xxxx_create_counters_table.php`:

```php
public function up()
{
    Schema::create('counters', function (Blueprint $table) {
        $table->id();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->string('name');
        $table->integer('value')->default(0);
        $table->timestamps();
    });
}
```

Run migration:
```bash
php artisan migrate
```

---

## 🎮 **Step 5: Create Controller**

```bash
php artisan make:controller CounterController --resource
```

Edit `app/Http/Controllers/CounterController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    // Get all counters for authenticated user
    public function index(Request $request)
    {
        $counters = $request->user()->counters()->get();
       return response()->json($counters);
    }

    // Create new counter
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'value' => 'nullable|integer'
        ]);

        $counter = $request->user()->counters()->create($validated);
       return response()->json($counter, 201);
    }

    // Update counter
    public function update(Request $request, $id)
    {
        $counter= $request->user()->counters()->findOrFail($id);
        
        $validated = $request->validate([
            'value' => 'required|integer',
        ]);

        $counter->update($validated);
       return response()->json($counter);
    }

    // Delete counter
    public function destroy(Request $request, $id)
    {
        $counter = $request->user()->counters()->findOrFail($id);
        $counter->delete();
       return response()->json(['message' => 'Counter deleted']);
    }
}
```

---

## 🌐 **Step 6: Enable CORS**

Edit `config/cors.php`:

```php
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['*'], // Or specify your app's origin
    'supports_credentials' => true,
];
```

---

## 📱 **Step 7: Connect React Native App**

Install Axios in your React Native app:

```bash
cd C:\Users\hp\Desktop\app
npm install axios
```

Create API service file `src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api'; // Android emulator
// const API_URL = 'http://localhost:8000/api'; // For physical device

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  if (token) {
   config.headers.Authorization = `Bearer ${token}`;
  }
 return config;
});

export default api;
```

---

## 🔑 **Step 8: Add Authentication to React Native**

Create `src/screens/LoginScreen.js`:

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
     const response = await api.post('/login', { email, password });
      await AsyncStorage.setItem('authToken', response.data.token);
      Alert.alert('Success', 'Logged in!');
    } catch (error) {
      Alert.alert('Error', 'Invalid credentials');
    }
  };

 return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Login</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: '#007AFF', padding: 15 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
```

---

## 🔄 **Step 9: Update Counter App to Use API**

Modify your `App.tsx`:

```javascript
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from './src/services/api';

const App = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load counter from backend
  useEffect(() => {
    loadCounter();
  }, []);

  const loadCounter = async () => {
    try {
     const response = await api.get('/counters');
      if (response.data.length > 0) {
        setCount(response.data[0].value);
      }
    } catch (error) {
     console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateCounter = async (newValue) => {
    try {
      setCount(newValue);
      // Save to backend
      await api.put('/counter/1', { value: newValue });
    } catch (error) {
     console.error(error);
      // Revert on error
      setCount(count);
    }
  };

  if (loading) {
   return <ActivityIndicator size="large" />;
  }

 return (
    <SafeAreaView style={styles.container}>
      {/* Your existing UI */}
    </SafeAreaView>
  );
};
```

---

## 🚀 **Step 10: Run Everything**

### Terminal 1 - Laravel Backend:
```bash
cd counter-backend
php artisan serve
```

### Terminal 2 - React Native App:
```bash
cd C:\Users\hp\Desktop\app
npm start
```

---

## 📊 **Complete Project Structure**

```
counter-backend/          (Laravel)
├── app/
│   ├── Http/Controllers/
│   ├── Models/
│   └── Middleware/
├── database/migrations/
├── routes/
│   └── api.php
└── .env

app/                      (React Native)
├── src/
│   ├── services/
│   │   └── api.js
│   ├── screens/
│   │   ├── LoginScreen.js
│   │   └── CounterScreen.js
│   └── components/
├── App.tsx
└── package.json
```

---

## 💡 **Quick Start Commands**

```bash
# Laravel Backend
composer create-project laravel/laravel counter-backend
cd counter-backend
composer require laravel/sanctum
php artisan migrate
php artisan serve

# React Native Frontend
cd C:\Users\hp\Desktop\app
npm install axios @react-native-async-storage/async-storage
npm start
```

---

## 🎯 **Next Steps**

1. ✅ Install Laravel
2. ✅ Set up database (SQLite for testing, MySQL for production)
3. ✅ Create API endpoints
4. ✅ Add authentication
5. ✅ Connect React Native app
6. ✅ Test API calls
7. ✅ Deploy backend (Heroku, DigitalOcean, Laravel Forge)

---

## 🔍 **Testing Your API**

Use **Postman** or **Insomnia** to test endpoints:

```
POST http://localhost:8000/api/register
{
  "name": "John",
  "email": "john@example.com",
  "password": "password123"
}

POST http://localhost:8000/api/login
{
  "email": "john@example.com",
  "password": "password123"
}

GET http://localhost:8000/api/counters
Headers: Authorization: Bearer {token}
```

---

## ⚡ **Pro Tips**

✅ Use **Laravel Resources** for clean API responses  
✅ Implement**Form Requests** for validation 
✅ Use **API Versioning** (v1, v2) for updates  
✅ Add **Rate Limiting** to prevent abuse  
✅ Use **Laravel Debugbar** for debugging  
✅ Enable **HTTPS** in production 

---

**Ready to build?** Start with `composer create-project laravel/laravel counter-backend`! 🚀
