export type Locale = "en" | "ar";

export const locales: Locale[] = ["en", "ar"];
export const defaultLocale: Locale = "en";

export function isLocale(s: string): s is Locale {
  return locales.includes(s as Locale);
}

export type Messages = {
  meta: { title: string; description: string };
  nav: {
    brand: string;
    home: string;
    about: string;
    services: string;
    vision: string;
    packages: string;
    portfolio: string;
    contact: string;
    cta: string;
    themeSwitchToLight: string;
    themeSwitchToDark: string;
  };
  hero: {
    kicker: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    primary: string;
    secondary: string;
    imageAlt: string;
  };
  about: {
    kicker: string;
    title: string;
    subtitle: string;
    body: string;
    pillars: [string, string, string];
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
  };
  services: {
    kicker: string;
    title: string;
    items: { title: string; desc: string }[];
  };
  vision: {
    kicker: string;
    title: string;
    body: string;
  };
  packages: {
    kicker: string;
    title: string;
    subtitle: string;
    badgePopular: string;
    items: {
      name: string;
      price: string;
      description: string;
      features: string[];
      cta: string;
      featured?: boolean;
    }[];
  };
  portfolio: {
    kicker: string;
    title: string;
    items: { name: string; tag: string }[];
  };
  contact: {
    kicker: string;
    title: string;
    subtitle: string;
    channelsTitle: string;
    ariaPhone: string;
    ariaEmail: string;
    ariaWhatsApp: string;
    ariaInstagram: string;
    ariaFacebook: string;
    ariaTiktok: string;
    ariaLinkedin: string;
    name: string;
    email: string;
    company: string;
    message: string;
    send: string;
    sent: string;
    privacy: string;
  };
  footer: {
    rights: string;
    tagline: string;
    sitemapTitle: string;
    contactTitle: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    meta: {
      title: "Hive Digital Solutions | Premium Digital Agency",
      description:
        "Hive Digital Solutions crafts immersive digital experiences, product strategy, and engineering at enterprise scale.",
    },
    nav: {
      brand: "Hive",
      home: "Home",
      about: "About",
      services: "Services",
      vision: "Vision",
      packages: "Packages",
      portfolio: "Portfolio",
      contact: "Contact",
      cta: "Start a project",
      themeSwitchToLight: "Switch to light mode",
      themeSwitchToDark: "Switch to dark mode",
    },
    hero: {
      kicker: "Digital excellence",
      title: "Architecting the",
      titleAccent: "next era",
      subtitle:
        "We design and engineer high-performance digital ecosystems, products, and experiences for global brands.",
      primary: "Explore work",
      secondary: "Our approach",
      imageAlt: "Hive — digital studio hero visual",
    },
    about: {
      kicker: "About us",
      title: "Precision meets imagination",
      subtitle:
        "One integrated studio for brand narrative, systems thinking, and ship-ready product.",
      body:
        "Hive is a multidisciplinary studio of strategists, designers, and engineers. We unite brand narrative with systems thinking—delivering platforms that feel inevitable, scalable, and unmistakably premium.",
      pillars: ["Strategy", "Design", "Engineering"],
      stat1: "12+",
      stat1Label: "Years of craft",
      stat2: "140+",
      stat2Label: "Shipped launches",
      stat3: "24/7",
      stat3Label: "Global coverage",
    },
    services: {
      kicker: "Capabilities",
      title: "Services engineered for impact",
      items: [
        {
          title: "Product & UX",
          desc: "Research-led journeys, design systems, and interaction models that feel effortless.",
        },
        {
          title: "Engineering",
          desc: "Modern web stacks, performance, accessibility, and resilient infrastructure.",
        },
        {
          title: "Brand & Motion",
          desc: "Identity systems, cinematic motion, and immersive storytelling.",
        },
        {
          title: "Data & Growth",
          desc: "Measurement frameworks, experimentation, and analytics that scale.",
        },
        {
          title: "Cloud & DevOps",
          desc: "Secure pipelines, observability, and release velocity without compromise.",
        },
        {
          title: "Innovation Labs",
          desc: "Rapid prototyping, emerging tech, and proof-of-concepts for leadership teams.",
        },
      ],
    },
    vision: {
      kicker: "Vision",
      title: "Technology that feels human",
      body:
        "We believe luxury is clarity—every detail refined, every interaction intentional. Our work bridges artistry and engineering so your digital presence feels as considered as your physical one.",
    },
    packages: {
      kicker: "Packages",
      title: "Plans that scale with you",
      subtitle:
        "Clear deliverables and timelines. Upgrade when your roadmap demands it.",
      badgePopular: "Most popular",
      items: [
        {
          name: "Launch",
          price: "From $3,400",
          description:
            "Ship a focused product surface or flagship landing with production-ready UX.",
          features: [
            "Discovery & UX sprint",
            "Design system foundations",
            "Frontend build & handoff",
            "Two refinement rounds",
          ],
          cta: "Discuss Launch",
        },
        {
          name: "Scale",
          price: "From $9,200",
          description:
            "End-to-end program across web, product, and measurement for growing teams.",
          features: [
            "Everything in Launch",
            "Integration & API patterns",
            "Analytics & experimentation",
            "Monthly performance reviews",
          ],
          cta: "Choose Scale",
          featured: true,
        },
        {
          name: "Enterprise",
          price: "Custom",
          description:
            "Embedded squad, governance, and roadmap alignment with your leadership team.",
          features: [
            "Dedicated cross-functional pod",
            "SLA & security alignment",
            "Multi-brand rollout support",
            "Executive stakeholder reviews",
          ],
          cta: "Talk to us",
        },
      ],
    },
    portfolio: {
      kicker: "Selected work",
      title: "Portfolio",
      items: [
        { name: "Aurum Finance", tag: "Fintech" },
        { name: "Vertex Health", tag: "Healthcare" },
        { name: "Nimbus Cloud", tag: "Enterprise" },
        { name: "Lumen Retail", tag: "Commerce" },
        { name: "Atlas Mobility", tag: "Transport" },
        { name: "Cipher Security", tag: "Cyber" },
        { name: "Helio Energy", tag: "Sustainability" },
        { name: "Meridian Media", tag: "Streaming" },
      ],
    },
    contact: {
      kicker: "Contact",
      title: "Let’s build what’s next",
      subtitle: "Share a brief. We respond within one business day.",
      channelsTitle: "Direct lines",
      ariaPhone: "Phone",
      ariaEmail: "Email",
      ariaWhatsApp: "WhatsApp",
      ariaInstagram: "Instagram",
      ariaFacebook: "Facebook",
      ariaTiktok: "TikTok",
      ariaLinkedin: "LinkedIn",
      name: "Full name",
      email: "Work email",
      company: "Company",
      message: "Project details",
      send: "Send message",
      sent: "Message received",
      privacy: "We respect your privacy—no spam, ever.",
    },
    footer: {
      rights: "© Hive Digital Solutions. All rights reserved.",
      tagline: "Precision craft. Global scale.",
      sitemapTitle: "Sitemap",
      contactTitle: "Contact",
    },
  },
  ar: {
    meta: {
        title: "هايڤ لحلول الرقمية | وكالة رقمية راقية",
      description:
        "هايڤ لحلول الرقمية تصمم وتنفّذ تجارب رقمية غامرة واستراتيجية منتجات وهندسة على مستوى المؤسسات.",
    },
    nav: {
      brand: "Hive",
      home: "الرئيسية",
      about: "من نحن",
      services: "الخدمات",
      vision: "الرؤية",
      packages: "الباقات",
      portfolio: "الأعمال",
      contact: "تواصل",
      cta: "ابدأ مشروعًا",
      themeSwitchToLight: "التبديل إلى الوضع الفاتح",
      themeSwitchToDark: "التبديل إلى الوضع الداكن",
    },
    hero: {
      kicker: "التميّز الرقمي",
      title: "نصمّم",
      titleAccent: "المرحلة القادمة",
      subtitle:
        "نصمّم وننفّذ أنظمة رقمية عالية الأداء ومنتجات وتجارب لعلامات عالمية.",
      primary: "استكشف الأعمال",
      secondary: "نهجنا",
      imageAlt: "هايڤ — صورة تعريفية للاستوديو الرقمي",
    },
    about: {
      kicker: "من نحن",
      title: "دقة تلتقي بالخيال",
      subtitle:
        "استوديو متكامل للسرد العلامي، تفكير الأنظمة، والمنتج الجاهز للإطلاق.",
      body:
        "هايڤ استوديو متعدد التخصصات يضم استراتيجيين ومصممين ومهندسين. نجمع السرد العلامي مع تفكير الأنظمة—لنقدّم منصات تبدو حتمية، قابلة للتوسّع، وفاخرة بلا جدال.",
      pillars: ["استراتيجية", "تصميم", "هندسة"],
      stat1: "+12",
      stat1Label: "سنوات إتقان",
      stat2: "+140",
      stat2Label: "إطلاق ناجح",
      stat3: "24/7",
      stat3Label: "تغطية عالمية",
    },
    services: {
      kicker: "القدرات",
      title: "خدمات مصمّمة للأثر",
      items: [
        {
          title: "المنتج وتجربة المستخدم",
          desc: "رحلات مبنية على البحث، أنظمة تصميم، ونماذج تفاعل تبدو سلسة.",
        },
        {
          title: "الهندسة",
          desc: "تقنيات ويب حديثة، أداء، إمكانية وصول، وبنية تحتية مرنة.",
        },
        {
          title: "الهوية والحركة",
          desc: "هويات بصرية، حركة سينمائية، وسرد غامر.",
        },
        {
          title: "البيانات والنمو",
          desc: "أطر قياس، تجارب، وتحليلات قابلة للتوسّع.",
        },
        {
          title: "السحابة وDevOps",
          desc: "مسارات آمنة، مراقبة، وسرعة إصدار دون مساومة.",
        },
        {
          title: "مختبرات الابتكار",
          desc: "نماذج أولية سريعة، تقنيات ناشئة، وإثبات مفاهيم لقيادة المؤسسات.",
        },
      ],
    },
    vision: {
      kicker: "الرؤية",
      title: "تقنية تشعر بإنسانيتها",
      body:
        "نؤمن أن الرقي هو الوضوح—كل تفصيل مصقول، كل تفاعل مقصود. نجسر بين الفن والهندسة ليكون حضورك الرقمي بقدر ما يعتنى بمادّي.",
    },
    packages: {
      kicker: "باقاتنا",
      title: "خطط تتوسّع مع نموّك",
      subtitle:
        "نطاقات تسليم واضحة وجداول زمنية محددة. ترقّى عندما يستدعي الطموح.",
      badgePopular: "الأكثر طلبًا",
      items: [
        {
          name: "إطلاق",
          price: "من 12,800 ر.س",
          description:
            "إطلاق واجهة منتج مركّزة أو صفحة رئيسية جاهزة للإنتاج مع تجربة مستخدم متقنة.",
          features: [
            "سباق اكتشاف وتجربة مستخدم",
            "أساسيات نظام التصميم",
            "تطوير واجهة وتسليم للفرق",
            "جدولان من التحسين",
          ],
          cta: "ناقش الإطلاق",
        },
        {
          name: "توسّع",
          price: "من 34,500 ر.س",
          description:
            "برنامج متكامل يشمل الويب والمنتج والقياس لفِرق في مرحلة النمو.",
          features: [
            "كل ما في باقة الإطلاق",
            "أنماط تكامل وواجهات برمجية",
            "تحليلات وتجارب مستمرة",
            "مراجعات أداء شهرية",
          ],
          cta: "اختر التوسّع",
          featured: true,
        },
        {
          name: "مؤسسات",
          price: "حسب الطلب",
          description:
            "فريق مدمج، حوكمة، ومواءمة خارطة الطريق مع قيادتك.",
          features: [
            "خلية عمل متعددة التخصصات",
            "اتفاقيات مستوى الخدمة والأمن",
            "دعم إطلاق متعدد العلامات",
            "مراجعات لأصحاب المصلحة التنفيذيين",
          ],
          cta: "تواصل معنا",
        },
      ],
    },
    portfolio: {
      kicker: "أعمال مختارة",
      title: "معرض الأعمال",
      items: [
        { name: "أوروم للتمويل", tag: "تقنية مالية" },
        { name: "فيرتكس الصحية", tag: "صحة" },
        { name: "نيمبوس السحابية", tag: "مؤسسات" },
        { name: "لومن التجزئة", tag: "تجارة" },
        { name: "أطلس التنقل", tag: "نقل" },
        { name: "سيفر الأمن", tag: "أمن سيبراني" },
        { name: "هيليو للطاقة", tag: "استدامة" },
        { name: "ميريديان للإعلام", tag: "بث" },
      ],
    },
    contact: {
      kicker: "تواصل",
      title: "لنبني ما هو قادم",
      subtitle: "أرسل ملخصًا سريعًا. نرد خلال يوم عمل واحد.",
      channelsTitle: "تواصل مباشر",
      ariaPhone: "الهاتف",
      ariaEmail: "البريد الإلكتروني",
      ariaWhatsApp: "واتساب",
      ariaInstagram: "إنستغرام",
      ariaFacebook: "فيسبوك",
      ariaTiktok: "تيك توك",
      ariaLinkedin: "لينكدإن",
      name: "الاسم الكامل",
      email: "البريد المهني",
      company: "الشركة",
      message: "تفاصيل المشروع",
      send: "إرسال الرسالة",
      sent: "تم استلام الرسالة",
      privacy: "نحترم خصوصيتك—لا رسائل مزعجة.",
    },
    footer: {
      rights: "© هايڤ لحلول الرقمية. جميع الحقوق محفوظة.",
      tagline: "إتقان في التفاصيل. نطاق عالمي.",
      sitemapTitle: "الصفحات",
      contactTitle: "تواصل",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
