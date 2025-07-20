function openModal(id) {
  document.getElementById(id).style.display = "block";
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

function openLocationPopup() {
  openModal('locationPopup');
}

function handleLogin() {
  const email = document.getElementById("loginEmail").value;
  const pass = document.getElementById("loginPassword").value;

  if (email && pass) {
    localStorage.setItem("user", email);
    closeModal('loginModal');
    window.location.href = "index.html";
  } else {
    alert("Please enter valid credentials");
  }
}

function handleSignup() {
  const user = document.getElementById("signupUser").value;
  const email = document.getElementById("signupEmail").value;
  const pass = document.getElementById("signupPassword").value;

  if (user && email && pass) {
    localStorage.setItem("user", email);
    closeModal('signupModal');
    window.location.href = "index.html";
  } else {
    alert("Please fill all fields");
  }
}

function addToCart(item, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name: item, price: price });
  localStorage.setItem("cart", JSON.stringify(cart));

  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = `₹${cart.reduce((sum, i) => sum + i.price, 0)}`;
}

// Attach click events to each food item
document.addEventListener("DOMContentLoaded", () => {
  const foodItems = document.querySelectorAll(".food-item");
  foodItems.forEach(item => {
    item.addEventListener("click", () => {
      const name = item.getAttribute("data-name");
      const price = parseInt(item.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  // Update cart icon count from localStorage (on load)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  document.getElementById("cart-count").innerText = cart.length;
  document.getElementById("cart-total").innerText = `₹${cart.reduce((sum, i) => sum + i.price, 0)}`;
});

// Sample food database
const foodDB = [
  { name: "Pizza", price: 120, image: "./assets/MushroomPepPizza_0076.jpg" },
  { name: "Burger", price: 90, image: "./assets/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" },
  { name: "Sushi", price: 180, image: "./assets/sushi-FI.webp" },
  { name: "Pasta", price: 100, image: "./assets/alfredopasta5.webp" },
  { name: "Biryani", price: 150, image: "./assets/68b1e-bangalore-biryani.webp" },
  { name: "Tacos", price: 110, image: "./assets/Beef-Tacos.webp" }
];

// Listen for search input
function performSearch(query) {
  const results = foodDB.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
  const resultContainer = document.getElementById("search-results");
  resultContainer.innerHTML = "";

  if (query === "") return;

  results.forEach(item => {
    const card = document.createElement("div");
    card.className = "search-card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="info">
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.name}', ${item.price})">Add to Cart</button>
      </div>
    `;
    resultContainer.appendChild(card);
  });
}

// Search on typing
document.getElementById("searchInput").addEventListener("input", function () {
  performSearch(this.value);
});

// Search on icon click
document.getElementById("searchBtn").addEventListener("click", function () {
  const query = document.getElementById("searchInput").value;
  performSearch(query);
});
