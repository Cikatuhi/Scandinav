const benefits = [
  { icon: "⌁", title: "Фиксированная смета", text: "Без неожиданных доплат в процессе строительства." },
  { icon: "⌂", title: "Собственная команда", text: "Контролируем строительство на каждом этапе." },
  { icon: "✓", title: "Гарантия на работы", text: "Отвечаем за качество выполненных работ." }
];

const projects = [
  { name: "Дом «Север»", size: 142, floors: 2, bedrooms: 4, terrace: true, price: "от 8 900 000 ₽", label: "Хит продаж", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=82", alt: "Современный деревянный дом «Север»" },
  { name: "Дом «Сосновый»", size: 96, floors: 1, bedrooms: 3, terrace: true, price: "от 6 400 000 ₽", label: "Для семьи", image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=900&q=82", alt: "Одноэтажный дом «Сосновый»" },
  { name: "Дом «Озёрный»", size: 118, floors: 1, bedrooms: 3, terrace: true, price: "от 7 350 000 ₽", label: "С террасой", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=900&q=82", alt: "Дом «Озёрный» с террасой" },
  { name: "Дом «Терра»", size: 184, floors: 2, bedrooms: 5, terrace: true, price: "от 11 800 000 ₽", label: "Премиум", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=82", alt: "Большой двухэтажный дом «Терра»" },
  { name: "Дом «Берег»", size: 78, floors: 1, bedrooms: 2, terrace: false, price: "от 5 850 000 ₽", label: "Компактный", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=900&q=82", alt: "Компактный дом «Берег»" }
];

const filters = [
  { id: "all", label: "Все" },
  { id: "under100", label: "До 100 м²" },
  { id: "100to150", label: "100–150 м²" },
  { id: "one", label: "1 этаж" },
  { id: "two", label: "2 этажа" },
  { id: "terrace", label: "С террасой" }
];

const steps = [
  ["Заявка и консультация", "Знакомимся, отвечаем на вопросы и фиксируем задачу."],
  ["Подбор проекта", "Предлагаем готовые решения или создаём проект с нуля."],
  ["Расчёт сметы", "Считаем стоимость по составу работ и материалам."],
  ["Подписание договора", "Закрепляем сроки, этапы и финальную стоимость."],
  ["Строительство", "Ведём работы своей командой и показываем прогресс."],
  ["Передача дома", "Проверяем результат вместе и передаём ключи." ]
];

function renderBenefits() {
  const list = document.querySelector("#benefit-list");
  if (!list) return;
  list.innerHTML = benefits.map(({ icon, title, text }) => `
    <article class="benefit">
      <span class="benefit-icon" aria-hidden="true">${icon}</span>
      <div><h3>${title}</h3><p>${text}</p></div>
    </article>
  `).join("");
}

function renderFilters(active = "all") {
  const list = document.querySelector("#project-filters");
  if (!list) return;
  list.innerHTML = filters.map(({ id, label }) => `
    <button class="filter" type="button" role="tab" aria-selected="${id === active}" data-filter="${id}">${label}</button>
  `).join("");
  list.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      renderFilters(button.dataset.filter);
      renderProjects(button.dataset.filter);
    });
  });
}

function matchesFilter(project, filter) {
  return filter === "all" ||
    (filter === "under100" && project.size < 100) ||
    (filter === "100to150" && project.size >= 100 && project.size <= 150) ||
    (filter === "one" && project.floors === 1) ||
    (filter === "two" && project.floors === 2) ||
    (filter === "terrace" && project.terrace);
}

function renderProjects(filter = "all") {
  const grid = document.querySelector("#project-grid");
  const empty = document.querySelector("#projects-empty");
  if (!grid || !empty) return;
  const visibleProjects = projects.filter((project) => matchesFilter(project, filter));
  empty.hidden = visibleProjects.length > 0;
  grid.innerHTML = visibleProjects.map((project) => `
    <article class="project-card">
      <div class="project-photo"><img src="${project.image}" alt="${project.alt}" loading="lazy"><span class="project-label">${project.label}</span></div>
      <div class="project-body">
        <h3>${project.name}</h3>
        <p class="project-specs">${project.size} м² <span aria-hidden="true">·</span> ${project.floors} ${project.floors === 1 ? "этаж" : "этажа"} <span aria-hidden="true">·</span> ${project.bedrooms} спальни</p>
        <div class="project-footer"><strong class="project-price">${project.price}</strong><a class="project-link" href="#lead-form">Посмотреть <span aria-hidden="true">↗</span></a></div>
      </div>
    </article>
  `).join("");
}

function renderSteps() {
  const list = document.querySelector("#process-list");
  if (!list) return;
  list.innerHTML = steps.map(([title, text], index) => `
    <li class="timeline-item"><span class="timeline-number">${String(index + 1).padStart(2, "0")}</span><div class="timeline-copy"><h3>${title}</h3><p>${text}</p></div></li>
  `).join("");
}

function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;
  const close = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Открыть меню");
    menu.hidden = true;
  };
  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
    menu.hidden = isOpen;
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(); });
}

function setupForm() {
  const form = document.querySelector("#lead-form-element");
  if (!form) return;
  const button = form.querySelector(".form-submit");
  const success = form.querySelector(".form-success");
  const name = form.querySelector("#name");
  const phone = form.querySelector("#phone");
  const clearError = (input) => {
    const field = input.closest(".field");
    field.classList.remove("has-error");
    field.querySelector(".field-error").textContent = "";
  };
  [name, phone].forEach((input) => input.addEventListener("input", () => clearError(input)));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;
    [[name, "Введите имя"], [phone, "Введите номер телефона"]].forEach(([input, message]) => {
      clearError(input);
      if (!input.value.trim() || (input === phone && input.value.replace(/\D/g, "").length < 10)) {
        const field = input.closest(".field");
        field.classList.add("has-error");
        field.querySelector(".field-error").textContent = message;
        valid = false;
      }
    });
    if (!valid) return;
    button.disabled = true;
    button.classList.add("is-loading");
    button.querySelector(".submit-label").textContent = "Отправляем заявку";
    window.setTimeout(() => {
      button.disabled = false;
      button.classList.remove("is-loading");
      button.querySelector(".submit-label").textContent = "Заявка отправлена";
      success.hidden = false;
      form.reset();
    }, 850);
  });
}

function setupYear() {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();
}

renderBenefits();
renderFilters();
renderProjects();
renderSteps();
setupMenu();
setupForm();
setupYear();
