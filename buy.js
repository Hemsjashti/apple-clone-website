// ==========================================
//  BUY PAGE SCRIPT
// ==========================================

const productSel = document.getElementById('product');
const quantityEl = document.getElementById('quantity');
const appleCareEl = document.getElementById('appleCare');
const deliveryEl = document.getElementById('delivery');
const colorEl = document.getElementById('color');
const storageEl = document.getElementById('storage');
const promoEl = document.getElementById('promo');
const applyPromoBtn = document.getElementById('applyPromo');
const promoMsg = document.getElementById('promoMsg');
const buyForm = document.getElementById('buyForm');

const productPriceEl = document.getElementById('productPrice');
const appCarePriceEl = document.getElementById('appleCarePrice');
const deliveryPriceEl = document.getElementById('deliveryPrice');
const discountPriceEl = document.getElementById('discountPrice');
const totalPriceEl = document.getElementById('totalPrice');
const deliveryDateEl = document.getElementById('deliveryDate');

const productPreview = document.getElementById('productPreview');
const previewImg = document.getElementById('previewImg');
const previewName = document.getElementById('previewName');
const previewConfig = document.getElementById('previewConfig');

let discount = 0;

const PROMO_CODES = {
    'APPLE10': { pct: 10, label: '10% off applied!' },
    'INDIA15': { pct: 15, label: '15% off applied!' },
    'STUDENT5': { pct: 5, label: '5% student discount applied!' },
    'APPLECARE20': { pct: 20, label: '20% off AppleCare!' },
};

function fmt(n) {
    return '₹' + n.toLocaleString('en-IN');
}

function updateSummary() {
    const opt = productSel ? productSel.options[productSel.selectedIndex] : null;
    const basePrice = productSel ? Number(productSel.value || 0) : 0;
    const qty = quantityEl ? Number(quantityEl.value || 1) : 1;
    const carePrice = appleCareEl && appleCareEl.checked ? 19900 : 0;
    const shipping = deliveryEl ? Number(deliveryEl.value || 0) : 0;

    // Update product preview
    if (opt && opt.value && productPreview) {
        productPreview.style.display = 'flex';
        previewImg.src = opt.dataset.img || '';
        previewName.textContent = opt.dataset.name || opt.text;
        previewConfig.textContent = (colorEl ? colorEl.value : '') + ' · ' + (storageEl ? storageEl.value : '');
    } else if (productPreview) {
        productPreview.style.display = 'none';
    }

    const subtotal = basePrice * qty + carePrice + shipping;
    const discountAmt = Math.round(subtotal * (discount / 100));
    const total = subtotal - discountAmt;

    if (productPriceEl) productPriceEl.textContent = fmt(basePrice * qty);
    if (appCarePriceEl) appCarePriceEl.textContent = carePrice ? fmt(carePrice) : '₹0';
    if (deliveryPriceEl) deliveryPriceEl.textContent = shipping ? fmt(shipping) : 'Free';
    if (discountPriceEl) discountPriceEl.textContent = discountAmt ? `− ${fmt(discountAmt)}` : '—';
    if (totalPriceEl) totalPriceEl.textContent = fmt(total);

    // Delivery date
    if (deliveryDateEl) {
        const d = new Date();
        d.setDate(d.getDate() + (shipping === 499 ? 2 : 5));
        deliveryDateEl.textContent = `📦 Estimated delivery: ${d.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' })}`;
    }
}

if (applyPromoBtn) {
    applyPromoBtn.addEventListener('click', () => {
        const code = (promoEl ? promoEl.value.trim().toUpperCase() : '');
        if (PROMO_CODES[code]) {
            discount = PROMO_CODES[code].pct;
            if (promoMsg) { promoMsg.textContent = '✓ ' + PROMO_CODES[code].label; promoMsg.style.color = '#34c759'; promoMsg.style.display = 'block'; }
        } else {
            discount = 0;
            if (promoMsg) { promoMsg.textContent = '✗ Invalid promo code.'; promoMsg.style.color = '#ff3b30'; promoMsg.style.display = 'block'; }
        }
        updateSummary();
    });
}

[productSel, quantityEl, appleCareEl, deliveryEl, colorEl, storageEl].forEach(el => {
    if (el) { el.addEventListener('input', updateSummary); el.addEventListener('change', updateSummary); }
});

updateSummary();

// Form submission
if (buyForm) {
    buyForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const terms = document.getElementById('terms');
        if (!terms || !terms.checked) {
            alert('Please agree to the Terms & Conditions to continue.');
            return;
        }
        if (!productSel || !productSel.value) {
            alert('Please select a product.');
            return;
        }

        const orderNum = 'APL-' + Date.now().toString(36).toUpperCase();
        const opt = productSel.options[productSel.selectedIndex];
        const total = totalPriceEl ? totalPriceEl.textContent : '';
        const name = document.getElementById('custName') ? document.getElementById('custName').value : '';

        localStorage.setItem('lastOrderNumber', orderNum);
        localStorage.setItem('lastOrderProduct', opt ? opt.dataset.name || opt.text : '');
        localStorage.setItem('lastOrderTotal', total);
        localStorage.setItem('lastOrderColor', colorEl ? colorEl.value : '');
        localStorage.setItem('lastOrderStorage', storageEl ? storageEl.value : '');
        localStorage.setItem('lastOrderDate', new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' }));
        localStorage.setItem('lastOrderStatus', 'Processing');
        if (name) localStorage.setItem('loggedInUser', document.getElementById('custEmail')?.value || localStorage.getItem('loggedInUser') || '');

        const msg = document.getElementById('orderMessage');
        if (msg) {
            msg.textContent = `Thank you, ${name || 'valued customer'}! Your order #${orderNum} has been placed. You'll receive a confirmation email shortly.`;
        }
        document.getElementById('confirmationModal').classList.add('active');
    });
}
