/* =============================================================
   Faizan Asif — Portfolio
   main.js — all site interactivity lives here
   ============================================================= */

/* ---------- 1. Dark / light theme toggle ---------- */
(function themeToggle() {
  const root = document.documentElement;
  const stored = localStorage.getItem("fa-theme");
  if (stored) root.setAttribute("data-theme", stored);

  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("fa-theme", next);
  });
})();

/* ---------- 2. Hamburger navigation for small screens ---------- */
(function hamburgerNav() {
  const toggle = document.querySelector("[data-nav-toggle]");
  const links = document.querySelector("[data-nav-links]");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.classList.toggle("open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close menu after a link is chosen (mobile)
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();

/* ---------- 3. Typing / rotating role text on the hero ---------- */
(function typingEffect() {
  const el = document.querySelector("[data-typing]");
  if (!el) return;

  const roles = JSON.parse(el.getAttribute("data-typing"));
  let roleIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];
    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
})();

/* ---------- 4. Project filter (Projects page) ---------- */
(function projectFilter() {
  const buttons = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  if (!buttons.length || !cards.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");

      cards.forEach((card) => {
        const match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("hidden", !match);
      });
    });
  });
})();

/* ---------- 5. Project detail modal ---------- */
(function projectModal() {
  const overlay = document.querySelector("[data-modal]");
  if (!overlay) return;

  const titleEl = overlay.querySelector("[data-modal-title]");
  const tagEl = overlay.querySelector("[data-modal-tag]");
  const bodyEl = overlay.querySelector("[data-modal-body]");
  const linkEl = overlay.querySelector("[data-modal-link]");
  const closeEls = overlay.querySelectorAll("[data-modal-close]");

  function open(card) {
    titleEl.textContent = card.getAttribute("data-title");
    tagEl.textContent = card.getAttribute("data-category");
    bodyEl.textContent = card.getAttribute("data-detail");
    const link = card.getAttribute("data-link");
    if (link) {
      linkEl.href = link;
      linkEl.style.display = "inline-flex";
    } else {
      linkEl.style.display = "none";
    }
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-open-modal]").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      open(trigger.closest("[data-category]"));
    });
  });

  closeEls.forEach((el) => el.addEventListener("click", close));
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
})();

/* ---------- 6. Skills accordion ---------- */
(function accordion() {
  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  items.forEach((item) => {
    const trigger = item.querySelector(".accordion-trigger");
    const panel = item.querySelector(".accordion-panel");
    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      items.forEach((other) => {
        other.classList.remove("open");
        other.querySelector(".accordion-panel").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });
})();

/* ---------- 7. Animated skill bars on scroll into view ---------- */
(function skillBars() {
  const bars = document.querySelectorAll("[data-skill-fill]");
  if (!bars.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;
          target.style.width = target.getAttribute("data-skill-fill") + "%";
          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.4 }
  );

  bars.forEach((bar) => observer.observe(bar));
})();

/* ---------- 8. Contact form validation ---------- */
(function contactForm() {
  const form = document.querySelector("[data-contact-form]");
  if (!form) return;

  const status = form.querySelector("[data-form-status]");

  const rules = {
    name: (v) => v.trim().length >= 2 || "Please enter your full name.",
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || "Enter a valid email address.",
    message: (v) => v.trim().length >= 10 || "Message should be at least 10 characters.",
  };

  function validateField(field) {
    const rule = rules[field.name];
    if (!rule) return true;
    const result = rule(field.value);
    const wrapper = field.closest(".field");
    const errorEl = wrapper.querySelector(".field-error");

    if (result === true) {
      wrapper.classList.remove("invalid");
      return true;
    }
    wrapper.classList.add("invalid");
    if (errorEl) errorEl.textContent = result;
    return false;
  }

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.closest(".field").classList.contains("invalid")) validateField(field);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fields = form.querySelectorAll("input, textarea");
    let allValid = true;
    fields.forEach((field) => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      status.textContent = "Please fix the highlighted fields before sending.";
      status.classList.add("show");
      return;
    }

    status.textContent = "Thanks — your message details are ready. Since this is a static site, connect a form service (e.g. Formspree) to actually deliver it.";
    status.classList.add("show");
    form.reset();
  });
})();

/* ---------- 9. Footer year ---------- */
(function footerYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
