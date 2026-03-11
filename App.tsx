import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';

const API_URL = 'https://react-native-backend-fqmk.onrender.com/api'; // Android emulator localhost

const App = () => {
  const [user, setUser] = useState<{ id: number; name: string; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [count, setCount] = useState(0);

  // Auth Form State
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchCount();
    }
  }, [token]);

  const fetchCount = async () => {
    try {
      const response = await fetch(`${API_URL}/count`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setCount(data.count);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const syncCount = async (newCount: number) => {
    try {
      await fetch(`${API_URL}/count`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count: newCount })
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    syncCount(newCount);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    syncCount(newCount);
  };

  const handleReset = () => {
    const newCount = 0;
    setCount(newCount);
    syncCount(newCount);
  };

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && !name)) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    setLoading(true);
    const endpoint = isLogin ? '/login' : '/register';
    const body = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();

      if (response.ok) {
        setToken(data.token);
        setUser(data.user);
        setCount(data.user.count);
        // Clear form
        setEmail('');
        setPassword('');
        setName('');
      } else {
        const errorMsg = data.errors ? Object.values(data.errors).flat().join('\n') : data.message;
        Alert.alert('Error', errorMsg || 'Authentication failed');
      }
    } catch (e) {
      Alert.alert('Network Error', 'Could not connect to the backend server. Make sure it is running on http://10.0.2.2:8000');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setUser(null);
      setToken(null);
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
        <View style={styles.authContainer}>
          <Text style={styles.title}>{isLogin ? 'Login' : 'Register'}</Text>
          <Text style={styles.subtitle}>
            {isLogin ? 'Welcome back!' : 'Create an account to save your count.'}
          </Text>

          {!isLogin && (
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.authButton}
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.authButtonText}>{isLogin ? 'Login' : 'Register'}</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setIsLogin(!isLogin)} style={{ marginTop: 20 }}>
            <Text style={styles.toggleText}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.headerText}>Hello, {user.name}!</Text>
          <TouchableOpacity onPress={handleLogout} disabled={loading}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Simple Counter App</Text>
        <Text style={styles.subtitle}>Your count is saved in the database</Text>

        <View style={styles.counterContainer}>
          <Text style={styles.counterLabel}>Current Count</Text>
          <Text style={styles.counterValue}>{count}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.decrementButton]}
            onPress={handleDecrement}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.resetButton]}
            onPress={handleReset}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.incrementButton]}
            onPress={handleIncrement}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logoutText: {
    fontSize: 16,
    color: '#ff6b6b',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  authButton: {
    backgroundColor: '#51cf66',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#4ecdc4',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  counterLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  counterValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  decrementButton: {
    backgroundColor: '#ff6b6b',
  },
  resetButton: {
    backgroundColor: '#4ecdc4',
    width: 100,
  },
  incrementButton: {
    backgroundColor: '#51cf66',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App;
