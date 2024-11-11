// Initialize an empty cart
let cart = [];

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalDisplay = document.querySelector("#cart-total span");

    // Clear the current cart display
    cartItemsContainer.innerHTML = "";

    // If the cart is empty, show a message
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotalDisplay.textContent = "0";
        return;
    }

    // Populate the cart items and calculate the total
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        // Create a cart item element
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
            <p>${item.name} - $${item.price} (x${item.quantity})</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Update the total price
    cartTotalDisplay.textContent = total.toFixed(2);

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll(".remove-item");
    removeButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.dataset.index;
            removeFromCart(index);
        });
    });
}

// Function to add an item to the cart
function addToCart(name, price) {
    // Check if the item is already in the cart
    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        // If it exists, increase the quantity
        existingItem.quantity += 1;
    } else {
        // Otherwise, add it to the cart
        cart.push({ name, price, quantity: 1 });
    }

    // Update the cart display
    updateCart();
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Remove the item at the specified index
    cart.splice(index, 1);

    // Update the cart display
    updateCart();
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", (event) => {
        const flowerCard = event.target.closest(".flower-card");
        const name = flowerCard.dataset.name;
        const price = parseFloat(flowerCard.dataset.price);

        // Add the item to the cart
        addToCart(name, price);
    });
});
