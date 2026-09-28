'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface RevealProps {
  children: ReactNode
  delay?: number
  duration?: number
  y?: number
  blur?: boolean
  className?: string
}

export function Reveal({
  children,
  delay = 0,
  duration = 0.7,
  y = 22,
  blur = false,
  className = '',
}: RevealProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y,
        ...(blur ? { filter: 'blur(4px)' } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(blur ? { filter: 'blur(0px)' } : {}),
      }}
      viewport={{ once: true, margin: '0px 0px -40px 0px', amount: 0.08 }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // Ultra-smooth progressive ease-out
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
