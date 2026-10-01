'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion'

interface TiltCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  intensity?: number
  spotlightColor?: string
}

export function TiltCard({
  children,
  className = '',
  intensity = 15,
  spotlightColor = 'rgba(225, 29, 72, 0.15)',
  ...props
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)

  const springConfig = { damping: 20, stiffness: 200 }
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [intensity, -intensity]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-intensity, intensity]), springConfig)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top

    mouseX.set(relX / rect.width)
    mouseY.set(relY / rect.height)

    cardRef.current.style.setProperty('--card-x', `${relX}px`)
    cardRef.current.style.setProperty('--card-y', `${relY}px`)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
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
      {/* Radial Spotlight on hover - rendered via direct CSS variable without React re-renders */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--card-x, 50%) var(--card-y, 50%), ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}

