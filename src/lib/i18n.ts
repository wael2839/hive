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
    /** تلميح التمرير أسفل الهيرو */
    scrollCue: string;
  };
  about: {
    kicker: string;
    title: string;
    body: string;
    pillars: [string, string, string];
    stat1: string;
    stat1Label: string;
    stat2: string;
    stat2Label: string;
    stat3: string;
    stat3Label: string;
    /** عداد زيارات الموقع (قسم من نحن) */
    visitsLabel: string;
  };
  services: {
    kicker: string;
    title: string;
    moreCta: string;
    items: { title: string; desc: string; more: string }[];
  };
  serviceDetail: {
    breadcrumbLabel: string;
    breadcrumbBack: string;
    sectionKicker: string;
    importanceTitle: string;
    featuresTitle: string;
    differenceTitle: string;
    processTitle: string;
    processSubtitle: string;
    summaryTitle: string;
    summaryBody: string;
    timelineLabel: string;
    stepsCountLabel: string;
    primaryCta: string;
    secondaryCta: string;
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
    /** يُعرض بدل قائمة البنود عندما لا توجد `features` على الباقة */
    tailoredPackageHook: string;
    tailoredPackageNote: string;
    items: {
      name: string;
      price: string;
      description: string;
      features?: string[];
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
    formTitle: string;
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
  /** صفحة ثابتة المسار `/links` (عرض بلغة الموقع الافتراضية) */
  linksPage: {
    title: string;
    description: string;
    heading: string;
    intro: string;
    websiteLinkLabel: string;
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
      portfolio: "Selected work",
      contact: "Contact Us",
      allLinks: "Contact Links",
      cta: "Get Started",
      themeSwitchToLight: "Switch to light mode",
      themeSwitchToDark: "Switch to dark mode",
    },
    hero: {
      kicker: "Hive Digital Solutions",
      title: `All you need,`,
      titleAccent: `One Hive`,
      subtitle:
        "We build web, mobile, and custom software solutions that help businesses launch faster and scale with confidence.",
      primary: "Get a Free Consultation",
      secondary: "View Our Services",
      imageAlt: "Hive — digital studio hero visual",
      scrollCue: "Scroll",
    },
    about: {
      kicker: "About Us",
      title: "About Us",
       body:
        "We are a company that provides integrated digital solutions and services, enabling our clients to focus on growing their businesses while we efficiently and transparently handle the technical aspects.",
      pillars: ["Who We Are", "Concept", "Commitment"],
      stat1: "Quality First",
      stat1Label: "Excellence in every detail",
      stat2: "Integrated Expertise",
      stat2Label: "One coordinated team",
      stat3: "Trusted Delivery",
      stat3Label: "From kickoff to handoff",
      visitsLabel: "Site visits",
    },
    services: {
      kicker: "Services",
      title: "Services",
      moreCta: "Details",
      items: [
        {
          title: "Web Apps & Websites",
          desc: "Modern web applications and websites built for speed, trust, and seamless user experience.",
          more: "We build tailored websites and web platforms with secure architecture, intuitive dashboards, and integrations that fit your workflow.",
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
          title: "Visual Design",
          desc: "Logos, color systems, typography, and brand guidelines that make you unforgettable.",
          more: "We design cohesive brand identities that align your message across logo, typography, colors, and digital touchpoints.",
        },
        {
          title: "Academic & Office Services",
          desc: "We provide integrated solutions to support your academic and administrative work, helping you complete tasks with high quality in record time.",
          more: "",
        },
        {
          title: "Google Maps",
          desc: "Custom map integrations, business listings, and location-based solutions.",
          more: "We optimize location visibility through map integrations, business profile setup, and customer navigation experience.",
        },
      ],
    },
    serviceDetail: {
      breadcrumbLabel: "Service page",
      breadcrumbBack: "Back to services",
      sectionKicker: "How we deliver this service",
      importanceTitle: "Why this service matters",
      featuresTitle: "Features",
      differenceTitle: "Execution Process",
      processTitle: "Clear process. Measurable outcomes.",
      processSubtitle:
        "A practical workflow tailored to your business, focused on speed, quality, and long-term reliability.",
      summaryTitle: "Project Summary",
      summaryBody:
        "Every service follows a structured approach with transparent updates and delivery milestones.",
      timelineLabel: "Service implementation timeline",
      stepsCountLabel: "Delivery steps",
      primaryCta: "Start your request",
      secondaryCta: "Talk to our team",
    },
    vision: {
      kicker: "Why choose us",
      title: "Why Choose Us",
      cards: [
        {
          title: "Quality First",
          body:
            "We prioritize quality in everything we deliver, focusing on details to ensure professional results that meet expectations. Our goal is to provide real value with a lasting impact, not just complete the work."
        },
        {
          title: "One Partner for All Your Needs",
          body:
            "We offer a wide range of digital solutions under one roof, saving time and effort while reducing the need to deal with multiple parties. We understand your vision to deliver cohesive solutions that support your goals.",
        },
        {
          title: "Integrated Work",
          body:
            "All project aspects are coordinated in an organized way to ensure consistency from start to finish, reflected in the final quality and execution speed. We offer interconnected solutions that fully serve your objectives.",
        },
      ],
    },
    packages: {
      kicker: "Packages",
      title: "Packages",
      subtitle:
        "From your first digital presence to enterprise-wide systems—tiers aligned with how you grow.",
      badgePopular: "Most popular",
      tailoredPackageHook: "Customize your package, your way.",
      tailoredPackageNote:
        "This package is designed specifically for complex technical needs. Contact us and we will deliver the services you need, aligned with your organization's workflows.",
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
          price: "Customized",
          description:
            "End-to-end digitization for smarter, coordinated management.",
          cta: "Contact Us",
        },
      ],
    },
    portfolio: {
      kicker: "Selected work",
      title: "Selected work",
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
      kicker: "Contact Us",
      title: "Contact Us",
      subtitle: "Tell us what you need.",
      formTitle: "Request your service",
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
      send: "Send",
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
      servicesTitle: "Services",
      contactTitle: "Contact Us",
      contactForm: "Request your service",
    },
    linksPage: {
      title: " Contact Links",
      description:
        "Quick links to our website, phone, WhatsApp, email, and social channels.",
      heading: "Contact Links",
      intro: "All our official pages in one place.",
      websiteLinkLabel: "Browse our website",
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
      contact: "تواصل معنا",
      allLinks: "روابط التواصل",
      cta: "ابدأ الآن",
      themeSwitchToLight: "التبديل إلى الوضع الفاتح",
      themeSwitchToDark: "التبديل إلى الوضع الداكن",
    },
    hero: {
      kicker: "هايڤ للحلول الرقمية",
      title: `كل ما تحتاجه،`,
      titleAccent: `خلية واحدة`,
      subtitle:
        "نطور تطبيقات الويب والموبايل والحلول البرمجية المخصصة لمساعدة أعمالك على الانطلاق والنمو بثقة.",
      primary: "احصل على استشارة مجانية",
      secondary: "استعرض الخدمات",
      imageAlt: "هايڤ — صورة تعريفية للاستوديو الرقمي",
      scrollCue: "اسحب لأعلى",
    },
    about: {
      kicker: "من نحن",
      title: "من نحن",
      body:
        "نحن شركة تقدم حلولا وخدمات رقمية متكاملة، ونمكن عملاءنا من التركيز على تنمية أعمالهم بينما نتولى الجوانب التقنية بكفاءة ووضوح.",
      pillars: ["من نحن", "المفهوم", "الالتزام"],
      stat1: "الجودة أولا",
      stat1Label: "إتقان في كل تفصيل",
      stat2: "خبرات متكاملة",
      stat2Label: "فريق واحد بتناغم",
      stat3: "تنفيذ موثوق",
      stat3Label: "من البداية حتى التسليم",
      visitsLabel: "زيارات الموقع",
    },
    services: {
      kicker: "الخدمات",
      title: "الخدمات",
      moreCta: "تفاصيل",
      items: [
        {
          title: "تطبيقات الويب والمواقع الإلكترونية",
          desc: "تطبيقات ويب ومواقع إلكترونية حديثة مبنية للسرعة، والثقة، وتجربة مستخدم سلسة.",
          more: "نبني مواقع ومنصات ويب مخصصة ببنية آمنة، ولوحات تحكم واضحة، وتكاملات تناسب سير عملك.",
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
          title: "التصميم البصري",
          desc: "شعارات وأنظمة ألوان وخطوط ودليل بصري متكامل.",
          more: "نصمم هوية بصرية متكاملة توحد رسالتك عبر الشعار والخطوط والألوان وجميع نقاط التفاعل الرقمية.",
        },
        {
          title: "خدمات أكاديمية ومكتبية",
          desc: "نقدم حلولًا متكاملة لدعم أعمالك الأكاديمية والإدارية، تساعدك على إنجاز مهامك بجودة عالية ووقت قياسي.",
          more: "",
        },
        {
          title: "خدمات خرائط Google",
          desc: "ربط خرائط، تحسين ظهور النشاط، وحلول قائمة على الموقع.",
          more: "نحسن ظهور موقعك عبر تكامل الخرائط وإعداد الملف التجاري وتجربة تنقل العملاء.",
        },
      ],
    },
    serviceDetail: {
      breadcrumbLabel: "صفحة الخدمة",
      breadcrumbBack: "العودة إلى الخدمات",
      sectionKicker: "كيف ننفذ هذه الخدمة",
      importanceTitle: "أهمية هذه الخدمة لمشروعك",
      featuresTitle: "الميّزات",
      differenceTitle: "منهجية التنفيذ",
      processTitle: "خطوات واضحة. نتائج قابلة للقياس.",
      processSubtitle:
        "مسار عمل عملي مصمم لطبيعة نشاطك، يركز على السرعة والجودة والاستقرار على المدى الطويل.",
      summaryTitle: "ملخص التنفيذ",
      summaryBody:
        "كل خدمة لدينا تمر بمنهجية واضحة مع تحديثات شفافة ونقاط تسليم مرحلية.",
      timelineLabel: "المخطط الزمني لتنفيذ الخدمة",
      stepsCountLabel: "عدد مراحل التنفيذ",
      primaryCta: "ابدأ طلبك الآن",
      secondaryCta: "تحدث مع فريقنا",
    },
    vision: {
      kicker: "لماذا تختارنا",
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
      kicker: "الباقات",
      title: "الباقات",
      subtitle:
        "من أول تمثيل رقمي وحتى أنظمة المؤسسات — باقات تتوافق مع مرحلة نموك.",
      badgePopular: "الأكثر طلبا",
      tailoredPackageHook: "خصّص باقتك بنفسك.",
      tailoredPackageNote:
        "هذه الباقة صممت خصيصاً لتلبية احتياجاتك التقنية المعقدة. تواصل معنا لنقدّم لك الخدمات التي تحتاجها بما يتوافق مع دورة عمل مؤسستك.",
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
            "تطبيق الموبايل: تصميم وتطوير تطبيق موبايل مخصص للمتجر لتسهيل تجربة العميل.",
            "خرائط Google: إضافة وتوثيق النشاط التجاري على الخرائط لضمان الموثوقية.",
            "وسائل التواصل: تصميم قوالب إبداعية موحدة لكافة منصات التواصل الاجتماعي الخاصة بك.",
          ],
          cta: "ابدأ الآن",
          featured: true,
        },
        {
          name: "باقة الحلول المؤسساتية",
          price: "مخصصة",
          description: "الرقمنة الشاملة لإدارة ذكية ومتكاملة",
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
      kicker: "تواصل معنا",
      title: "تواصل معنا",
      subtitle: "أخبرنا بما تحتاجه، ",
      formTitle: "اطلب خدمتك",
      channelsTitle: "تواصل مباشر",
      ariaPhone: "الهاتف",
      ariaEmail: "البريد الإلكتروني",
      ariaWhatsApp: "واتساب",
      ariaInstagram: "إنستغرام",
      ariaFacebook: "فيسبوك",
      ariaTiktok: "تيك توك",
      ariaLinkedin: "لينكد إن",
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
      send: "إرسال",
      sending: "جاري الإرسال…",
      sent: "تم إرسال الرسالة",
      error: "تعذر الإرسال. حاول مرة أخرى أو تواصل معنا مباشرة.",
      errorUnavailable:
        "نموذج التواصل غير مهيأ على الخادم بعد (إرسال البريد). راسلنا مباشرة عبر البريد أو الهاتف الظاهر في الصفحة.",
      privacy: "نحترم خصوصيتك.",
    },
    footer: {
      rights: "© Hive Digital Solutions {year} جميع الحقوق محفوظة.",
      tagline: "نبني أنظمة رقمية قابلة للتوسع",
      brandIntro:
        "هايف للحلول الرقمية تصمم وتبني تجارب ويب وموبايل وأتمتة تدعم نمو علامتك بوضوح ودعم مستمر على المدى الطويل.",
      sitemapTitle: "روابط سريعة",
      servicesTitle: "الخدمات",
      contactTitle: "تواصل معنا",
      contactForm: "اطلب خدمتك",
    },
    linksPage: {
      title: "روابط التواصل",
      description:
        "روابط سريعة للموقع والهاتف وواتساب والبريد ووسائل التواصل.",
      heading: "روابط التواصل",
      intro: "كل صفحاتنا الرسمية في مكان واحد..",
      websiteLinkLabel: "تصفح موقعنا",
    },
  },
};

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}
