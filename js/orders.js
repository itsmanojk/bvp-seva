import db from './database.js';

const loadOrders = async () => {
    const orders = await db.getOrders();
    const ordersContainer = document.getElementById('orders-list');
    
    if (!orders || orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-shopping-bag"></i>
                <h3>No Orders Yet</h3>
                <p>Looks like you haven't placed any orders yet.</p>
                <a href="index.html" class="btn-primary" style="display: inline-block; margin-top: 1rem;">
                    Start Ordering
                </a>
            </div>
        `;
        return;
    }
    
    ordersContainer.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-header">
                <div>
                    <h3>Order #${order.id}</h3>
                    <p class="order-date">${new Date(order.date).toLocaleDateString()}</p>
                </div>
                <span class="order-status status-${order.status.toLowerCase()}">
                    ${order.status}
                </span>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>₹${item.price * item.quantity}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: ₹${order.total}</strong>
            </div>
        </div>
    `).join('');
};

// Initialize orders page
document.addEventListener('DOMContentLoaded', loadOrders);
