export type Locale = "ar" | "en";

export const locales: Locale[] = ["ar", "en"];
export const defaultLocale: Locale = "ar";

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
    moreCta: string;
    items: { title: string; desc: string; more: string }[];
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
    phone: string;
    phonePlaceholder: string;
    phoneCountryAria: string;
    phoneCountryListAria: string;
    service: string;
    servicePlaceholder: string;
    serviceOther: string;
    projectDetails: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
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
      title: "Hive Digital Solutions — Software & Digital Agency in Aleppo, Syria",
      description:
        "Hive Digital Solutions is a software development and digital solutions company in Aleppo, Syria. We deliver web development, mobile apps, custom systems, ERP-style workflows, and digital transformation for Syrian and regional businesses.",
    },
    nav: {
      brand: "Hive",
      home: "Home",
      about: "About Us",
      services: "Services",
      vision: "Why Choose Us",
      packages: "Packages",
      portfolio: "Portfolio",
      contact: "Contact",
      cta: "Get Started",
      themeSwitchToLight: "Switch to light mode",
      themeSwitchToDark: "Switch to dark mode",
    },
    hero: {
      kicker: "Hive Digital Solutions",
      title: "All you need",
      titleAccent: "in One Hive",
      subtitle:
        "We build web, mobile, and custom software solutions that help businesses launch faster and scale with confidence.",
      primary: "Get a Free Consultation",
      secondary: "View Our Services",
      imageAlt: "Hive — digital studio hero visual",
    },
    about: {
      kicker: "About Us",
      title: "About Us",
      subtitle:
        "Our approach is inspired by the honeycomb, where every part works in harmony within one integrated system.",
      body:
        "We are a company delivering integrated digital solutions and services, enabling our clients to focus on growing their business while we handle the technical side with efficiency and clarity.",
      pillars: ["Who We Are", "Concept", "Commitment"],
      stat1: "Quality First",
      stat1Label: "Excellence in every detail",
      stat2: "Integrated Expertise",
      stat2Label: "One coordinated team",
      stat3: "Trusted Delivery",
      stat3Label: "From kickoff to handoff",
    },
    services: {
      kicker: "Services",
      title: "Our Services",
      moreCta: "Learn More",
      items: [
        {
          title: "Web Apps",
          desc: "Modern web applications built for performance, scalability, and seamless user experience.",
          more: "We build tailored web platforms with secure architecture, intuitive dashboards, and integrations that fit your workflow.",
        },
        {
          title: "Mobile Apps",
          desc: "Native and cross-platform mobile solutions that put your business in your customers' pockets.",
          more: "From idea to app store, we deliver mobile products with smooth UX, strong performance, and scalable backend connectivity.",
        },
        {
          title: "Desktop Apps",
          desc: "Powerful desktop software tailored to your workflows across major operating systems.",
          more: "We craft robust desktop tools for business operations, internal systems, and heavy workflows across all major operating systems.",
        },
        {
          title: "Visual Identity",
          desc: "Logos, color systems, typography, and brand guidelines that make you unforgettable.",
          more: "We design cohesive brand identities that align your message across logo, typography, colors, and digital touchpoints.",
        },
        {
          title: "Social Media",
          desc: "Strategic content creation, management, and advertising across major platforms.",
          more: "We manage your social presence with strategic content, audience growth plans, and targeted paid campaigns.",
        },
        {
          title: "Office Services",
          desc: "Productivity tools, internal systems, and automation that streamline operations.",
          more: "We automate repetitive tasks and build internal tools to improve productivity and reduce operational bottlenecks.",
        },
        {
          title: "Google Maps",
          desc: "Custom map integrations, business listings, and location-based solutions.",
          more: "We optimize location visibility through map integrations, business profile setup, and customer navigation experience.",
        },
      ],
    },
    vision: {
      kicker: "How We Work",
      title: "Why Choose Us",
      body:
        "We run online-first delivery, secure electronic payments, on-ground implementation when needed, and continuous support plans that keep your systems stable and evolving.",
    },
    packages: {
      kicker: "Packages",
      title: "Choose Your Package",
      subtitle:
        "Clear tiers from launch to enterprise, each designed to match your stage and growth goals.",
      badgePopular: "Most popular",
      items: [
        {
          name: "Basic Presence",
          price: "Starter",
          description:
            "Everything you need to launch your digital footprint.",
          features: [
            "Custom Landing Page",
            "Mobile-Responsive Design",
            "Basic SEO Setup",
            "Social Media Kit",
          ],
          cta: "Get Started",
        },
        {
          name: "Business Growth",
          price: "Popular",
          description:
            "Scale your brand with a full digital strategy.",
          features: [
            "Multi-Page Web Application",
            "Visual Identity Package",
            "Social Media Management",
            "Analytics Dashboard",
          ],
          cta: "Get Started",
          featured: true,
        },
        {
          name: "Enterprise Solutions",
          price: "On Request",
          description:
            "A complete digital ecosystem for maximum impact.",
          features: [
            "Full Web + Mobile Apps",
            "Complete Brand System",
            "Office Automation Suite",
            "12 Months Premium Support",
          ],
          cta: "Contact Sales",
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
      title: "Contact Us",
      subtitle: "Tell us what you need. We respond within 24 hours.",
      channelsTitle: "Direct Contact",
      ariaPhone: "Phone",
      ariaEmail: "Email",
      ariaWhatsApp: "WhatsApp",
      ariaInstagram: "Instagram",
      ariaFacebook: "Facebook",
      ariaTiktok: "TikTok",
      ariaLinkedin: "LinkedIn",
      name: "Full name",
      email: "Email address",
      phone: "Mobile number",
      phonePlaceholder: "9xx xxx xxxx",
      phoneCountryAria: "Country code",
      phoneCountryListAria: "Open country list",
      service: "Service",
      servicePlaceholder: "Select a service",
      serviceOther: "Other service",
      projectDetails: "Project details",
      send: "Send message",
      sending: "Sending…",
      sent: "Message sent",
      error: "Could not send. Please try again or contact us directly.",
      privacy: "We respect your privacy—no spam, ever.",
    },
    footer: {
      rights: "© Hive for Digital Solutions. All rights reserved.",
      tagline: "Building digital ecosystems that scale.",
      sitemapTitle: "Sitemap",
      contactTitle: "Contact",
    },
  },
  ar: {
    meta: {
      title: "هايڤ للحلول الرقمية — شركة برمجيات وحلول رقمية في حلب، سوريا",
      description:
        "شركة برمجة وحلول رقمية في حلب، سوريا: تطوير مواقع وتطبيقات، أنظمة مخصّصة، وتحوّل رقمي للشركات في سوريا والمنطقة. خدمات تطوير ويب، تطبيقات موبايل، وأنظمة داخلية بمعايير احترافية.",
    },
    nav: {
      brand: "Hive",
      home: "الرئيسية",
      about: "من نحن",
      vision: "لماذا تختارنا",
      services: "الخدمات",
      packages: "الباقات",
      portfolio: "الأعمال",
      contact: "تواصل",
      cta: "ابدأ الآن",
      themeSwitchToLight: "التبديل إلى الوضع الفاتح",
      themeSwitchToDark: "التبديل إلى الوضع الداكن",
    },
    hero: {
      kicker: "هايڤ للحلول الرقمية",
      title: "كل ما تحتاجه",
      titleAccent: "في خلية واحدة",
      subtitle:
        "نطوّر تطبيقات الويب والموبايل والحلول البرمجية المخصّصة لمساعدة أعمالك على الانطلاق والنمو بثقة.",
      primary: "احصل على استشارة مجانية",
      secondary: "استعرض خدماتنا",
      imageAlt: "هايڤ — صورة تعريفية للاستوديو الرقمي",
    },
    about: {
      kicker: "من نحن",
      title: "من نحن",
      subtitle:
        "أسلوبنا يشبه خلية النحل، حيث يعمل كل جزء بتناغم ضمن منظومة متكاملة.",
      body:
        "نحن شركة تقدم حلولًا وخدمات رقمية متكاملة، ونُمكّن عملاءنا من التركيز على تنمية أعمالهم بينما نتولى الجوانب التقنية بكفاءة ووضوح.",
      pillars: ["من نحن", "المفهوم", "الالتزام"],
      stat1: "الجودة أولًا",
      stat1Label: "إتقان في كل تفصيل",
      stat2: "خبرات متكاملة",
      stat2Label: "فريق واحد بتناغم",
      stat3: "تنفيذ موثوق",
      stat3Label: "من البداية حتى التسليم",
    },
    services: {
      kicker: "خدماتنا",
      title: "خدماتنا",
      moreCta: "المزيد",
      items: [
        {
          title: "تطبيقات الويب",
          desc: "تطبيقات ويب حديثة مبنية للأداء، القابلية للتوسع، وتجربة مستخدم سلسة.",
          more: "نبني منصات ويب مخصصة ببنية آمنة ولوحات تحكم واضحة وتكاملات تناسب سير عملك.",
        },
        {
          title: "تطبيقات الموبايل",
          desc: "حلول موبايل أصلية ومتعددة المنصات تضع خدماتك في يد عميلك.",
          more: "من الفكرة حتى النشر، نطور تطبيقات موبايل بتجربة سلسة وأداء قوي وربط مرن مع الأنظمة الخلفية.",
        },
        {
          title: "تطبيقات سطح المكتب",
          desc: "برمجيات سطح مكتب قوية مصممة لتناسب سير أعمالك.",
          more: "نطور أدوات سطح مكتب قوية لعمليات الأعمال والأنظمة الداخلية وسيناريوهات العمل المكثفة على مختلف الأنظمة.",
        },
        {
          title: "الهوية البصرية",
          desc: "شعارات وأنظمة ألوان وخطوط ودليل بصري متكامل.",
          more: "نصمم هوية بصرية متكاملة توحّد رسالتك عبر الشعار والخطوط والألوان وجميع نقاط التفاعل الرقمية.",
        },
        {
          title: "إدارة السوشيال ميديا",
          desc: "إدارة وصناعة محتوى وإعلانات رقمية عبر المنصات الأساسية.",
          more: "ندير حضورك الرقمي عبر محتوى مدروس وخطط نمو للجمهور وحملات إعلانية موجّهة.",
        },
        {
          title: "خدمات مكتبية",
          desc: "أتمتة ونظم داخلية ترفع الكفاءة وتبسط التشغيل.",
          more: "نؤتمت المهام المتكررة ونبني أدوات داخلية تعزز الإنتاجية وتقلل اختناقات التشغيل.",
        },
        {
          title: "خدمات خرائط Google",
          desc: "ربط خرائط، تحسين ظهور النشاط، وحلول قائمة على الموقع.",
          more: "نحسّن ظهور موقعك عبر تكامل الخرائط وإعداد الملف التجاري وتجربة تنقل العملاء.",
        },
      ],
    },
    vision: {
      kicker: "آلية العمل",
      title: "لماذا تختارنا",
      body:
        "نعتمد تشغيلًا رقميًا بالكامل، مدفوعات إلكترونية آمنة، تنفيذًا ميدانيًا عند الحاجة، وخطط دعم مستمرة تضمن استقرار وتطور حلولك.",
    },
    packages: {
      kicker: "باقاتنا",
      title: "اختر الباقة المناسبة",
      subtitle:
        "باقات واضحة من الانطلاقة حتى حلول المؤسسات بما يناسب مرحلة عملك.",
      badgePopular: "الأكثر طلبًا",
      items: [
        {
          name: "الحضور الأساسي",
          price: "بداية",
          description:
            "كل ما تحتاجه لإطلاق حضورك الرقمي.",
          features: [
            "صفحة هبوط مخصصة",
            "تصميم متجاوب",
            "تهيئة SEO أساسية",
            "حزمة سوشيال ميديا",
          ],
          cta: "ابدأ الآن",
        },
        {
          name: "نمو الأعمال",
          price: "الأكثر طلبًا",
          description:
            "نمو علامتك عبر استراتيجية رقمية متكاملة.",
          features: [
            "تطبيق ويب متعدد الصفحات",
            "حزمة هوية بصرية",
            "إدارة سوشيال ميديا",
            "لوحة تحليلات",
          ],
          cta: "ابدأ الآن",
          featured: true,
        },
        {
          name: "حلول المؤسسات",
          price: "حسب الطلب",
          description:
            "منظومة رقمية متكاملة لأقصى أثر.",
          features: [
            "ويب + موبايل متكامل",
            "نظام علامة كامل",
            "أتمتة مكتبية متقدمة",
            "دعم مميز 12 شهرًا",
          ],
          cta: "تواصل مع المبيعات",
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
      title: "تواصل معنا",
      subtitle: "أخبرنا بما تحتاجه، ونرد خلال 24 ساعة.",
      channelsTitle: "تواصل مباشر",
      ariaPhone: "الهاتف",
      ariaEmail: "البريد الإلكتروني",
      ariaWhatsApp: "واتساب",
      ariaInstagram: "إنستغرام",
      ariaFacebook: "فيسبوك",
      ariaTiktok: "تيك توك",
      ariaLinkedin: "لينكدإن",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الجوال",
      phonePlaceholder: "9xx xxx xxxx",
      phoneCountryAria: "رمز الدولة",
      phoneCountryListAria: "قائمة الدول",
      service: "الخدمة",
      servicePlaceholder: "اختر الخدمة",
      serviceOther: "خدمة أخرى",
      projectDetails: "تفاصيل المشروع",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال…",
      sent: "تم إرسال الرسالة",
      error: "تعذّر الإرسال. حاول مرة أخرى أو تواصل معنا مباشرة.",
      privacy: "نحترم خصوصيتك—لا رسائل مزعجة.",
    },
    footer: {
      rights: "© هايڤ لحلول الرقمية. جميع الحقوق محفوظة.",
      tagline: "نبني منظومات رقمية قابلة للتوسع.",
      sitemapTitle: "الصفحات",
      contactTitle: "تواصل",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
