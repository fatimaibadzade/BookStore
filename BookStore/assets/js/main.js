function getCart() {
  try {
    return JSON.parse(localStorage.getItem("booknestCart")) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem("booknestCart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const count = getCart().reduce((total, item) => total + item.quantity, 0);

  document.querySelectorAll("#cartCount").forEach((element) => {
    element.textContent = count;
  });
}

function addToCart(productId) {
  const id = Number(productId);
  const book = PRODUCTS.find((product) => product.id === id);

  if (!book) return;

  const cart = getCart();
  const existing = cart.find((item) => item.id === id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, quantity: 1 });
  }

  saveCart(cart);
  showToast(`${book.title} added to basket!`);
}

function showToast(message) {
  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

document.addEventListener("click", (event) => {
  const cartButton = event.target.closest("[data-add]");

  if (cartButton) {
    addToCart(cartButton.dataset.add);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("nav-open");
    });
  }

  const featuredProducts = document.getElementById("featuredProducts");

  if (featuredProducts && typeof PRODUCTS !== "undefined") {
    featuredProducts.innerHTML = PRODUCTS.slice(0, 4)
      .map(createProductCard)
      .join("");
  }

  const newsletterForm = document.getElementById("newsletterForm");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const email = document.getElementById("newsletterEmail");

      if (!email.checkValidity()) {
        email.reportValidity();
        return;
      }

      showToast("Thanks for subscribing!");
      newsletterForm.reset();
    });
  }
});
