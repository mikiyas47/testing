# ⚡ Quick Start: Laravel Backend for Counter App

## 🎯 5-Minute Setup

### **Step 1: Install Laravel** (2 minutes)

```bash
# Make sure you have Composer installed: https://getcomposer.org/download/

# Create Laravel project
composer create-project laravel/laravel counter-backend

# Go to project
cd counter-backend
```

### **Step 2: Quick Configuration** (1 minute)

Edit `.env` file:
```
DB_CONNECTION=sqlite
# Comment out these lines:
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD=
```

Create SQLite database:
```bash
touch database/database.sqlite
```

Install Sanctum (authentication):
```bash
composer require laravel/sanctum
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

### **Step 3: Create API** (2 minutes)

Create Counter model:
```bash
php artisan make:model Counter-m
```

Create controller:
```bash
php artisan make:controller CounterController
```

Edit`app/Http/Controllers/CounterController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Models\Counter;
use Illuminate\Http\Request;

class CounterController extends Controller
{
    public function index()
    {
       return Counter::all();
    }

    public function store(Request $request)
    {
        $counter = Counter::create($request->all());
       return response()->json($counter, 201);
    }

    public function update(Request $request, $id)
    {
        $counter= Counter::findOrFail($id);
        $counter->update($request->all());
       return response()->json($counter);
    }
}
```

Add routes to `routes/api.php`:

```php
Route::apiResource('counters', CounterController::class);
```

### **Step 4: Run Server** (30 seconds)

```bash
php artisan serve
```

✅ **Laravel running at:** http://localhost:8000

---

## 📱 **Test Your API Now!**

### Using Browser:
- Visit: http://localhost:8000/api/counters
- Should see: `[]` (empty array)

### Using Postman/Curl:
```bash
curl -X POST http://localhost:8000/api/counters\
  -H "Content-Type: application/json" \
  -d "{\"name\":\"My Counter\",\"value\":0}"
```

---

## 🔗 **Connect to React Native App**

Install dependencies in your app:

```bash
cd C:\Users\hp\Desktop\app
npm install axios
```

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api'; // Android emulator
// For physical device use your PC's IP:
// const API_URL = 'http://192.168.1.XXX:8000/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;
```

Update your `App.tsx` to fetch from backend:

```javascript
import api from './src/services/api';

// In your component:
useEffect(() => {
  api.get('/counters').then(response => {
  console.log('Counters:', response.data);
  });
}, []);
```

---

## 📊 **What You Have Now:**

✅ Laravel backend running  
✅ RESTful API endpoints  
✅ SQLite database  
✅ Ready to connect to React Native  

---

## 🚀 **Next Steps:**

1. **Add authentication** (see full guide)
2. **Create user accounts**
3. **Save counter data per user**
4. **Deploy to production**

---

## 💡 **Common Commands:**

```bash
# See all routes
php artisan route:list

# Clear cache
php artisan cache:clear
php artisan config:clear

# Create new model
php artisan make:model Product -m

# Create migration
php artisan make:migration create_products_table

# Run migrations
php artisan migrate
```

---

## 🎯 **Your API Endpoints:**

```
GET    /api/counters          → Get all counters
POST   /api/counters          → Create counter
GET    /api/counters/{id}     → Get single counter
PUT    /api/counters/{id}     → Update counter
DELETE /api/counters/{id}     → Delete counter
```

---

**Backend is ready!**Now integrate with your React Native app! ✨
