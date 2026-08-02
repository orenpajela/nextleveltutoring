// NextLevel Tutoring — interactive behaviors
// Mobile navigation, subject tabs, FAQ accordion, and contact form.

document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupTabs();
  setupFaq();
  setupContactForm();
});

/* Mobile navigation ------------------------------------------------------- */
function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("#primary-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close the menu after tapping a link.
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* Subject tabs ------------------------------------------------------------ */
function setupTabs() {
  const tablist = document.querySelector('[role="tablist"]');
  if (!tablist) return;

  const tabs = Array.from(tablist.querySelectorAll('[role="tab"]'));

  const selectTab = (tab) => {
    tabs.forEach((t) => {
      const selected = t === tab;
      t.setAttribute("aria-selected", String(selected));
      t.tabIndex = selected ? 0 : -1;
      document.getElementById(t.getAttribute("aria-controls")).hidden = !selected;
    });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));

    // Left/right arrow keys move between tabs.
    tab.addEventListener("keydown", (event) => {
      let next;
      if (event.key === "ArrowRight") next = tabs[(index + 1) % tabs.length];
      if (event.key === "ArrowLeft") next = tabs[(index - 1 + tabs.length) % tabs.length];
      if (next) {
        event.preventDefault();
        selectTab(next);
        next.focus();
      }
    });
  });
}

/* FAQ accordion ----------------------------------------------------------- */
function setupFaq() {
  const questions = document.querySelectorAll(".faq-item__question");

  questions.forEach((question) => {
    const answer = question.nextElementSibling;

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.style.maxHeight = isOpen ? "0px" : answer.scrollHeight + "px";
    });
  });

  // Keep any open answer sized correctly when the layout reflows.
  window.addEventListener("resize", () => {
    questions.forEach((question) => {
      if (question.getAttribute("aria-expanded") === "true") {
        const answer = question.nextElementSibling;
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* Contact form ------------------------------------------------------------ */
// No backend is wired up yet, so we confirm receipt in the UI and reset.
// Swap this for a real endpoint (e.g. Formspree, or a fetch() to your API)
// when submissions need to be delivered.
function setupContactForm() {
  const form = document.querySelector(".contact-form");
  const success = document.querySelector(".contact-form__success");
  if (!form || !success) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    form.hidden = true;
    success.hidden = false;
  });
}
