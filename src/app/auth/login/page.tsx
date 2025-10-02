'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  User, 
  Settings,
  Sparkles,
  Zap,
  Star,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'admin' | 'customer'>('customer')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredTab, setHoveredTab] = useState<'admin' | 'customer' | null>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setLoading(true)

    console.log('Login attempt:', { email: formData.email, activeTab })

    try {
      // For demo purposes, check credentials directly
      if (formData.email === 'admin@bsm.com' && formData.password === 'admin123') {
        console.log('Admin login successful')
        setMessage('Login successful! Opening admin portal...')
        
        // Open admin portal directly
        setTimeout(() => {
          console.log('Opening admin portal...')
          window.location.href = '/admin/portal'
        }, 500)
        return
      }
      
      if (formData.email === 'customer@bsm.com' && formData.password === 'customer123') {
        console.log('Customer login successful')
        setMessage('Login successful! Opening customer portal...')
        
        // Open customer portal directly
        setTimeout(() => {
          console.log('Opening customer portal...')
          window.location.href = '/customer/dashboard'
        }, 500)
        return
      }

      // If credentials don't match, show error
      setMessage('Invalid email or password')
      setLoading(false)

    } catch (err: any) {
      console.error('Login error:', err)
      setMessage('Login failed. Please try again.')
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleTabSelect = (tab: 'admin' | 'customer') => {
    setActiveTab(tab)
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Back to Home */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/" 
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-all duration-300 group"
            >
              <motion.div
                animate={{ x: [0, -5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
              </motion.div>
              Back to Home
            </Link>
          </motion.div>

          {/* Logo Section */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4 relative"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 40px rgba(147, 51, 234, 0.8)",
                  "0 0 20px rgba(59, 130, 246, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Shield className="h-8 w-8 text-white" />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.h1 
              className="text-3xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Welcome Back
            </motion.h1>
            
            <motion.p 
              className="text-gray-400 text-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Sign in to your BSM Platform account
            </motion.p>
          </motion.div>

          {/* Tab Selection */}
          <motion.div 
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex bg-white/5 backdrop-blur-md rounded-xl p-1 border border-white/10">
              <motion.button
                type="button"
                onClick={() => handleTabSelect('customer')}
                onMouseEnter={() => setHoveredTab('customer')}
                onMouseLeave={() => setHoveredTab(null)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 relative ${
                  activeTab === 'customer'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'customer' && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  className="relative z-10 flex items-center space-x-2"
                  animate={activeTab === 'customer' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium text-sm">Customer</span>
                </motion.div>
              </motion.button>
              
              <motion.button
                type="button"
                onClick={() => handleTabSelect('admin')}
                onMouseEnter={() => setHoveredTab('admin')}
                onMouseLeave={() => setHoveredTab(null)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 relative ${
                  activeTab === 'admin'
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === 'admin' && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600"
                    layoutId="activeTab"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <motion.div
                  className="relative z-10 flex items-center space-x-2"
                  animate={activeTab === 'admin' ? { scale: [1, 1.05, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Settings className="h-4 w-4" />
                  <span className="font-medium text-sm">Admin</span>
                </motion.div>
              </motion.button>
            </div>
          </motion.div>

          {/* Login Form */}
          <motion.div 
            className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            {/* Background Glow Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0"
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              {/* Email Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <label htmlFor="email" className="text-white text-sm font-medium flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 relative z-10 text-sm"
                    required
                    autoComplete="email"
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div 
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
              >
                <label htmlFor="password" className="text-white text-sm font-medium flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 pr-10 relative z-10 text-sm"
                    required
                    autoComplete="current-password"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </motion.button>
                </div>
              </motion.div>

              {/* Message Display */}
              <AnimatePresence>
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className={`p-4 rounded-lg flex items-center space-x-2 ${
                      message.includes('successful') 
                        ? 'bg-green-500/20 border border-green-500/50 text-green-200' 
                        : 'bg-red-500/20 border border-red-500/50 text-red-200'
                    }`}
                  >
                    {message.includes('successful') ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertCircle className="h-5 w-5" />
                    )}
                    <span>{message}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-base font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                />
                <div className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-sm">Signing in...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4" />
                      <span className="text-sm">Sign In</span>
                    </>
                  )}
                </div>
              </motion.button>
            </form>

            {/* Demo Credentials */}
            <motion.div 
              className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-3 w-3 text-yellow-400" />
                <h4 className="text-xs font-medium text-white">Demo Credentials</h4>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span><strong className="text-purple-400">Admin:</strong> admin@bsm.com / admin123</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span><strong className="text-blue-400">Customer:</strong> customer@bsm.com / customer123</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Additional Links */}
          <motion.div 
            className="mt-4 text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
          >
            <div>
              <Link 
                href="/auth/forgot-password" 
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
            
            <div>
              <span className="text-xs text-gray-400">
                Don&apos;t have an account?{' '}
              </span>
              <Link 
                href="/auth/signup" 
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}