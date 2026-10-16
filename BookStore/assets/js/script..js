// Переключение главных слайдов
let currentHeroSlide = 0;
const heroSlider = document.getElementById('heroSlider');
const heroDots = document.querySelectorAll('.hero-slider .dot');

function goToHeroSlide(index) {
  currentHeroSlide = index;
  if (heroSlider) {
    heroSlider.style.transform = `translateX(-${currentHeroSlide * 50}%)`;
  }
  heroDots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
}

// Автопереключение слайдера
if (heroSlider) {
  setInterval(() => {
    currentHeroSlide = (currentHeroSlide + 1) % 2;
    goToHeroSlide(currentHeroSlide);
  }, 5000);
}

// Переключение изображений в детализации товара
function changeDetailImg(src) {
  const mainImg = document.getElementById('detailMainImg');
  if (mainImg) {
    mainImg.src = src;
  }
}

// Переключение вкладок Описание/Отзывы
function switchDetailTab(tabName) {
  const desc = document.getElementById('tabDesc');
  const reviews = document.getElementById('tabReviews');
  const buttons = document.querySelectorAll('.detail-tabs .tab-btn');

  if (tabName === 'desc') {
    desc.style.display = 'block';
    reviews.style.display = 'none';
    buttons[0].classList.add('active');
    buttons[1].classList.remove('active');
  } else {
    desc.style.display = 'none';
    reviews.style.display = 'block';
    buttons[0].classList.remove('active');
    buttons[1].classList.add('active');
  }
}

// Переключение Вход / Регистрация
function switchAuth(type) {
  const loginForm = document.getElementById('loginForm');
  const regForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginTabBtn');
  const regBtn = document.getElementById('regTabBtn');

  if (type === 'login') {
    loginForm.classList.add('active');
    regForm.classList.remove('active');
    loginBtn.classList.add('active');
    regBtn.classList.remove('active');
  } else {
    regForm.classList.add('active');
    loginForm.classList.remove('active');
    regBtn.classList.add('active');
    loginBtn.classList.remove('active');
  }
}

// Фильтр Галереи
function filterGallery(category) {
  const items = document.querySelectorAll('.gallery-item');
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  items.forEach(item => {
    if (category === 'all' || item.classList.contains('item-' + category)) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}