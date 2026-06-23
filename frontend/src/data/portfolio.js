// All portfolio content. Edit this file to update the site.
// Hosted statically — no backend required.

export const profile = {
  name: "Ayoub Bnina",
  callsign: "BNINA-A",
  title: "Embedded Robotics Engineer",
  subtitle: "RTOS · Bare-Metal C · STM32 · Anti-UAV Systems",
  location: "Samsun, Türkiye",
  coords: "41.2867° N · 36.3300° E",
  email: "bninayoub.pro@gmail.com",
  phone: "+90 501 631 1031",
  linkedin: "https://linkedin.com/in/ayoub-bnina",
  github: "https://github.com/bnina-ayoub",
  status: "OPERATIONAL",
  clearance: "YTB SCHOLAR · 2026",
  summary:
    "Award-winning Embedded Systems Engineer and YTB Scholar specializing in RTOS, bare-metal C, and STM32 optimization for mission-critical robotic systems. Currently focused on anti-UAV target detection, real-time vision pipelines and low-latency embedded actuation.",
};

export const stats = [
  { label: "AWARDS", value: "02", sub: "STM32 IEEE RAS" },
  { label: "INTERNSHIPS", value: "03", sub: "ROBOTICS LABS" },
  { label: "RTOS", value: "FreeRTOS · ThreadX", sub: "DEPLOYED" },
  { label: "LANGUAGES", value: "04", sub: "AR · EN · FR · TR" },
];

export const skills = {
  Hardware: [
    { name: "STM32 (F4 / H7 / U5)", level: 95 },
    { name: "ARM Cortex Architectures", level: 90 },
    { name: "Raspberry Pi", level: 85 },
    { name: "Nvidia Jetson", level: 75 },
    { name: "ESP8266 / ESP32", level: 80 },
    { name: "NXP MCUs", level: 70 },
  ],
  "Software & RTOS": [
    { name: "C / C++", level: 95 },
    { name: "Bare-metal Programming", level: 92 },
    { name: "FreeRTOS", level: 90 },
    { name: "ThreadX (Azure RTOS)", level: 85 },
    { name: "ROS 2 / Micro-ROS", level: 82 },
    { name: "TouchGFX", level: 70 },
  ],
  "Protocols & Tools": [
    { name: "DDS", level: 80 },
    { name: "UART", level: 95 },
    { name: "SPI", level: 92 },
    { name: "I2C", level: 90 },
    { name: "PWM", level: 95 },
    { name: "PID Control", level: 88 },
    { name: "Git", level: 90 },
  ],
  Languages: [
    { name: "Arabic — Native", level: 100 },
    { name: "English — C2 (IELTS 6.5)", level: 95 },
    { name: "French — C2", level: 95 },
    { name: "Turkish — B1 (Pro)", level: 60 },
  ],
};

export const experience = [
  {
    id: "exp-01",
    role: "Embedded Robotics Engineer Intern",
    company: "OORB — Open Organic Robotics",
    location: "Sousse, Tunisia",
    start: "Feb 2025",
    end: "Jul 2025",
    bullets: [
      "Engineered embedded control logic for a Quadruped robot utilizing STM32 and Raspberry Pi.",
      "Resolved complex DDS / UART / SPI integration issues to establish seamless Micro-ROS communication.",
    ],
    stack: ["STM32", "Raspberry Pi", "Micro-ROS", "DDS", "C/C++"],
  },
  {
    id: "exp-02",
    role: "Robotic Software Developer Intern",
    company: "SEABOT SARL (MARECUSTOS)",
    location: "Tunis, Tunisia",
    start: "Jul 2024",
    end: "Sep 2024",
    bullets: [
      "Developed underwater robotic control systems implementing ThreadX RTOS on an STM32U5.",
      "Facilitated inter-process communication via micro-ROS on an Nvidia Jetson companion computer.",
    ],
    stack: ["STM32U5", "ThreadX", "Micro-ROS", "Jetson", "Underwater"],
  },
  {
    id: "exp-03",
    role: "Embedded Software Developer Intern",
    company: "FOOD4FUTURE (SPIRAW) — ACTIA",
    location: "Ariana, Tunisia",
    start: "Feb 2024",
    end: "May 2024",
    bullets: [
      "Designed real-time embedded software on STM32H7 utilizing FreeRTOS for task scheduling.",
      "Integrated ESP8266 module with a TouchGFX GUI for remote monitoring of bioreactor systems.",
    ],
    stack: ["STM32H7", "FreeRTOS", "ESP8266", "TouchGFX"],
  },
];

export const projects = [
  {
    id: "proj-anti-uav",
    code: "TGT-001",
    name: "Anti-UAV Target Detection & Tracking",
    status: "ONGOING",
    classification: "DEFENSE / VISION",
    summary:
      "Custom YOLOX vision architecture with an early-exit mechanism for ultra-low-latency target detection. NXP and STM32 embedded hardware design for real-time sensor processing and countermeasure actuation.",
    highlights: [
      "Early-exit YOLOX backbone for tiered inference latency.",
      "Real-time sensor fusion pipeline on NXP & STM32.",
      "Countermeasure actuation interface with sub-frame jitter.",
    ],
    stack: ["YOLOX", "NXP", "STM32", "Computer Vision", "C/C++"],
    image:
      "https://images.unsplash.com/photo-1495811853829-7f743aca3770?auto=format&fit=crop&w=1200&q=70",
    accent: "amber",
  },
  {
    id: "proj-pan-tilt",
    code: "TGT-002",
    name: "PID Controlled Pan-Tilt Aircraft Tracker",
    status: "COMPLETED",
    classification: "AEROSPACE / CONTROL",
    summary:
      "Real-time tracking system utilizing ThreadX RTOS and STM32 Timer peripherals to drive precise servo motor actuation via PWM. ROS 2 geometry messages and micro-ROS for low-latency host comms.",
    highlights: [
      "ThreadX RTOS task scheduling on STM32.",
      "PWM servo actuation via hardware timers.",
      "Micro-ROS / ROS 2 geometry message pipeline.",
    ],
    stack: ["ThreadX", "STM32", "ROS 2", "Micro-ROS", "PID"],
    image:
      "https://images.pexels.com/photos/3862624/pexels-photo-3862624.jpeg?auto=compress&w=1200&q=70",
    accent: "green",
  },
  {
    id: "proj-placeholder-1",
    code: "TGT-003",
    name: "Quadruped Locomotion Stack",
    status: "ARCHIVE",
    classification: "ROBOTICS / RTOS",
    summary:
      "Embedded control logic for a quadruped robot — Micro-ROS bridge, gait controllers and low-level SPI/UART sensor fan-in. Media will be uploaded soon.",
    highlights: [
      "Gait state machine on STM32.",
      "DDS bridge to high-level planner on Raspberry Pi.",
      "Custom diagnostics dashboard.",
    ],
    stack: ["STM32", "Raspberry Pi", "Micro-ROS", "DDS"],
    image:
      "https://images.pexels.com/photos/8439064/pexels-photo-8439064.jpeg?auto=compress&w=1200&q=70",
    accent: "orange",
    placeholder: true,
  },
  {
    id: "proj-placeholder-2",
    code: "TGT-004",
    name: "Underwater AUV Control Node",
    status: "ARCHIVE",
    classification: "MARITIME / RTOS",
    summary:
      "ThreadX-based control node on STM32U5 with micro-ROS bridge to Nvidia Jetson — bench validated. Demo footage incoming.",
    highlights: [
      "Pressure-compensated buoyancy loop.",
      "ThreadX message queue topology.",
      "Companion-Jetson micro-ROS bridge.",
    ],
    stack: ["STM32U5", "ThreadX", "Jetson", "Micro-ROS"],
    image:
      "https://images.pexels.com/photos/3520692/pexels-photo-3520692.jpeg?auto=compress&w=1200&q=70",
    accent: "amber",
    placeholder: true,
  },
];

export const education = [
  {
    id: "edu-01",
    institution: "Ondokuz Mayıs University",
    location: "Samsun, Türkiye",
    degree: "M.Sc. in Computer Engineering",
    period: "Sep 2026 – Jun 2028",
    note: "Türkiye Scholarships (YTB) Awardee. Currently in Turkish Preparatory Year (Oct 2025 – Present).",
    status: "INCOMING",
  },
  {
    id: "edu-02",
    institution: "University of Manouba — ENSI",
    location: "La Manouba, Tunisia",
    degree: "M2: Research in Smart Systems (Advanced Intelligent Systems)",
    period: "Sep 2025 – Present",
    note: "Research focus on intelligent embedded systems.",
    status: "ACTIVE",
  },
  {
    id: "edu-03",
    institution: "University of Tunis El Manar — ENIT",
    location: "Tunis, Tunisia",
    degree: "Bachelor of Computer Engineering — IoT & Embedded Systems",
    period: "Sep 2021 – Jul 2024",
    note: "Specialization: IoT & Embedded Systems.",
    status: "COMPLETED",
  },
];

export const awards = [
  {
    id: "awd-01",
    title: "1st Place — National Embedded Programming Contest",
    issuer: "IEEE RAS (STM32F4)",
    year: "2025",
    type: "AWARD",
  },
  {
    id: "awd-02",
    title: "2nd Place — National Embedded Programming Contest",
    issuer: "IEEE RAS (STM32F4)",
    year: "2024",
    type: "AWARD",
  },
  {
    id: "awd-03",
    title: "Türkiye Scholarships (YTB) Awardee",
    issuer: "Republic of Türkiye",
    year: "2025",
    type: "SCHOLARSHIP",
  },
  {
    id: "cert-01",
    title: "Embedded Systems Essentials with Arm",
    issuer: "edX",
    year: "—",
    type: "CERTIFICATION",
  },
  {
    id: "cert-02",
    title: "C Programming for Embedded",
    issuer: "LinkedIn Learning",
    year: "—",
    type: "CERTIFICATION",
  },
  {
    id: "lead-01",
    title: "STM32 & Robotics Trainer",
    issuer: "Club Robotique ISAMM — Tunisia",
    year: "—",
    type: "LEADERSHIP",
  },
];

export const navLinks = [
  { id: "hero", label: "01 / HOME" },
  { id: "about", label: "02 / DOSSIER" },
  { id: "skills", label: "03 / SYSTEMS" },
  { id: "experience", label: "04 / MISSIONS" },
  { id: "projects", label: "05 / TARGETS" },
  { id: "education", label: "06 / RECORDS" },
  { id: "awards", label: "07 / MEDALS" },
  { id: "contact", label: "08 / COMMS" },
];
