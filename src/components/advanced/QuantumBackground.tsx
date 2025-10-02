'use client'

import { useRef, useEffect, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// Quantum Particle Field Component
function QuantumParticles({ count = 10000 }: { count?: number }) {
  const points = useRef<THREE.Points>(null)
  const { viewport } = useThree()

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count, viewport])

  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < count; i++) {
        positions[i * 3 + 1] += Math.sin(state.clock.elapsedTime + i * 0.01) * 0.001
        positions[i * 3] += Math.cos(state.clock.elapsedTime + i * 0.01) * 0.0005
      }
      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#0066FF"
        size={0.002}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Neural Network Visualization
function NeuralNetwork() {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => {
    const nodePositions = []
    for (let i = 0; i < 50; i++) {
      nodePositions.push([
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      ])
    }
    return nodePositions
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.1
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <group ref={group}>
      {nodes.map((position, index) => (
        <Sphere key={index} position={position as [number, number, number]} args={[0.05, 8, 8]}>
          <MeshDistortMaterial
            color="#8B5CF6"
            attach="material"
            distort={0.3}
            speed={2}
            roughness={0}
            metalness={0.8}
          />
        </Sphere>
      ))}
    </group>
  )
}

// Fluid Simulation Canvas
function FluidSimulation() {
  const mesh = useRef<THREE.Mesh>(null)
  
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x = state.clock.elapsedTime * 0.2
      mesh.current.rotation.y = state.clock.elapsedTime * 0.1
      const material = mesh.current.material as THREE.ShaderMaterial
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime
      }
    }
  })

  return (
    <mesh ref={mesh} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20, 64, 64]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          color1: { value: new THREE.Color('#0066FF') },
          color2: { value: new THREE.Color('#8B5CF6') }
        }}
        vertexShader={`
          uniform float time;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            vUv = uv;
            vPosition = position;
            vec3 pos = position;
            pos.z += sin(pos.x * 10.0 + time) * 0.1;
            pos.z += cos(pos.y * 10.0 + time) * 0.1;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color1;
          uniform vec3 color2;
          varying vec2 vUv;
          varying vec3 vPosition;
          
          void main() {
            float noise = sin(vPosition.x * 10.0 + time) * cos(vPosition.y * 10.0 + time);
            vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
            gl_FragColor = vec4(color, 0.3);
          }
        `}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

// Holographic Grid Matrix
function HolographicGrid() {
  const grid = useRef<THREE.GridHelper>(null)
  
  useFrame((state) => {
    if (grid.current) {
      grid.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      grid.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
    }
  })

  return (
    <gridHelper
      ref={grid}
      args={[50, 50, '#00FFFF', '#00FFFF']}
      position={[0, 0, -10]}
      rotation={[Math.PI / 2, 0, 0]}
    />
  )
}

// Main Background Component
export function QuantumBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Colorful CSS Background Layers */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(135deg, #FF0080 0%, #00FFFF 25%, #FFFF00 50%, #FF00FF 75%, #FF0080 100%)',
            'linear-gradient(135deg, #00FFFF 0%, #FFFF00 25%, #FF00FF 50%, #FF0080 75%, #00FFFF 100%)',
            'linear-gradient(135deg, #FFFF00 0%, #FF00FF 25%, #FF0080 50%, #00FFFF 75%, #FFFF00 100%)',
            'linear-gradient(135deg, #FF00FF 0%, #FF0080 25%, #00FFFF 50%, #FFFF00 75%, #FF00FF 100%)'
          ]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Light Theme - Live Light Elements */}
      <motion.div
        className="absolute inset-0 light:block dark:hidden midnight:hidden"
        animate={{
          background: [
            'linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 25%, #f3e8ff 50%, #fef3c7 75%, #f0f9ff 100%)',
            'linear-gradient(135deg, #e0e7ff 0%, #f3e8ff 25%, #fef3c7 50%, #f0f9ff 75%, #e0e7ff 100%)',
            'linear-gradient(135deg, #f3e8ff 0%, #fef3c7 25%, #f0f9ff 50%, #e0e7ff 75%, #f3e8ff 100%)',
            'linear-gradient(135deg, #fef3c7 0%, #f0f9ff 25%, #e0e7ff 50%, #f3e8ff 75%, #fef3c7 100%)'
          ]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Colorful Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-40 h-40 rounded-full blur-xl opacity-60"
            style={{
              background: `radial-gradient(circle, ${
                ['#FF0080', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00', '#FF6600', '#FF0066', '#6600FF'][i % 8]
              }80, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 300 - 150, 0],
              y: [0, Math.random() * 300 - 150, 0],
              scale: [0.8, 1.5, 0.8],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 360]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 2
            }}
          />
        ))}
      </div>
      
      {/* Animated Overlay */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(0, 102, 255, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#0066FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#8B5CF6" />
        
        <QuantumParticles count={5000} />
        <NeuralNetwork />
        <FluidSimulation />
        <HolographicGrid />
      </Canvas>

      {/* Data Stream Rivers */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: ['-100vh', '100vh'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Magnetic Field Lines */}
      <div className="absolute inset-0">
        <svg className="w-full h-full opacity-20">
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.path
              key={i}
              d={`M 0,${100 + i * 80} Q ${200 + i * 50},${50 + i * 30} ${400 + i * 100},${100 + i * 80} T 800,${100 + i * 80}`}
              stroke="#00FFFF"
              strokeWidth="1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </svg>
      </div>

      {/* Cosmic Dust Clouds */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full opacity-10"
            style={{
              background: `radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  )
}
