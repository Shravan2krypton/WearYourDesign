// Function to load cart and calculate total amount
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalAmountEl = document.getElementById("totalAmount");

    if (cart.length === 0) {
        totalAmountEl.textContent = "No items in cart.";
        return;
    }

    // Calculate total cost
    let totalCost = 0;
    cart.forEach(item => {
        totalCost += item.price * item.quantity;
    });

    totalAmountEl.textContent = `$${totalCost.toFixed(2)}`;
}

// Google Pay Simulation
function payWithGooglePay() {
    const totalCost = document.getElementById("totalAmount").textContent;
    alert(`Redirecting to Google Pay with amount: ${totalCost}`);
    window.location.href = "https://pay.google.com";
}

// UPI Payment
document.getElementById("upiForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const upiID = document.getElementById("upiID").value;
    const totalCost = document.getElementById("totalAmount").textContent;

    if (upiID) {
        alert(`Payment of ${totalCost} initiated to UPI ID: ${upiID}`);
    } else {
        alert("Please enter a valid UPI ID.");
    }
});

// Card Payment
document.getElementById("cardForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const cardNumber = document.getElementById("cardNumber").value;
    const expiry = document.getElementById("expiry").value;
    const cvv = document.getElementById("cvv").value;
    const totalCost = document.getElementById("totalAmount").textContent;

    if (cardNumber && expiry && cvv) {
        alert(`Card Payment of ${totalCost} Successful!`);
    } else {
        alert("Please fill all card details.");
    }
});

// Cash on Delivery
function payCOD() {
    const totalCost = document.getElementById("totalAmount").textContent;
    alert(`Order placed with Cash on Delivery for ${totalCost}!`);
}

// Load cart total on page load
window.onload = loadCart;
