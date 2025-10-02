'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
// Removed @react-spring/web import to avoid React Native conflicts
import { useGesture } from '@use-gesture/react'
import { Shield, Menu, X, Home, Users, Settings, BarChart3, MessageSquare } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface NavItem {
  name: string
  href: string
  icon: React.ComponentType<any>
  description: string
}

const navItems: NavItem[] = [
  { name: 'Home', href: '#home', icon: Home, description: 'Return to the main dashboard' },
  { name: 'About', href: '#about', icon: Users, description: 'Learn about our platform' },
  { name: 'Features', href: '#features', icon: Settings, description: 'Explore our capabilities' },
  { name: 'Analytics', href: '#analytics', icon: BarChart3, description: 'View performance metrics' },
  { name: 'Support', href: '#support', icon: MessageSquare, description: 'Get help and support' }
]

export function MorphingNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 100], [0, -50])
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8])
  const scale = useTransform(scrollY, [0, 100], [1, 0.95])

  // Mouse tracking for magnetic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Orbital Menu Animation - using Framer Motion instead
  const orbitalVariants = {
    open: { rotate: 0 },
    closed: { rotate: 180 }
  }

  // Magnetic Button Component with Hover Effects
  function MagneticButton({ children, index, onClick }: { children: React.ReactNode, index: number, onClick: () => void }) {
    const [isHovered, setIsHovered] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const bind = useGesture({
      onHover: ({ hovering }) => {
        setIsHovered(hovering ?? false)
        setHoveredIndex(hovering ? index : null)
      },
      onMove: ({ xy: [x, y] }) => {
        if (buttonRef.current && isHovered) {
          const rect = buttonRef.current.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (x - centerX) * 0.1
          const deltaY = (y - centerY) * 0.1
          
          buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.1)`
        }
      },
      onMoveEnd: () => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)'
        }
        setHoveredIndex(null)
      }
    })

    return (
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className="relative p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          rotate: isOpen ? 0 : index * 72,
          x: isOpen ? 0 : Math.cos((index * 72 * Math.PI) / 180) * 80 + (Math.sin(Date.now() * 0.001 + index) * 10),
          y: isOpen ? 0 : Math.sin((index * 72 * Math.PI) / 180) * 80 + (Math.cos(Date.now() * 0.001 + index) * 10),
          scale: hoveredIndex === index ? 1.5 : 1,
          zIndex: hoveredIndex === index ? 10 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25, duration: 0.8 }}
      >
        {children}
        
        {/* Liquid Fill Effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Particle Trail */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 45 * Math.PI) / 180) * 30],
                    y: [0, Math.sin((i * 45 * Math.PI) / 180) * 30],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ y, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Holographic Effect */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            animate={{
              filter: [
                'drop-shadow(0 0 10px rgba(0, 102, 255, 0.5))',
                'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                'drop-shadow(0 0 10px rgba(0, 102, 255, 0.5))'
              ],
              y: [0, -2, 2, 0],
              rotate: [0, 1, -1, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg opacity-0"
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              BSM
            </motion.span>
          </motion.div>

          {/* Desktop Navigation - Arranged in Line with Enhanced Animations */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white transition-all duration-500 group"
                onMouseEnter={() => setActiveItem(index)}
                initial={{ opacity: 0, y: -20 }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                whileHover={{ 
                  scale: 1.15, 
                  y: -8,
                  boxShadow: "0 15px 35px rgba(139, 92, 246, 0.6)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
              >
                <motion.div
                  className="relative"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                  <item.icon className="h-5 w-5" />
                  {/* Pulsing Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(139, 92, 246, 0.3)",
                        "0 0 20px rgba(139, 92, 246, 0.6)",
                        "0 0 0px rgba(139, 92, 246, 0.3)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                <span className="font-medium relative z-10">{item.name}</span>
                
                {/* Animated Underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                  initial={{ width: 0 }}
                  animate={{ width: activeItem === index ? '100%' : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
                
                {/* Background Glow */}
                <motion.div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-30 bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-sm"
                  transition={{ duration: 0.3 }}
                />
                
                {/* Floating Particles */}
                <motion.div
                  className="absolute inset-0 overflow-hidden rounded-lg"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      initial={{ 
                        x: Math.random() * 100, 
                        y: Math.random() * 100,
                        opacity: 0 
                      }}
                      animate={{ 
                        x: Math.random() * 100, 
                        y: Math.random() * 100,
                        opacity: [0, 1, 0]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </motion.div>
              </motion.a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <motion.button
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
              animate={{
                y: [0, -1, 1, 0]
              }}
              transition={{
                duration: 3 + Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.location.href = '/auth/login'}
            >
              Login
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              animate={{
                y: [0, -1, 1, 0],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2 + Math.random() * 1,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(139, 92, 246, 0.7)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/auth/login?role=admin'}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-16 left-0 right-0 bg-black/80 backdrop-blur-md border-t border-white/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-300"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orbital Menu for Desktop */}
      <div className="hidden md:block fixed top-20 right-8">
        <motion.div
          variants={orbitalVariants}
          animate={isOpen ? "open" : "closed"}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative w-32 h-32"
        >
          {navItems.map((item, index) => (
            <MagneticButton
              key={item.name}
              index={index}
              onClick={() => setActiveItem(index)}
            >
              <item.icon className="h-5 w-5 text-white" />
            </MagneticButton>
          ))}
        </motion.div>
      </div>
    </motion.nav>
  )
}
