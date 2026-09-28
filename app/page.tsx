'use client'

import { useState } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'
import { Services } from '@/components/sections/Services'
import { Projects } from '@/components/sections/Projects'
import { Team } from '@/components/sections/Team'
import { Contact } from '@/components/sections/Contact'
import { CeiboChatbot } from '@/components/chat/CeiboChatbot'
import { ParticleBackground } from '@/components/canvas/ParticleBackground'
import { MouseSpotlight } from '@/components/ui/Spotlight'

export default function Page() {
  const [isChatOpen, setIsChatOpen] = useState(false)

  return (
    <div className="relative min-h-screen bg-[#09090b] text-zinc-100 selection:bg-rose-500/30 selection:text-white">
      {/* Background Interactive Particle Canvas */}
      <ParticleBackground />

      {/* Dynamic Cursor Light Spotlight */}
      <MouseSpotlight />

      {/* Ambient Radial Gradient Overlays */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,72,0.12),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.12] [background-image:linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]"
      />

      {/* Navigation */}
      <Navbar onOpenChat={() => setIsChatOpen(true)} />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <Hero onOpenChat={() => setIsChatOpen(true)} />
        <Services />
        <Projects />
        <Team />
        <Contact />
      </main>

      {/* Interactive AI Chatbot Widget */}
      <CeiboChatbot
        isOpenExternal={isChatOpen}
        onCloseExternal={() => setIsChatOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  )
}
