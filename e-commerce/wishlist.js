function saveWishlist() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function updateWishlistCount() {
  const countEl = document.getElementById("wishlist-count");
  if (countEl) countEl.textContent = wishlist.length;
}

function addToWishlist(id) {
  const product = products.find(p => p.id === id);
  if (!wishlist.some(item => item.id === id)) {
    wishlist.push(product);
    saveWishlist();
    updateWishlistCount();
    alert("Added to Wishlist!");
  } else {
    alert("Already in Wishlist!");
  }
}

function removeFromWishlist(id) {
  wishlist = wishlist.filter(item => item.id !== id);
  saveWishlist();
  renderWishlist();
  updateWishlistCount();
}

function renderWishlist() {
  const wishlistItemsEl = document.getElementById("wishlist-items");
  if (!wishlistItemsEl) return;

  wishlistItemsEl.innerHTML = "";
  if (wishlist.length === 0) {
    wishlistItemsEl.innerHTML = `<p class="text-muted">Your wishlist is empty ❤️</p>`;
    return;
  }

  wishlist.forEach(item => {
    wishlistItemsEl.innerHTML += `
      <div class="card mb-3 shadow-sm" style="max-width: 600px;">
        <div class="row g-0 align-items-center">
          <div class="col-md-4">
            <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text text-success fw-bold">₹${item.price}</p>
              <div class="d-flex gap-2">
                <button class="btn btn-sm btn-primary" onclick="addToCart(${item.id})">Add to Cart</button>
                <button class="btn btn-sm btn-danger" onclick="removeFromWishlist(${item.id})">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderWishlist();
  updateWishlistCount();
});
