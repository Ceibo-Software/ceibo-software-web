export interface MemberProject {
  title: string
  description: string
  role: string
  tech: string[]
  link?: string
}

export interface TeamMember {
  name: string
  role: string
  specialty: string
  bio: string
  image: string
  github?: string
  linkedin?: string
  portfolio?: string
  projects?: MemberProject[]
}

export interface ServiceItem {
  id: string
  number: string
  title: string
  tag: string
  description: string
  deliverables: string[]
  colSpan?: string
  highlight?: string
}

export interface ProjectItem {
  id: string
  title: string
  tagline: string
  category: string
  metrics: { label: string; value: string }[]
  description: string
  techStack: string[]
  accentColor: string
  liveSimulationType: 'fintech' | 'health' | 'ops'
}

export interface EstimatorOption {
  id: string
  title: string
  category: 'platform' | 'scope' | 'speed'
  description: string
  weeks: number
  badge?: string
}

export const CEIBO_BRAND = {
  name: 'Ceibo Software',
  tagline: 'Desarrollo de software y productos digitales',
  logoUrl: '/ceibo-logo.png',
  location: 'Buenos Aires, Argentina (UTC-3)',
  email: 'hola@ceibo.software',
  phone: '+54 9 11 5555 5555',
  status: 'Disponible para proyectos Q2/Q3',
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Tomás Messineo',
    role: 'DevOps Engineer',
    specialty: 'CI/CD · Docker · Cloud · Infra',
    bio: 'Automatización de infraestructura, despliegues continuos y estabilidad en la nube.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Tom%C3%A1s%20Messineo-9dyCbNbDQEVLESyTKXzT6L0K9TUPMI.jpeg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://github.com',
    projects: [
      {
        title: 'Infraestructura Cloud Serverless',
        description: 'Orquestación de despliegues continuos con Terraform y contenedores Docker.',
        role: 'DevOps & Infra',
        tech: ['AWS', 'Docker', 'Terraform', 'CI/CD'],
      },
      {
        title: 'Cluster Kubernetes Autoescalable',
        description: 'Monitoreo de métricas con Prometheus y autoescalado horizontal de cargas.',
        role: 'Cloud Architect',
        tech: ['Kubernetes', 'Helm', 'Prometheus'],
      },
    ],
  },
  {
    name: 'Matías Caubet',
    role: 'Tech Lead',
    specialty: 'Architecture · Go · High Load',
    bio: 'Convierte desafíos complejos de concurrencia y datos en sistemas simples, confiables y escalables.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Matias%20Caubet-uKlTYODfsSwzXmD7Y37boZwuROvOC2.jpeg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://github.com',
    projects: [
      {
        title: 'Motor Transaccional Concurrente',
        description: 'Microservicios de alta concurrencia en Go para procesamiento de pagos.',
        role: 'Lead Architect',
        tech: ['Go', 'PostgreSQL', 'Redis', 'gRPC'],
      },
      {
        title: 'Bus de Eventos Distribuido',
        description: 'Mensajería reactiva para sincronización de datos en tiempo real.',
        role: 'Backend Lead',
        tech: ['Kafka', 'Go', 'Docker'],
      },
    ],
  },
  {
    name: 'Juana Zabaleta',
    role: 'Product & Design Lead',
    specialty: 'UI/UX · Design Systems · Figma',
    bio: 'Diseña experiencias estéticas con sentido de negocio que los usuarios realmente disfrutan operar.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Juana%20Zabaleta-VwyLPobxo84RoACOUKOirNBsYSEWXG.jpeg',
    linkedin: 'https://linkedin.com',
    portfolio: 'https://behance.net',
    projects: [
      {
        title: 'Design System & Tokens Globales',
        description: 'Biblioteca modular de componentes en Figma conectada al código del equipo.',
        role: 'Lead Product Designer',
        tech: ['Figma', 'Design Systems', 'Tokens'],
      },
      {
        title: 'Experiencia Mobile First',
        description: 'Diseño de interfaz y flujos de usuario enfocados en retención y conversión.',
        role: 'UX Researcher',
        tech: ['Mobile UX', 'User Journey', 'Wireframes'],
      },
    ],
  },
  {
    name: 'Sebastian Varas',
    role: 'Cloud & DevOps Engineer',
    specialty: 'Kubernetes · AWS · CI/CD · Terraform',
    bio: 'Lleva cada producto a la nube con automatizaciones que garantizan 99.99% de uptime y despliegues seguros.',
    image: '',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://github.com',
    projects: [
      {
        title: 'Arquitectura Multi-Cloud & Failover',
        description: 'Infraestructura tolerante a fallos con recuperación automática multi-región.',
        role: 'Cloud Engineer',
        tech: ['AWS', 'Cloudflare', 'Terraform'],
      },
      {
        title: 'Seguridad Zero-Trust & Redes',
        description: 'Aislamiento de microservicios y encriptación mTLS en Kubernetes.',
        role: 'DevSecOps',
        tech: ['Istio', 'Kubernetes', 'Security Mesh'],
      },
    ],
  },
  {
    name: 'Máximo Simonetti',
    role: 'Software Engineer',
    specialty: 'TypeScript · React · State & Perf',
    bio: 'Código preciso, pensamiento claro, algoritmos limpios y obsesión por el micro-detalle de rendimiento.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Maximo%20Simonetti-UYyVbplCssfEICGuSvXVR7x37k1ufB.jpeg',
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    portfolio: 'https://github.com',
    projects: [
      {
        title: 'Plataforma Web Next.js Ultrarrápida',
        description: 'Renderizado híbrido con métricas perfectas en Web Vitals y animaciones suaves.',
        role: 'Frontend Engineer',
        tech: ['Next.js 15', 'TypeScript', 'Tailwind'],
      },
      {
        title: 'Dashboard de Datos en Tiempo Real',
        description: 'Visualización fluida de métricas complejas sincronizadas vía WebSockets.',
        role: 'Fullstack Dev',
        tech: ['React', 'WebSockets', 'Zustand'],
      },
    ],
  },
]

export const SERVICES: ServiceItem[] = [
  {
    id: 'custom-software',
    number: '01',
    title: 'Software a Medida & Plataformas Web',
    tag: 'Eficiencia Operativa',
    description: 'Creamos sistemas web y paneles de control a la medida exacta de tu negocio para automatizar tareas repetitivas y escalar tus ventas.',
    deliverables: ['Paneles de administración intuitivos', 'Bases de datos rápidas y seguras', 'Integración con tus herramientas actuales', 'Máxima velocidad de carga'],
    colSpan: 'md:col-span-2',
    highlight: 'Ahorro de hasta 20hs semanales en procesos internos',
  },
  {
    id: 'mobile-web',
    number: '02',
    title: 'Apps Móviles para iOS & Android',
    tag: 'Experiencia Móvil',
    description: 'Aplicaciones nativas e híbridas que tus clientes van a amar usar: fluidas, modernas y listas para publicar en App Store y Google Play.',
    deliverables: ['Diseño táctil y moderno', 'Notificaciones automáticas', 'Funciona sin conexión a internet', 'Publicación en tiendas de apps'],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'product-design',
    number: '03',
    title: 'Diseño de Producto UI/UX',
    tag: 'Impacto Visual',
    description: 'Transformamos conceptos en experiencias visuales memorables. Diseñamos interfaces estéticas que aumentan la conversión y la retención.',
    deliverables: ['Prototipos navegables en Figma', 'Diseño visual de alta fidelidad', 'Investigación de usuarios y mercado', 'Sistemas de diseño escalables'],
    colSpan: 'md:col-span-1',
  },
  {
    id: 'cloud-automation',
    number: '04',
    title: 'Automatización & Asistentes de IA',
    tag: 'Innovación Práctica',
    description: 'Integramos inteligencia artificial práctica: chatbots inteligentes de atención al cliente y conexiones automáticas entre tus aplicaciones.',
    deliverables: ['Chatbots de atención y ventas 24/7', 'Automatización de emails y facturación', 'Conexión con WhatsApp y CRMs', 'Alojamiento seguro en la nube'],
    colSpan: 'md:col-span-2',
    highlight: 'Atención automática 24/7 sin sumar personal',
  },
]

export const PROJECTS: ProjectItem[] = [
  {
    id: 'pampa-finance',
    title: 'Pampa Finance',
    tagline: 'Plataforma de pagos digitales y tesorería para empresas en crecimiento.',
    category: 'Fintech & Pagos',
    description: 'Diseñamos y desarrollamos un portal financiero intuitivo que permite a las empresas cobrar, pagar a proveedores y conciliar movimientos en tiempo real sin planillas manuales.',
    metrics: [
      { label: 'Procesado mensual', value: '+$4.2M' },
      { label: 'Ahorro de tiempo', value: '80%' },
      { label: 'Disponibilidad', value: '99.98%' },
    ],
    techStack: ['Web App', 'Pagos Online', 'Seguridad Bancaria'],
    accentColor: 'rose',
    liveSimulationType: 'fintech',
  },
  {
    id: 'marea-health',
    title: 'Marea Health',
    tagline: 'App médica para turnos, historias clínicas y videoconsultas.',
    category: 'Salud & Bienestar',
    description: 'Una experiencia moderna para pacientes y profesionales de la salud. Agendamiento de turnos en 3 clics, recordatorios automáticos por WhatsApp y fichas médicas digitales.',
    metrics: [
      { label: 'Pacientes activos', value: '15,000+' },
      { label: 'Reducción de ausencias', value: '-45%' },
      { label: 'Calificación de usuarios', value: '4.9/5' },
    ],
    techStack: ['App iOS & Android', 'Panel Web', 'Telemedicina'],
    accentColor: 'cyan',
    liveSimulationType: 'health',
  },
  {
    id: 'nexo-ops',
    title: 'Nexo Ops',
    tagline: 'Panel de control y gestión operativa para equipos y empresas.',
    category: 'SaaS & Operaciones',
    description: 'Centralización de proyectos, métricas comerciales y tareas diarias en un solo lugar. Ayuda a líderes de equipo a tener visibilidad total sin reuniones eternas.',
    metrics: [
      { label: 'Menos horas de gestión', value: '-60%' },
      { label: 'Puesta en marcha', value: '48 hrs' },
      { label: 'Equipos conectados', value: '120+' },
    ],
    techStack: ['Dashboard Intuitivo', 'Reportes Automáticos', 'Nube'],
    accentColor: 'amber',
    liveSimulationType: 'ops',
  },
]

export const ESTIMATOR_OPTIONS: {
  platforms: EstimatorOption[]
  features: EstimatorOption[]
  timeline: EstimatorOption[]
} = {
  platforms: [
    { id: 'web-app', title: 'Plataforma Web SaaS', category: 'platform', description: 'Next.js, panel admin, dashboard responsivo y backend escalable', weeks: 4 },
    { id: 'mobile-app', title: 'App Móvil iOS & Android', category: 'platform', description: 'React Native con interfaces nativas y soporte offline', weeks: 5 },
    { id: 'full-ecosystem', title: 'Ecosistema Completo (Web + Mobile)', category: 'platform', description: 'Suite sincronizada en la nube con experiencia unificada', weeks: 8, badge: 'Recomendado' },
    { id: 'ai-system', title: 'Sistema con IA & Automatizaciones', category: 'platform', description: 'Agentes autónomos, canalizaciones RAG y flujos de trabajo', weeks: 4 },
  ],
  features: [
    { id: 'auth-rbac', title: 'Autenticación & Roles Avanzados', category: 'scope', description: 'OAuth, Magic Links, MFA y permisos granulares', weeks: 1 },
    { id: 'payments', title: 'Pasarela de Pagos & Facturación', category: 'scope', description: 'Stripe, Mercado Pago, suscripciones y facturación fiscal', weeks: 1.5 },
    { id: 'analytics', title: 'Telemetría & Analítica en Vivo', category: 'scope', description: 'Gráficos interactivos, pipelines de eventos y reportes en tiempo real', weeks: 1.5 },
    { id: 'ai-copilot', title: 'Asistente IA / Motor Conversacional', category: 'scope', description: 'Integración LLM con memoria vectorial y prompts optimizados', weeks: 2, badge: 'Popular' },
    { id: 'design-system', title: 'Design System & UI Artesanal', category: 'scope', description: 'Figma tokens, componentes reutilizables y micro-interacciones', weeks: 2 },
  ],
  timeline: [
    { id: 'normal', title: 'Velocidad Estándar', category: 'speed', description: 'Sprints de 2 semanas con revisiones iterativas continuas', weeks: 0 },
    { id: 'fastrack', title: 'Fast-Track / Sprint Intensivo', category: 'speed', description: 'Equipo dedicado full focus para lanzar en tiempo récord', weeks: -1.5, badge: 'High Priority' },
  ],
}

export const TECH_STACK = [
  { name: 'TypeScript', category: 'Core' },
  { name: 'Next.js 16', category: 'Frontend' },
  { name: 'React 19', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Styles' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Go', category: 'Backend' },
  { name: 'Rust', category: 'Systems' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Redis', category: 'Cache' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'Kubernetes', category: 'Cloud' },
  { name: 'AWS & Cloudflare', category: 'Infra' },
]
