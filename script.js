var products = [
  { id: 1, name: "coat", price: 29, imageUrl: "https://lookhomme.com/wp-content/uploads/2019/11/Manteau-laine-mode.jpg" },
  { id: 2, name: "sneaker", price: 19, imageUrl: "https://contents.mediadecathlon.com/p2214331/k$ac5c25dd59e72c24f6467ebb91c8dcda/chaussures-de-basketball-enfant-easy-x-rouge.jpg?format=auto&quality=60&f=800x800" },
  { id: 3, name: "shirt", price: 39, imageUrl: "https://site.glotelho.cm/media/catalog/product/cache/3d5322e2293df1ca8e64a115bdb04917//c/h/chemise_slim_fit_-_a_manches_longues_hommes.jpg" },
  { id: 4, name: "t-shirt", price: 15, imageUrl: "https://static.lefties.com/9/photos2/2024/I/0/2/p/5011/529/700/5011529700_2_6_1.jpg?t=1721814752191" },
  { id: 5, name: "trousers", price: 25, imageUrl: "https://celio.tn/media/catalog/product/cache/dd9d425ebb6d2ec92fb4ce41e2a39a01/1/5/158577-508-DOLINUS_OLIVE-5_1_6.jpg" },
  { id: 6, name: "jeans", price: 35, imageUrl: "https://requestgreen.com.tn/601-large_default/pantalon-homme-brut.jpg" }
];

var cart = [];

// Display Products
function displayProducts() {
  var productList = document.getElementById("product-list");
  productList.innerHTML = "";
  products.forEach(function(product) {
      var productDiv = document.createElement("div");
      productDiv.classList.add("product");
      productDiv.innerHTML = `
          <img src="${product.imageUrl}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Price: $${product.price.toFixed(2)}</p>
          <button onclick="addToCart(${product.id})">Add to Cart</button>
      `;
      productList.appendChild(productDiv);
  });
}

// Show Selected Section
function showSection(section) {
  document.getElementById("products-section").style.display = "none";
  document.getElementById("about-section").style.display = "none";
  document.getElementById("contact-section").style.display = "none";
  
  if (section === "products") {
      document.getElementById("products-section").style.display = "block";
  } else if (section === "about") {
      document.getElementById("about-section").style.display = "block";
  } else if (section === "contact") {
      document.getElementById("contact-section").style.display = "block";
  }
}

// Add Product to Cart
function addToCart(productId) {
  // Find the product by its ID
  var product = products.find(function(p) {
      return p.id === productId;
  });

  // Find the cart item if it already exists
  var cartItem = cart.find(function(item) {
      return item.product.id === productId;
  });

  if (cartItem) {
      cartItem.quantity += 1;
  } else {
      cart.push({ product: product, quantity: 1 });
  }

  updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
  var cartCount = document.getElementById("cart-count");
  cartCount.innerText = cart.reduce(function(count, item) {
      return count + item.quantity;
  }, 0);

  var cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  var total = 0;

  cart.forEach(function(item) {
      var li = document.createElement("li");
      li.innerText = `${item.product.name} x ${item.quantity} - $${(item.product.price * item.quantity).toFixed(2)}`;
      cartItems.appendChild(li);

      total += item.product.price * item.quantity;
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
}

// Toggle Cart Modal
function toggleCart() {
  var cartModal = document.getElementById("cart-modal");

  // Toggle the display property without using a ternary operator
  if (cartModal.style.display === "block") {
      cartModal.style.display = "none";
  } else {
      cartModal.style.display = "block";
  }
}

// Checkout
function checkout() {
  if (cart.length === 0) {
      alert("Your cart is empty!");
  } else {
      alert("Thank you for your purchase!");
      cart.length = 0;
      updateCartDisplay();
      toggleCart();
  }
}

// Initialize Product Display
displayProducts();
showSection("products");
