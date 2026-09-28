'use client'

import React, { useEffect, useState } from 'react'

export function MouseSpotlight() {
  const [position, setPosition] = useState({ x: -1000, y: -1000 })

  useEffect(() => {
    const updateMouse = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMouse)
    return () => window.removeEventListener('mousemove', updateMouse)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
      style={{
        background: `radial-gradient(650px circle at ${position.x}px ${position.y}px, rgba(225, 29, 72, 0.06), transparent 70%)`,
      }}
    />
  )
}
