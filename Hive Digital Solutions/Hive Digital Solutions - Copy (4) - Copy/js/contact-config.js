/**
 * نموذج التواصل يُرسل عبر mailto: (يفتح تطبيق البريد عند المستخدم).
 * غيّر البريد أدناه إلى بريد الشركة.
 */
(function () {
  window.__hiveContact = {
    mailtoRecipient: "contact.hivedigitalsolutions@gmail.com"
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  var r = window.__hiveContact && window.__hiveContact.mailtoRecipient;
  if (!r) return;
  document.querySelectorAll("a.footer__mailto-link[href^='mailto:']").forEach(function (el) {
    el.setAttribute("href", "mailto:" + r);
  });
});
