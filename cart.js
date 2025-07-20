// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cart-items");
const totalItems = document.getElementById("total-items");
const totalPrice = document.getElementById("total-price");

function renderCart() {
  cartContainer.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price;
    count += 1;

    const itemDiv = document.createElement("div");
    itemDiv.style.marginBottom = "10px";
    itemDiv.style.padding = "10px";
    itemDiv.style.border = "1px solid #ccc";
    itemDiv.innerHTML = `
      <strong>${item.name}</strong> - ₹${item.price}
      <button onclick="removeItem(${index})" style="float:right;">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  totalItems.innerText = count;
  totalPrice.innerText = total;
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();
