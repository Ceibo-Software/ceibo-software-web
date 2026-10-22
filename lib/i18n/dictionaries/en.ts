import type { Dictionary } from './es'

export const en: Dictionary = {
  meta: {
    title: 'Ceibo Software · Software Development & Digital Products',
    description:
      'Software development and digital product company. We design and build custom web platforms and mobile apps from Argentina for the world.',
    ogLocale: 'en_US',
  },
  common: {
    logoAlt: 'Ceibo Software logo',
    close: 'Close',
    seeMore: 'See more',
  },
  nav: {
    links: [
      { label: 'Services', href: '#servicios' },
      { label: 'Projects', href: '#proyectos' },
      { label: 'Team', href: '#equipo' },
      { label: 'FAQ', href: '#preguntas' },
      { label: 'Contact', href: '#contacto' },
    ],
    assistant: 'AI Assistant',
    openAssistant: 'Open AI assistant',
    cta: "Let's talk",
    mobileCta: 'Start a conversation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    switchLanguage: 'Ver el sitio en español',
    otherLanguageLabel: 'ES',
  },
  hero: {
    srTitle: 'We build, design and create high-impact software',
    actionWords: ['We build', 'We design', 'We create', 'We imagine'],
    rotatingWords: [
      'products that lead.',
      'apps people love.',
      'software that scales.',
      'no-nonsense solutions.',
    ],
    subtitle:
      'We help startups and companies design and develop modern, fast, custom-built web and mobile applications.',
    primaryCta: 'Start my project',
    secondaryCta: 'Chat with the Assistant',
    metrics: [
      { value: '40+', label: 'Projects launched' },
      { value: '100%', label: 'On-time delivery' },
      { value: 'Direct', label: 'With the team' },
    ],
  },
  services: {
    eyebrow: 'Services',
    title: 'What we do',
    subtitle: 'We build modern, functional digital products, from idea to launch.',
    items: [
      {
        title: 'Custom Software',
        description:
          'Web platforms and systems designed to automate your business processes and scale your operations.',
      },
      {
        title: 'Mobile Apps',
        description:
          'Intuitive native apps for iOS and Android that your customers will enjoy using every day.',
      },
      {
        title: 'UI/UX Product Design',
        description:
          'Modern, polished interfaces designed to turn visitors into customers and improve retention.',
      },
      {
        title: 'Automation & AI',
        description:
          'Smart chatbots and automated connections between your systems to save hours of work.',
      },
    ],
  },
  projects: {
    eyebrow: 'Featured Work · Ceibo Blossoms',
    title: 'Projects that bear fruit',
    subtitle:
      'Software solutions and digital architecture grown from our roots. Hover or tap each blossom to see more details.',
    status: 'Live',
    cta: 'Ask about a similar project',
    items: {
      'pampa-finance': {
        category: 'Fintech & Payments',
        summary: 'High-concurrency, multi-currency corporate collections and treasury platform.',
        metric: '+$4.2M USD/month',
        description:
          'Transaction engine with automated real-time bank reconciliation and a high-concurrency microservices architecture.',
        specs: [
          'Bank reconciliation in <50ms',
          'End-to-end AES-256 encryption',
          '99.98% certified uptime',
        ],
      },
      'marea-health': {
        category: 'Digital Health',
        summary: 'Medical mobile app with real-time scheduling and secure video consultations.',
        metric: '15,000+ patients',
        description:
          'Mobile ecosystem designed to eliminate waiting times and streamline in-person and remote appointments.',
        specs: [
          '+30% in appointment bookings',
          'Automatic WhatsApp reminders',
          'Video consultations from home',
        ],
      },
      'nexo-ops': {
        category: 'Cloud & SaaS',
        summary: 'Live control center and telemetry for microservices and infrastructure.',
        metric: '99.99% Uptime',
        description:
          'Real-time operations dashboard to keep engineering teams in sync and monitor infrastructure continuously.',
        specs: [
          'Event streaming over WebSockets',
          'Dynamic multi-region autoscaling',
          '60% less time spent on management',
        ],
      },
    },
  },
  team: {
    eyebrow: 'Team',
    title: "Who's behind it",
    subtitle: 'Click on each profile to see their individual projects and technical specialties.',
    portfolio: 'Portfolio',
    projectsHeading: 'Projects & Specialty',
    closeModal: 'Close',
    linkedinOf: (name: string) => `${name}'s LinkedIn`,
    githubOf: (name: string) => `${name}'s GitHub`,
    members: {
      'Tomás Messineo': {
        bio: 'Infrastructure automation, continuous deployment and cloud stability.',
        projects: [
          {
            title: 'Serverless Cloud Infrastructure',
            description: 'Continuous deployment orchestration with Terraform and Docker containers.',
          },
          {
            title: 'Autoscaling Kubernetes Cluster',
            description: 'Metrics monitoring with Prometheus and horizontal workload autoscaling.',
          },
        ],
      },
      'Matías Caubet': {
        bio: 'Turns complex concurrency and data challenges into simple, reliable and scalable systems.',
        projects: [
          {
            title: 'Concurrent Transaction Engine',
            description: 'High-concurrency Go microservices for payment processing.',
          },
          {
            title: 'Distributed Event Bus',
            description: 'Reactive messaging for real-time data synchronization.',
          },
        ],
      },
      'Juana Zabaleta': {
        bio: 'Designs beautiful, business-driven experiences that users genuinely enjoy.',
        projects: [
          {
            title: 'Design System & Global Tokens',
            description: "Modular Figma component library connected to the team's codebase.",
          },
          {
            title: 'Mobile-First Experience',
            description: 'Interface design and user flows focused on retention and conversion.',
          },
        ],
      },
      'Sebastian Varas': {
        bio: 'Takes every product to the cloud with automation that ensures 99.99% uptime and safe deployments.',
        projects: [
          {
            title: 'Multi-Cloud Architecture & Failover',
            description: 'Fault-tolerant infrastructure with automatic multi-region recovery.',
          },
          {
            title: 'Zero-Trust Security & Networking',
            description: 'Microservice isolation and mTLS encryption on Kubernetes.',
          },
        ],
      },
      'Máximo Simonetti': {
        bio: 'Precise code, clear thinking, clean algorithms and an obsession with performance details.',
        projects: [
          {
            title: 'Ultra-Fast Next.js Web Platform',
            description: 'Hybrid rendering with perfect Web Vitals scores and smooth animations.',
          },
          {
            title: 'Real-Time Data Dashboard',
            description: 'Smooth visualization of complex metrics synced over WebSockets.',
          },
        ],
      },
      'Gonzalo Gil': {
        bio: 'End-to-end development focused on intuitive interfaces and robust backend services.',
        projects: [
          {
            title: 'Web App & Integrated APIs',
            description: 'Interactive modules and seamless integration with cloud services.',
          },
          {
            title: 'User Experience Optimization',
            description: 'Reusable components and faster response times.',
          },
        ],
      },
    },
  },
  faq: {
    eyebrow: 'FAQ',
    title: 'What people usually ask us',
    subtitleBefore: "If your question isn't here, write to us at",
    subtitleAfter: "and we'll get back to you within 24 hours.",
    items: [
      {
        question: 'What kind of projects do you build?',
        answer:
          'Custom web platforms and systems, mobile apps for iOS and Android, UI/UX product design and AI-powered automation, such as customer service and sales chatbots connected to WhatsApp or your CRM.',
      },
      {
        question: 'Can you help if I only have an idea?',
        answer:
          'Yes. We work with you from idea to launch: we define together what you need, design the experience, build the product and get it running in the cloud.',
      },
      {
        question: 'How much does a project cost?',
        answer:
          "It depends on the scope: a company website isn't the same as an app with payments and an admin panel. Tell us about your idea and we'll send you a clear plan with a quote, with no commitment.",
      },
      {
        question: 'How long does it take?',
        answer:
          'Timelines are set in the initial plan based on the scope of each project, and we meet them: 100% of our projects are delivered on time.',
      },
      {
        question: 'Who will I be talking to during the project?',
        answer:
          'Directly with the team designing and building your product, with no middlemen. That way decisions are made fast and you always know where the work stands.',
      },
      {
        question: 'Do you work with clients outside Argentina?',
        answer:
          "Yes. We're based in Buenos Aires (UTC-3) and work remotely with startups and companies from any country.",
      },
      {
        question: 'What happens after launch?',
        answer:
          'We can take care of the cloud infrastructure so your product runs reliably, and keep adding improvements as your business grows.',
      },
      {
        question: 'How do we get started?',
        answer:
          "Reach out through the form or by email at {email} and tell us about your idea, your goals and the date you have in mind. We'll reply with a plan within 24 hours.",
      },
    ],
  },
  contact: {
    eyebrow: 'Direct Line',
    title: "Let's talk about your next digital product.",
    subtitle:
      "Tell us about your idea, goals or target date. We'll reply with a clear, straightforward plan within 24 hours.",
    emailLabel: 'Email',
    locationLabel: 'Based in',
    fields: {
      name: 'Your name *',
      namePlaceholder: 'e.g. Jane Smith',
      email: 'Contact email *',
      emailPlaceholder: 'name@company.com',
      company: 'Company or startup (optional)',
      companyPlaceholder: 'e.g. Acme Inc.',
      phone: 'Mobile / WhatsApp (optional)',
      phonePlaceholder: 'e.g. +1 555 123-4567',
      message: 'Message *',
      messagePlaceholder: 'Tell us about your idea, what you have in mind or how we can help...',
    },
    errors: {
      nameRequired: 'Please enter your name so we know what to call you.',
      nameShort: 'Your name looks incomplete.',
      emailRequired: 'We need your email to get back to you.',
      emailInvalid: 'Please check your email, something seems to be missing. e.g. name@company.com',
      messageRequired: 'Briefly tell us what you need.',
      messageShort: 'Tell us a bit more so we can put together a proposal.',
    },
    submit: 'Send message to the team',
    submitting: 'Sending message...',
    successTitle: 'Message received!',
    successText:
      'We received your inquiry. We will get back to you with a clear plan within 24 hours.',
    sendAnother: 'Send another inquiry',
    errorGeneric:
      'Something went wrong sending your message. Please try again or reach out directly on WhatsApp.',
    mail: {
      subject: (name: string, company: string) =>
        `New inquiry from ${name}${company ? ` (${company})` : ''}`,
      name: 'Name',
      email: 'Email',
      company: 'Company',
    },
  },
  footer: {
    description:
      'Software development and digital product company. Designed and built in Argentina for the world.',
    location: 'Buenos Aires, Argentina',
    navHeading: 'Navigation',
    navLinks: [
      { label: 'Engineering Services', href: '#servicios' },
      { label: 'Featured Projects', href: '#proyectos' },
      { label: 'FAQ', href: '#preguntas' },
      { label: 'Contact', href: '#contacto' },
      { label: 'Team', href: '#equipo' },
    ],
    contactHeading: 'Get in Touch',
    availability: '● Available now',
    rights: 'All rights reserved.',
    madeIn: 'Crafted with precision in',
    country: 'Argentina',
    backToTop: 'Back to top',
  },
  chat: {
    welcome: "Hi! 👋 I'm the **Ceibo Software** assistant.\nHow can we help you?",
    now: 'Now',
    chips: {
      services: '🚀 See services',
      projects: '📁 See projects',
      realProjects: '📁 See real projects',
      team: '👥 Meet the team',
      teamOnSite: '👥 See the team',
      whatsapp: '💬 WhatsApp us',
      whatsappWrite: '💬 Message on WhatsApp',
      contactTeam: '📝 Contact the team',
      talkToTeam: '💬 Talk to the team',
      quote: '📝 Get a quote',
      startInquiry: '📝 Start an inquiry',
    },
    navigated: (section: string) =>
      `I took you to the **${section}** section. Anything else I can help with?`,
    whatsappText: "Hi Ceibo Software, I'd like to ask you a question.",
    answers: {
      contactReceived: "Got your details! 🚀 We'll get in touch with you today.",
      services:
        'We build custom web platforms, mobile apps (iOS/Android) and high-performance cloud architecture.',
      team: 'We are a hands-on technical team of senior specialists in DevOps, backend architecture, UI/UX and frontend. No middlemen.',
      budget:
        'We tailor every proposal to the goals and scale of the project. First sprints usually ship within 4 to 6 weeks.',
      fallback: 'Tell us more about your idea or pick one of these options so we can help you quickly:',
    },
    openLabel: 'Open Ceibo assistant',
    tooltip: 'Questions? Chat with us 💬',
    title: 'Ceibo Assistant',
    status: 'Online · Replies instantly',
    reset: 'Restart chat',
    closeLabel: 'Close chat',
    placeholder: 'Type your question or idea...',
    send: 'Send message',
  },
}
