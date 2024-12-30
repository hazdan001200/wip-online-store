let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage or initialize as empty

function updateCartCount() {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = cart.length; // Update cart count in the nav bar
}

async function displayProducts() {
    try {
        const response = await fetch("script.json"); // Fetch product data
        const products = await response.json();

        const gridContainer = document.getElementById("product-grid");

        // Dynamically generate product cards
        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image_url}" alt="${product.productname}">
                <h3>${product.productname}</h3>
                <p>${product.description}</p>
                <p><strong>${product.price}</strong></p>
                <button class="add-to-cart" onclick="addToCart(${index})">Add to Cart</button>
            `;
            gridContainer.appendChild(productCard);
        });
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function addToCart(productIndex) {
    fetch("script.json")
        .then(response => response.json())
        .then(products => {
            const product = products[productIndex];
            cart.push(product); // Add the selected product to the cart
            localStorage.setItem("cart", JSON.stringify(cart)); // Save the cart to localStorage
            updateCartCount(); // Update cart count in the nav bar
            alert(`${product.productname} has been added to the cart!`);
        })
        .catch(error => {
            console.error("Error adding to cart:", error);
        });
}

// Initialize cart count on page load
updateCartCount();

// Load products on page load
displayProducts();
