// ==========================================
//  APPLE STORE CLONE — MAIN SCRIPT
// ==========================================

// ── Promo Banner ──────────────────────────
const promoMessages = [
    'Now you can buy Apple Watch with education savings. <a href="#">Learn more ›</a>',
    'Get up to 12 months of No Cost EMI on selected Apple products. <a href="#">Shop now ›</a>',
    'Free delivery and easy returns on all Apple products. <a href="#">Learn more ›</a>',
    'Trade in your old iPhone and get up to ₹12,000 off. <a href="#">Check eligibility ›</a>'
];
let promoIndex = 0;
const promoText = document.querySelector('.promo-text');
const promoPrev = document.querySelector('.promo-banner .left');
const promoNext = document.querySelector('.promo-banner .right');

function updatePromo(dir = 1) {
    if (!promoText) return;
    promoText.style.opacity = '0';
    setTimeout(() => {
        promoIndex = (promoIndex + dir + promoMessages.length) % promoMessages.length;
        promoText.innerHTML = promoMessages[promoIndex];
        promoText.style.opacity = '1';
    }, 180);
}

if (promoNext) promoNext.addEventListener('click', () => updatePromo(1));
if (promoPrev) promoPrev.addEventListener('click', () => updatePromo(-1));
if (promoText) {
    promoText.innerHTML = promoMessages[0];
    promoText.style.transition = 'opacity 0.18s ease';
    setInterval(() => updatePromo(1), 6000);
}

// ── Hero Carousel ─────────────────────────
const products = [
    {
        label: 'New',
        title: 'iPhone 16 Pro',
        subtitle: 'Built for Apple Intelligence.',
        image: 'images/16-pro-max.png',
        alt: 'iPhone 16 Pro Max',
        learnMore: 'iphones/iphone16pro.html',
        bg: 'linear-gradient(165deg, #f8f8fa 0%, #eef0f5 100%)'
    },
    {
        label: 'Most Powerful',
        title: 'MacBook Pro',
        subtitle: 'Supercharged by M4.',
        image: 'images/macbookpro.png',
        alt: 'MacBook Pro',
        learnMore: 'macbooks/macbookpro.html',
        bg: 'linear-gradient(165deg, #f5f5f7 0%, #ebebee 100%)'
    },
    {
        label: 'Incredibly Thin',
        title: 'iPad Pro',
        subtitle: 'Unbelievably thin. Incredibly powerful.',
        image: 'images/ipadpro.png',
        alt: 'iPad Pro',
        learnMore: 'ipads/ipadpro.html',
        bg: 'linear-gradient(165deg, #f0f4f8 0%, #e8edf3 100%)'
    },
    {
        label: 'Thinstant Classic',
        title: 'Apple Watch',
        subtitle: 'Your health. On your wrist.',
        image: 'images/applewatch.png',
        alt: 'Apple Watch',
        learnMore: 'watch.html',
        bg: 'linear-gradient(165deg, #f8f4f0 0%, #f0ebe6 100%)'
    }
];

let currentProduct = 0;
let heroTimer = null;

const heroTitle = document.getElementById('heroTitle');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroImage = document.getElementById('heroImage');
const heroLabel = document.getElementById('heroLabel');
const learnMoreLink = document.getElementById('learnMoreLink');
const heroPrev = document.getElementById('heroPrev');
const heroNext = document.getElementById('heroNext');
const heroSection = document.querySelector('.hero');
const dotsContainer = document.querySelector('.hero-dots');

// Build dots
if (dotsContainer) {
    products.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Product ${i + 1}`);
        dot.addEventListener('click', () => goToProduct(i));
        dotsContainer.appendChild(dot);
    });
}

function updateDots() {
    document.querySelectorAll('.hero-dot').forEach((d, i) => {
        d.classList.toggle('active', i === currentProduct);
    });
}

function goToProduct(index) {
    currentProduct = index;
    updateHero();
    resetTimer();
}

function updateHero() {
    if (!heroTitle) return;
    const p = products[currentProduct];

    // Fade out
    if (heroImage) { heroImage.style.opacity = '0'; heroImage.style.transform = 'translateY(10px)'; }
    if (heroTitle) heroTitle.style.opacity = '0';
    if (heroSubtitle) heroSubtitle.style.opacity = '0';

    setTimeout(() => {
        if (heroTitle) heroTitle.textContent = p.title;
        if (heroSubtitle) heroSubtitle.textContent = p.subtitle;
        if (heroLabel) heroLabel.textContent = p.label;
        if (learnMoreLink) learnMoreLink.href = p.learnMore;
        if (heroSection) heroSection.style.background = p.bg;
        if (heroImage) {
            heroImage.src = p.image;
            heroImage.alt = p.alt;
        }
        // Fade in
        setTimeout(() => {
            if (heroTitle) heroTitle.style.opacity = '1';
            if (heroSubtitle) heroSubtitle.style.opacity = '1';
            if (heroImage) {
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateY(0)';
            }
        }, 50);
    }, 200);

    updateDots();
}

function resetTimer() {
    clearInterval(heroTimer);
    heroTimer = setInterval(() => {
        currentProduct = (currentProduct + 1) % products.length;
        updateHero();
    }, 6000);
}

if (heroNext) heroNext.addEventListener('click', () => { currentProduct = (currentProduct + 1) % products.length; updateHero(); resetTimer(); });
if (heroPrev) heroPrev.addEventListener('click', () => { currentProduct = (currentProduct - 1 + products.length) % products.length; updateHero(); resetTimer(); });

if (heroImage) {
    heroImage.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
}

resetTimer();

// ── Mobile Nav ────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
        const open = navLinks.classList.toggle('open');
        navToggle.innerHTML = open ? '✕' : '&#9776;';
    });
    // Close on outside click
    document.addEventListener('click', e => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('open');
            navToggle.innerHTML = '&#9776;';
        }
    });
}

// ── Active Nav Link ───────────────────────
(function markActiveLink() {
    const current = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        if (a.getAttribute('href') === current) a.classList.add('active');
    });
})();

// ── Scroll Reveal ─────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.category-card, .product-card, .feature-item, .order-card').forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// ── Live Search ───────────────────────────
const searchInput = document.getElementById('siteSearch');
if (searchInput) {
    const allPages = [
        { name: 'iPhone 16 Pro', url: 'iphones/iphone16pro.html' },
        { name: 'iPhone 17 Pro', url: 'iphones/iphone17pro.html' },
        { name: 'MacBook Air', url: 'macbooks/macbookair.html' },
        { name: 'MacBook Pro', url: 'macbooks/macbookpro.html' },
        { name: 'iPad Pro', url: 'ipads/ipadpro.html' },
        { name: 'Apple Watch', url: 'watch.html' },
        { name: 'AirPods Pro', url: 'airpods/airpodspro2.html' },
        { name: 'Accessories', url: 'accessories.html' },
        { name: 'Support', url: 'support.html' },
        { name: 'Store', url: 'store.html' },
    ];
    const dropdown = document.getElementById('searchDropdown');

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        if (!dropdown) return;
        if (!q) { dropdown.style.display = 'none'; return; }
        const matches = allPages.filter(p => p.name.toLowerCase().includes(q));
        if (!matches.length) { dropdown.style.display = 'none'; return; }
        dropdown.innerHTML = matches.map(m =>
            `<a href="${m.url}" class="search-result-item">${m.name}</a>`
        ).join('');
        dropdown.style.display = 'block';
    });
    document.addEventListener('click', e => {
        if (dropdown && !searchInput.contains(e.target)) dropdown.style.display = 'none';
    });
}

// ── Toast helper ──────────────────────────
function showToast(msg) {
    let t = document.getElementById('globalToast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'globalToast';
        t.className = 'toast';
        document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// ── Cart badge from localStorage ─────────
function updateCartBadge() {
    const badge = document.querySelector('.cart-badge');
    if (!badge) return;
    const count = parseInt(localStorage.getItem('cartCount') || '0');
    badge.textContent = count;
    badge.classList.toggle('visible', count > 0);
}
updateCartBadge();
