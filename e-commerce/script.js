let activeCategory = "all";
let maxPrice = 100000;

function renderProducts() {
  const productContainer = document.getElementById("product-list");
  if (!productContainer) return;

  console.log("Rendering products...", products);

  const searchText = document.getElementById("search-bar")?.value.toLowerCase() || "";
  const sortOption = document.getElementById("sort-filter")?.value || "default";

  let filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchText);
    const matchesPrice = p.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sorting
  if (sortOption === "low-high") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === "high-low") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  // Render cards
  productContainer.innerHTML = filteredProducts.length
    ? filteredProducts.map(p => `
      <div class="col-md-3 mb-4">
        <div class="card shadow-sm">
          <img src="${p.image}" class="card-img-top" alt="${p.name}" onclick="showProductDetails(${p.id})">
          <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">₹${p.price}</p>
            <div class="d-flex justify-content-between">
              <button class="btn btn-primary btn-sm" onclick="addToCart(${p.id})">Add</button>
              <button class="btn btn-outline-danger btn-sm" onclick="addToWishlist(${p.id})">❤️</button>
            </div>
          </div>
        </div>
      </div>
    `).join("")
    : `<p class="text-center">No products found.</p>`;
}

// Category Handling
function showCategory(category) {
  activeCategory = category;
  const titleEl = document.getElementById("product-section-title");
  if (titleEl) titleEl.innerText = category === "all" ? "All Products" : category + " Products";
  renderProducts();
}

// Price Filter
function updatePriceFilter(value) {
  maxPrice = value;
  const priceValueEl = document.getElementById("price-value");
  if (priceValueEl) priceValueEl.innerText = value;
  renderProducts();
}

// =============================
// Quick View Modal
// =============================
function showProductDetails(id) {
  const p = products.find(x => x.id === id);
  if (!p) return;
  document.getElementById("modalTitle").innerText = p.name;
  document.getElementById("modalImage").src = p.image;
  document.getElementById("modalPrice").innerText = "₹" + p.price;
  new bootstrap.Modal(document.getElementById("productModal")).show();
}

// =============================
// Event Listeners
// =============================
document.getElementById("search-bar")?.addEventListener("input", renderProducts);
document.getElementById("sort-filter")?.addEventListener("change", renderProducts);
document.getElementById("priceRange")?.addEventListener("input", e => updatePriceFilter(e.target.value));

// =============================
// Init
// =============================
document.addEventListener("DOMContentLoaded", () => {
  showCategory("all"); 
});
document.getElementById("clearData").addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all user data?")) {
    localStorage.removeItem("signupData");
    localStorage.removeItem("activeUser");
    signupData = [];
    activeUser = null;
    updateNavbarProfile();
    alert("All data cleared!");
  }
});