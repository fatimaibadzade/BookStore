 document.addEventListener("DOMContentLoaded", () => {
  const detailContainer = document.getElementById("productDetail");
  const relatedContainer = document.getElementById("relatedProducts");

  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const book = PRODUCTS.find((product) => product.id === id);

  if (!book) {
    detailContainer.innerHTML = `
      <div class="not-found">
        <h1>Book not found</h1>
        <p>Choose a book from our collection.</p>
        <a href="gallery.html" class="btn btn-primary">Browse Books</a>
      </div>
    `;
    return;
  }

  document.title = `${book.title} | BookNest`;

  detailContainer.innerHTML = `
    <div class="detail-image">
      <img
        src="${book.cover}"
        alt="${book.title} book cover"
        onerror="this.onerror=null;this.src='https://placehold.co/400x560/f1e8dc/40352c?text=Book+Cover';"
      >
    </div>
    <div class="detail-info">
      <p class="eyebrow">${book.category}</p>
      <h1>${book.title}</h1>
      <p class="detail-author">Written by ${book.author}</p>
      <p class="detail-price">$${book.price.toFixed(2)}</p>
      <p class="detail-description">${book.description}</p>
      <div class="detail-meta">
        <p><strong>Category:</strong> ${book.category}</p>
        <p><strong>Availability:</strong> In stock (demo)</p>
      </div>
      <button class="btn btn-primary" data-add="${book.id}" type="button">
        Add to Basket
      </button>
      <a class="btn btn-outline" href="gallery.html">Continue Shopping</a>
    </div>
  `;

  if (relatedContainer) {
    const related = PRODUCTS
      .filter((product) => product.id !== book.id)
      .sort((a, b) =>
        Number(b.category === book.category) -
        Number(a.category === book.category)
      )
      .slice(0, 4);

    relatedContainer.innerHTML = related.map(createProductCard).join("");
  }
});