// cart.js

// Retrieve or initialize cart array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
        const product = button.closest(".product");

        const id = product.getAttribute("data-id");
        const name = product.getAttribute("data-name");
        const price = parseFloat(product.getAttribute("data-price"));
        const img = product.getAttribute("data-img");

        // Create cart item
        const item = { id, name, price, img, quantity: 1 };

        // Check if the product is already in the cart
        const existingItem = cart.find(i => i.id === id);

        if (existingItem) {
            existingItem.quantity += 1;  // Increment quantity if already in cart
        } else {
            cart.push(item);
        }

        // Save cart to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${name} added to cart!`);
    });
});
