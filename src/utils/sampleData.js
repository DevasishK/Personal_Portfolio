import { profile } from '../profile.ts'

export const professionalData = {
  name: profile.name,
  tagline: 'Building secure, scalable systems with AI and cybersecurity in mind',
  location: 'SRM University AP',
  currentStatus: profile.status,
  links: [
    { label: 'LinkedIn', href: profile.social.linkedin },
    { label: 'GitHub', href: profile.social.github },
    { label: 'LeetCode', href: profile.social.leetcode },
    { label: 'Instagram', href: profile.social.instagram },
    { label: 'Email', href: `mailto:${profile.contact.email}` },
  ],
  resumeUrl: '/resume.pdf',
  resumePreviewUrl: '/resume.pdf',
  introVideo: {
    thumbnailUrl: '/PHOTO-2026-05-02-02-26-40.jpg',
    // Placeholder YouTube embed URL
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  },
  about: {
    title: 'About',
    body: [
      'Final-year B.Tech CSE student at SRM University AP, focused on full-stack engineering with cybersecurity + AI/ML in mind.',
      'I’m especially interested in building real-world systems—fintech-style flows, secure backend APIs, and products that scale.',
      'I like building things that are both useful and explainable — not just functional.',
    ],
    highlights: ['Full-stack', 'Cybersecurity', 'AI/ML', 'Fintech systems', 'React', 'Supabase'],
  },
  strengths: [
    'Strong problem-solving mindset',
    'Clear technical documentation skills',
    'Cybersecurity awareness and practical exposure',
    'Fast learner with adaptability',
  ],
  experience: [
    {
      title: 'Cybersecurity Intern — APCSOC (Govt. of AP)',
      date: 'Jun – Jul 2024',
      subtitle: 'Vulnerability assessment + secure practices',
      detail:
        'Performed vulnerability assessments using Burp Suite & OWASP ZAP. Identified and remediated OWASP Top 10 issues. Documented findings and secure coding practices.',
    },
    {
      title: 'Freelancer — Chegg India',
      date: 'Nov 2023 – Present',
      subtitle: 'Structured problem solving (Accounting & Finance)',
      detail:
        'Solved global accounting & finance problems with high accuracy. Delivered clear, structured solutions and improved conceptual clarity for learners.',
    },
  ],
  skillsGrouped: {
    programming: ['C', 'C++', 'Java', 'Python', 'SQL'],
    web: ['React', 'Tailwind CSS', 'REST APIs', 'Netlify'],
    cybersecurity: ['Burp Suite', 'OWASP ZAP', 'Vulnerability scanning'],
    aiml: ['SHAP', 'LIME', 'XGBoost', 'Feature engineering'],
  },
  projectsFeatured: [
    {
      id: 'pf1',
      title: 'Secure File Locker',
      subtitle: 'C++ • Security',
      description: 'A secure file encryption tool built with modern C++ focusing on data protection and file integrity.',
      highlights: ['AES-based encryption & decryption', 'Password hashing and key derivation', 'File integrity verification'],
      tags: ['C++', 'OpenSSL', 'AES', 'Crypto'],
      codeUrl: profile.social.github,
      demoUrl: null,
    },
    {
      id: 'pf2',
      title: 'Shop Forage',
      subtitle: 'Full-stack E-commerce',
      description: 'A full-stack e-commerce platform using React + Spring Boot for managing products and transactions.',
      highlights: ['React frontend with dynamic UI', 'Spring Boot backend APIs', 'Product and order management'],
      tags: ['React', 'Spring Boot', 'JavaScript', 'Java', 'REST'],
      codeUrl: profile.social.github,
      demoUrl: null,
    },
    {
      id: 'pf3',
      title: 'Phishing URL Detection',
      subtitle: 'ML • Cybersecurity',
      description: 'A machine learning model for detecting phishing URLs using feature-based classification.',
      highlights: ['30+ feature extraction', '~93% accuracy', 'Explainability using SHAP'],
      tags: ['Python', 'ML', 'SHAP', 'Security'],
      codeUrl: profile.social.github,
      demoUrl: null,
    },
    {
      id: 'pf4',
      title: 'Loan Default Risk Analyzer',
      subtitle: 'Explainable ML',
      description: 'An explainable ML model predicting loan defaults for NBFC-style systems.',
      highlights: ['Risk classification model', 'SHAP & LIME explainability', 'Financial data analysis'],
      tags: ['Python', 'ML', 'LIME', 'SHAP'],
      codeUrl: profile.social.github,
      demoUrl: null,
    },
  ],
  projectsOther: [
    { title: 'Farm Produce Management', description: 'Java-based system for managing agricultural data.', tech: ['Java'] },
    { title: 'JWT Authentication System', description: 'Token-based authentication using Spring Boot.', tech: ['Spring Boot', 'JWT'] },
    { title: 'Court Case Management System', description: 'CRUD-based legal case management system.', tech: ['CRUD', 'Java'] },
    { title: 'Bank Management System', description: 'Console-based banking operations system.', tech: ['C/Java'] },
    { title: 'Student Record System', description: 'Academic record management system.', tech: ['DBMS', 'SQL'] },
    { title: 'University Module System', description: 'Modular academic data management.', tech: ['Java', 'SQL'] },
    { title: 'React Bootstrap Page', description: 'Responsive frontend UI built using React.', tech: ['React', 'Bootstrap'] },
  ],
  whyHireMe: [
    {
      title: 'Problem Solver',
      icon: 'Puzzle',
      body: 'Breaks down complex systems into simple, shippable solutions.',
    },
    {
      title: 'Product Thinker',
      icon: 'Sparkles',
      body: 'Optimizes for usability, clarity, and real user outcomes.',
    },
    {
      title: 'Fast Learner',
      icon: 'Zap',
      body: 'Adapts quickly to new domains, tools, and constraints.',
    },
    {
      title: 'Full-stack Builder',
      icon: 'Layers',
      body: 'Comfortable owning UI, APIs, and data—end to end.',
    },
  ],
  impactMetrics: [
    { value: '5+', label: 'Projects shipped' },
    { value: '2', label: 'Internships' },
    { value: '10+', label: 'Certifications' },
    { value: '15+', label: 'Features delivered' },
  ],
  howIWork: [
    { title: 'Understand deeply', icon: 'Search', body: 'Clarify goals, constraints, and edge cases before coding.' },
    { title: 'Design structure', icon: 'GitBranch', body: 'Pick a scalable shape: data flow, components, and APIs.' },
    { title: 'Build fast & clean', icon: 'Code', body: 'Small iterations with readable code and good defaults.' },
    { title: 'Polish & optimize', icon: 'Gauge', body: 'Performance, accessibility, and UX finishing touches.' },
  ],
  lookingFor: {
    roles: ['Full-stack', 'AI/ML', 'Cybersecurity'],
    interests: ['Cybersecurity', 'AI/ML', 'Fintech systems', 'Real-world products'],
    direction: 'Open to challenging roles that involve real-world impact and problem solving (aiming for Big Tech).',
  },
  testimonials: [
    {
      quote:
        'Consistently delivers high-quality work and communicates trade-offs clearly. Strong ownership mindset.',
      name: 'Mentor',
      role: 'Mentor',
    },
    {
      quote: 'Thoughtful about UX and always asks the “why” before building. Great teammate.',
      name: 'Teammate',
      role: 'Project teammate',
    },
    {
      quote: 'Fast learner with strong fundamentals and a calm, systematic debugging approach.',
      name: 'Faculty',
      role: 'Professor',
    },
  ],
  learningGrowth: [
    { title: 'Frontend fundamentals → UI systems', date: '2023', detail: 'From components to consistent design tokens.' },
    { title: 'Backend + data', date: '2024', detail: 'APIs, Postgres, auth, and pragmatic schemas.' },
    { title: 'Product polish', date: '2025', detail: 'Motion, hierarchy, and building for trust.' },
    { title: 'Now', date: '2026', detail: 'Shipping end-to-end with speed and clarity.' },
  ],
  aiChat: {
    suggestions: ['What roles are you looking for?', 'What are your strongest skills?', 'Tell me about a project'],
    answers: {
      roles: 'Frontend / Full-stack / Product engineering roles where I can own UX and ship end-to-end.',
      skills:
        'React, Tailwind, Framer Motion, building clean component systems, and integrating backend services (Supabase/APIs).',
      project:
        'My dual-mode portfolio: it’s a product-style site with polished UX, animations, and real backend features like message wall + visitor counter.',
    },
  },
  certifications: {
    completed: [
      { title: 'AWS Certified Cloud Practitioner', issuer: 'AWS', year: 'Completed' },
      { title: 'Cybersecurity Operations Fundamentals', issuer: 'Coursera', year: 'Completed' },
      { title: 'NPTEL – Joy of Computing with Python', issuer: 'NPTEL', year: 'Completed' },
    ],
    inProgress: [
      { title: 'Google Cybersecurity Certificate', issuer: 'Google', year: 'In progress' },
      { title: 'IBM Cybersecurity Analyst', issuer: 'IBM', year: 'In progress' },
      { title: 'NYU Cybersecurity Specialization', issuer: 'NYU', year: 'In progress' },
      { title: 'Cisco CCNA', issuer: 'Cisco', year: 'In progress' },
    ],
  },
  research: [
    'The Perils of Naive Truncation: A Context Ablation Study for Dialogue Summarization on DialogSum',
    'Detecting Semantic Camouflage: A Diagnostic Study of Metric Discordance in Abstractive Summarization',
  ],
  education: [
    {
      title: 'B.Tech in Computer Science — SRM University AP',
      date: 'Expected 2026',
      subtitle: 'Minor in Management',
      detail: null,
    },
    {
      title: 'Class 12 — Loyola Public School (ISC)',
      date: '',
      subtitle: null,
      detail: null,
    },
    {
      title: 'Class 10 — Sri Chaitanya School (CBSE)',
      date: '',
      subtitle: null,
      detail: null,
    },
  ],
  faq: [
    { q: 'What roles are you open to?', a: 'Frontend, full-stack, and product engineering roles.' },
    { q: 'What do you optimize for?', a: 'Clarity, usability, maintainability, and shipping value quickly.' },
    { q: 'What’s your preferred stack?', a: 'React + Tailwind on the frontend, and Postgres/Supabase on the backend.' },
    { q: 'Can you share a resume?', a: 'Yes—use the resume button at the top of the page.' },
  ],
}

export const funData = {
  tagline: 'Same person, different vibe: stories, hobbies, and a few hidden surprises.',
  badges: ['curious', 'music', 'coffee', 'photos', 'side quests'],
  personalInfo: {
    listening: profile.preferences.song,
    food: `${profile.preferences.food} always wins`,
    movie: profile.preferences.movie,
    funFact: profile.preferences.habit,
  },
  gallery: [
    { id: 'g1', title: 'Photo 1', src: '/PHOTO-2026-05-02-02-26-40.jpg' },
    { id: 'g2', title: 'Photo 2', src: '/PHOTO-2026-05-02-02-28-04.jpg' },
    { id: 'g3', title: 'Photo 3', src: '/PHOTO-2026-05-02-02-37-45.jpg' },
    { id: 'g4', title: 'Photo 4', src: '/PHOTO-2026-05-02-02-47-04.jpg' },
    { id: 'g5', title: 'Photo 5', src: '/PHOTO-2026-05-02-02-48-59.jpg' },
  ],
  timeline: [
    { title: 'Side quest unlocked', subtitle: 'Tried a new hobby', date: '2026', detail: 'Kept it light, learned a lot, had fun.' },
    { title: 'Weekend ritual', subtitle: 'Photography walks', date: '2025', detail: 'Chasing light and interesting textures.' },
    { title: 'Always', subtitle: 'Music on', date: '∞', detail: 'Soundtrack for coding, walks, and life.' },
  ],
  story: [
    'I like building things—and I like the small moments that inspire them.',
    'You’ll find me taking photos, learning random facts, or starting a side project that “won’t take long.”',
  ],
  achievements: [
    { title: '✨ Side Project Streak', note: 'Built something small every week.' },
    { title: '📸 Photo Drops', note: 'Consistently posting shots.' },
    { title: '🎧 Playlist Curator', note: 'Soundtrack specialist.' },
    { title: '🧩 Puzzle Gremlin', note: 'Cannot resist a challenge.' },
  ],
  faq: [
    { q: 'What’s your go-to comfort food?', a: 'Anything spicy with a cold drink on the side.' },
    { q: 'What’s a hobby you want to try?', a: 'A new instrument—or maybe pottery.' },
    { q: 'What’s your “one more episode” show genre?', a: 'Mystery + light comedy.' },
  ],
}

