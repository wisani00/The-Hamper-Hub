// Toggle mobile menu (for future use/responsive setup)
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav ul");

  // Example toggle setup if you add a burger icon later
  // const burger = document.querySelector(".burger");
  // burger.addEventListener("click", () => {
  //   nav.classList.toggle("show");
  // });

  // "Order Now" button interaction
  const orderBtn = document.querySelector(".btn");
  orderBtn.addEventListener("click", () => {
    alert("Redirecting to the order page...");
    // window.location.href = "/order"; // Uncomment to redirect
  });

  // Add click event to menu items
  const items = document.querySelectorAll(".menu .item");
  items.forEach(item => {
    item.addEventListener("click", () => {
      const itemName = item.querySelector("h3").textContent;
      alert(`You selected: ${itemName}`);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;

  const orderBtn = document.querySelector(".btn");
  orderBtn.addEventListener("click", () => {
    alert("Redirecting to the order page...");
  });

  const items = document.querySelectorAll(".menu .item");
  const cartDisplay = document.getElementById("cartCount");

  items.forEach(item => {
    item.classList.add("fade-in");

    item.addEventListener("click", () => {
      const itemName = item.querySelector("h3").textContent;
      cartCount++;
      cartDisplay.textContent = `🛒 Cart: ${cartCount}`;
      alert(`✅ ${itemName} added to cart!`);
    });
  });

  // Theme toggle
  const themeToggle = document.getElementById("themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let cartCount = 0;

  const cartDisplay = document.getElementById("cartCount");
  const themeToggle = document.getElementById("themeToggle");

  // Theme toggle
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  // Handle "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".item");
      const itemName = item.querySelector("h3").textContent;
      const itemPrice = item.querySelector(".price").textContent;

      cartCount++;
      cartDisplay.textContent = `🛒 Cart: R{cartCount}`;

      alert(`✅ Added to cart: R{itemName} (${itemPrice})`);
    });
  });

  // Fade in animation for items
  const items = document.querySelectorAll(".menu .item");
  items.forEach(item => {
    item.classList.add("fade-in");
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const cartDisplay = document.getElementById("cartCount");
  const themeToggle = document.getElementById("themeToggle");

  // Apply saved theme
  if (document.body.classList.contains("dark")) {
    themeToggle.textContent = "☀️ Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const darkMode = document.body.classList.contains("dark");
    themeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  });

  // Load or initialize cart
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart icon
  const updateCartCount = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartDisplay) cartDisplay.textContent = `🛒 Cart: ${totalItems}`;
  };

  updateCartCount();

  // Handle add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const item = button.closest(".item");
      const name = item.querySelector("h3").textContent;
      const price = parseFloat(item.querySelector(".price").textContent.replace("$", ""));

      const existing = cart.find(i => i.name === name);
      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      alert(`✅ ${name} added to cart.`);
    });
  });

  // If on cart.html, render cart
  const cartItemsDiv = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");

  if (cartItemsDiv) {
    const renderCart = () => {
      cartItemsDiv.innerHTML = "";

      if (cart.length === 0) {
        cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
        totalPriceEl.textContent = "Total: $0.00";
        return;
      }

      let total = 0;

      cart.forEach(item => {
        total += item.price * item.quantity;

        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        itemDiv.innerHTML = `
          <p><strong>${item.name}</strong></p>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
        `;

        cartItemsDiv.appendChild(itemDiv);
      });

      totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;
    };

    renderCart();

    // Handle clear cart
    document.getElementById("clearCart").addEventListener("click", () => {
      localStorage.removeItem("cart");
      cart = [];
      renderCart();
      updateCartCount();
    });
  }

  // Fade-in animation (optional)
  const items = document.querySelectorAll(".menu .item");
  items.forEach(item => item.classList.add("fade-in"));
});

const renderCart = () => {
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceEl.textContent = "Total: $0.00";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemDiv = document.createElement("div");
    itemDiv.className = "item";

    itemDiv.innerHTML = `
      <p><strong>R{item.name}</strong></p>
      <p>Quantity: FR{item.quantity}</p>
      <p>Price: RR{(item.price * item.quantity).toFixed(2)}</p>
      <button data-index="R{index}" class="remove-item">Remove</button>
    `;

    cartItemsDiv.appendChild(itemDiv);
  });

  totalPriceEl.textContent = `Total: R{total.toFixed(2)}`;

  // Attach remove buttons
  document.querySelectorAll(".remove-item").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      renderCart();
    });
  });
};

// Filter categories
const filterButtons = document.querySelectorAll(".filter-btn");
const categories = document.querySelectorAll(".category");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    const selected = button.getAttribute("data-category");

    // Toggle active class
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Show/hide categories
    categories.forEach(cat => {
      if (selected === "all" || cat.getAttribute("data-category") === selected) {
        cat.classList.add("show");
      } else {
        cat.classList.remove("show");
      }
    });
  });
});

// Show all by default
categories.forEach(cat => cat.classList.add("show"));

let allMenuItems = []; // store original data

fetch("menu.json")
  .then(res => res.json())
  .then(data => {
    allMenuItems = data;
    renderMenu(allMenuItems);

    // Filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        applyFilters();
      });
    });

    // Search
    document.getElementById("searchInput").addEventListener("input", applyFilters);

    // Sort
    document.getElementById("sortSelect").addEventListener("change", applyFilters);
  });

function applyFilters() {
  const category = document.querySelector(".filter-btn.active")?.getAttribute("data-category") || "all";
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const sortOption = document.getElementById("sortSelect").value;

  let filtered = allMenuItems.filter(item => {
    const inCategory = category === "all" || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm);
    return inCategory && matchesSearch;
  });

  // Sort logic
  switch (sortOption) {
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  renderMenu(filtered, category);
}

function renderMenu(items, categoryFilter = "all") {
  const menuContainer = document.getElementById("menuContainer");
  menuContainer.innerHTML = "";

  const grouped = { starters: [], mains: [], desserts: [] };

  items.forEach(item => {
    if (categoryFilter === "all" || item.category === categoryFilter) {
      grouped[item.category].push(item);
    }
  });

  for (const [category, items] of Object.entries(grouped)) {
    if (items.length === 0) continue;

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const title = document.createElement("h3");
    title.className = "category-title";
    title.textContent = capitalize(category);
    categoryDiv.appendChild(title);

    const itemsWrapper = document.createElement("div");
    itemsWrapper.className = "menu-items";

    items.forEach(item => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "item";

      const rating = generateRating(); // Random stars for now

      itemDiv.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p class="price">$${item.price.toFixed(2)}</p>
        <p class="rating">${rating}</p>
        <button class="add-to-cart">Add to Cart</button>
      `;

      itemsWrapper.appendChild(itemDiv);
    });

    categoryDiv.appendChild(itemsWrapper);
    menuContainer.appendChild(categoryDiv);
  }

  attachCartEvents();
}

function generateRating() {
  const stars = Math.floor(Math.random() * 2) + 4; // 4 or 5 stars
  return "⭐".repeat(stars);
}

<script>
  const stars = document.querySelectorAll('.star');
  const ratingValue = document.getElementById('rating-value');
  let selectedRating = 0;

  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.getAttribute('data-value'));
      highlightStars(val);
    });

    star.addEventListener('mouseout', () => {
      highlightStars(selectedRating);
    });

    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      ratingValue.textContent = `Your rating: ${selectedRating}`;
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }
</script>

localStorage.setItem('hamperRating', selectedRating);

<script>
  const stars = document.querySelectorAll('.star');
  const reviewText = document.getElementById('review-text');
  const submitButton = document.getElementById('submit-review');
  const reviewsList = document.getElementById('reviews-list');
  let selectedRating = 0;

  // Handle star selection
  stars.forEach(star => {
    star.addEventListener('mouseover', () => {
      const val = parseInt(star.getAttribute('data-value'));
      highlightStars(val);
    });

    star.addEventListener('mouseout', () => {
      highlightStars(selectedRating);
    });

    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-value'));
      highlightStars(selectedRating);
    });
  });

  function highlightStars(rating) {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      if (starValue <= rating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  }

  // Handle review submission
  submitButton.addEventListener('click', () => {
    const text = reviewText.value.trim();
    if (selectedRating === 0 || text === '') {
      alert('Please provide both a rating and a review.');
      return;
    }

    const reviewHTML = `
      <div class="review">
        <div class="stars">${'&#9733;'.repeat(selectedRating)}${'&#9734;'.repeat(5 - selectedRating)}</div>
        <p>${text}</p>
      </div>
    `;
    reviewsList.innerHTML += reviewHTML;

    // Reset form
    reviewText.value = '';
    selectedRating = 0;
    highlightStars(0);
  });
</script>
function renderReviews() {
  const reviews = JSON.parse(localStorage.getItem('hamperReviews') || '[]');
  reviewsList.innerHTML = reviews.map(r => `
    <div class="review">
      <div class="stars">${'&#9733;'.repeat(r.rating)}${'&#9734;'.repeat(5 - r.rating)}</div>
      <div class="meta">By ${r.name} on ${r.date}</div>
      <p>${r.text}</p>
    </div>
  `).join('');
}

renderReviews(); // call this once when page loads


const reviews = JSON.parse(localStorage.getItem('hamperReviews') || '[]');
reviews.unshift(review); // add to top
localStorage.setItem('hamperReviews', JSON.stringify(reviews));
