'use client'

import { useEffect, useRef } from 'react'

interface Point {
  x: number
  y: number
}

export type LeafType = 'trifoliate' | 'lanceolate' | 'bud'

export interface Leaf {
  type: LeafType
  t: number // Position along parent branch curve (0 to 1)
  side: -1 | 1 // Direction from stem
  size: number
  angleOffset: number
  swayPhase: number
  swaySpeed: number
  color: string
  veinColor: string
}

interface Branch {
  id: number
  worldStartX: number
  worldStartY: number
  worldCpX: number
  worldCpY: number
  worldEndX: number
  worldEndY: number
  thickness: number
  depth: number
  length: number
  angle: number
  swayPhase: number
  swaySpeed: number
  swayAmp: number
  children: Branch[]
  leaves: Leaf[]
  isTerminal: boolean
  hasBlossom: boolean
  blossomSize: number
  blossomPhase: number
  activationY: number
  growProgress: number
}

interface SapPulse {
  branch: Branch
  progress: number
  speed: number
  color: string
}

interface Petal {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  maxOpacity: number
  rotation: number
  rotationSpeed: number
  swayFreq: number
  swayPhase: number
  life: number
  maxLife: number
  color: string
  isLeaf?: boolean
}

export function CeiboRootsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = window.innerWidth
    let height = window.innerHeight

    // Handle high DPI screens (capped at 2 for performance)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const setupCanvas = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    setupCanvas()

    const isMobile = width < 768
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    // Scroll state & smooth parallax tracking
    let targetScrollY = window.scrollY || 0
    let smoothScrollY = targetScrollY
    let prevScrollY = targetScrollY
    let scrollVelocity = 0

    // Ceibo Crimson spectrum & leaf bio-digital palette
    const ceiboColors = [
      '#e11d48', // Crimson Rose-600
      '#f43f5e', // Vibrant Rose-500
      '#fb7185', // Soft Rose-400
      '#fda4af', // Blossom Highlight
    ]

    const leafPalettes = [
      { fill: 'rgba(16, 185, 129, 0.82)', vein: 'rgba(244, 63, 94, 0.95)' },  // Vibrant emerald with rose vein
      { fill: 'rgba(34, 197, 94, 0.78)', vein: 'rgba(251, 113, 133, 0.9)' },   // Botanical leaf green
      { fill: 'rgba(225, 29, 72, 0.72)', vein: 'rgba(255, 255, 255, 0.92)' },  // Young crimson Ceibo leaf
      { fill: 'rgba(5, 150, 105, 0.85)', vein: 'rgba(253, 164, 175, 0.9)' },   // Deep jade green
    ]

    // Mouse tracker
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      isHovered: false,
    }

    // --- PROCEDURAL CEIBO TREE & EXTENDING STEMS GENERATOR ---
    const allTreesAndStems: Branch[] = []
    let branchIdCounter = 0

    // Helper: generate randomized botanical leaves along a branch
    const generateLeavesForBranch = (
      length: number,
      depth: number,
      maxDepth: number
    ): Leaf[] => {
      const leaves: Leaf[] = []
      if (depth < 1) return leaves

      // Un poquito más de hojas (3 a 4 en puntas, 2 a 3 en medias)
      const leafCount = depth >= maxDepth - 1
        ? (isMobile ? 3 : 4)
        : (isMobile ? 2 : 3)
      const types: LeafType[] = ['trifoliate', 'lanceolate', 'bud']

      for (let i = 0; i < leafCount; i++) {
        const t = 0.28 + (i / (leafCount + 0.3)) * 0.64
        const chosenType =
          depth <= 1
            ? 'trifoliate'
            : types[Math.floor(Math.random() * types.length)]

        const palette =
          leafPalettes[Math.floor(Math.random() * leafPalettes.length)]

        leaves.push({
          type: chosenType,
          t,
          side: i % 2 === 0 ? 1 : -1,
          size:
            chosenType === 'trifoliate'
              ? (isMobile ? 11 : 14) + Math.random() * 3
              : (isMobile ? 8 : 11) + Math.random() * 2.5,
          angleOffset: (Math.PI / 4) * (0.75 + Math.random() * 0.35),
          swayPhase: Math.random() * Math.PI * 2,
          swaySpeed: 0.001 + Math.random() * 0.0015,
          color: palette.fill,
          veinColor: palette.vein,
        })
      }

      return leaves
    }

    const createBranch = (
      startX: number,
      startY: number,
      angle: number,
      length: number,
      depth: number,
      maxDepth: number,
      activationY: number,
      customThickness?: number
    ): Branch => {
      const id = ++branchIdCounter
      const midLen = length * 0.5
      const curveOffset = (Math.random() - 0.5) * length * 0.38
      const normalAngle = angle + Math.PI / 2

      const midX = startX + Math.cos(angle) * midLen
      const midY = startY + Math.sin(angle) * midLen
      let cpX = midX + Math.cos(normalAngle) * curveOffset
      let cpY = midY + Math.sin(normalAngle) * curveOffset

      let endX = startX + Math.cos(angle) * length
      let endY = startY + Math.sin(angle) * length

      // Safety ceiling: keep Ceibo branches well below the navbar (at least 200px breathing room)
      const navbarCeilingY = Math.max(200, height * 0.28)
      if (activationY < 100 && endY < navbarCeilingY) {
        endY = navbarCeilingY + 15 + Math.random() * 25
        if (cpY < navbarCeilingY) cpY = navbarCeilingY + 15
      }

      const isTerminal = depth >= maxDepth
      const hasBlossom = isTerminal || (depth >= 2 && Math.random() < 0.5)

      const alreadyPast =
        targetScrollY > 100 && startY < targetScrollY - height * 0.2
      const initialGrown = prefersReducedMotion || alreadyPast ? 1 : 0

      const thickness =
        customThickness !== undefined
          ? customThickness
          : Math.max(1, (maxDepth - depth + 1) * 1.25)

      const leaves = generateLeavesForBranch(length, depth, maxDepth)

      const branch: Branch = {
        id,
        worldStartX: startX,
        worldStartY: startY,
        worldCpX: cpX,
        worldCpY: cpY,
        worldEndX: endX,
        worldEndY: endY,
        thickness,
        depth,
        length,
        angle,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.0007 + Math.random() * 0.0012,
        swayAmp: (depth + 1) * 2.8,
        children: [],
        leaves,
        isTerminal,
        hasBlossom,
        blossomSize: 3.0 + Math.random() * 3.5,
        blossomPhase: Math.random() * Math.PI * 2,
        activationY,
        growProgress: initialGrown,
      }

      if (depth < maxDepth) {
        const childCount =
          depth === 0
            ? (isMobile ? 2 : 3)
            : Math.random() > 0.3
            ? 2
            : 1
        const spread = (Math.PI / 4) * (0.85 + Math.random() * 0.35)

        for (let i = 0; i < childCount; i++) {
          const ratio = childCount > 1 ? (i / (childCount - 1) - 0.5) * 2 : 0
          const subAngle =
            angle +
            ratio * (spread * 0.5) +
            (Math.random() - 0.5) * 0.2
          const subLength = length * (0.68 + Math.random() * 0.22)
          const childActivationY = activationY + length * 0.28
          branch.children.push(
            createBranch(
              endX,
              endY,
              subAngle,
              subLength,
              depth + 1,
              maxDepth,
              childActivationY
            )
          )
        }
      }

      return branch
    }

    const generateCeiboEcosystem = () => {
      allTreesAndStems.length = 0
      branchIdCounter = 0

      const docHeight = Math.max(
        document.documentElement.scrollHeight || 0,
        height * 4.2
      )

      // ==========================================
      // 1. THE CEIBO TREE OF HERO (Central Tree)
      // ==========================================
      const treeOriginX = width * 0.5
      const treeOriginY = height * 0.95
      const treeTrunkHeight = height * 0.24

      // Central Trunk: Rising organically, splitting into the Crown
      const mainTrunk = createBranch(
        treeOriginX,
        treeOriginY,
        -Math.PI / 2,
        treeTrunkHeight,
        0,
        isMobile ? 2 : 3,
        0,
        isMobile ? 4.5 : 5.8
      )

      // Primary Lateral limbs framing the sides (spreading wider laterally)
      const leftCrownLimb = createBranch(
        treeOriginX - 20,
        treeOriginY - treeTrunkHeight * 0.55,
        (-2.75 * Math.PI) / 4,
        treeTrunkHeight * 0.55,
        1,
        isMobile ? 2 : 3,
        0,
        3.4
      )

      const rightCrownLimb = createBranch(
        treeOriginX + 20,
        treeOriginY - treeTrunkHeight * 0.55,
        (-1.25 * Math.PI) / 4,
        treeTrunkHeight * 0.55,
        1,
        isMobile ? 2 : 3,
        0,
        3.4
      )

      // Two delicate secondary lateral branches ("algunas ramas más")
      const leftMidBranch = createBranch(
        treeOriginX - 16,
        treeOriginY - treeTrunkHeight * 0.35,
        (-2.95 * Math.PI) / 4,
        treeTrunkHeight * 0.40,
        1,
        2,
        0,
        2.5
      )

      const rightMidBranch = createBranch(
        treeOriginX + 16,
        treeOriginY - treeTrunkHeight * 0.35,
        (-1.05 * Math.PI) / 4,
        treeTrunkHeight * 0.40,
        1,
        2,
        0,
        2.5
      )

      // Basal roots grounding the Ceibo
      const leftRoot = createBranch(
        treeOriginX - 10,
        treeOriginY + 5,
        (4 * Math.PI) / 5,
        width * (isMobile ? 0.28 : 0.24),
        1,
        3,
        0,
        3.0
      )

      const rightRoot = createBranch(
        treeOriginX + 10,
        treeOriginY + 5,
        Math.PI / 5,
        width * (isMobile ? 0.28 : 0.24),
        1,
        3,
        0,
        3.0
      )

      allTreesAndStems.push(
        mainTrunk,
        leftCrownLimb,
        rightCrownLimb,
        leftMidBranch,
        rightMidBranch,
        leftRoot,
        rightRoot
      )

      // ==============================================================
      // 2. DESCENDING STEMS & VINES EXTENDING DOWN INTO ALL SECTIONS
      // ==============================================================
      const servicesY = docHeight * 0.24
      const projectsY = docHeight * 0.48
      const teamY = docHeight * 0.70
      const contactY = docHeight * 0.88

      // Stems descending from Hero into Services
      allTreesAndStems.push(
        createBranch(
          width * 0.05,
          treeOriginY - 40,
          Math.PI / 2.3,
          height * 0.45,
          1,
          isMobile ? 3 : 4,
          height * 0.15,
          2.4
        ),
        createBranch(
          width * 0.95,
          treeOriginY - 40,
          Math.PI / 1.8,
          height * 0.45,
          1,
          isMobile ? 3 : 4,
          height * 0.15,
          2.4
        )
      )

      // Stems continuing across Services and into Projects
      allTreesAndStems.push(
        createBranch(
          -20,
          servicesY + height * 0.15,
          Math.PI / 3.2,
          width * 0.32,
          1,
          isMobile ? 3 : 4,
          servicesY - height * 0.35,
          2.2
        ),
        createBranch(
          width + 20,
          servicesY + height * 0.3,
          (2 * Math.PI) / 3.2,
          width * 0.34,
          1,
          isMobile ? 3 : 4,
          servicesY - height * 0.2,
          2.2
        )
      )

      // Stems weaving through Projects
      allTreesAndStems.push(
        createBranch(
          width * 0.06,
          projectsY + height * 0.1,
          Math.PI / 2.6,
          height * 0.42,
          1,
          isMobile ? 3 : 4,
          projectsY - height * 0.3,
          2.2
        ),
        createBranch(
          width * 0.94,
          projectsY + height * 0.25,
          Math.PI / 1.7,
          height * 0.42,
          1,
          isMobile ? 3 : 4,
          projectsY - height * 0.25,
          2.2
        )
      )

      // Stems descending through Team & Contact
      allTreesAndStems.push(
        createBranch(
          -25,
          teamY + height * 0.2,
          Math.PI / 4,
          width * 0.28,
          1,
          3,
          teamY - height * 0.35,
          2.0
        ),
        createBranch(
          width + 25,
          teamY + height * 0.1,
          (3 * Math.PI) / 4,
          width * 0.28,
          1,
          3,
          teamY - height * 0.35,
          2.0
        ),
        createBranch(
          width * 0.5,
          docHeight - 10,
          -Math.PI / 2,
          height * 0.38,
          1,
          isMobile ? 3 : 4,
          contactY - height * 0.3,
          3.2
        )
      )
    }

    generateCeiboEcosystem()

    // Flatten branches for pulses and hover
    const allBranches: Branch[] = []
    const flattenBranches = (b: Branch) => {
      allBranches.push(b)
      b.children.forEach(flattenBranches)
    }
    allTreesAndStems.forEach(flattenBranches)

    // --- SAP ENERGY PULSES ---
    const pulses: SapPulse[] = []
    let lastPulseTime = 0

    const spawnPulse = (specificBranch?: Branch) => {
      const eligible = specificBranch
        ? [specificBranch]
        : allBranches.filter(
            (b) =>
              b.growProgress > 0.85 &&
              Math.abs(b.worldStartY - smoothScrollY) < height * 1.2
          )
      if (eligible.length === 0) return

      const target = eligible[Math.floor(Math.random() * eligible.length)]
      pulses.push({
        branch: target,
        progress: 0,
        speed: 0.012 + Math.random() * 0.015,
        color: ceiboColors[Math.floor(Math.random() * ceiboColors.length)],
      })
    }

    // --- FLOATING PETALS & OCCASIONAL LEAVES ---
    const petals: Petal[] = []
    const maxPetals = isMobile ? 22 : 44

    const createPetal = (originX?: number, originY?: number, burst = false): Petal => {
      const x = originX !== undefined ? originX : Math.random() * width
      const y = originY !== undefined ? originY : height + 20 + Math.random() * 50
      const burstSpeed = burst ? 2.6 : 0.6
      const angle = burst
        ? Math.random() * Math.PI * 2
        : -Math.PI / 2 + (Math.random() - 0.5) * 0.85
      const isLeaf = Math.random() < 0.25

      return {
        x,
        y,
        vx: Math.cos(angle) * (Math.random() * burstSpeed + 0.3),
        vy: burst
          ? Math.sin(angle) * (Math.random() * burstSpeed + 0.3)
          : -(Math.random() * 0.7 + 0.3),
        size: isLeaf ? Math.random() * 4 + 4 : Math.random() * 3 + 2,
        opacity: 0,
        maxOpacity: Math.random() * 0.65 + 0.25,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.03,
        swayFreq: 0.0015 + Math.random() * 0.002,
        swayPhase: Math.random() * Math.PI * 2,
        life: 0,
        maxLife: burst ? 130 + Math.random() * 90 : 360 + Math.random() * 260,
        color: isLeaf
          ? 'rgba(34, 85, 65, 0.7)'
          : ceiboColors[Math.floor(Math.random() * ceiboColors.length)],
        isLeaf,
      }
    }

    for (let i = 0; i < maxPetals; i++) {
      const p = createPetal(Math.random() * width, Math.random() * height)
      p.life = Math.random() * p.maxLife
      petals.push(p)
    }

    // --- EVENT LISTENERS ---
    const handleScroll = () => {
      targetScrollY = window.scrollY || 0
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.isHovered = true

      if (Math.random() < 0.25) {
        const cameraY = smoothScrollY * 0.85
        const worldMouseY = mouse.targetY + cameraY

        let closestBranch: Branch | null = null
        let minDist = 180

        for (const b of allBranches) {
          if (b.growProgress < 0.5) continue
          const d = Math.hypot(b.worldEndX - mouse.targetX, b.worldEndY - worldMouseY)
          if (d < minDist) {
            minDist = d
            closestBranch = b
          }
        }

        if (closestBranch && pulses.length < 16) {
          spawnPulse(closestBranch)
        }
      }
    }

    const handleMouseLeave = () => {
      mouse.targetX = -2000
      mouse.targetY = -2000
      mouse.isHovered = false
    }

    const handleResize = () => {
      setupCanvas()
      generateCeiboEcosystem()
      allBranches.length = 0
      allTreesAndStems.forEach(flattenBranches)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Math helpers for curves
    const getQuadraticBezierPoint = (
      p0: Point,
      p1: Point,
      p2: Point,
      t: number
    ): Point => {
      const oneMinusT = 1 - t
      return {
        x:
          oneMinusT * oneMinusT * p0.x +
          2 * oneMinusT * t * p1.x +
          t * t * p2.x,
        y:
          oneMinusT * oneMinusT * p0.y +
          2 * oneMinusT * t * p1.y +
          t * t * p2.y,
      }
    }

    const getSubCurve = (
      p0: Point,
      p1: Point,
      p2: Point,
      t: number
    ): { p0: Point; p1: Point; p2: Point } => {
      const p01 = {
        x: p0.x + (p1.x - p0.x) * t,
        y: p0.y + (p1.y - p0.y) * t,
      }
      const p12 = {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t,
      }
      const p012 = {
        x: p01.x + (p12.x - p01.x) * t,
        y: p01.y + (p12.y - p01.y) * t,
      }
      return { p0, p1: p01, p2: p012 }
    }

    // ==========================================
    // LEAF VARIETY RENDERERS (LIGHTWEIGHT BOTANICAL)
    // ==========================================

    const drawTrifoliateLeaf = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      size: number,
      growFactor: number,
      palette: { fill: string; vein: string }
    ) => {
      const s = size * growFactor
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(s * 0.4, 0)
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.35)'
      ctx.lineWidth = 1.0
      ctx.stroke()

      const drawLeaflet = (
        offsetX: number,
        offsetY: number,
        leafletAngle: number,
        scale: number
      ) => {
        ctx.save()
        ctx.translate(offsetX, offsetY)
        ctx.rotate(leafletAngle)

        const len = s * scale
        const w = s * scale * 0.42

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(len * 0.4, -w, len, 0)
        ctx.quadraticCurveTo(len * 0.4, w, 0, 0)
        ctx.fillStyle = palette.fill
        ctx.fill()

        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(len * 0.85, 0)
        ctx.strokeStyle = palette.vein
        ctx.lineWidth = 0.8
        ctx.stroke()

        ctx.restore()
      }

      drawLeaflet(s * 0.4, 0, 0, 1.0)
      drawLeaflet(s * 0.25, 0, -Math.PI / 4.5, 0.75)
      drawLeaflet(s * 0.25, 0, Math.PI / 4.5, 0.75)

      ctx.restore()
    }

    const drawLanceolateLeaf = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      size: number,
      growFactor: number,
      palette: { fill: string; vein: string }
    ) => {
      const s = size * 1.25 * growFactor
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      const w = s * 0.3

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.quadraticCurveTo(s * 0.5, -w, s, 0)
      ctx.quadraticCurveTo(s * 0.5, w, 0, 0)
      ctx.fillStyle = palette.fill
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(s * 0.9, 0)
      ctx.strokeStyle = palette.vein
      ctx.lineWidth = 0.9
      ctx.stroke()

      ctx.restore()
    }

    const drawBudCluster = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      angle: number,
      size: number,
      growFactor: number,
      palette: { fill: string; vein: string }
    ) => {
      const s = size * 0.75 * growFactor
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(angle)

      for (const sign of [-1, 1]) {
        ctx.save()
        ctx.rotate(sign * (Math.PI / 5))
        ctx.beginPath()
        ctx.ellipse(s * 0.5, 0, s * 0.5, s * 0.25, 0, 0, Math.PI * 2)
        ctx.fillStyle = palette.fill
        ctx.fill()
        ctx.restore()
      }

      ctx.beginPath()
      ctx.arc(s * 0.2, 0, 1.6, 0, Math.PI * 2)
      ctx.fillStyle = palette.vein
      ctx.fill()

      ctx.restore()
    }

    // --- ANIMATION LOOP (SILKY SMOOTH 60 FPS) ---
    let time = 0

    const render = () => {
      time++

      smoothScrollY += (targetScrollY - smoothScrollY) * 0.1
      scrollVelocity = smoothScrollY - prevScrollY
      prevScrollY = smoothScrollY

      const cameraY = smoothScrollY * 0.85

      mouse.x += (mouse.targetX - mouse.x) * 0.12
      mouse.y += (mouse.targetY - mouse.y) * 0.12

      ctx.clearRect(0, 0, width, height)

      if (time - lastPulseTime > 70 && pulses.length < 12) {
        spawnPulse()
        lastPulseTime = time
      }

      const currentScrollTrigger = targetScrollY + height * 0.9

      const drawBranch = (
        b: Branch,
        parentScreenEndX: number,
        parentScreenEndY: number,
        parentGrown: number
      ) => {
        const isEntryRoot = b.depth === 0 || allTreesAndStems.includes(b)
        const canStartGrowing = isEntryRoot
          ? currentScrollTrigger >= b.activationY && time > 8
          : parentGrown >= 0.88 && currentScrollTrigger >= b.activationY

        if (canStartGrowing && b.growProgress < 1) {
          const stretchSpeed = 0.018 + b.depth * 0.0035
          b.growProgress = Math.min(1, b.growProgress + stretchSpeed)
        }

        if (b.growProgress <= 0.01) {
          return
        }

        const screenStartY = b.worldStartY - cameraY
        const screenCpY = b.worldCpY - cameraY
        const screenEndY = b.worldEndY - cameraY

        const maxExtentY = Math.max(screenStartY, screenCpY, screenEndY)
        const minExtentY = Math.min(screenStartY, screenCpY, screenEndY)
        if (minExtentY > height + 250 || maxExtentY < -250) {
          if (b.growProgress > 0.85) {
            for (const child of b.children) {
              drawBranch(child, b.worldEndX, screenEndY, b.growProgress)
            }
          }
          return
        }

        const sway = prefersReducedMotion
          ? 0
          : Math.sin(time * b.swaySpeed + b.swayPhase) * b.swayAmp

        let mouseBendX = 0
        let mouseBendY = 0
        const distToMouse = Math.hypot(
          b.worldEndX - mouse.x,
          screenEndY - mouse.y
        )
        if (distToMouse < 220 && distToMouse > 0) {
          const factor = (1 - distToMouse / 220) * 12
          mouseBendX = ((mouse.x - b.worldEndX) / distToMouse) * factor
          mouseBendY = ((mouse.y - screenEndY) / distToMouse) * factor
        }

        const p0: Point = { x: parentScreenEndX, y: parentScreenEndY }
        const p1: Point = {
          x: b.worldCpX + sway * 0.5 + mouseBendX * 0.4,
          y: screenCpY + sway * 0.2 + mouseBendY * 0.4,
        }
        const p2: Point = {
          x: b.worldEndX + sway + mouseBendX,
          y: screenEndY + sway * 0.4 + mouseBendY,
        }

        const partialCurve =
          b.growProgress >= 0.99
            ? { p0, p1, p2 }
            : getSubCurve(p0, p1, p2, b.growProgress)

        ctx.beginPath()
        ctx.moveTo(partialCurve.p0.x, partialCurve.p0.y)
        ctx.quadraticCurveTo(
          partialCurve.p1.x,
          partialCurve.p1.y,
          partialCurve.p2.x,
          partialCurve.p2.y
        )

        const alpha = Math.max(0.12, 0.46 - b.depth * 0.05) * b.growProgress
        ctx.lineWidth = b.thickness
        ctx.strokeStyle = `rgba(225, 29, 72, ${alpha})`
        ctx.lineCap = 'round'
        ctx.stroke()

        if (b.growProgress > 0.04 && b.growProgress < 0.96) {
          ctx.beginPath()
          ctx.arc(
            partialCurve.p2.x,
            partialCurve.p2.y,
            b.thickness * 1.1,
            0,
            Math.PI * 2
          )
          ctx.fillStyle = '#fda4af'
          ctx.shadowColor = '#e11d48'
          ctx.shadowBlur = 8
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Draw leaf varieties
        for (const leaf of b.leaves) {
          if (b.growProgress > leaf.t) {
            const leafGrowProgress = Math.min(
              1,
              (b.growProgress - leaf.t) / (1 - leaf.t)
            )

            const leafPt = getQuadraticBezierPoint(
              partialCurve.p0,
              partialCurve.p1,
              partialCurve.p2,
              leaf.t / Math.max(0.01, b.growProgress)
            )

            const leafSway = prefersReducedMotion
              ? 0
              : Math.sin(time * leaf.swaySpeed + leaf.swayPhase) * 0.25
            const totalLeafAngle =
              b.angle + leaf.side * leaf.angleOffset + leafSway

            const palette = { fill: leaf.color, vein: leaf.veinColor }

            if (leaf.type === 'trifoliate') {
              drawTrifoliateLeaf(
                ctx,
                leafPt.x,
                leafPt.y,
                totalLeafAngle,
                leaf.size,
                leafGrowProgress,
                palette
              )
            } else if (leaf.type === 'lanceolate') {
              drawLanceolateLeaf(
                ctx,
                leafPt.x,
                leafPt.y,
                totalLeafAngle,
                leaf.size,
                leafGrowProgress,
                palette
              )
            } else {
              drawBudCluster(
                ctx,
                leafPt.x,
                leafPt.y,
                totalLeafAngle,
                leaf.size,
                leafGrowProgress,
                palette
              )
            }
          }
        }

        // Blossom at terminals
        if (b.hasBlossom && b.growProgress > 0.85) {
          const bloomFactor = (b.growProgress - 0.85) / 0.15
          const pulse = prefersReducedMotion
            ? 0.5
            : 0.5 + 0.5 * Math.sin(time * 0.03 + b.blossomPhase)
          const blossomRadius =
            b.blossomSize * bloomFactor * (0.85 + pulse * 0.3)
          const blossomAlpha = (0.4 + pulse * 0.45) * bloomFactor

          const tipX = partialCurve.p2.x
          const tipY = partialCurve.p2.y

          const glowGrad = ctx.createRadialGradient(
            tipX,
            tipY,
            0,
            tipX,
            tipY,
            blossomRadius * 3.5
          )
          glowGrad.addColorStop(0, `rgba(244, 63, 94, ${blossomAlpha * 0.55})`)
          glowGrad.addColorStop(
            0.5,
            `rgba(225, 29, 72, ${blossomAlpha * 0.2})`
          )
          glowGrad.addColorStop(1, 'rgba(225, 29, 72, 0)')

          ctx.fillStyle = glowGrad
          ctx.beginPath()
          ctx.arc(tipX, tipY, blossomRadius * 3.5, 0, Math.PI * 2)
          ctx.fill()

          ctx.save()
          ctx.translate(tipX, tipY)
          ctx.rotate(b.angle + Math.sin(time * 0.02) * 0.1)
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.quadraticCurveTo(
            blossomRadius * 1.5,
            -blossomRadius * 0.8,
            blossomRadius * 2,
            0
          )
          ctx.quadraticCurveTo(
            blossomRadius * 1.5,
            blossomRadius * 0.8,
            0,
            0
          )
          ctx.fillStyle = `rgba(225, 29, 72, ${blossomAlpha * 0.85})`
          ctx.fill()

          ctx.fillStyle = `rgba(255, 255, 255, ${blossomAlpha * 0.9})`
          ctx.beginPath()
          ctx.arc(0, 0, blossomRadius * 0.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.restore()
        }

        if (b.growProgress > 0.85) {
          for (const child of b.children) {
            drawBranch(
              child,
              partialCurve.p2.x,
              partialCurve.p2.y,
              b.growProgress
            )
          }
        }
      }

      for (const root of allTreesAndStems) {
        drawBranch(root, root.worldStartX, root.worldStartY - cameraY, 1)
      }

      // Draw sap pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.progress += p.speed

        if (p.progress >= 1) {
          if (p.branch.children.length > 0 && Math.random() < 0.7) {
            const availableChildren = p.branch.children.filter(
              (c) => c.growProgress > 0.5
            )
            if (availableChildren.length > 0) {
              p.branch =
                availableChildren[
                  Math.floor(Math.random() * availableChildren.length)
                ]
              p.progress = 0
            } else {
              pulses.splice(i, 1)
              continue
            }
          } else {
            pulses.splice(i, 1)
            continue
          }
        }

        const b = p.branch
        const screenStartY = b.worldStartY - cameraY
        const screenCpY = b.worldCpY - cameraY
        const screenEndY = b.worldEndY - cameraY

        const p0 = { x: b.worldStartX, y: screenStartY }
        const p1 = { x: b.worldCpX, y: screenCpY }
        const p2 = { x: b.worldEndX, y: screenEndY }
        const pt = getQuadraticBezierPoint(
          p0,
          p1,
          p2,
          p.progress * b.growProgress
        )

        if (pt.y >= -20 && pt.y <= height + 20) {
          ctx.beginPath()
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.shadowColor = p.color
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // Draw floating petals & drifting leaves
      const scrollWind = -scrollVelocity * 0.08

      for (let i = petals.length - 1; i >= 0; i--) {
        const petal = petals[i]
        petal.life++

        if (petal.life >= petal.maxLife) {
          petals.splice(i, 1)
          if (petals.length < maxPetals) {
            petals.push(createPetal())
          }
          continue
        }

        const wind =
          Math.sin(time * petal.swayFreq + petal.swayPhase) * 0.45
        petal.x += petal.vx + wind
        petal.y += petal.vy + scrollWind
        petal.rotation += petal.rotationSpeed

        if (petal.y < -30) petal.y = height + 20
        if (petal.y > height + 40) petal.y = -20

        const halfLife = petal.maxLife / 2
        if (petal.life < halfLife * 0.3) {
          petal.opacity =
            (petal.life / (halfLife * 0.3)) * petal.maxOpacity
        } else if (petal.life > petal.maxLife * 0.7) {
          petal.opacity =
            (1 -
              (petal.life - petal.maxLife * 0.7) /
                (petal.maxLife * 0.3)) *
            petal.maxOpacity
        }

        ctx.save()
        ctx.translate(petal.x, petal.y)
        ctx.rotate(petal.rotation)

        ctx.fillStyle = petal.color
        ctx.globalAlpha = Math.max(0, Math.min(1, petal.opacity))

        ctx.beginPath()
        if (petal.isLeaf) {
          ctx.ellipse(
            0,
            0,
            petal.size * 1.6,
            petal.size * 0.7,
            0,
            0,
            Math.PI * 2
          )
        } else {
          ctx.ellipse(
            0,
            0,
            petal.size * 1.4,
            petal.size * 0.75,
            0,
            0,
            Math.PI * 2
          )
        }
        ctx.fill()

        ctx.restore()
      }
      ctx.globalAlpha = 1

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1] h-full w-full opacity-85 transition-opacity duration-1000"
    />
  )
}
