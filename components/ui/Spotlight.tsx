'use client'

import React, { useEffect, useRef } from 'react'

export function MouseSpotlight() {
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    const updateMouse = (e: MouseEvent) => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(650px circle at ${e.clientX}px ${e.clientY}px, rgba(225, 29, 72, 0.06), transparent 70%)`
        }
      })
    }
    window.addEventListener('mousemove', updateMouse, { passive: true })
    return () => {
      window.removeEventListener('mousemove', updateMouse)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 transition-opacity duration-300"
    />
  )
}

