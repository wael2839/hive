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
    allLinks: string;
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
    cards: { title: string; body: string }[];
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
    /** عندما لا تضبط متغيرات SMTP على الخادم (استجابة 503) */
    errorUnavailable: string;
    privacy: string;
  };
  footer: {
    rights: string;
    tagline: string;
    brandIntro: string;
    sitemapTitle: string;
    servicesTitle: string;
    contactTitle: string;
    contactForm: string;
  };
};

const messages: Record<Locale, Messages> = {
  en: {
    meta: {
      title: "Hive Digital Solutions | Web & Mobile Development in Aleppo, Syria",
      description:
        "Hive Digital Solutions is a digital agency in Aleppo, Syria providing web development, mobile app development, branding, and custom software solutions for businesses in Syria and the region.",
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
      allLinks: "All links",
      cta: "Get Started",
      themeSwitchToLight: "Switch to light mode",
      themeSwitchToDark: "Switch to dark mode",
    },
    hero: {
      kicker: "Hive Digital Solutions",
      title: `" All you need ،`,
      titleAccent: `One Hive "`,
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
      moreCta: "Details",
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
      cards: [
        {
          title: "Turning ideas into digital reality",
          body:
            "We have the passion and experience to transform even complex ideas into software products that feel simple and easy to use.",
        },
        {
          title: "Innovation-first approach",
          body:
            "We use modern engineering tools to deliver technical excellence in loading speed, SEO compatibility, and strong security.",
        },
        {
          title: "Transparent collaboration",
          body:
            "Our workflow keeps you involved throughout development, ensuring the final product matches exactly what you envision.",
        },
      ],
    },
    packages: {
      kicker: "Packages",
      title: "Choose Your Package",
      subtitle:
        "From your first digital presence to enterprise-wide systems—tiers aligned with how you grow.",
      badgePopular: "Most popular",
      items: [
        {
          name: "Essential Presence",
          price: "Starter",
          description:
            "The first step to representing your project online with clarity.",
          features: [
            "Visual identity: Simple brand kit (logo, type, and color system).",
            "Website: Full brochure site with 5 focused pages.",
            "Google Maps: List and verify your business for easier discovery.",
            "Social: Professional templates for Facebook and Instagram.",
          ],
          cta: "Get Started",
        },
        {
          name: "Business Growth",
          price: "Popular",
          description:
            "An integrated solution for sales, reach, and day-to-day digital operations.",
          features: [
            "Visual identity: Full professional kit (logo, type, colors, banners).",
            "E‑commerce: Advanced store with dashboard, catalog, and order management.",
            "Mobile app: Custom store app to smooth the customer journey.",
            "Google Maps: Business verification for trust and local visibility.",
            "Social: Unified creative templates across your social channels.",
          ],
          cta: "Get Started",
          featured: true,
        },
        {
          name: "Enterprise Solutions",
          price: "On Request",
          description:
            "End-to-end digitization for smarter, coordinated management.",
          features: [
            "Full commercial stack: Everything in package (2), included.",
            "Staff management: Desktop app for HR workflows and operations.",
            "Office templates: Professional Word sets (contracts, letters, invoices) for consistent corporate branding.",
          ],
          cta: "Contact Us",
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
      phonePlaceholder: "National number (no country code)",
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
      errorUnavailable:
        "The contact form isn’t set up on the server yet (email delivery). Please email us directly using the address on this page.",
      privacy: "We respect your privacy—no spam, ever.",
    },
    footer: {
      rights: "© Hive Digital Solutions {year}. All rights reserved.",
      tagline: "We build scalable digital systems.",
      brandIntro:
        "Hive Digital Solutions designs and builds web, mobile, and automation experiences that support your brand growth with clarity and sustained long-term support.",
      sitemapTitle: "Quick links",
      servicesTitle: "Our services",
      contactTitle: "Contact",
      contactForm: "Contact form",
    },
  },
  ar: {
    meta: {
      title: "هايڤ للحلول الرقمية | تطوير مواقع وتطبيقات في حلب، سوريا",
      description:
        "هايڤ للحلول الرقمية في حلب، سوريا: تطوير مواقع وتطبيقات موبايل، برمجة أنظمة مخصصة، وهوية بصرية للشركات في سوريا والمنطقة.",
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
      allLinks: "جميع الروابط",
      cta: "ابدأ الآن",
      themeSwitchToLight: "التبديل إلى الوضع الفاتح",
      themeSwitchToDark: "التبديل إلى الوضع الداكن",
    },
    hero: {
      kicker: "هايڤ للحلول الرقمية",
      title: `كل ما تحتاجه`,
      titleAccent: `خلية واحدة`,
      subtitle:
        "نطور تطبيقات الويب والموبايل والحلول البرمجية المخصصة لمساعدة أعمالك على الانطلاق والنمو بثقة.",
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
        "نحن شركة تقدم حلولا وخدمات رقمية متكاملة، ونمكن عملاءنا من التركيز على تنمية أعمالهم بينما نتولى الجوانب التقنية بكفاءة ووضوح.",
      pillars: ["من نحن", "المفهوم", "الالتزام"],
      stat1: "الجودة أولا",
      stat1Label: "إتقان في كل تفصيل",
      stat2: "خبرات متكاملة",
      stat2Label: "فريق واحد بتناغم",
      stat3: "تنفيذ موثوق",
      stat3Label: "من البداية حتى التسليم",
    },
    services: {
      kicker: "خدماتنا",
      title: "خدماتنا",
      moreCta: "تفاصيل",
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
          more: "نصمم هوية بصرية متكاملة توحد رسالتك عبر الشعار والخطوط والألوان وجميع نقاط التفاعل الرقمية.",
        },
        {
          title: "إدارة السوشيال ميديا",
          desc: "إدارة وصناعة محتوى وإعلانات رقمية عبر المنصات الأساسية.",
          more: "ندير حضورك الرقمي عبر محتوى مدروس وخطط نمو للجمهور وحملات إعلانية موجهة.",
        },
        {
          title: "خدمات مكتبية",
          desc: "أتمتة ونظم داخلية ترفع الكفاءة وتبسط التشغيل.",
          more: "نؤتمت المهام المتكررة ونبني أدوات داخلية تعزز الإنتاجية وتقلل اختناقات التشغيل.",
        },
        {
          title: "خدمات خرائط Google",
          desc: "ربط خرائط، تحسين ظهور النشاط، وحلول قائمة على الموقع.",
          more: "نحسن ظهور موقعك عبر تكامل الخرائط وإعداد الملف التجاري وتجربة تنقل العملاء.",
        },
      ],
    },
    vision: {
      kicker: "آلية العمل",
      title: "لماذا تختارنا",
      cards: [
        {
          title: "الجودة أولا",
          body:
            "نضع الجودة في مقدمة كل ما نقدمه، ونحرص على الاهتمام بأدق التفاصيل لضمان نتائج احترافية تلبي توقعات العملاء، هدفنا ليس فقط إنجاز العمل، بل تقديم قيمة حقيقية ذات أثر دائم.",
        },
        {
          title: "شريك واحد لكل احتياجاتك",
          body:
            "نوفر لك مختلف الحلول الرقمية تحت سقف واحد، مما يوفر الوقت والجهد ويجنبك تعقيدات التعامل مع عدة أطراف، نعمل على فهم رؤيتك بشكل كامل لنقدم لك حلولا متناسقة تخدم أهدافك.",
        },
        {
          title: "عمل متكامل",
          body:
            "يتم تنسيق جميع جوانب المشروع بشكل منظم لضمان انسجام العمل من البداية حتى النهاية، مما ينعكس على جودة المنتج النهائي وسرعة التنفيذ، نحن لا نقدم خدمات منفصلة، بل حلولا مترابطة تخدم هدفك بالكامل.",
        },
      ],
    },
    packages: {
      kicker: "باقاتنا",
      title: "اختر الباقة المناسبة",
      subtitle:
        "من أول تمثيل رقمي وحتى أنظمة المؤسسات — باقات تتوافق مع مرحلة نموك.",
      badgePopular: "الأكثر طلبا",
      items: [
        {
          name: "باقة الحضور الأساسي",
          price: "بداية",
          description: "الخطوة الأولى لتمثيل مشروعك رقميا",
          features: [
            "الهوية البصرية: تصميم هوية بصرية بسيطة تشمل (اللوغو، الخطوط، وتنسيق الألوان).",
            "الموقع الإلكتروني: إنشاء موقع إلكتروني تعريفي متكامل يتكون من 5 صفحات.",
            "خرائط Google: إضافة وتوثيق نشاطك التجاري على خرائط جوجل لسهولة الوصول إليك.",
            "وسائل التواصل: تصميم قوالب احترافية مخصصة لمنصات (فيسبوك وانستقرام).",
          ],
          cta: "ابدأ الآن",
        },
        {
          name: "باقة النمو التجاري",
          price: "الأكثر طلبا",
          description: "الحل المتكامل لإدارة المبيعات والانتشار",
          features: [
            "الهوية البصرية: بناء هوية بصرية كاملة واحترافية تشمل (اللوغو، الخطوط، الألوان، وتصميم البانرات).",
            "المتجر الإلكتروني: برمجة متجر إلكتروني متطور يتضمن (لوحة تحكم كاملة، عرض الخدمات، ونظام إدارة الطلبات).",
            "تطبيق الجوال: تصميم وتطوير تطبيق جوال مخصص للمتجر لتسهيل تجربة العميل.",
            "خرائط Google: إضافة وتوثيق النشاط التجاري على الخرائط لضمان الموثوقية.",
            "وسائل التواصل: تصميم قوالب إبداعية موحدة لكافة منصات التواصل الاجتماعي الخاصة بك.",
          ],
          cta: "ابدأ الآن",
          featured: true,
        },
        {
          name: "باقة الحلول المؤسساتية",
          price: "حسب الطلب",
          description: "الرقمنة الشاملة لإدارة ذكية ومتكاملة",
          features: [
            "النظام التجاري الشامل: تتضمن كافة ميزات الباقة رقم (2) بالكامل.",
            "إدارة الموظفين: تطوير تطبيق سطح مكتب مخصص لإدارة شؤون الموظفين وتنظيم سير العمل.",
            "الحلول الإدارية: تصميم قوالب احترافية (Word) تشمل (العقود، المراسلات الرسمية، والفواتير) لضمان طابع مؤسساتي موحد.",
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
      phonePlaceholder: "الرقم الوطني (بدون مفتاح الدولة)",
      phoneCountryAria: "رمز الدولة",
      phoneCountryListAria: "قائمة الدول",
      service: "الخدمة",
      servicePlaceholder: "اختر الخدمة",
      serviceOther: "خدمة أخرى",
      projectDetails: "تفاصيل المشروع",
      send: "إرسال الرسالة",
      sending: "جاري الإرسال…",
      sent: "تم إرسال الرسالة",
      error: "تعذر الإرسال. حاول مرة أخرى أو تواصل معنا مباشرة.",
      errorUnavailable:
        "نموذج التواصل غير مهيأ على الخادم بعد (إرسال البريد). راسلنا مباشرة عبر البريد أو الهاتف الظاهر في الصفحة.",
      privacy: "نحترم خصوصيتك—لا رسائل مزعجة.",
    },
    footer: {
      rights: "© Hive Digital Solutions {year} جميع الحقوق محفوظة.",
      tagline: "نبني أنظمة رقمية قابلة للتوسع",
      brandIntro:
        "هايف لحلول الرقمية تصمم وتبني تجارب ويب وموبايل وأتمتة تدعم نمو علامتك بوضوح ودعم مستمر على المدى الطويل.",
      sitemapTitle: "روابط سريعة",
      servicesTitle: "خدماتنا",
      contactTitle: "تواصل",
      contactForm: "نموذج التواصل",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
