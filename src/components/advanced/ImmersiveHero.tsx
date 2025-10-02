'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion'
// Removed @react-spring/web import to avoid React Native conflicts
import { useGesture } from '@use-gesture/react'
import { ArrowRight, Play, Zap, Shield, Users, BarChart3 } from 'lucide-react'

export function ImmersiveHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [activeText, setActiveText] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 })
  
  const rotateX = useTransform(springY, [-300, 300], [15, -15])
  const rotateY = useTransform(springX, [-300, 300], [-15, 15])

  // Morphing text content
  const morphingTexts = [
    "Deliver Exceptional Customer Service",
    "Transform Your Business Operations", 
    "Empower Your Team with AI",
    "Scale Your Service Management"
  ]

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        mouseX.set(e.clientX - centerX)
        mouseY.set(e.clientY - centerY)
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Text morphing animation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveText((prev) => (prev + 1) % morphingTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Magnetic Button Component with Hover Effects
  function MagneticButton({ children, onClick, variant = 'primary' }: { 
    children: React.ReactNode, 
    onClick: () => void,
    variant?: 'primary' | 'secondary'
  }) {
    const [isHovered, setIsHovered] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    const bind = useGesture({
      onHover: ({ hovering }) => setIsHovered(hovering ?? false),
      onMove: ({ xy: [x, y] }) => {
        if (buttonRef.current && isHovered) {
          const rect = buttonRef.current.getBoundingClientRect()
          const centerX = rect.left + rect.width / 2
          const centerY = rect.top + rect.height / 2
          const deltaX = (x - centerX) * 0.15
          const deltaY = (y - centerY) * 0.15
          
          buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(1.05)`
        }
      },
      onMoveEnd: () => {
        if (buttonRef.current) {
          buttonRef.current.style.transform = 'translate(0px, 0px) scale(1)'
        }
      }
    })

    return (
      <motion.button
        ref={buttonRef}
        onClick={onClick}
        className={`relative px-8 py-4 rounded-xl font-semibold text-lg overflow-hidden group ${
          variant === 'primary' 
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
            : 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        {children}
        
        {/* Liquid Fill Effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0"
          animate={{ opacity: isHovered ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Particle Explosion on Click */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-cyan-400 rounded-full"
                  style={{
                    left: '50%',
                    top: '50%',
                  }}
                  animate={{
                    x: [0, Math.cos((i * 30 * Math.PI) / 180) * 50],
                    y: [0, Math.sin((i * 30 * Math.PI) / 180) * 50],
                    opacity: [1, 0],
                    scale: [1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: i * 0.05,
                    repeat: Infinity,
                    repeatDelay: 3
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    )
  }

  // Kinetic Typography Component
  function KineticText({ text, className }: { text: string, className?: string }) {
    return (
      <div className={`${className} relative`}>
        {text.split('').map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.05,
              type: "spring",
              stiffness: 100
            }}
            whileHover={{
              scale: 1.2,
              color: "#00FFFF",
              textShadow: "0 0 20px #00FFFF",
              transition: { duration: 0.2 }
            }}
            style={{
              transformOrigin: "center bottom",
              display: "inline-block"
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </div>
    )
  }

  // Energy Orb Component
  function EnergyOrb({ delay = 0 }: { delay?: number }) {
    return (
      <motion.div
        className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: [0, 1, 0],
          scale: [0, 1, 0],
          x: [0, Math.random() * 200 - 100],
          y: [0, Math.random() * 200 - 100]
        }}
        transition={{
          duration: 3,
          delay,
          repeat: Infinity,
          repeatDelay: 2
        }}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
      />
    )
  }

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        perspective: '1000px'
      }}
    >
      {/* 3D Transform Container */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge with Holographic Effect */}
          <motion.div
            className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-cyan-400 font-medium text-sm">
              🚀 Next-Generation BSM Platform
            </span>
          </motion.div>

          {/* Morphing Headline */}
          <div className="mb-8 h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.h1
                key={activeText}
                className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight"
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -50, rotateX: 90 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                style={{ transformOrigin: "center bottom" }}
              >
                <KineticText 
                  text={morphingTexts[activeText]} 
                  className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                />
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Subheadline with Liquid Effect */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{
              color: "#FFFFFF",
              textShadow: "0 0 30px rgba(0, 255, 255, 0.5)"
            }}
          >
            Integrate advanced workflow automation, AI-powered ticket handling, 
            and real-time analytics to transform your business service management.
          </motion.p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <MagneticButton
              onClick={() => window.location.href = '/admin/dashboard'}
              variant="primary"
            >
              <span className="flex items-center">
                Access Admin Dashboard
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </MagneticButton>
            
            <MagneticButton
              onClick={() => window.location.href = '/customer/dashboard'}
              variant="secondary"
            >
              <span className="flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Go to Customer Portal
              </span>
            </MagneticButton>
          </div>

          {/* Stats with Living Animations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, value: "15,000+", label: "Lines of Code", color: "from-blue-400 to-cyan-400" },
              { icon: Users, value: "200+", label: "Components", color: "from-purple-400 to-pink-400" },
              { icon: BarChart3, value: "50+", label: "Core Features", color: "from-green-400 to-emerald-400" },
              { icon: Zap, value: "10+", label: "Integrations", color: "from-yellow-400 to-orange-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <motion.div
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-md border border-white/20"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="h-8 w-8 text-white" />
                </motion.div>
                
                <motion.div
                  className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {stat.value}
                </motion.div>
                
                <div className="text-gray-400 text-sm font-medium">
                  {stat.label}
                </div>
                
                {/* Pulse Effect */}
                <motion.div
                  className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Energy Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <EnergyOrb key={i} delay={i * 0.2} />
        ))}
      </div>

      {/* Circuit Board Activation */}
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full opacity-20">
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M ${Math.random() * 100}%,${Math.random() * 100}% L ${Math.random() * 100}%,${Math.random() * 100}%`}
              stroke="#00FFFF"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </svg>
      </div>

      {/* Scroll Indicator with Magnetic Effect */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        whileHover={{ scale: 1.2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-4 bg-white/60 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}

