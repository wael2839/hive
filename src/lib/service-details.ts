import type { Locale } from "@/lib/i18n";

export const serviceSlugs = [
  "web-apps",
  "mobile-apps",
  "desktop-apps",
  "visual-identity",
  "social-media",
  "office-services",
  "google-maps",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

type ServiceDetail = {
  title: string;
  lead: string;
  importance: string;
  highlights: string[];
  flowLabel: string;
  steps: { head: string; text: string }[];
};

const details: Record<ServiceSlug, Record<Locale, ServiceDetail>> = {
  "web-apps": {
    ar: {
      title: "تطبيقات الويب",
      lead: "نطور منصات ويب متكاملة تساعدك تدير العمليات، تتابع العملاء، وتوسع مشروعك بسرعة.",
      importance: "تطبيق الويب يختصر وقت العمليات اليومية، يربط فرق العمل ببيانات موحدة، ويمنحك مرونة عالية للتوسع بدون إعادة بناء النظام من الصفر.",
      highlights: [
        "تصميم متجاوب يعمل بسلاسة على الجوال والتابلت وسطح المكتب",
        "بنية تقنية آمنة وقابلة للتوسع مع نمو عدد المستخدمين",
        "لوحات تحكم واضحة وتدفقات استخدام مختصرة لرفع الإنتاجية",
        "تكامل مع API وأنظمة الدفع والخدمات الخارجية حسب الحاجة",
      ],
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) تحليل المتطلبات", text: "نحدد الأهداف وسيناريوهات الاستخدام ونحوّلها إلى خارطة تنفيذ واضحة." },
        { head: "2) تصميم UX/UI", text: "نصمم تجربة استخدام سهلة تعكس هوية علامتك وتدعم التحويل." },
        { head: "3) التطوير والتكامل", text: "نبني الواجهة والخلفية ونربط الأنظمة بأداء مستقر." },
        { head: "4) الاختبار والتسليم", text: "نختبر بدقة ثم نطلق النسخة النهائية مع متابعة ما بعد الإطلاق." },
      ],
    },
    en: {
      title: "Web Applications",
      lead: "We build end-to-end web platforms that help you run operations, manage customers, and scale faster.",
      importance: "A web application streamlines daily operations, centralizes team workflows, and gives your business room to scale without rebuilding from scratch.",
      highlights: [
        "Responsive UX across mobile, tablet, and desktop",
        "Secure and scalable architecture for business growth",
        "Clear dashboards and efficient user flows",
        "Integrations with APIs, payments, and third-party systems",
      ],
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Requirement Analysis", text: "We define goals and user scenarios, then shape a clear implementation roadmap." },
        { head: "2) UX/UI Design", text: "We design intuitive experiences aligned with your brand and conversion goals." },
        { head: "3) Development & Integration", text: "We build frontend/backend and connect your required systems reliably." },
        { head: "4) Testing & Delivery", text: "We run end-to-end QA, launch safely, and support after go-live." },
      ],
    },
  },
  "mobile-apps": {
    ar: {
      title: "تطبيقات الموبايل",
      lead: "نطور تطبيقات iOS وAndroid تجمع بين سرعة الأداء وسلاسة الواجهة، وتدعم النمو المستقبلي لمشروعك.",
      importance: "تطبيق الجوال يقربك من عميلك بشكل يومي ويزيد التفاعل والولاء، لأنه يضع خدماتك في متناول المستخدم في أي وقت.",
      highlights: [
        "تصميم متجاوب وتجربة استخدام مهيأة لسلوك مستخدمي الجوال",
        "تطوير iOS وAndroid بجودة عالية واستقرار ممتاز",
        "ربط الإشعارات، الدفع، وتسجيل الدخول بشكل آمن",
        "بنية قابلة للتوسع مع تحديثات مستقبلية بدون تعقيد",
      ],
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) دراسة الفكرة والسوق", text: "نحدد القيمة والفئة المستهدفة ونرتب أولويات الإصدار الأول." },
        { head: "2) تصميم التجربة", text: "نبني تدفقات تفاعلية بسيطة وسريعة تحقق راحة الاستخدام." },
        { head: "3) التطوير والربط", text: "نطور التطبيق ونربطه بالخدمات الخلفية والأنظمة المطلوبة." },
        { head: "4) الإطلاق والتحسين", text: "نجهز للنشر، نراقب الأداء، ونحسّن بناءً على بيانات الاستخدام." },
      ],
    },
    en: {
      title: "Mobile Applications",
      lead: "We build iOS and Android apps with smooth UX, strong performance, and future-ready architecture.",
      importance: "A mobile app keeps your brand close to users every day, increases engagement, and unlocks stronger retention through direct access.",
      highlights: [
        "Mobile-first UX optimized for real user behavior",
        "High-quality iOS and Android implementation",
        "Secure integrations for notifications, payments, and auth",
        "Scalable codebase ready for future releases",
      ],
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Idea & Market Discovery", text: "We define value, audience, and release priorities." },
        { head: "2) UX Planning & Design", text: "We craft simple and fast flows that users can adopt quickly." },
        { head: "3) Build & Integrate", text: "We develop the app and connect required backend services." },
        { head: "4) Launch & Optimize", text: "We publish, monitor performance, and improve iteratively." },
      ],
    },
  },
  "desktop-apps": {
    ar: {
      title: "تطبيقات سطح المكتب",
      lead: "نطور أنظمة Desktop قوية لإدارة العمليات الداخلية بسرعة واستقرار وتحكم كامل بالبيانات.",
      importance: "تطبيقات سطح المكتب مناسبة للعمليات الثقيلة داخل الشركات، وتمنحك سرعة عالية واعتمادية أكبر في بيئات العمل الداخلية.",
      highlights: [
        "واجهات عملية واضحة تقلل الوقت الضائع في المهام المتكررة",
        "صلاحيات مستخدمين وتقارير دقيقة لإدارة العمل الداخلي",
        "ربط مباشر مع قواعد البيانات والأنظمة الحالية",
        "استقرار عال في التشغيل اليومي الطويل",
      ],
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) فهم بيئة التشغيل", text: "نحلل الأجهزة وبيئة العمل ومتطلبات الأداء الفعلية." },
        { head: "2) تصميم واجهات تشغيلية", text: "نصمم واجهات تركز على السرعة والوضوح للفِرق الداخلية." },
        { head: "3) التطوير وربط البيانات", text: "نبني النظام بصلاحيات وتقارير وربط مع البيانات الحالية." },
        { head: "4) التسليم والتدريب", text: "نسلم نسخة مستقرة ونوفر تدريبًا ودعمًا للاعتماد السريع." },
      ],
    },
    en: {
      title: "Desktop Applications",
      lead: "We build robust desktop systems for internal operations where speed, reliability, and full control are essential.",
      importance: "Desktop software is ideal for heavy internal workflows, giving teams stable performance and stronger operational control.",
      highlights: [
        "Practical interfaces for faster daily operations",
        "Role-based access and operational reporting",
        "Direct integration with existing databases/systems",
        "Reliable long-session performance and stability",
      ],
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Operational Assessment", text: "We analyze infrastructure, devices, and workload needs." },
        { head: "2) Workflow UI Design", text: "We design interfaces focused on speed and clarity." },
        { head: "3) Development & Data Integration", text: "We build with roles, reports, and data connections." },
        { head: "4) Delivery & Enablement", text: "We deliver, train your team, and support adoption." },
      ],
    },
  },
  "visual-identity": {
    ar: {
      title: "الهوية البصرية",
      lead: "نبني هوية بصرية متكاملة تعكس شخصية مشروعك وتوحد حضوره في كل نقاط التواصل.",
      importance: "الهوية البصرية ليست شكلًا فقط، بل أداة لبناء الثقة وتثبيت صورتك في ذهن العميل عند كل تفاعل مع علامتك.",
      highlights: [
        "تصميم شعار ونظام ألوان وخطوط متسق",
        "لغة بصرية موحدة عبر المنصات الرقمية والمطبوعة",
        "تطبيقات عملية للهوية على المحتوى والعروض",
        "دليل استخدام واضح لضمان ثبات الهوية",
      ],
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) تحليل البراند", text: "نحدد شخصية العلامة والجمهور ونبرة التواصل." },
        { head: "2) بناء النظام البصري", text: "نصمم عناصر الهوية الأساسية بشكل احترافي." },
        { head: "3) تطبيق الهوية", text: "نطبق الهوية على القنوات الأساسية لنشاطك." },
        { head: "4) التسليم النهائي", text: "نسلم دليلًا يضمن ثبات الهوية على المدى الطويل." },
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
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Brand Discovery", text: "We define brand personality, audience, and tone." },
        { head: "2) Visual System Design", text: "We craft your core identity components." },
        { head: "3) Brand Application", text: "We apply identity to key business touchpoints." },
        { head: "4) Final Delivery", text: "We deliver complete guidelines for consistency." },
      ],
    },
  },
  "social-media": {
    ar: {
      title: "إدارة السوشال ميديا",
      lead: "نحوّل حساباتك إلى قناة نمو فعلية عبر خطة محتوى، إدارة احترافية، وحملات موجهة.",
      importance: "إدارة السوشال ميديا بشكل احترافي ترفع الوعي بعلامتك وتولد فرص مبيعات حقيقية بدل مجرد نشر عشوائي.",
      highlights: [
        "خطة محتوى شهرية مرتبطة بأهداف العمل",
        "تصاميم وكتابة محتوى متسق مع هوية البراند",
        "إعلانات ممولة موجهة لتحقيق نتائج قابلة للقياس",
        "تقارير دورية وتحسين مستمر للأداء",
      ],
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) استراتيجية المحتوى", text: "نحدد الرسائل والفئات المستهدفة وخطة النشر." },
        { head: "2) الإنتاج والتنفيذ", text: "نجهز المحتوى وننشره بجودة وتناسق." },
        { head: "3) إدارة الحملات", text: "نشغل إعلانات موجهة لرفع التفاعل والتحويل." },
        { head: "4) القياس والتحسين", text: "نحلل النتائج ونحدث الخطة باستمرار." },
      ],
    },
    en: {
      title: "Social Media Management",
      lead: "We turn your social channels into measurable growth engines through strategy, execution, and performance marketing.",
      importance: "Professional social management increases brand awareness and creates real acquisition opportunities instead of random posting.",
      highlights: [
        "Goal-driven monthly content strategy",
        "Consistent creative and brand messaging",
        "Targeted paid campaigns with measurable outcomes",
        "Regular reporting and continuous optimization",
      ],
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Strategy Setup", text: "We define audience, messaging, and channel priorities." },
        { head: "2) Content Production", text: "We produce and publish consistent, quality content." },
        { head: "3) Paid Campaign Execution", text: "We run targeted ads for engagement and conversion." },
        { head: "4) Analytics & Improvement", text: "We track results and optimize continuously." },
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
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) تشخيص سير العمل", text: "نحدد نقاط البطء والهدر داخل العمليات الحالية." },
        { head: "2) تصميم النظام الداخلي", text: "نبني نموذجًا واضحًا للتشغيل اليومي." },
        { head: "3) تنفيذ الأتمتة", text: "نحول المهام المتكررة إلى عمليات تلقائية." },
        { head: "4) المتابعة والتحسين", text: "نراقب المؤشرات ونطور النظام تدريجيًا." },
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
      flowLabel: "How we create the difference from analysis to delivery",
      steps: [
        { head: "1) Workflow Diagnosis", text: "We identify bottlenecks and inefficiencies." },
        { head: "2) Internal System Design", text: "We design clear operational workflows." },
        { head: "3) Automation Implementation", text: "We automate repetitive process steps." },
        { head: "4) Monitoring & Optimization", text: "We track KPIs and optimize iteratively." },
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
      flowLabel: "كيف نصنع الفارق من التحليل حتى التسليم",
      steps: [
        { head: "1) إعداد الملف التجاري", text: "نضبط كل بيانات النشاط بشكل دقيق وموثوق." },
        { head: "2) تحسين الظهور", text: "نحسن التصنيفات والمحتوى المحلي لرفع الوصول." },
        { head: "3) إدارة المحتوى والتقييمات", text: "نرفع الثقة عبر سياسة تقييمات ومحتوى دوري." },
        { head: "4) القياس والتحسين", text: "نراقب المؤشرات ونحسن الاستراتيجية باستمرار." },
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
      flowLabel: "How we create the difference from analysis to delivery",
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
