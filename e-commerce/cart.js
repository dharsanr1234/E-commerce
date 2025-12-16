function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = cart.reduce((a, b) => a + b.quantity, 0);
}

function renderCart() {
  const cartItemsEl = document.getElementById("cart-items");
  if (!cartItemsEl) return;

  cartItemsEl.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
  } else {
    cart.forEach(item => {
      total += item.price * item.quantity;
      cartItemsEl.innerHTML += `
        <div class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h6 class="mb-1">${item.name}</h6>
            <small>₹${item.price} × ${item.quantity}</small>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="decreaseQuantity(${item.id})">−</button>
            <button class="btn btn-sm btn-outline-secondary me-2" onclick="increaseQuantity(${item.id})">+</button>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      `;
    });
  }

  const totalEl = document.getElementById("cart-total");
  if (totalEl) totalEl.textContent = total;
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(p => p.id === id);
  alert("Added to Cart!");
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartCount();
}

function increaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item) item.quantity++;
  saveCart(); 
  renderCart(); 
  updateCartCount();
}

function decreaseQuantity(id) {
  const item = cart.find(p => p.id === id);
  if (item && item.quantity > 1) {
    item.quantity--;
  } else {
    cart = cart.filter(p => p.id !== id);
  }
  saveCart(); 
  renderCart(); 
  updateCartCount();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart(); 
  renderCart(); 
  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();
});
