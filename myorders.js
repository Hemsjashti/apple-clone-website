// ==========================================
//  MY ORDERS PAGE SCRIPT
// ==========================================

const container = document.getElementById('ordersContainer');
const greeting = document.getElementById('userGreeting');

const user = localStorage.getItem('loggedInUser');
const userName = localStorage.getItem('loggedInName');
const orderNumber = localStorage.getItem('lastOrderNumber');
const orderProduct = localStorage.getItem('lastOrderProduct');
const orderTotal = localStorage.getItem('lastOrderTotal');
const orderColor = localStorage.getItem('lastOrderColor');
const orderStorage = localStorage.getItem('lastOrderStorage');
const orderDate = localStorage.getItem('lastOrderDate');
const orderStatus = localStorage.getItem('lastOrderStatus') || 'Processing';

if (user && greeting) {
    greeting.textContent = `Welcome back, ${userName || user}! Here are your recent orders.`;
}

function getProductImage(productName) {
    if (!productName) return 'images/iphone.png';
    const n = productName.toLowerCase();
    if (n.includes('macbook')) return 'images/macbookair.png';
    if (n.includes('ipad')) return 'images/ipadpro.png';
    if (n.includes('watch')) return 'images/applewatch.png';
    if (n.includes('airpods')) return 'images/airpodspro.png';
    return 'images/16-pro-max.png';
}

function statusClass(s) {
    s = (s || '').toLowerCase();
    if (s.includes('deliver')) return 'delivered';
    if (s.includes('ship')) return 'shipped';
    return 'processing';
}

function renderOrders() {
    if (!container) return;

    if (!orderNumber) {
        container.innerHTML = `
            <div class="empty-orders">
                <div class="empty-icon">🛍️</div>
                <h3>No orders yet</h3>
                <p>Looks like you haven't placed any orders. Start shopping and your purchases will appear here.</p>
                <a href="store.html">Shop Now</a>
            </div>`;
        return;
    }

    container.innerHTML = `
        <div class="order-card">
            <div class="order-card-header">
                <img src="${getProductImage(orderProduct)}" alt="${orderProduct || 'Product'}">
                <div>
                    <h2>${orderProduct || 'Apple Product'}</h2>
                    <span class="order-status ${statusClass(orderStatus)}">● ${orderStatus}</span>
                </div>
            </div>

            <p id="userInfo" style="font-size:14px;color:#6e6e73;margin-bottom:16px;">
                ${user ? 'Ordered by: ' + (userName || user) : ''}
            </p>

            <ul class="spec-list">
                <li>Order Number: <strong style="margin-left:auto;">${orderNumber}</strong></li>
                <li>Product: <strong style="margin-left:auto;">${orderProduct || '—'}</strong></li>
                ${orderColor ? `<li>Color: <strong style="margin-left:auto;">${orderColor}</strong></li>` : ''}
                ${orderStorage ? `<li>Storage: <strong style="margin-left:auto;">${orderStorage}</strong></li>` : ''}
                <li>Total Paid: <strong style="margin-left:auto;">${orderTotal || '—'}</strong></li>
                ${orderDate ? `<li>Order Date: <strong style="margin-left:auto;">${orderDate}</strong></li>` : ''}
            </ul>

            <div class="card-links" style="justify-content:flex-start;gap:20px;">
                <a href="buy.html">Buy Again</a>
                <a href="support.html">Get Support</a>
                <a href="index.html">Back to Home</a>
            </div>
        </div>`;
}

renderOrders();
