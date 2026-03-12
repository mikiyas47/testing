import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  StatusBar,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Animated,
  Easing,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const API_URL = 'https://react-native-backend-fqmk.onrender.com/api';

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

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const orb1Pos = useRef(new Animated.Value(0)).current;
  const orb2Pos = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (token) {
      fetchCount();
    }
  }, [token]);

  useEffect(() => {
    // Entrance animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Loop background orbs
    const animateOrb = (val: Animated.Value, toValue: number, duration: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateOrb(orb1Pos, 1, 4000);
    animateOrb(orb2Pos, 1, 6000);
  }, []);

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
      Alert.alert('Network Error', 'Could not connect to the backend server.');
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
    const orb1TranslateY = orb1Pos.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -40],
    });

    const orb2TranslateY = orb2Pos.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 60],
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <LinearGradient
          colors={['#0f172a', '#1e1b4b', '#312e81']}
          style={StyleSheet.absoluteFill}
        />

        {/* Animated Background Graphics */}
        <Animated.View
          style={[
            styles.orb,
            styles.orb1,
            { transform: [{ translateY: orb1TranslateY }] },
          ]}
        />
        <Animated.View
          style={[
            styles.orb,
            styles.orb2,
            { transform: [{ translateY: orb2TranslateY }] },
          ]}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <SafeAreaView style={styles.authSafeContainer}>
            <Animated.View
              style={[
                styles.glassCard,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                },
              ]}
            >
              <View style={styles.iconCircle}>
                <Text style={styles.iconEmoji}>{isLogin ? '👋' : '✨'}</Text>
              </View>

              <Text style={styles.title}>{isLogin ? 'Welcome Back' : 'Get Started'}</Text>
              <Text style={styles.subtitle}>
                {isLogin ? 'Sign in to your account' : 'Register to start tracking'}
              </Text>

              <View style={styles.form}>
                {!isLogin && (
                  <View style={styles.inputWrapper}>
                    <TextInput
                      style={styles.input}
                      placeholder="Full Name"
                      placeholderTextColor="#94a3b8"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                )}

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Email Address"
                    placeholderTextColor="#94a3b8"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <TouchableOpacity
                  style={styles.authButton}
                  onPress={handleAuth}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={['#6366f1', '#8b5cf6']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.gradientButton}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.authButtonText}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </Text>
                    )}
                  </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => setIsLogin(!isLogin)} 
                  style={styles.toggleContainer}
                >
                  <Text style={styles.toggleTextPrefix}>
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <Text style={styles.toggleTextAction}>
                      {isLogin ? 'Register' : 'Login'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      <View style={styles.content}>

        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Hello,</Text>
            <Text style={styles.userNameText}>{user.name}!</Text>
          </View>
          <TouchableOpacity 
            onPress={handleLogout} 
            disabled={loading}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mainCounterCard}>
          <Text style={styles.mainTitle}>Counter App</Text>
          <Text style={styles.mainSubtitle}>Your progress is securely synced</Text>

          <View style={styles.counterCircle}>
            <Text style={styles.counterValue}>{count}</Text>
            <Text style={styles.counterLabel}>UNITS</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.decrementBtn]}
              onPress={handleDecrement}
            >
              <Text style={styles.actionButtonText}>-</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.resetBtn]}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.incrementBtn]}
              onPress={handleIncrement}
            >
              <Text style={styles.actionButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  authSafeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  orb: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.5,
  },
  orb1: {
    width: 300,
    height: 300,
    backgroundColor: '#4338ca',
    top: -50,
    left: -50,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: '#7c3aed',
    bottom: 50,
    right: -50,
  },
  glassCard: {
    width: width * 0.9,
    padding: 30,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconEmoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  inputWrapper: {
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  input: {
    padding: 16,
    color: '#fff',
    fontSize: 16,
  },
  authButton: {
    marginTop: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  toggleContainer: {
    marginTop: 25,
    alignItems: 'center',
  },
  toggleTextPrefix: {
    color: '#94a3b8',
    fontSize: 14,
  },
  toggleTextAction: {
    color: '#818cf8',
    fontWeight: '700',
  },

  // Main App Styles
  content: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748b',
  },
  userNameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1e293b',
  },
  logoutBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#fee2e2',
  },
  logoutText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 14,
  },
  mainCounterCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 32,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 2,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1e293b',
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
    marginBottom: 40,
  },
  counterCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  counterValue: {
    fontSize: 72,
    fontWeight: '900',
    color: '#1e293b',
  },
  counterLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
  },
  actionButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  actionButtonText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '600',
  },
  decrementBtn: {
    backgroundColor: '#f87171',
  },
  incrementBtn: {
    backgroundColor: '#34d399',
  },
  resetBtn: {
    backgroundColor: '#6366f1',
    width: 100,
    height: 60,
    borderRadius: 30,
  },
  resetButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default App;
