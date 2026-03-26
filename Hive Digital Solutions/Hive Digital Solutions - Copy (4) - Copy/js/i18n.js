(function () {
  "use strict";

  /* ═══════════════════════════════════════════════════════════
     Theme & Language (i18n) controller
     Persists to localStorage; runs before GSAP animations.
     ═══════════════════════════════════════════════════════════ */

  var LS_THEME = "hive-theme";
  var LS_LANG  = "hive-lang";
  var root = document.documentElement;

  /* ── Translation dictionary ─────────────────────────────── */

  var dict = {
    /* ─ Navigation ─ */
    "nav.home":     { en: "Home",     ar: "الرئيسية" },
    "nav.about":    { en: "About",    ar: "من نحن" },
    "nav.services": { en: "Services", ar: "خدماتنا" },
    "nav.workflow": { en: "Workflow", ar: "آلية العمل" },
    "nav.packages": { en: "Packages", ar: "الباقات" },
    "nav.contact":  { en: "Contact",  ar: "تواصل معنا" },

    /* ─ Hero ─ */
    "hero.eyebrow": {
      en: "Inspired by the hive",
      ar: "من رؤية خلية النحل"
    },
    "hero.title": {
      en: 'Your Partner in <span class="hero__headline--accent">Digital</span><br/><span class="hero__headline--accent">Software Solutions</span>',
      ar: 'شريكك في <span class="hero__headline--accent">الخدمات الرقمية</span><br/><span class="hero__headline--accent">والحلول البرمجية</span>'
    },
    "hero.sub": {
      en: "We build web, mobile, and custom software solutions that help businesses launch faster and scale with confidence.",
      ar: "نطوّر حلول ويب وموبايل وبرمجيات مخصصة تساعد الشركات على الانطلاق بسرعة والتوسع بثقة."
    },
    "hero.cta1": { en: "Get a Free Consultation", ar: "احصل على استشارة مجانية" },
    "hero.cta2": { en: "View Our Services",  ar: "تعرّف على خدماتنا" },
    "hero.statement": {
      en: "Like a hive, every module we ship connects into one clear system — collaboration at the core, technology built to scale with your business.",
      ar: "كخلية نحل، نربط كل جزء نقدّمه في منظومة واحدة واضحة — التعاون في الصميم، وتقنية تُهندَر لتنمو مع عملك."
    },

    /* ─ About ─ */
    "about.label": { en: "Who We Are", ar: "من نحن" },
    "about.title": {
      en: '<span class="text-accent">Who We Are</span>',
      ar: '<span class="text-accent">من نحن</span>'
    },
    "about.lead": {
      en: "We provide integrated digital solutions and services, enabling our clients to focus on growing their business while we handle the technical complexity efficiently.",
      ar: "شركة تقدم حلولا وخدمات رقمية متكاملة، نمكن عملاءنا من التركيز على تنمية أعمالهم بينما نتولى الجوانب التقنية والتعقيدات بكفاءة."
    },
    "about.who.title": { en: "Who We Are", ar: "من نحن" },
    "about.who.desc": {
      en: "Integrated digital services under one team, so you can focus on growth.",
      ar: "حلول رقمية متكاملة ضمن فريق واحد، لتتفرغ أنت لنمو عملك."
    },
    "about.concept.title": { en: "Concept", ar: "المفهوم" },
    "about.concept.desc": {
      en: "Hive-like workflow: organized roles, one system, consistent quality.",
      ar: "أسلوب خلية نحل: أدوار منظمة، نظام واحد، وجودة ثابتة."
    },
    "about.commitment.title": { en: "Commitment", ar: "التزامنا" },
    "about.commitment.desc": {
      en: "Clear communication, dependable delivery, and support after launch.",
      ar: "تواصل واضح، تسليم موثوق، ودعم مستمر بعد الإطلاق."
    },
    "about.why.title": {
      en: 'Why Choose <span class="text-accent">Hive</span>',
      ar: 'لماذا <span class="text-accent">تختارنا</span>'
    },
    "about.why.lead": {
      en: "We put quality first and bring multiple areas of expertise together in one place to deliver comprehensive solutions for different projects and businesses.",
      ar: "نضع الجودة في المقام الأول، ونجمع خبرات متعددة ضمن جهة واحدة تقدم حلولا شاملة لمختلف المشاريع والأعمال."
    },
    "about.why.1t": { en: "Quality First", ar: "الجودة أولاً" },
    "about.why.1d": { en: "We put quality at the center of every detail and delivery.", ar: "نضع الجودة في قلب كل تفصيل وكل مخرج نقدمه." },
    "about.why.2t": { en: "Unified Expertise", ar: "خبرات متكاملة" },
    "about.why.2d": { en: "Multiple specializations work together under one coordinated team.", ar: "تخصصات متعددة تعمل بتناغم ضمن فريق واحد متكامل." },
    "about.why.3t": { en: "Comprehensive Solutions", ar: "حلول شاملة" },
    "about.why.3d": { en: "We provide complete digital solutions for diverse business needs.", ar: "نقدم حلولاً رقمية متكاملة تناسب احتياجات المشاريع والأعمال المختلفة." },
    "about.why.4t": { en: "Reliable Delivery", ar: "تنفيذ موثوق" },
    "about.why.4d": { en: "Structured execution that keeps projects on track from start to finish.", ar: "تنفيذ منظم يضمن سير المشروع بثبات من البداية حتى التسليم." },
    "about.vision.title": {
      en: 'Vision &amp; <span class="text-accent">Values</span>',
      ar: 'الرؤية و<span class="text-accent">القيم</span>'
    },
    "about.val.1t": { en: "Innovation",    ar: "الابتكار" },
    "about.val.1d": { en: "Pushing boundaries with cutting-edge technology",     ar: "تجاوز الحدود بأحدث التقنيات" },
    "about.val.2t": { en: "Transparency",  ar: "الشفافية" },
    "about.val.2d": { en: "Open communication at every stage",                   ar: "تواصل مفتوح في كل مرحلة" },
    "about.val.3t": { en: "Excellence",    ar: "التميّز" },
    "about.val.3d": { en: "Uncompromising quality in every pixel",               ar: "جودة لا تقبل المساومة في كل بكسل" },
    "about.val.4t": { en: "Collaboration", ar: "التعاون" },
    "about.val.4d": { en: "Your vision, amplified by our expertise",             ar: "رؤيتك، معززة بخبرتنا" },

    /* ─ Services ─ */
    "svc.label": { en: "What We Do",     ar: "ماذا نقدم" },
    "svc.title": {
      en: 'Our <span class="text-accent">Services</span>',
      ar: '<span class="text-accent">خدماتنا</span>'
    },
    "svc.lead": {
      en: "Comprehensive digital solutions tailored to elevate your brand and streamline your operations.",
      ar: "حلول رقمية شاملة مصممة لرفع مستوى علامتك التجارية وتبسيط عملياتك."
    },
    "svc.s1.t": { en: "Web Apps",          ar: "تطبيقات الويب" },
    "svc.s1.d": { en: "Modern web applications built for performance, scalability, and seamless user experience.",
                  ar: "تطبيقات ويب حديثة مبنية للأداء والتوسع وتجربة مستخدم سلسة." },
    "svc.s1.m": { en: "We build tailored web platforms with secure architecture, intuitive dashboards, and integrations that fit your workflow.",
                  ar: "نبني منصات ويب مخصصة ببنية آمنة ولوحات تحكم واضحة وتكاملات تناسب سير عملك." },
    "svc.s2.t": { en: "Mobile Apps",       ar: "تطبيقات الموبايل" },
    "svc.s2.d": { en: "Native and cross-platform mobile solutions that put your business in your customers' pockets.",
                  ar: "حلول موبايل أصلية ومتعددة المنصات تضع عملك في جيوب عملائك." },
    "svc.s2.m": { en: "From idea to app store, we deliver mobile products with smooth UX, strong performance, and scalable backend connectivity.",
                  ar: "من الفكرة حتى النشر، نطور تطبيقات موبايل بتجربة سلسة وأداء قوي وربط مرن مع الأنظمة الخلفية." },
    "svc.s3.t": { en: "Desktop Apps",      ar: "تطبيقات سطح المكتب" },
    "svc.s3.d": { en: "Powerful desktop software tailored to your workflows \u2014 Windows, macOS, and Linux.",
                  ar: "برمجيات سطح مكتب قوية مصممة حسب سير عملك \u2014 ويندوز، ماك، ولينكس." },
    "svc.s3.m": { en: "We craft robust desktop tools for business operations, internal systems, and heavy workflows across all major operating systems.",
                  ar: "نطور أدوات سطح مكتب قوية لعمليات الأعمال والأنظمة الداخلية وسيناريوهات العمل المكثفة على مختلف الأنظمة." },
    "svc.s4.t": { en: "Visual Identity",   ar: "الهوية البصرية" },
    "svc.s4.d": { en: "Logos, color systems, typography, and brand guidelines that make you unforgettable.",
                  ar: "شعارات، أنظمة ألوان، خطوط، وإرشادات علامة تجارية تجعلك لا تُنسى." },
    "svc.s4.m": { en: "We design cohesive brand identities that align your message across logo, typography, colors, and digital touchpoints.",
                  ar: "نصمم هوية بصرية متكاملة توحّد رسالتك عبر الشعار والخطوط والألوان وجميع نقاط التفاعل الرقمية." },
    "svc.s5.t": { en: "Social Media",      ar: "وسائل التواصل" },
    "svc.s5.d": { en: "Strategic content creation, management, and advertising across all major platforms.",
                  ar: "إنشاء محتوى استراتيجي وإدارة وإعلانات عبر جميع المنصات الرئيسية." },
    "svc.s5.m": { en: "We manage your social presence with strategic content, audience growth plans, and targeted paid campaigns.",
                  ar: "ندير حضورك الرقمي عبر محتوى مدروس وخطط نمو للجمهور وحملات إعلانية موجّهة." },
    "svc.s6.t": { en: "Office Solutions",   ar: "حلول مكتبية" },
    "svc.s6.d": { en: "Productivity tools, internal systems, and automation that streamline your operations.",
                  ar: "أدوات إنتاجية، أنظمة داخلية، وأتمتة تُبسّط عملياتك." },
    "svc.s6.m": { en: "We automate repetitive tasks and build internal tools to improve productivity and reduce operational bottlenecks.",
                  ar: "نؤتمت المهام المتكررة ونبني أدوات داخلية تعزز الإنتاجية وتقلل اختناقات التشغيل." },
    "svc.s7.t": { en: "Google Maps",        ar: "خرائط جوجل" },
    "svc.s7.d": { en: "Custom map integrations, business listings, and location-based solutions.",
                  ar: "تكامل خرائط مخصص، قوائم أعمال، وحلول مبنية على الموقع الجغرافي." },
    "svc.s7.m": { en: "We optimize location visibility through map integrations, business profile setup, and customer navigation experience.",
                  ar: "نحسّن ظهور موقعك عبر تكامل الخرائط وإعداد الملف التجاري وتجربة تنقل العملاء." },
    "svc.more": { en: "Learn More", ar: "المزيد" },

    /* ─ Work Steps ─ */
    "work.title": {
      en: 'How It <span class="text-accent">Works</span>',
      ar: 'كيف <span class="text-accent">نعمل</span>'
    },
    "work.s1.t": { en: "Online Operations", ar: "عمل أونلاين متكامل" },
    "work.s1.d": {
      en: "We manage your digital operations fully online with clear communication and smooth workflows from kickoff to delivery.",
      ar: "ندير أعمالك الرقمية بالكامل أونلاين مع تواصل واضح وتدفق عمل سلس من البداية حتى التسليم."
    },
    "work.s2.t": { en: "Electronic Payments", ar: "دفع إلكتروني" },
    "work.s2.d": {
      en: "We integrate secure payment gateways and modern billing flows to help your business accept online payments reliably.",
      ar: "نوفر تكامل بوابات دفع آمنة وحلول فواتير حديثة لتستقبل المدفوعات الإلكترونية بثقة."
    },
    "work.s3.t": { en: "On-Ground Delivery", ar: "تنفيذ على أرض الواقع" },
    "work.s3.d": {
      en: "When needed, we work directly on-site to align implementation with your real operations and team requirements.",
      ar: "عند الحاجة نعمل ميدانيًا داخل بيئة عملك لضمان توافق التنفيذ مع الواقع التشغيلي ومتطلبات الفريق."
    },
    "work.s4.t": { en: "Ongoing Support", ar: "خدمات دائمة ودعم فني" },
    "work.s4.d": {
      en: "Long-term service plans, continuous improvements, and responsive technical support keep your systems stable and evolving.",
      ar: "خطط خدمة مستمرة، تحسينات متواصلة، ودعم فني سريع تحافظ على استقرار أنظمتك وتطورها."
    },

    /* ─ Packages ─ */
    "pkg.title": {
      en: 'Choose Your <span class="text-accent">Package</span>',
      ar: 'اختر <span class="text-accent">باقتك</span>'
    },
    "pkg.badge": { en: "Most Popular",    ar: "الأكثر طلباً" },
    "pkg.cta":   { en: "Get Started",     ar: "ابدأ الآن" },
    "pkg.cta3":  { en: "Contact Sales",   ar: "تواصل مع المبيعات" },

    "pkg.p1.name": { en: "Basic Presence",     ar: "الحضور الأساسي" },
    "pkg.p1.desc": { en: "Everything you need to launch your digital footprint.",
                     ar: "كل ما تحتاجه لإطلاق بصمتك الرقمية." },
    "pkg.p1.f1": { en: "Custom Landing Page",           ar: "صفحة هبوط مخصصة" },
    "pkg.p1.f2": { en: "Mobile-Responsive Design",      ar: "تصميم متجاوب للموبايل" },
    "pkg.p1.f3": { en: "Basic SEO Setup",                ar: "إعداد SEO أساسي" },
    "pkg.p1.f4": { en: "Social Media Kit (2 platforms)", ar: "مجموعة وسائل تواصل (منصتين)" },
    "pkg.p1.f5": { en: "Google Maps Listing",            ar: "إدراج خرائط جوجل" },
    "pkg.p1.f6": { en: "1 Month Support",                ar: "دعم لمدة شهر" },

    "pkg.p2.name": { en: "Business Growth",    ar: "نمو الأعمال" },
    "pkg.p2.desc": { en: "Scale your brand with a full digital strategy.",
                     ar: "وسّع علامتك التجارية باستراتيجية رقمية كاملة." },
    "pkg.p2.f1": { en: "Multi-Page Web Application",         ar: "تطبيق ويب متعدد الصفحات" },
    "pkg.p2.f2": { en: "Visual Identity Package",            ar: "حزمة الهوية البصرية" },
    "pkg.p2.f3": { en: "Social Media Management (4 platforms)", ar: "إدارة وسائل التواصل (4 منصات)" },
    "pkg.p2.f4": { en: "Google Maps Integration",            ar: "تكامل خرائط جوجل" },
    "pkg.p2.f5": { en: "Analytics Dashboard",                ar: "لوحة تحليلات" },
    "pkg.p2.f6": { en: "3 Months Priority Support",          ar: "دعم مميز لمدة 3 أشهر" },

    "pkg.p3.name": { en: "Enterprise Solution", ar: "حل المؤسسات" },
    "pkg.p3.desc": { en: "A complete digital ecosystem for maximum impact.",
                     ar: "منظومة رقمية متكاملة لأقصى تأثير." },
    "pkg.p3.f1": { en: "Full Web + Mobile Apps",         ar: "تطبيقات ويب + موبايل كاملة" },
    "pkg.p3.f2": { en: "Complete Brand System",          ar: "نظام علامة تجارية متكامل" },
    "pkg.p3.f3": { en: "Social Media + Ad Campaigns",    ar: "وسائل تواصل + حملات إعلانية" },
    "pkg.p3.f4": { en: "Office Automation Suite",         ar: "مجموعة أتمتة مكتبية" },
    "pkg.p3.f5": { en: "Dedicated Project Manager",      ar: "مدير مشروع مخصص" },
    "pkg.p3.f6": { en: "12 Months Premium Support",      ar: "دعم مميز لمدة 12 شهراً" },

    /* ─ Contact ─ */
    "ctc.title": {
      en: 'Contact <span class="text-accent">Us</span>',
      ar: 'تواصل <span class="text-accent">معنا</span>'
    },
    "ctc.cta.hint": {
      en: "We reply within 24 hours.",
      ar: "نرد على رسائلك خلال 24 ساعة."
    },
    "ctc.name":    { en: "Full Name",       ar: "الاسم الكامل" },
    "ctc.email":   { en: "Email Address",   ar: "البريد الإلكتروني" },
    "ctc.msg":     { en: "Your Message",    ar: "رسالتك" },
    "ctc.send":    { en: "Get Started",     ar: "ابدأ الآن" },
    "ctc.links":   { en: "View Our Links",  ar: "عرض روابطنا" },
    "ctc.name.ph": { en: "John Doe",       ar: "أحمد محمد" },
    "ctc.email.ph":{ en: "john@example.com", ar: "ahmad@example.com" },
    "ctc.msg.ph":  { en: "Tell us about your project...", ar: "أخبرنا عن مشروعك..." },
    "ctc.reach": {
      en: "Connect with our team at either location below.",
      ar: "تواصل مع فريقنا من أحد المكتبين أدناه."
    },
    "ctc.loc.1n": { en: "Aleppo, Syria",          ar: "حلب، سوريا" },
    "ctc.loc.1d": { en: "Main Development Hub",   ar: "مركز التطوير الرئيسي" },
    "ctc.loc.2n": { en: "Saudi Arabia",            ar: "المملكة العربية السعودية" },
    "ctc.loc.2d": { en: "Regional Business Office", ar: "المكتب التجاري الإقليمي" },
    "ctc.form.sending": { en: "Sending…", ar: "جاري الإرسال…" },
    "ctc.form.ok": {
      en: "Sent successfully — we\u2019ll reply soon.",
      ar: "تم الإرسال بنجاح — الرد سيكون سريعًا."
    },
    "ctc.form.mailto_ok": {
      en: "Message prepared successfully. You will receive a reply within less than 24 hours.",
      ar: "تم إرسال رسالتك بنجاح، سيصلك رد خلال أقل من 24 ساعة."
    },
    "ctc.form.err": {
      en: "Something went wrong. Please try again or email us directly.",
      ar: "تعذّر الإرسال. حاول مرة أخرى أو راسلنا مباشرة على البريد."
    },
    "ctc.form.validate": {
      en: "Please fill in all fields.",
      ar: "يرجى تعبئة جميع الحقول."
    },
    "ctc.form.emailbad": {
      en: "Please enter a valid email address.",
      ar: "يرجى إدخال بريد إلكتروني صحيح."
    },

    /* ─ Links page ─ */
    "links.title": {
      en: 'Hive <span class="text-accent">Links</span>',
      ar: '<span class="text-accent">روابط</span> Hive'
    },
    "links.lead": {
      en: "All official pages in one place.",
      ar: "كل صفحاتنا الرسمية في مكان واحد."
    },
    "links.back": { en: "← Back to Home", ar: "← العودة للرئيسية" },

    /* ─ Service detail pages (footer & UI) ─ */
    "serviceDetail.back": {
      en: "Back to services",
      ar: "رجوع للخدمات"
    },
    "serviceDetail.footer.tagline": {
      en: "Integrated digital solutions — from idea to launch and beyond.",
      ar: "حلول رقمية متكاملة من الفكرة حتى التشغيل."
    },

    /* ─ Footer ─ */
    "footer.tagline": { en: "Building digital ecosystems that scale.",
                        ar: "نبني أنظمة رقمية قابلة للتوسع." },
    "footer.about": {
      en: "Hive Digital Solutions designs and builds web, mobile, and automation experiences that help brands grow with clarity and long-term support.",
      ar: "هايف لحلول الرقمية تصمّم وتبني تجارب ويب وموبايل وأتمتة تدعم نمو علامتك بوضوح ودعم مستمر على المدى الطويل."
    },
    "footer.quick": { en: "Quick links", ar: "روابط سريعة" },
    "footer.services_title": { en: "Our services", ar: "خدماتنا" },
    "footer.connect": { en: "Contact", ar: "تواصل" },
    "footer.links_page": { en: "All links", ar: "كل الروابط" },
    "footer.contact_form": { en: "Contact form", ar: "نموذج التواصل" },
    "footer.email_gmail": { en: "Gmail", ar: "جيميل" },
    "footer.facebook_label": { en: "Facebook", ar: "فيسبوك" },
    "footer.instagram_label": { en: "Instagram", ar: "إنستغرام" },
    "footer.linkedin_label": { en: "LinkedIn", ar: "لينكد إن" },
    "footer.tiktok_label": { en: "TikTok", ar: "تيك توك" },
    "footer.official_site": { en: "Official website", ar: "الموقع الرسمي" },
    "footer.whatsapp_label": { en: "WhatsApp", ar: "واتساب" },
    "footer.copy":    { en: "\u00A9 2026 Hive Digital Solutions. All rights reserved.",
                        ar: "\u00A9 2026 Hive Digital Solutions. جميع الحقوق محفوظة." }
  };

  try { window.__hiveDict = dict; } catch (e) {}

  /* ── Apply language to DOM ──────────────────────────────── */

  function applyLang(lang) {
    root.setAttribute("lang", lang);
    root.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      if (dict[key] && dict[key][lang]) {
        els[i].innerHTML = dict[key][lang];
      }
    }

    var phs = document.querySelectorAll("[data-i18n-ph]");
    for (var j = 0; j < phs.length; j++) {
      var phKey = phs[j].getAttribute("data-i18n-ph");
      if (dict[phKey] && dict[phKey][lang]) {
        phs[j].setAttribute("placeholder", dict[phKey][lang]);
      }
    }

    var label = document.getElementById("lang-label");
    if (label) label.textContent = lang === "ar" ? "EN" : "AR";

    // Notify UI components (like sliders) to reinitialize safely on dir change.
    try {
      window.dispatchEvent(new CustomEvent("hive:lang-change", {
        detail: { lang: lang, dir: lang === "ar" ? "rtl" : "ltr" }
      }));
    } catch (e) {}

    try { localStorage.setItem(LS_LANG, lang); } catch (e) {}
  }

  /* ── Apply theme ────────────────────────────────────────── */

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      window.dispatchEvent(new CustomEvent("hive:theme-change", { detail: { theme: theme } }));
    } catch (e) {}
    try { localStorage.setItem(LS_THEME, theme); } catch (e) {}
  }

  /* ── Detect saved or default preferences ────────────────── */

  var savedTheme, savedLang;
  try {
    savedTheme = localStorage.getItem(LS_THEME);
    savedLang  = localStorage.getItem(LS_LANG);
  } catch (e) {}

  var currentTheme = savedTheme || "dark";
  var currentLang  = savedLang  || "en";

  applyTheme(currentTheme);
  applyLang(currentLang);

  /* ── Button event listeners ─────────────────────────────── */

  var themeBtn = document.getElementById("theme-toggle");
  var langBtn  = document.getElementById("lang-toggle");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      currentTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(currentTheme);
    });
  }

  if (langBtn) {
    langBtn.addEventListener("click", function () {
      currentLang = currentLang === "en" ? "ar" : "en";
      applyLang(currentLang);
    });
  }

  function t(key) {
    if (!dict[key]) return "";
    var row = dict[key];
    return row[currentLang] || row.en || "";
  }

  /* Expose for other scripts that may need current state */
  window.__hiveI18n = {
    getLang:  function () { return currentLang; },
    getTheme: function () { return currentTheme; },
    t: t
  };
})();
