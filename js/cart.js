import db from './database.js';

const updateCartDisplay = async () => {
    const cartItems = await db.getCart();
    const cartContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    
    let subtotal = 0;
    
    cartContainer.innerHTML = cartItems.map(item => {
        subtotal += item.price * item.quantity;
        return `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="100">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>₹${item.price}</p>
                </div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeItem(${item.id})" class="remove-btn">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
    }).join('');
    
    subtotalElement.textContent = `₹${subtotal}`;
    totalElement.textContent = `₹${subtotal + 40}`; // Adding delivery fee
};

document.getElementById('checkout-btn').addEventListener('click', async () => {
    // Handle checkout process
});

// Initialize cart page
document.addEventListener('DOMContentLoaded', updateCartDisplay);