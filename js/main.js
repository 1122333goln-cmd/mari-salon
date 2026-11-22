// Константы для быстрой настройки контактов владельцем
const PHONE_NUMBER = "+74720000000";
const PHONE_DISPLAY = "+7 (472) 000-00-00";
const TELEGRAM_USERNAME = "mari_salon_strelec";
const WHATSAPP_NUMBER = "74720000000";
const VK_URL = "https://vk.com/mari_salon_strelec";

const categories = {
  women: [
    {
      name: "Женская стрижка",
      description: "Консультация, мытьё, стрижка и укладка",
      duration: "60–90 мин",
      price: "от 1 800 ₽",
    },
    {
      name: "Укладка",
      description: "Сушка феном или укладка утюжком по форме",
      duration: "45–60 мин",
      price: "от 1 200 ₽",
    },
    {
      name: "Причёска",
      description: "Дневная или праздничная причёска",
      duration: "60–90 мин",
      price: "от 2 000 ₽",
    },
  ],
  men: [
    {
      name: "Мужская стрижка",
      description: "Стрижка машинкой и ножницами с укладкой",
      duration: "45 мин",
      price: "от 1 200 ₽",
    },
    {
      name: "Стрижка бороды",
      description: "Коррекция формы, контур и уход",
      duration: "30 мин",
      price: "от 700 ₽",
    },
    {
      name: "Комплекс «Стрижка + борода»",
      description: "Полный уход и стилизация образа",
      duration: "75 мин",
      price: "от 1 700 ₽",
    },
  ],
  kids: [
    {
      name: "Стрижка до 7 лет",
      description: "Мягкая адаптация и стрижка в комфортном темпе",
      duration: "40 мин",
      price: "от 900 ₽",
    },
    {
      name: "Стрижка от 7 до 12 лет",
      description: "Стильная стрижка с учётом пожеланий ребёнка",
      duration: "45 мин",
      price: "от 1 100 ₽",
    },
  ],
  color: [
    {
      name: "Окрашивание корней",
      description: "Диагностика, стойкий краситель и уход",
      duration: "120–150 мин",
      price: "от 3 000 ₽",
    },
    {
      name: "Сложное окрашивание",
      description: "Блонд, Airtouch, балаяж или мелирование",
      duration: "180–240 мин",
      price: "от 4 500 ₽",
    },
    {
      name: "Тонирование",
      description: "Обновление оттенка и мягкое сияние",
      duration: "90–120 мин",
      price: "от 2 500 ₽",
    },
  ],
};

const generalBookingText =
  "Здравствуйте! Хочу записаться в салон «Мари» на Калмыкова, 19. Подскажите свободные окошки?";

function telegramUrl(text = generalBookingText) {
  return `https://t.me/${TELEGRAM_USERNAME}?text=${encodeURIComponent(text)}`;
}

function whatsappUrl(text = generalBookingText) {
  return `https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
}

function setupMessengerLinks() {
  document.querySelectorAll("[data-telegram-link]").forEach((link) => {
    link.href = telegramUrl(link.dataset.telegramMessage || generalBookingText);
  });

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    link.href = whatsappUrl(link.dataset.whatsappMessage || generalBookingText);
  });

  document.querySelectorAll("[data-vk-link]").forEach((link) => {
    link.href = VK_URL;
  });

  document.querySelectorAll("[data-phone-link]").forEach((link) => {
    link.href = `tel:${PHONE_NUMBER}`;
  });

  document.querySelectorAll("[data-phone-display]").forEach((element) => {
    element.textContent = PHONE_DISPLAY;
  });
}

function renderCategory(categoryName) {
  const serviceList = document.querySelector("#service-list");
  if (!serviceList) return;

  serviceList.replaceChildren(
    ...categories[categoryName].map((service) => {
      const row = document.createElement("article");
      row.className = "service-row";

      const main = document.createElement("div");
      const title = document.createElement("h3");
      title.textContent = service.name;
      const description = document.createElement("p");
      description.textContent = service.description;
      main.append(title, description);

      const duration = document.createElement("span");
      duration.className = "service-duration";
      duration.textContent = service.duration;

      const priceWrap = document.createElement("div");
      priceWrap.className = "service-price";
      const price = document.createElement("span");
      price.textContent = service.price;
      const booking = document.createElement("a");
      booking.href = telegramUrl(
        `Здравствуйте! Хочу записаться на «${service.name}» в салон «Мари».`,
      );
      booking.target = "_blank";
      booking.rel = "noreferrer";
      booking.textContent = "Узнать окошко";
      priceWrap.append(price, booking);

      row.append(main, duration, priceWrap);
      return row;
    }),
  );
}

function setupTabs() {
  const tabs = [...document.querySelectorAll("[data-category]")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.setAttribute("aria-selected", "false"));
      tab.setAttribute("aria-selected", "true");
      renderCategory(tab.dataset.category);
    });
  });
  renderCategory("women");
}

function setupMasterLinks() {
  document.querySelectorAll("[data-master-link]").forEach((link) => {
    const masterName = link.dataset.masterLink;
    link.href = telegramUrl(
      `Здравствуйте! Хочу записаться к мастеру ${masterName} в салон «Мари».`,
    );
  });
}

function setupMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#mobile-menu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    menu.hidden = true;
    document.body.classList.remove("menu-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    menu.hidden = isOpen;
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) closeMenu();
  });
}

function setupCompare() {
  document.querySelectorAll("[data-compare]").forEach((compare) => {
    const range = compare.querySelector(".compare-range");
    if (!range) return;
    const update = () => compare.style.setProperty("--split", `${range.value}%`);
    range.addEventListener("input", update);
    update();
  });
}

function setupHeader() {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

document.addEventListener("DOMContentLoaded", () => {
  setupMessengerLinks();
  setupTabs();
  setupMasterLinks();
  setupMobileMenu();
  setupCompare();
  setupHeader();

  document.querySelectorAll("[data-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
});
