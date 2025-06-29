// ==== DARK MODE LOGIC ====

// Set dark mode (add/remove class, update icon and tooltip)
function setDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  localStorage.setItem('darkMode', enabled ? 'on' : 'off');
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.innerHTML = enabled ? '🌙' : '☀️';
    toggle.title = enabled ? "Switch to light mode" : "Switch to dark mode";
  }
}

// Initialize dark mode on page load
function initDarkMode() {
  const saved = localStorage.getItem('darkMode');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  setDarkMode(saved === 'on' || (saved === null && prefersDark));
}

// Set up toggle button event listener
function setupDarkToggle() {
  const toggle = document.getElementById('darkModeToggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      setDarkMode(!document.body.classList.contains('dark-mode'));
    });
  }
}

// ==== E-COMMERCE PRODUCTS DATA ====
// Add your products here. You can customize or expand this list.
const products = [
  {
    name: "Modern Bluetooth Headphones",
    price: 187.02,
    image: "doc_img/Screenshot 2025-06-26 130341.png",
    description: "Wireless, noise-cancelling, and stylish. Enjoy your music anywhere."
  },
  {
    name: "Smart Fitness Watch",
    price: 502.63,
    image: "doc_img/Screenshot 2025-06-26 125021.png",
    description: "Track your activity, heart rate, and sleep with this smart wearable."
  },
  {
    name: "Samsung S24 Ultra",
    price: 1671.56,
    image: "doc_img/Screenshot 2025-06-25 123006.png",
    description: "Charge your devices quickly and safely with this compact charger."
  },
  {
    name: "Mac-Book Air M4 ",
    price: 1601.12,
    image: "doc_img/Screenshot 2025-06-27 153840.png",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Novels",
    price: 12.49,
    image: "doc_img/pexels-rachel-claire-4846276.jpg",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Java Script Beginners",
    price: 13.49,
    image: "doc_img/Screenshot 2025-06-26 131152.png",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Jeans",
    price: 15.49,
    image: "doc_img/pexels-neosiam-603022.jpg",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Iphone 16 Pro-Max",
    price: 1712.49,
    image: "doc_img/pexels-japy-29020349.jpg",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Canon EOSD 850",
    price: 604.49,
    image: "doc_img/pexels-sparkphotopro-10775339.jpg",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Computer Accessories",
    price: 17.49,
    image: "doc_img/Screenshot 2025-06-27 155619.png",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  },
  {
    name: "Shirts for Men",
    price: 10.49,
    image: "doc_img/Screenshot 2025-06-27 155805.png",
    description: "Reusable and BPA-free, keeps your drink cold or hot for hours."
  }
  ];

// ==== E-COMMERCE LOGIC ====

let cart = [];
let cartVisible = false;
let checkoutVisible = false;

function renderProducts() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  productList.innerHTML = '';
  products.forEach((product, idx) => {
    const div = document.createElement('div');
    div.className = 'product-item';
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}"/>
      <h3>${product.name}</h3>
      <p>$${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${idx})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(idx) {
  const product = products[idx];
  const existing = cart.find(item => item.name === product.name);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({...product, qty: 1});
  }
  if (cartVisible) renderCart();
  if (checkoutVisible) renderCheckoutForm();
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  if (cartVisible) renderCart();
  if (checkoutVisible) renderCheckoutForm();
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  if (!cartList) return;
  if (cart.length === 0) {
    cartList.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach((item, idx) => {
    total += item.price * item.qty;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
      <button class="cart-remove" onclick="removeFromCart(${idx})">&times;</button>
    `;
    cartList.appendChild(div);
  });
  const totalDiv = document.createElement('div');
  totalDiv.style = "text-align:right; font-weight:bold; margin-top:0.7em;";
  totalDiv.textContent = `Total: $${total.toFixed(2)}`;
  cartList.appendChild(totalDiv);
}

function renderCheckoutForm() {
  const container = document.getElementById('checkout-section');
  if (!container) return;
  if (cart.length === 0) {
    container.innerHTML = '<p>Your cart is empty. Please add items before checkout.</p>';
    return;
  }
  container.innerHTML = `
    <form class="checkout-form" id="checkoutForm">
      <h3>Checkout</h3>
      <div class="form-group">
        <label for="co-name">Name</label>
        <input type="text" id="co-name" required autocomplete="name"/>
      </div>
      <div class="form-group">
        <label for="co-email">Email</label>
        <input type="email" id="co-email" required autocomplete="email"/>
      </div>
      <div class="form-group">
        <label for="co-address">Shipping Address</label>
        <input type="text" id="co-address" required autocomplete="street-address"/>
      </div>
      <button type="submit" class="btn">Place Order</button>
      <p id="checkoutStatus" class="form-status"></p>
    </form>
  `;
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutForm);
}

function handleCheckoutForm(e) {
  e.preventDefault();
  const name = document.getElementById('co-name').value.trim();
  const email = document.getElementById('co-email').value.trim();
  const address = document.getElementById('co-address').value.trim();
  const status = document.getElementById('checkoutStatus');
  if (!name || !email || !address) {
    status.textContent = "Please fill out all fields.";
    status.style.color = "#ef5350";
    return;
  }
  status.textContent = "Order placed! ThankYou, Visit Again";
  status.style.color = "#007bff";
  cart = [];
  renderCart();
  setTimeout(() => {
    document.getElementById('checkoutForm').reset();
    renderCheckoutForm();
  }, 1500);
}

// Show/hide cart and checkout dynamically
function setupCartCheckoutToggles() {
  const cartSection = document.getElementById('cart-section');
  const checkoutSection = document.getElementById('checkout-section');
  const showCartBtn = document.getElementById('showCartBtn');
  const showCheckoutBtn = document.getElementById('showCheckoutBtn');

  if (showCartBtn) {
    showCartBtn.addEventListener('click', function() {
      cartVisible = !cartVisible;
      checkoutVisible = false;
      cartSection.style.display = cartVisible ? 'block' : 'none';
      checkoutSection.style.display = 'none';
      if (cartVisible) renderCart();
    });
  }
  if (showCheckoutBtn) {
    showCheckoutBtn.addEventListener('click', function() {
      checkoutVisible = !checkoutVisible;
      cartVisible = false;
      cartSection.style.display = 'none';
      checkoutSection.style.display = checkoutVisible ? 'block' : 'none';
      if (checkoutVisible) renderCheckoutForm();
    });
  }
}

// ==== CONTACT FORM LOGIC ====
function handleContactForm(e) {
  e.preventDefault();
  const status = document.getElementById('formStatus');
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    status.textContent = "Please complete all fields.";
    status.style.color = "#ef5350";
    return;
  }
  status.textContent = "Thanks, your message is received! We will contact you soon.";
  status.style.color = "#007bff";
  document.getElementById('contactForm').reset();
  // Optionally, show an alert as well:
  // alert("Thanks, your message is received! We will contact you back soon.");
}

// ==== PAGE INITIALIZATION ====
document.addEventListener('DOMContentLoaded', function() {
  // Dark mode
  initDarkMode();
  setupDarkToggle();

  // E-Commerce page setup
  if (window.location.pathname.includes('ecommerce.html')) {
    renderProducts();
    setupCartCheckoutToggles();
    // Expose functions for HTML onclick
    window.addToCart = addToCart;
    window.removeFromCart = removeFromCart;
  }

  // Contact form setup
  if (document.getElementById('contactForm')) {
    document.getElementById('contactForm').addEventListener('submit', handleContactForm);
  }
    // ==== TYPED.JS SETUP FOR HERO SECTION ====
  if (document.getElementById("typed-text")) {
    new Typed("#typed-text", {
      strings: ["Web Developer", "Designer", "Creator"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true
    });
  }
});