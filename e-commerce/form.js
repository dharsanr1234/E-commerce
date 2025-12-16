// =============================
// User Data Setup
// =============================
let signupData = JSON.parse(localStorage.getItem("signupData")) || [];
let activeUser = JSON.parse(localStorage.getItem("activeUser")) || null;

// Save signup data
function saveSignupData() {
  localStorage.setItem("signupData", JSON.stringify(signupData));
}

// Set the active user
function setActiveUser(user) {
  activeUser = user;
  localStorage.setItem("activeUser", JSON.stringify(user));
  updateActiveUserDisplay();
  renderUserList();
}

// =============================
// UI Updates
// =============================

// Show currently active user
function updateActiveUserDisplay() {
  const displayEl = document.getElementById("activeUserDisplay");
  const navbarEl = document.getElementById("navbarProfile");

  if (activeUser) {
    if (displayEl) displayEl.textContent = `👤 Logged in as: ${activeUser.email}`;
    if (navbarEl) navbarEl.textContent = `👤 ${activeUser.email}`;
  } else {
    if (displayEl) displayEl.textContent = "No user logged in";
    if (navbarEl) navbarEl.textContent = "No user";
  }
}

// Show all registered users
function renderUserList() {
  const listEl = document.getElementById("userList");
  if (!listEl) return;

  listEl.innerHTML = "";

  if (signupData.length === 0) {
    listEl.innerHTML = "<li>No registered users</li>";
    return;
  }

  signupData.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.email;
    listEl.appendChild(li);
  });
}

// =============================
// Signup
// =============================
document.getElementById("signupForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  if (signupData.some(u => u.email === email)) {
    alert("User already exists. Please login instead.");
    return;
  }

  let newUser = { email, password };
  signupData.push(newUser);
  saveSignupData();
  setActiveUser(newUser); // auto-login after signup

  this.reset();
  bootstrap.Offcanvas.getInstance(document.getElementById("signup")).hide();
});

// =============================
// Login
// =============================
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let user = signupData.find(u => u.email === email && u.password === password);

  if (user) {
    setActiveUser(user);
    alert("Login successful!");
  } else {
    alert("Invalid email or password.");
  }

  this.reset();
  bootstrap.Offcanvas.getInstance(document.getElementById("login")).hide();
});

// =============================
// Clear All User Data
// =============================
document.getElementById("clearData")?.addEventListener("click", function () {
  if (confirm("Are you sure you want to clear all user data?")) {
    localStorage.removeItem("signupData");
    localStorage.removeItem("activeUser");
    signupData = [];
    activeUser = null;
    renderUserList();
    updateActiveUserDisplay();
    alert("All user data cleared!");
  }
});

// =============================
// Init
// =============================
document.addEventListener("DOMContentLoaded", () => {
  renderUserList();
  updateActiveUserDisplay();
});
