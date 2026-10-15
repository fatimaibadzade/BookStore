document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("galleryProducts");
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const sortSelect = document.getElementById("sortSelect");
  const resultsCount = document.getElementById("resultsCount");
  const emptyState = document.getElementById("emptyState");

  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const initialCategory = params.get("category");

  if (
    initialCategory &&
    [...categoryFilter.options].some((option) => option.value === initialCategory)
  ) {
    categoryFilter.value = initialCategory;
  }

  function renderProducts() {
    const search = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const sort = sortSelect.value;

    let filtered = PRODUCTS.filter((book) => {
      const matchesSearch =
        book.title.toLowerCase().includes(search) ||
        book.author.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" || book.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    container.innerHTML = filtered.map(createProductCard).join("");
    resultsCount.textContent = `${filtered.length} book(s) found`;
    emptyState.hidden = filtered.length !== 0;
  }

  searchInput.addEventListener("input", renderProducts);
  categoryFilter.addEventListener("change", renderProducts);
  sortSelect.addEventListener("change", renderProducts);

  renderProducts();
});