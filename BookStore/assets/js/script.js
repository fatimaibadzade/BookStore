let currentHeroSlide = 0;
const heroSlider = document.getElementById("heroSlider");
const heroDots = document.querySelectorAll(".hero-slider .dot");

function goToHeroSlide(index) {
  currentHeroSlide = index;
  if (heroSlider) {
    heroSlider.style.transform = `translateX(-${currentHeroSlide * 50}%)`;
  }
  heroDots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentHeroSlide);
  });
}

if (heroSlider) {
  setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % 2;
    goToHeroSlide(currentHeroSlide);
  }, 5000);
}

const catBtn = document.getElementById("catBtn");
const catMenu = document.getElementById("catMenu");
if (catBtn && catMenu) {
  catBtn.addEventListener("click", () => {
    catMenu.classList.toggle("open");
  });
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });
}

document.querySelectorAll(".tab-pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-pill").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));
    btn.classList.add("active");
    const panel = document.getElementById(`tab-${btn.dataset.tab}`);
    if (panel) panel.classList.add("active");
  });
});

function changeDetailImg(src) {
  const mainImg = document.getElementById("detailMainImg");
  if (mainImg) mainImg.src = src;
}

function switchDetailTab(tabName) {
  const desc = document.getElementById("tabDesc");
  const reviews = document.getElementById("tabReviews");
  const buttons = document.querySelectorAll(".detail-tabs .tab-btn");
  if (!desc || !reviews) return;

  const showDesc = tabName === "desc";
  desc.style.display = showDesc ? "block" : "none";
  reviews.style.display = showDesc ? "none" : "block";
  if (buttons[0] && buttons[1]) {
    buttons[0].classList.toggle("active", showDesc);
    buttons[1].classList.toggle("active", !showDesc);
  }
}

function switchAuth(type) {
  const loginForm = document.getElementById("loginForm");
  const regForm = document.getElementById("registerForm");
  const loginBtn = document.getElementById("loginTabBtn");
  const regBtn = document.getElementById("regTabBtn");
  if (!loginForm || !regForm) return;

  const isLogin = type === "login";
  loginForm.classList.toggle("active", isLogin);
  regForm.classList.toggle("active", !isLogin);
  if (loginBtn && regBtn) {
    loginBtn.classList.toggle("active", isLogin);
    regBtn.classList.toggle("active", !isLogin);
  }
}

function filterGallery(category, button) {
  const items = document.querySelectorAll(".gallery-item");
  const buttons = document.querySelectorAll(".filter-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));
  if (button) button.classList.add("active");

  items.forEach((item) => {
    item.style.display =
      category === "all" || item.classList.contains("item-" + category) ? "block" : "none";
  });
}
