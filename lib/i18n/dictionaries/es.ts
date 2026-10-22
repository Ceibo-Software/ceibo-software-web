export const es = {
  meta: {
    title: 'Ceibo Software · Desarrollo de Software & Productos Digitales',
    description:
      'Empresa de desarrollo de software y productos digitales. Diseñamos y construimos plataformas web y aplicaciones móviles a medida desde Argentina para el mundo.',
    ogLocale: 'es_AR',
  },
  common: {
    logoAlt: 'Logo de Ceibo Software',
    close: 'Cerrar',
    seeMore: 'Ver más',
  },
  nav: {
    links: [
      { label: 'Servicios', href: '#servicios' },
      { label: 'Proyectos', href: '#proyectos' },
      { label: 'Equipo', href: '#equipo' },
      { label: 'Preguntas', href: '#preguntas' },
      { label: 'Contacto', href: '#contacto' },
    ],
    assistant: 'Asistente IA',
    openAssistant: 'Abrir asistente IA',
    cta: 'Hablemos',
    mobileCta: 'Iniciar conversación',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    switchLanguage: 'Ver el sitio en inglés',
    otherLanguageLabel: 'EN',
  },
  hero: {
    srTitle: 'Construimos, diseñamos y creamos software de alto impacto',
    actionWords: ['Construimos', 'Diseñamos', 'Creamos', 'Imaginamos'],
    rotatingWords: [
      'productos que lideran.',
      'apps que enamoran.',
      'software que escala.',
      'soluciones sin vueltas.',
    ],
    subtitle:
      'Somos una empresa que acompaña a startups y empresas a diseñar y desarrollar aplicaciones web y móviles modernas, rápidas y hechas a medida.',
    primaryCta: 'Iniciar mi proyecto',
    secondaryCta: 'Chatear con el Asistente',
    metrics: [
      { value: '+40', label: 'Proyectos lanzados' },
      { value: '100%', label: 'Entregas a tiempo' },
      { value: 'Directo', label: 'Con el equipo' },
    ],
  },
  services: {
    eyebrow: 'Servicios',
    title: 'Lo que hacemos',
    subtitle: 'Creamos productos digitales modernos y funcionales, de la idea al lanzamiento.',
    items: [
      {
        title: 'Software a Medida',
        description:
          'Plataformas web y sistemas diseñados para automatizar los procesos de tu negocio y escalar tus operaciones.',
      },
      {
        title: 'Apps Móviles',
        description:
          'Aplicaciones nativas e intuitivas para iOS y Android que tus clientes disfrutarán usar todos los días.',
      },
      {
        title: 'Diseño de Producto UI/UX',
        description:
          'Interfaces modernas y estéticas pensadas para convertir visitas en clientes y mejorar la retención.',
      },
      {
        title: 'Automatización & IA',
        description:
          'Chatbots inteligentes y conexiones automáticas entre tus sistemas para ahorrar horas de trabajo.',
      },
    ],
  },
  projects: {
    eyebrow: 'Casos Destacados · Frutos de Ceibo',
    title: 'Proyectos que dan frutos',
    subtitle:
      'Soluciones de software y arquitectura digital nacidas de nuestra raíz. Pasá el cursor o tocá cada flor para ver más detalles.',
    status: 'Producción',
    cta: 'Consultar por un proyecto similar',
    items: {
      'pampa-finance': {
        category: 'Fintech & Pagos',
        summary: 'Plataforma corporativa de cobros y tesorería multi-moneda de alta concurrencia.',
        metric: '+$4.2M USD/mes',
        description:
          'Motor transaccional con conciliación bancaria automatizada en tiempo real y arquitectura de microservicios de alta concurrencia.',
        specs: [
          'Conciliación bancaria en <50ms',
          'Cifrado AES-256 de extremo a extremo',
          '99.98% de disponibilidad certificada',
        ],
      },
      'marea-health': {
        category: 'Salud Digital',
        summary: 'App móvil médica con agendamiento sincrónico y videoconsultas cifradas.',
        metric: '15,000+ pacientes',
        description:
          'Ecosistema móvil diseñado para eliminar esperas y optimizar la gestión de consultas presenciales y remotas.',
        specs: [
          '+30% en reservas de turnos',
          'Recordatorios automáticos vía WhatsApp',
          'Videoconsultas sin salir de casa',
        ],
      },
      'nexo-ops': {
        category: 'Cloud & SaaS',
        summary: 'Centro de control y telemetría de microservicios e infraestructura en vivo.',
        metric: '99.99% Uptime',
        description:
          'Panel operativo en tiempo real para sincronización de equipos de ingeniería y monitoreo continuo de infraestructura.',
        specs: [
          'Streaming de eventos vía WebSockets',
          'Autoescalado dinámico multi-región',
          'Reducción del 60% en tiempos de gestión',
        ],
      },
    } as Record<
      string,
      { category: string; summary: string; metric: string; description: string; specs: string[] }
    >,
  },
  team: {
    eyebrow: 'Staff',
    title: 'Quiénes estamos detrás',
    subtitle: 'Hacé clic en cada perfil para conocer sus proyectos individuales y especialidades técnicas.',
    portfolio: 'Portafolio',
    projectsHeading: 'Proyectos & Especialidad',
    closeModal: 'Cerrar modal',
    linkedinOf: (name: string) => `LinkedIn de ${name}`,
    githubOf: (name: string) => `GitHub de ${name}`,
    members: {
      'Tomás Messineo': {
        bio: 'Automatización de infraestructura, despliegues continuos y estabilidad en la nube.',
        projects: [
          {
            title: 'Infraestructura Cloud Serverless',
            description: 'Orquestación de despliegues continuos con Terraform y contenedores Docker.',
          },
          {
            title: 'Cluster Kubernetes Autoescalable',
            description: 'Monitoreo de métricas con Prometheus y autoescalado horizontal de cargas.',
          },
        ],
      },
      'Matías Caubet': {
        bio: 'Convierte desafíos complejos de concurrencia y datos en sistemas simples, confiables y escalables.',
        projects: [
          {
            title: 'Motor Transaccional Concurrente',
            description: 'Microservicios de alta concurrencia en Go para procesamiento de pagos.',
          },
          {
            title: 'Bus de Eventos Distribuido',
            description: 'Mensajería reactiva para sincronización de datos en tiempo real.',
          },
        ],
      },
      'Juana Zabaleta': {
        bio: 'Diseña experiencias estéticas con sentido de negocio que los usuarios realmente disfrutan operar.',
        projects: [
          {
            title: 'Design System & Tokens Globales',
            description: 'Biblioteca modular de componentes en Figma conectada al código del equipo.',
          },
          {
            title: 'Experiencia Mobile First',
            description: 'Diseño de interfaz y flujos de usuario enfocados en retención y conversión.',
          },
        ],
      },
      'Sebastian Varas': {
        bio: 'Lleva cada producto a la nube con automatizaciones que garantizan 99.99% de uptime y despliegues seguros.',
        projects: [
          {
            title: 'Arquitectura Multi-Cloud & Failover',
            description: 'Infraestructura tolerante a fallos con recuperación automática multi-región.',
          },
          {
            title: 'Seguridad Zero-Trust & Redes',
            description: 'Aislamiento de microservicios y encriptación mTLS en Kubernetes.',
          },
        ],
      },
      'Máximo Simonetti': {
        bio: 'Código preciso, pensamiento claro, algoritmos limpios y obsesión por el micro-detalle de rendimiento.',
        projects: [
          {
            title: 'Plataforma Web Next.js Ultrarrápida',
            description: 'Renderizado híbrido con métricas perfectas en Web Vitals y animaciones suaves.',
          },
          {
            title: 'Dashboard de Datos en Tiempo Real',
            description: 'Visualización fluida de métricas complejas sincronizadas vía WebSockets.',
          },
        ],
      },
      'Gonzalo Gil': {
        bio: 'Desarrollo de punta a punta, enfocado en interfaces intuitivas y servicios backend robustos.',
        projects: [
          {
            title: 'Aplicación Web & APIs Integradas',
            description: 'Desarrollo de módulos interactivos y conexión fluida con servicios cloud.',
          },
          {
            title: 'Optimización de Experiencia de Usuario',
            description: 'Implementación de componentes reutilizables y mejora en tiempos de respuesta.',
          },
        ],
      },
    } as Record<string, { bio: string; projects: { title: string; description: string }[] }>,
  },
  faq: {
    eyebrow: 'Preguntas frecuentes',
    title: 'Lo que nos suelen preguntar',
    subtitleBefore: 'Si tu duda no está acá, escribinos a',
    subtitleAfter: 'y te respondemos en menos de 24 horas.',
    // {email} se reemplaza por el email de contacto con su link
    items: [
      {
        question: '¿Qué tipo de proyectos desarrollan?',
        answer:
          'Plataformas web y sistemas a medida, aplicaciones móviles para iOS y Android, diseño de producto UI/UX y automatizaciones con inteligencia artificial, como chatbots de atención y ventas conectados a WhatsApp o a tu CRM.',
      },
      {
        question: '¿Pueden ayudarme si solo tengo una idea?',
        answer:
          'Sí. Te acompañamos de la idea al lanzamiento: definimos juntos qué necesitás, diseñamos la experiencia, desarrollamos el producto y lo dejamos funcionando en la nube.',
      },
      {
        question: '¿Cuánto cuesta un proyecto?',
        answer:
          'Depende del alcance: no es lo mismo una web institucional que una app con pagos y panel de administración. Contanos tu idea y te enviamos un plan claro con presupuesto, sin compromiso.',
      },
      {
        question: '¿Cuánto tarda en estar listo?',
        answer:
          'Los plazos se definen en el plan inicial según el alcance de cada proyecto, y los cumplimos: entregamos el 100% de nuestros proyectos a tiempo.',
      },
      {
        question: '¿Con quién voy a hablar durante el proyecto?',
        answer:
          'Directamente con el equipo que diseña y desarrolla tu producto, sin intermediarios. Así las decisiones se toman rápido y siempre sabés en qué punto está el trabajo.',
      },
      {
        question: '¿Trabajan con clientes fuera de Argentina?',
        answer:
          'Sí. Estamos en Buenos Aires (UTC-3) y trabajamos de forma remota con startups y empresas de cualquier país.',
      },
      {
        question: '¿Qué pasa después del lanzamiento?',
        answer:
          'Podemos encargarnos de la infraestructura en la nube para que tu producto funcione de forma estable y seguir sumando mejoras a medida que tu negocio crece.',
      },
      {
        question: '¿Cómo empezamos?',
        answer:
          'Escribinos desde el formulario o por email a {email} contándonos tu idea, tus objetivos y la fecha que tenés en mente. Te respondemos con un plan en menos de 24 horas.',
      },
    ],
  },
  contact: {
    eyebrow: 'Canal Directo',
    title: 'Hablemos de tu próximo producto digital.',
    subtitle:
      'Contanos sobre tu idea, objetivos o fecha estimada. Te respondemos con un plan claro y sin vueltas en menos de 24 horas.',
    emailLabel: 'Email',
    locationLabel: 'Sede',
    fields: {
      name: 'Tu nombre *',
      namePlaceholder: 'Ej: Tomás Fernández',
      email: 'Email de contacto *',
      emailPlaceholder: 'nombre@empresa.com',
      company: 'Empresa o Startup (opcional)',
      companyPlaceholder: 'Ej: Pampa Inc.',
      phone: 'Teléfono Celular / WhatsApp (opcional)',
      phonePlaceholder: 'Ej: +54 9 11 2345-6789',
      message: 'Mensaje *',
      messagePlaceholder: 'Contanos sobre tu idea, qué tenés en mente o cómo podemos ayudarte...',
    },
    errors: {
      nameRequired: 'Escribí tu nombre así sabemos cómo llamarte.',
      nameShort: 'El nombre parece incompleto.',
      emailRequired: 'Necesitamos tu email para poder responderte.',
      emailInvalid: 'Revisá el email, parece que falta algo. Ej: nombre@empresa.com',
      messageRequired: 'Contanos brevemente qué necesitás.',
      messageShort: 'Contanos un poco más así podemos prepararte una propuesta.',
    },
    submit: 'Enviar mensaje al equipo',
    submitting: 'Enviando mensaje...',
    successTitle: '¡Mensaje recibido!',
    successText:
      'Recibimos tu consulta con éxito. Te responderemos con un plan claro en menos de 24 horas.',
    sendAnother: 'Enviar otra consulta',
    errorGeneric:
      'Ocurrió un error al enviar el mensaje. Por favor intenta nuevamente o escribinos directamente por WhatsApp.',
    mail: {
      subject: (name: string, company: string) =>
        `Nueva consulta de ${name}${company ? ` (${company})` : ''}`,
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
    },
  },
  footer: {
    description:
      'Empresa de desarrollo de software y productos digitales. Diseñado y construido desde Argentina para el mundo.',
    location: 'Buenos Aires, Argentina',
    navHeading: 'Navegación',
    navLinks: [
      { label: 'Servicios de Ingeniería', href: '#servicios' },
      { label: 'Proyectos Destacados', href: '#proyectos' },
      { label: 'Preguntas frecuentes', href: '#preguntas' },
      { label: 'Contacto', href: '#contacto' },
      { label: 'Staff', href: '#equipo' },
    ],
    contactHeading: 'Contacto Directo',
    availability: '● Disponibilidad inmediata',
    rights: 'Todos los derechos reservados.',
    madeIn: 'Forjado con precisión en',
    country: 'Argentina',
    backToTop: 'Volver arriba',
  },
  chat: {
    welcome: '¡Hola! 👋 Soy el asistente de **Ceibo Software**.\n¿En qué podemos ayudarte?',
    now: 'Ahora',
    chips: {
      services: '🚀 Ver servicios',
      projects: '📁 Ver proyectos',
      realProjects: '📁 Ver proyectos reales',
      team: '👥 Conocer al equipo',
      teamOnSite: '👥 Ver equipo en la web',
      whatsapp: '💬 WhatsApp directo',
      whatsappWrite: '💬 Escribir por WhatsApp',
      contactTeam: '📝 Contactar al equipo',
      talkToTeam: '💬 Hablar con el equipo',
      quote: '📝 Cotizar idea',
      startInquiry: '📝 Iniciar consulta',
    },
    navigated: (section: string) =>
      `Te llevé a la sección de **${section}**. ¿Tenés alguna otra consulta?`,
    whatsappText: 'Hola Ceibo Software, me gustaría hacerles una consulta.',
    answers: {
      contactReceived: '¡Datos recibidos! 🚀 Nos pondremos en contacto con vos hoy mismo.',
      services:
        'Desarrollamos plataformas web a medida, aplicaciones móviles (iOS/Android) y arquitectura cloud de alto rendimiento.',
      team: 'Somos un equipo técnico directo compuesto por especialistas senior en DevOps, arquitectura backend, UI/UX y frontend. Sin intermediarios.',
      budget:
        'Adaptamos cada propuesta a los objetivos y escala del proyecto. Los primeros sprints suelen lanzarse en 4 a 6 semanas.',
      fallback: '¡Contanos más sobre tu idea o elegí una de estas opciones para ayudarte rápido:',
    },
    openLabel: 'Abrir asistente de Ceibo',
    tooltip: '¿Dudas? Chateá con nosotros 💬',
    title: 'Ceibo Assistant',
    status: 'En línea · Responde al instante',
    reset: 'Reiniciar chat',
    closeLabel: 'Cerrar chat',
    placeholder: 'Escribí tu consulta o idea...',
    send: 'Enviar mensaje',
  },
}

export type Dictionary = typeof es
