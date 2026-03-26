(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var burger = document.getElementById("menu-toggle");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("sidebar-overlay");
  var sidebarLinks = sidebar ? sidebar.querySelectorAll(".sidebar__link") : [];
  var sidebarLangBtn = document.getElementById("sidebar-lang-toggle");
  var SERVICE_DETAIL_I18N = {
    "web-apps.html": {
      ar: {
        pageTitle: "تطبيقات الويب",
        flowLabel: "مراحل الخدمة",
        title: "تطبيقات الويب",
        lead: "نطوّر منصات ويب متكاملة تساعدك تدير العمليات، تتابع العملاء، وتوسع مشروعك بسرعة. التركيز يكون على الأداء، الأمان، وسهولة الاستخدام.",
        steps: [
          { head: "1) تحليل المتطلبات", text: "نحدد أهداف المشروع، أنواع المستخدمين، وسيناريوهات الاستخدام الأساسية لنضع خارطة واضحة قبل التطوير." },
          { head: "2) تصميم UX/UI احترافي", text: "نصمم واجهات مريحة وسريعة الفهم مع مسارات استخدام واضحة، بما ينعكس مباشرة على تجربة العميل." },
          { head: "3) تطوير وتكامل", text: "نبني الواجهة الأمامية والخلفية ونربط قواعد البيانات وواجهات API وأنظمة الدفع أو أي تكامل تحتاجه." },
          { head: "4) اختبار وإطلاق ودعم", text: "ننفذ اختبارات شاملة ثم نطلق المشروع بشكل آمن مع متابعة ما بعد الإطلاق لضمان الاستقرار والتحسين المستمر." }
        ]
      },
      en: {
        pageTitle: "Web Applications",
        flowLabel: "Service Process",
        title: "Web Applications",
        lead: "We build end-to-end web platforms that help you run operations, manage customers, and scale faster with strong performance, security, and usability.",
        steps: [
          { head: "1) Requirement Analysis", text: "We define project goals, user types, and key usage scenarios to create a clear roadmap before development starts." },
          { head: "2) Professional UX/UI Design", text: "We craft intuitive interfaces and clear user flows that directly improve the customer experience." },
          { head: "3) Development & Integration", text: "We build frontend and backend layers, then integrate databases, APIs, payment systems, and any required third-party services." },
          { head: "4) Testing, Launch & Support", text: "We run full testing, launch safely, and continue post-launch support to ensure stability and ongoing improvements." }
        ]
      }
    },
    "mobile-apps.html": {
      ar: {
        pageTitle: "تطبيقات الموبايل",
        flowLabel: "مراحل الخدمة",
        title: "تطبيقات الموبايل",
        lead: "نطوّر تطبيقات iOS وAndroid تجمع بين سرعة الأداء وسلاسة الواجهة، وتدعم النمو المستقبلي لمشروعك.",
        steps: [
          { head: "1) دراسة الفكرة والسوق", text: "نحدد القيمة التي سيقدمها التطبيق، الفئة المستهدفة، ونبني خطة Features واضحة للإصدار الأول." },
          { head: "2) تصميم تجربة المستخدم", text: "نصمم تدفقات سهلة وتفاعلات دقيقة تناسب استخدام الموبايل مع واجهة تعكس هوية البراند." },
          { head: "3) تطوير وربط الخدمات", text: "نطوّر التطبيق ونربطه بالخادم، الإشعارات، الدفع، وتسجيل الدخول مع مراعاة الأمان والاستقرار." },
          { head: "4) نشر ومتابعة التحسين", text: "نجهز التطبيق للمتاجر، نتابع الأداء، وننفذ تحسينات متدرجة بناء على سلوك المستخدمين." }
        ]
      },
      en: {
        pageTitle: "Mobile Applications",
        flowLabel: "Service Process",
        title: "Mobile Applications",
        lead: "We build iOS and Android apps that combine smooth UX with high performance, ready to support your business growth.",
        steps: [
          { head: "1) Idea & Market Discovery", text: "We define the product value, target audience, and a clear feature plan for the first release." },
          { head: "2) Mobile UX Design", text: "We design simple flows and precise interactions optimized for mobile behavior and brand identity." },
          { head: "3) Development & Service Integration", text: "We develop the app and connect backend services, notifications, payments, and authentication with security in mind." },
          { head: "4) Publish & Optimize", text: "We prepare for app store release, track performance, and iterate improvements based on real user behavior." }
        ]
      }
    },
    "desktop-apps.html": {
      ar: {
        pageTitle: "تطبيقات سطح المكتب",
        flowLabel: "مراحل الخدمة",
        title: "تطبيقات سطح المكتب",
        lead: "نطوّر أنظمة Desktop قوية لإدارة العمليات الداخلية، مناسبة للأعمال التي تحتاج سرعة، استقرار، وتحكم كامل بالبيانات.",
        steps: [
          { head: "1) جمع متطلبات التشغيل", text: "نفهم بيئة العمل الحالية، الأجهزة المستخدمة، وحجم البيانات لتحديد أفضل بنية للنظام." },
          { head: "2) تصميم واجهات عملية", text: "نقدم واجهات واضحة وسريعة للموظفين لرفع الإنتاجية وتقليل الوقت الضائع في المهام المتكررة." },
          { head: "3) تطوير وربط قواعد البيانات", text: "نبني النظام مع صلاحيات مستخدمين وتقارير وربط مباشر مع قواعد البيانات أو الأنظمة القائمة." },
          { head: "4) تسليم وتدريب الفريق", text: "نسلم نسخة مستقرة مع تدريب عملي ودعم تقني يضمن اعتماد النظام بسهولة داخل الشركة." }
        ]
      },
      en: {
        pageTitle: "Desktop Applications",
        flowLabel: "Service Process",
        title: "Desktop Applications",
        lead: "We build robust desktop systems for internal operations where speed, reliability, and full data control are critical.",
        steps: [
          { head: "1) Operational Requirements", text: "We assess your current environment, devices, and data volume to define the right system architecture." },
          { head: "2) Practical UI Design", text: "We design clear and efficient interfaces that increase staff productivity and reduce repetitive effort." },
          { head: "3) Development & Data Integration", text: "We build the system with user roles, reporting, and direct integration with databases or existing platforms." },
          { head: "4) Delivery & Team Training", text: "We deliver a stable release with hands-on training and technical support for smooth internal adoption." }
        ]
      }
    },
    "visual-identity.html": {
      ar: {
        pageTitle: "الهوية البصرية",
        flowLabel: "مراحل الخدمة",
        title: "الهوية البصرية",
        lead: "نبني هوية بصرية متكاملة تعكس شخصية مشروعك وتوحّد حضوره على كل نقاط التواصل الرقمية والمطبوعة.",
        steps: [
          { head: "1) تحليل البراند", text: "نحدد شخصية العلامة، الجمهور المستهدف، ونبرة التواصل التي يجب أن تظهر في التصميم." },
          { head: "2) بناء النظام البصري", text: "نصمم الشعار، الألوان، الخطوط، والأسلوب العام بحيث يكون متسق وسهل التمييز." },
          { head: "3) تصميم التطبيقات", text: "نجهز تطبيقات الهوية على السوشال، الموقع، العروض، البطاقات، والمطبوعات الأساسية." },
          { head: "4) دليل الهوية النهائي", text: "نسلم Brand Guidelines واضح يضمن تطبيق الهوية بنفس الجودة على المدى الطويل." }
        ]
      },
      en: {
        pageTitle: "Visual Identity",
        flowLabel: "Service Process",
        title: "Visual Identity",
        lead: "We create a complete visual identity that reflects your brand personality and unifies your presence across digital and print touchpoints.",
        steps: [
          { head: "1) Brand Analysis", text: "We define your brand character, target audience, and communication tone to guide design decisions." },
          { head: "2) Visual System Creation", text: "We design logo, colors, typography, and visual style to make your brand consistent and memorable." },
          { head: "3) Asset Applications", text: "We prepare identity assets for social media, website, presentations, cards, and core print materials." },
          { head: "4) Final Brand Guidelines", text: "We deliver clear brand guidelines to ensure long-term consistency across all brand applications." }
        ]
      }
    },
    "social-media.html": {
      ar: {
        pageTitle: "إدارة السوشال ميديا",
        flowLabel: "مراحل الخدمة",
        title: "إدارة السوشال ميديا",
        lead: "نحوّل حساباتك من وجود عادي إلى قناة نمو حقيقية عبر خطة محتوى، إدارة احترافية، وحملات ممولة دقيقة.",
        steps: [
          { head: "1) استراتيجية المحتوى", text: "نحدد الرسائل الأساسية، هوية النشر، ونبني خطة شهرية متوافقة مع أهداف النشاط." },
          { head: "2) إنتاج المحتوى", text: "تصميم بوستات، كتابة كابتشن، أفكار فيديو، وجدولة المحتوى بشكل منظم وجذاب." },
          { head: "3) إدارة الإعلانات", text: "ننشىء حملات ممولة موجهة بدقة لزيادة التفاعل، الزيارات، والتحويلات الفعلية." },
          { head: "4) قياس وتحسين", text: "نقدم تقارير دورية ونعدل الخطة حسب النتائج لتحقيق أفضل عائد ممكن على الإنفاق." }
        ]
      },
      en: {
        pageTitle: "Social Media Management",
        flowLabel: "Service Process",
        title: "Social Media Management",
        lead: "We turn your social accounts into real growth channels through content strategy, professional management, and targeted paid campaigns.",
        steps: [
          { head: "1) Content Strategy", text: "We define your core messages, publishing identity, and monthly content plan aligned with business goals." },
          { head: "2) Content Production", text: "We design posts, write captions, generate video ideas, and schedule content in a consistent way." },
          { head: "3) Ads Management", text: "We build targeted ad campaigns focused on engagement, traffic, and measurable conversions." },
          { head: "4) Measure & Improve", text: "We deliver regular reports and optimize the plan continuously to maximize return on spend." }
        ]
      }
    },
    "office-solutions.html": {
      ar: {
        pageTitle: "الحلول المكتبية",
        flowLabel: "مراحل الخدمة",
        title: "الحلول المكتبية",
        lead: "نطوّر أدوات داخلية ذكية لتقليل العمل اليدوي، تنظيم العمليات، ورفع كفاءة فرق العمل يومًا بعد يوم.",
        steps: [
          { head: "1) تشخيص سير العمل", text: "ندرس دورة العمل الحالية ونحدد نقاط الهدر والتأخير التي يمكن تحسينها بالأتمتة." },
          { head: "2) تصميم النظام الداخلي", text: "نصمم لوحات إدارة، نماذج إدخال، وتقارير مخصصة لاحتياجات كل قسم داخل المؤسسة." },
          { head: "3) أتمتة المهام", text: "ننفذ عمليات تلقائية للتنبيهات، الموافقات، وتحديث البيانات لتقليل الأخطاء وتسريع التنفيذ." },
          { head: "4) تقارير وتطوير مستمر", text: "نربط مؤشرات الأداء ونقدم تحسينات مستمرة لضمان تطور النظام مع نمو شركتك." }
        ]
      },
      en: {
        pageTitle: "Office Solutions",
        flowLabel: "Service Process",
        title: "Office Solutions",
        lead: "We develop smart internal tools to reduce manual work, streamline operations, and improve team efficiency day after day.",
        steps: [
          { head: "1) Workflow Assessment", text: "We analyze your current workflow and identify delays and inefficiencies that automation can solve." },
          { head: "2) Internal System Design", text: "We design dashboards, input forms, and custom reports for each department's operational needs." },
          { head: "3) Task Automation", text: "We automate alerts, approvals, and data updates to reduce errors and speed up execution." },
          { head: "4) Reporting & Continuous Improvement", text: "We connect performance indicators and deliver continuous optimization as your business grows." }
        ]
      }
    },
    "google-maps.html": {
      ar: {
        pageTitle: "خرائط Google",
        flowLabel: "مراحل الخدمة",
        title: "خرائط Google",
        lead: "نحسن حضور نشاطك على خرائط Google لتسهيل وصول العملاء إليك وزيادة ثقة السوق بخدماتك.",
        steps: [
          { head: "1) إعداد الملف التجاري", text: "ننشىء أو نضبط Google Business Profile بشكل احترافي مع كل البيانات الضرورية." },
          { head: "2) تحسين الظهور المحلي", text: "نضبط التصنيفات، الكلمات المحلية، ومحتوى الملف لزيادة ظهورك في نتائج البحث القريبة." },
          { head: "3) إدارة التقييمات والمحتوى", text: "نضع سياسة للتقييمات وننشر تحديثات وصور تساعد على رفع المصداقية وزيادة التفاعل." },
          { head: "4) متابعة النتائج", text: "نراقب المكالمات، الزيارات، وطلبات الاتجاهات ثم نحسن الاستراتيجية بشكل مستمر." }
        ]
      },
      en: {
        pageTitle: "Google Maps",
        flowLabel: "Service Process",
        title: "Google Maps",
        lead: "We strengthen your visibility on Google Maps so customers can find you faster and trust your business more.",
        steps: [
          { head: "1) Business Profile Setup", text: "We create or optimize your Google Business Profile with complete and professional information." },
          { head: "2) Local Visibility Optimization", text: "We refine categories, local keywords, and profile content to improve nearby search visibility." },
          { head: "3) Reviews & Content Management", text: "We establish a review strategy and publish updates and images that increase trust and engagement." },
          { head: "4) Performance Monitoring", text: "We track calls, visits, and direction requests, then continuously optimize your local strategy." }
        ]
      }
    }
  };

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("header--scrolled", window.scrollY > 10);
  }

  function closeSidebar() {
    if (!sidebar || !overlay || !burger) return;
    sidebar.classList.remove("sidebar--open");
    overlay.classList.remove("sidebar-overlay--open");
    sidebar.setAttribute("aria-hidden", "true");
    overlay.setAttribute("aria-hidden", "true");
    burger.classList.remove("header__burger--open");
    burger.setAttribute("aria-expanded", "false");
  }

  function openSidebar() {
    if (!sidebar || !overlay || !burger) return;
    sidebar.classList.add("sidebar--open");
    overlay.classList.add("sidebar-overlay--open");
    sidebar.setAttribute("aria-hidden", "false");
    overlay.setAttribute("aria-hidden", "false");
    burger.classList.add("header__burger--open");
    burger.setAttribute("aria-expanded", "true");
  }

  function syncSidebarLangLabel() {
    if (!sidebarLangBtn) return;
    var txt = sidebarLangBtn.querySelector(".sidebar__lang-text");
    var currentLang = document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
    if (txt) txt.textContent = currentLang === "ar" ? "EN" : "AR";
  }

  function getCurrentLang() {
    try {
      if (window.__hiveI18n && typeof window.__hiveI18n.getLang === "function") {
        return window.__hiveI18n.getLang() === "ar" ? "ar" : "en";
      }
    } catch (e) {}
    return document.documentElement.getAttribute("lang") === "ar" ? "ar" : "en";
  }

  function applyServiceDetailI18n() {
    var fileName = (window.location.pathname.split("/").pop() || "").toLowerCase();
    var pagePack = SERVICE_DETAIL_I18N[fileName];
    if (!pagePack) return;

    var lang = getCurrentLang();
    var textPack = pagePack[lang] || pagePack.ar;
    if (!textPack) return;

    var titleEl = document.querySelector(".service-detail__title");
    var leadEl = document.querySelector(".service-detail__lead");
    var flowEl = document.querySelector(".service-flow");
    var stepHeadEls = document.querySelectorAll(".service-step__head");
    var stepTextEls = document.querySelectorAll(".service-step__text");

    if (titleEl) titleEl.textContent = textPack.title;
    if (leadEl) leadEl.textContent = textPack.lead;
    if (flowEl && textPack.flowLabel) flowEl.setAttribute("aria-label", textPack.flowLabel);

    for (var i = 0; i < textPack.steps.length; i++) {
      if (stepHeadEls[i]) stepHeadEls[i].textContent = textPack.steps[i].head;
      if (stepTextEls[i]) stepTextEls[i].textContent = textPack.steps[i].text;
    }

    if (textPack.pageTitle) document.title = textPack.pageTitle + " | Hive";
  }

  if (burger && sidebar && overlay) {
    closeSidebar();
    burger.addEventListener("click", function () {
      if (sidebar.classList.contains("sidebar--open")) closeSidebar();
      else openSidebar();
    });
    overlay.addEventListener("click", closeSidebar);
    window.addEventListener("keydown", function (e) {
      if (e && e.key === "Escape") closeSidebar();
    });
    [].slice.call(sidebarLinks).forEach(function (link) {
      link.addEventListener("click", closeSidebar);
    });
  }

  if (sidebarLangBtn) {
    syncSidebarLangLabel();
    sidebarLangBtn.addEventListener("click", function () {
      var langToggle = document.getElementById("lang-toggle");
      if (langToggle) langToggle.click();
      closeSidebar();
    });
  }

  window.addEventListener("hive:lang-change", function () {
    syncSidebarLangLabel();
    closeSidebar();
    applyServiceDetailI18n();
  });

  updateHeader();
  applyServiceDetailI18n();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
