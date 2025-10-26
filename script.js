// SIGNUP PAGE
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    localStorage.setItem("userEmail", email);
    localStorage.setItem("userPassword", password);
    alert("✅ Account created successfully!");
    window.location.href = "index.html";
  });
}

// LOGIN PAGE
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedEmail = localStorage.getItem("userEmail");
    const storedPassword = localStorage.getItem("userPassword");

    if (email === storedEmail && password === storedPassword) {
      alert("✅ Login successful!");
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "home.html";
    } else {
      alert("❌ Invalid email or password!");
    }
  });
}

// HOME PAGE (LOGOUT + CART)
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    alert("👋 Logged out successfully!");
    window.location.href = "index.html";
  });
}

// PROTECT HOME PAGE (redirect if not logged in)
if (window.location.pathname.includes("home.html")) {
  const loggedIn = localStorage.getItem("isLoggedIn");
  if (loggedIn !== "true") {
    alert("⚠️ Please log in first!");
    window.location.href = "index.html";
  }
}

// CART SYSTEM
let cart = [];
function addToCart(item, price) {
  cart.push({ item, price });
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cartList");
  const total = document.getElementById("total");

  cartList.innerHTML = "";
  let sum = 0;

  cart.forEach((c) => {
    const li = document.createElement("li");
    li.textContent = `${c.item} - ₹${c.price}`;
    cartList.appendChild(li);
    sum += c.price;
  });

  total.textContent = sum;
}
// Order button
const orderBtn = document.getElementById("orderBtn");
const addressPopup = document.getElementById("addressPopup");
const paymentPopup = document.getElementById("paymentPopup");
const orderPopup = document.getElementById("orderPopup");

if (orderBtn) {
  orderBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }
    addressPopup.style.display = "flex";
  });
}

// Next -> Payment
const nextToPaymentBtn = document.getElementById("nextToPaymentBtn");
if (nextToPaymentBtn) {
  nextToPaymentBtn.addEventListener("click", () => {
    const address = document.getElementById("addressInput").value.trim();
    if (address === "") {
      alert("⚠️ Please enter your address!");
      return;
    }
    localStorage.setItem("lastAddress", address);
    addressPopup.style.display = "none";
    paymentPopup.style.display = "flex";
    const savedAddress = localStorage.getItem("lastAddress");
if (savedAddress) addressInput.value = savedAddress;
  });
}

// Confirm Payment -> Success
// Confirm Payment -> Save Order & Redirect
const confirmPaymentBtn = document.getElementById("confirmPaymentBtn");
if (confirmPaymentBtn) {
  confirmPaymentBtn.addEventListener("click", () => {
    const payment = document.querySelector('input[name="payment"]:checked');
    if (!payment) {
      alert("⚠️ Please select a payment option!");
      return;
    }

    const paymentType = payment.value;
    const address = localStorage.getItem("lastAddress") || "No address found";

    // Save order summary
    const orderDetails = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      address: address,
      payment: paymentType,
      date: new Date().toLocaleString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    // Redirect to summary page
    window.location.href = "summary.html";
  });
}
// CLEAR CART FUNCTION
const clearCartBtn = document.getElementById("clearCartBtn");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("🛒 Your cart is already empty!");
      return;
    }

    const confirmClear = confirm("Are you sure you want to clear your cart?");
    if (confirmClear) {
      cart = [];
      updateCart();
      alert("🧹 Cart has been cleared!");
    }
  });
}







