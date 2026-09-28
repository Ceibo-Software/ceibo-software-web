'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion'
import { sounds } from '@/lib/sound'

interface TiltCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  intensity?: number
  spotlightColor?: string
  enableSound?: boolean
}

export function TiltCard({
  children,
  className = '',
  intensity = 15,
  spotlightColor = 'rgba(225, 29, 72, 0.15)',
  enableSound = false,
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig)

  const [coords, setCoords] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    mouseX.set(x)
    mouseY.set(y)
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (enableSound) sounds.playClick()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0.5)
    mouseY.set(0.5)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/60 backdrop-blur-md transition-shadow duration-300 hover:border-rose-500/30 hover:shadow-[0_0_30px_rgba(225,29,72,0.12)] ${className}`}
      {...props}
    >
      {/* Radial Spotlight on hover */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
