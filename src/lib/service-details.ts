import type { Locale } from "@/lib/i18n";

export const serviceSlugs = [
  "web-apps",
  "mobile-apps",
  "desktop-apps",
  "visual-identity",
  "office-services",
  "google-maps",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type ServiceDetail = {
  title: string;
  lead: string;
  importance: string;
  highlights: string[];
  steps: { head: string; text: string }[];
};

const details: Record<ServiceSlug, Record<Locale, ServiceDetail>> = {
  "web-apps": {
    ar: {
      title: "تطبيقات الويب & المواقع الإلكترونية",
      lead: "نطور تطبيقات ويب ومواقع إلكترونية حديثة تساعدك في التعريف بخدماتك، إدارة العمليات، ومتابعة العملاء ضمن تجربة سريعة وواضحة.",
      importance: "وجود موقع إلكتروني احترافي مع تطبيق ويب عملي يمنح نشاطك حضورًا موثوقًا ويختصر دورة العمل اليومية، من استقبال العملاء إلى تنفيذ العمليات وقياس الأداء.",
      highlights: [
        "تصميم متجاوب يعمل بسلاسة على الموبايل والتابلت وسطح المكتب",
        "بنية تقنية آمنة وقابلة للتوسع مع نمو عدد المستخدمين",
        "مواقع تعريفية وتجارية مصممة لعرض خدماتك وتعزيز الثقة بالعلامة",
        "لوحات تحكم وتدفقات استخدام مختصرة لرفع الإنتاجية",
        "تكامل مع API وأنظمة الدفع والخدمات الخارجية حسب الحاجة",
      ],
      steps: [
        { head: " تحليل المتطلبات", text: "نحدد الأهداف وسيناريوهات الاستخدام ونحوّلها إلى خارطة تنفيذ واضحة." },
        { head: " تصميم UX/UI", text: "نصمم تجربة استخدام سهلة تعكس هوية علامتك وتدعم التحويل." },
        { head: " التطوير والتكامل", text: "نبني الواجهة والخلفية ونربط الأنظمة بأداء مستقر." },
        { head: " الاختبار والتسليم", text: "نختبر بدقة ثم نطلق النسخة النهائية مع متابعة ما بعد الإطلاق." },
      ],
    },
    en: {
      title: "Web Applications & WebSites",
      lead: "We build modern web applications and websites that support your brand presence, streamline operations, and improve customer management.",
      importance: "A professional website combined with a practical web app builds trust, strengthens your digital presence, and shortens operational cycles from lead capture to execution.",
      highlights: [
        "Responsive UX across mobile, tablet, and desktop",
        "Secure and scalable architecture for business growth",
        "Business and marketing websites tailored to your brand and goals",
        "Clear dashboards and efficient user flows",
        "Integrations with APIs, payments, and third-party systems",
      ],
      steps: [
        { head: "Requirement Analysis", text: "We define goals and user scenarios, then shape a clear implementation roadmap." },
        { head: "UX/UI Design", text: "We design intuitive experiences aligned with your brand and conversion goals." },
        { head: "Development & Integration", text: "We build frontend/backend and connect your required systems reliably." },
        { head: "Testing & Delivery", text: "We run end-to-end QA, launch safely, and support after go-live." },
      ],
    },
  },
  "mobile-apps": {
    ar: {
      title: "تطبيقات الموبايل",
      lead: "نطور تطبيقات iOS و Android تجمع بين سرعة الأداء وسلاسة الواجهة، وتدعم النمو المستقبلي لمشروعك.",
      importance: "تطبيقات الجوال ليست مجرد قناة للوصول، بل محرك نمو فعال لأعمالك، تجمع بين الأداء العالي والموثوقية وتلبي مختلف احتياجات الاستخدام، وتمنحك القدرة على تقديم تجربة سريعة، مستقرة، ومصممة بدقة لمواكبة متطلبات عملائك.",
      highlights: [
        "تصميم متجاوب وتجربة استخدام مهيأة لسلوك مستخدمي الموبايل",
        "تطوير iOS و Android بجودة عالية واستقرار ممتاز",
        "ربط الإشعارات وتسجيل الدخول بشكل آمن، مع تكامل سلس للميزات الأساسية",
        "بنية قابلة للتوسع مع تحديثات مستقبلية بدون تعقيد",
      ],
      steps: [
        { head: " دراسة الفكرة والسوق", text: "نحدد القيمة والفئة المستهدفة ونرتب أولويات الإصدار الأول." },
        { head: " تصميم التجربة", text: "نبني تدفقات تفاعلية بسيطة وسريعة تحقق راحة الاستخدام." },
        { head: " التطوير والربط", text: "نطور التطبيق ونربطه بالخدمات الخلفية والأنظمة المطلوبة." },
        { head: " الإطلاق والتحسين", text: "نجهز للنشر، نراقب الأداء، ونحسّن بناءً على بيانات الاستخدام." },
      ],
    },
    en: {
      title: "Mobile Applications",
      lead: "We build iOS and Android apps with smooth UX, strong performance, and future-ready architecture.",
      importance: "Mobile apps are not just a channel to access. They are growth engines for your business, combining high performance, reliability, meeting various usage needs, and giving you the ability to deliver fast, stable, and precision-designed experiences to meet your customers' needs.",
      highlights: [
        "Mobile-first UX optimized for real user behavior",
        "High-quality iOS and Android implementation",
        "Secure notifications and login integrations with seamless feature integration",
        "Scalable codebase ready for future updates without complexity",
      ],
      steps: [
        { head: " Idea & Market Discovery", text: "We define value, audience, and release priorities." },
        { head: " UX Planning & Design", text: "We craft simple and fast flows that users can adopt quickly." },
        { head: " Build & Integrate", text: "We develop the app and connect required backend services." },
        { head: " Launch & Optimize", text: "We publish, monitor performance, and improve iteratively." },
      ],
    },
  },
  "desktop-apps": {
    ar: {
      title: "تطبيقات سطح المكتب",
      lead: "نطور أنظمة Desktop قوية لإدارة العمليات و (الانظمة) الداخلية بسرعة واستقرار وتحكم كامل بالبيانات.",
      importance: "تطبيقات سطح المكتب مناسبة للعمليات الثقيلة داخل الشركات، وتمنحك سرعة عالية واعتمادية أكبر في بيئات العمل الداخلية.",
      highlights: [
        "واجهات عملية واضحة تقلل الوقت الضائع في المهام المتكررة",
        "صلاحيات مستخدمين وتقارير دقيقة لإدارة العمل الداخلي",
        "تصميم مخصص لتحمل المهام الثقيلة بشكل سلس وموثوق",
        "استقرار عال في التشغيل اليومي الطويل",
      ],
      steps: [
        { head: " فهم بيئة التشغيل", text: "نحلل الأجهزة وبيئة العمل ومتطلبات الأداء الفعلية." },
        { head: " تصميم واجهات تشغيلية", text: "نصمم واجهات تركز على السرعة والوضوح للفرق الداخلية." },
        { head: " التطوير وربط البيانات", text: "نبني النظام بصلاحيات وتقارير وربط مع البيانات الحالية." },
        { head: " التسليم والتدريب", text: "نسلم نسخة مستقرة ونوفر تدريبًا ودعمًا للاعتماد السريع." },
      ],
    },
    en: {
      title: "Desktop Applications",
      lead: "We build robust desktop systems for internal operations and (systems) where speed, reliability, and full control are essential.",
      importance: "Desktop software is ideal for heavy internal workflows, giving teams stable performance and stronger operational control.",
      highlights: [
        "Practical interfaces for faster daily operations",
        "Role-based access and operational reporting",
        "Custom-designed for heavy workloads with seamless and reliable performance",
        "Reliable long-session performance and stability",
      ],
      steps: [
        { head: " Operational Assessment", text: "We analyze infrastructure, devices, and workload needs." },
        { head: " Workflow UI Design", text: "We design interfaces focused on speed and clarity." },
        { head: " Development & Data Integration", text: "We build with roles, reports, and data connections." },
        { head: " Delivery & Enablement", text: "We deliver, train your team, and support adoption." },
      ],
    },
  },
  "visual-identity": {
    ar: {
      title: "الهوية البصرية",
      lead: "نبني هوية بصرية متكاملة تعكس شخصية مشروعك وتوحد حضوره في كل نقاط التواصل.",
      importance: "الهوية البصرية تتجاوز كونها مجرد مظهر، فهي وسيلة أساسية لبناء الثقة وترسيخ حضور علامتك في ذهن العميل مع كل نقطة تواصل.",
      highlights: [
        "تصميم شعار ونظام ألوان وخطوط متسق",
        "لغة بصرية موحدة عبر المنصات الرقمية والمطبوعة",
        "تطبيقات عملية للهوية على المحتوى والعروض",
        "دليل استخدام واضح لضمان ثبات الهوية",
      ],
      steps: [
        { head: " تحليل البراند", text: "نحدد شخصية العلامة والجمهور ونبرة التواصل." },
        { head: " بناء النظام البصري", text: "نصمم عناصر الهوية الأساسية بشكل احترافي." },
        { head: " تطبيق الهوية", text: "نطبق الهوية على القنوات الأساسية لنشاطك." },
        { head: " التسليم النهائي", text: "نسلم دليلًا يضمن ثبات الهوية على المدى الطويل." },
      ],
    },
    en: {
      title: "Visual Identity",
      lead: "We create a complete visual identity that reflects your brand and keeps your presence consistent everywhere.",
      importance: "Visual identity is not just aesthetics. It builds trust and makes your brand memorable at every touchpoint.",
      highlights: [
        "Professional logo, color, and typography system",
        "Consistent visual language across channels",
        "Practical brand applications for real use cases",
        "Clear brand guidelines for long-term consistency",
      ],
      steps: [
        { head: " Brand Discovery", text: "We define brand personality, audience, and tone." },
        { head: " Visual System Design", text: "We craft your core identity components." },
        { head: " Brand Application", text: "We apply identity to key business touchpoints." },
        { head: " Final Delivery", text: "We deliver complete guidelines for consistency." },
      ],
    },
  },
  "office-services": {
    ar: {
      title: "خدمات مكتبية",
      lead: "نطور أدوات داخلية ذكية لتقليل العمل اليدوي، تنظيم العمليات، ورفع كفاءة فرق العمل.",
      importance: "الخدمات المكتبية الذكية تقلل الهدر والأخطاء، وتحوّل العمليات اليومية إلى مسارات أسرع وأكثر وضوحًا داخل المؤسسة.",
      highlights: [
        "لوحات إدارة داخلية حسب أقسام الشركة",
        "أتمتة الموافقات والتنبيهات وتحديث البيانات",
        "تقارير تشغيلية تساعد في اتخاذ القرار",
        "تقليل الاعتماد على العمل اليدوي المتكرر",
      ],
      steps: [
        { head: " تشخيص سير العمل", text: "نحدد نقاط البطء والهدر داخل العمليات الحالية." },
        { head: " تصميم النظام الداخلي", text: "نبني نموذجًا واضحًا للتشغيل اليومي." },
        { head: " تنفيذ الأتمتة", text: "نحول المهام المتكررة إلى عمليات تلقائية." },
        { head: " المتابعة والتحسين", text: "نراقب المؤشرات ونطور النظام تدريجيًا." },
      ],
    },
    en: {
      title: "Office Services",
      lead: "We build smart internal tools to reduce manual effort, streamline operations, and improve team efficiency.",
      importance: "Smart office services reduce waste and errors while turning daily operations into faster, more reliable workflows.",
      highlights: [
        "Department-focused internal dashboards",
        "Automation for approvals, alerts, and updates",
        "Operational reports for better decisions",
        "Less repetitive manual workload",
      ],
      steps: [
        { head: " Workflow Diagnosis", text: "We identify bottlenecks and inefficiencies." },
        { head: " Internal System Design", text: "We design clear operational workflows." },
        { head: " Automation Implementation", text: "We automate repetitive process steps." },
        { head: " Monitoring & Optimization", text: "We track KPIs and optimize iteratively." },
      ],
    },
  },
  "google-maps": {
    ar: {
      title: "خرائط Google",
      lead: "نحسن حضور نشاطك على خرائط Google لتسهيل وصول العملاء إليك وزيادة الثقة بخدماتك.",
      importance: "الظهور القوي على خرائط Google يرفع فرص اكتشاف نشاطك محليًا ويزيد عدد الاتصالات والزيارات الفعلية.",
      highlights: [
        "إعداد احترافي لملف Google Business",
        "تحسين الظهور المحلي بالكلمات والتصنيفات المناسبة",
        "إدارة التقييمات والمحتوى لرفع المصداقية",
        "متابعة الأداء وتحسين مستمر للنتائج",
      ],
      steps: [
        { head: " إعداد الملف التجاري", text: "نضبط كل بيانات النشاط بشكل دقيق وموثوق." },
        { head: " تحسين الظهور", text: "نحسن التصنيفات والمحتوى المحلي لرفع الوصول." },
        { head: " إدارة المحتوى والتقييمات", text: "نرفع الثقة عبر سياسة تقييمات ومحتوى دوري." },
        { head: " القياس والتحسين", text: "نراقب المؤشرات ونحسن الاستراتيجية باستمرار." },
      ],
    },
    en: {
      title: "Google Maps",
      lead: "We improve your visibility on Google Maps so customers can find and trust your business faster.",
      importance: "Strong Maps presence increases local discovery, inbound calls, and real visits from high-intent customers.",
      highlights: [
        "Professional Google Business Profile setup",
        "Local SEO optimization for categories and content",
        "Review and media strategy to build trust",
        "Performance tracking with continuous optimization",
      ],
      steps: [
        { head: "1) Profile Setup", text: "We configure complete and accurate business information." },
        { head: "2) Local Visibility Optimization", text: "We optimize categories, keywords, and local relevance." },
        { head: "3) Reviews & Content Management", text: "We strengthen trust with updates, photos, and review workflow." },
        { head: "4) Monitoring & Improvement", text: "We measure impact and optimize for better local outcomes." },
      ],
    },
  },
};

export function isServiceSlug(value: string): value is ServiceSlug {
  return serviceSlugs.includes(value as ServiceSlug);
}

export function getServiceDetail(slug: ServiceSlug, locale: Locale): ServiceDetail {
  return details[slug][locale];
}
