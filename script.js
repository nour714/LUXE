/* =====================================================
   LUXE FASHION - CLEAN & STABLE VERSION
   ===================================================== */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initQuickViewModal();
    initSimpleCart();
    initBackToTop();
    initNavbarScroll();
    initPreloader();
    initLegendaryEffects();
    initMobileMenu();
    initScrollSpy();
    initSmoothScroll();
    initSearch();
    initCartSidebar();
});

// ============================================
// THEME TOGGLE
// ============================================

function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    if (!toggle) return;
    const icon = toggle.querySelector('i');
    
    const savedTheme = localStorage.getItem('luxe-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('luxe-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    }
}

// ============================================
// QUICK VIEW MODAL
// ============================================

function initQuickViewModal() {
    const modal = document.getElementById('quickViewModal');
    const closeBtn = document.querySelector('.close-modal');
    const triggers = document.querySelectorAll('.quick-view');
    
    if (!modal) return;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const card = trigger.closest('.product-card') || trigger.closest('.arrival-card');
            
            document.getElementById('modalProductName').textContent = card.querySelector('h3').textContent;
            document.getElementById('modalProductPrice').textContent = card.querySelector('.price').textContent;
            document.getElementById('modalProductImage').src = card.querySelector('img').src;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ============================================
// SIMPLE CART LOGIC
// ============================================

function initSimpleCart() {
    const cartCount = document.querySelector('.cart-count');
    const addBtns = document.querySelectorAll('.add-to-cart, .add-to-cart-simple, .add-to-cart-premium');
    let count = 0;

    addBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            count++;
            if(cartCount) cartCount.textContent = count;
            
            const originalText = btn.innerHTML;
            btn.innerHTML = '✓ Added';
            setTimeout(() => {
                btn.innerHTML = originalText;
            }, 2000);
        });
    });
}

// ============================================
// BACK TO TOP
// ============================================

function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// NAVBAR SCROLL
// ============================================

function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// PRELOADER
// ============================================

function initPreloader() {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });
}

// ============================================
// LEGENDARY EFFECTS
// ============================================

function initLegendaryEffects() {
    // Reveal Observer
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(reveal => observer.observe(reveal));

    // Mouse Tracking Glow
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left);
            const y = (e.clientY - rect.top);
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
}
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : 'auto';
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSearch() {
    const navSearch = document.getElementById('navSearch');
    const searchTrigger = document.querySelector('.search-trigger');
    const searchInput = document.querySelector('.search-input-inline');

    if (!navSearch || !searchTrigger) return;

    searchTrigger.addEventListener('click', (e) => {
        e.preventDefault();
        navSearch.classList.toggle('active');
        if (navSearch.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Search and Scroll Logic
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.toLowerCase().trim();
            if (!query) return;

            // Target products, arrivals, and sections
            const items = document.querySelectorAll('.product-card, .arrival-card, section');
            let foundElement = null;

            for (const item of items) {
                // Check in headers or the title specifically
                const title = item.querySelector('h1, h2, h3');
                if (title && title.innerText.toLowerCase().includes(query)) {
                    foundElement = item;
                    break;
                }
            }

            if (foundElement) {
                foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Premium visual highlight
                foundElement.style.transition = 'all 0.5s ease';
                foundElement.style.filter = 'brightness(1.5) contrast(1.2)';
                setTimeout(() => {
                    foundElement.style.filter = '';
                }, 1500);
            } else {
                searchInput.value = '';
                searchInput.placeholder = 'Not found...';
                setTimeout(() => searchInput.placeholder = 'Search...', 1500);
            }

            navSearch.classList.remove('active');
            searchInput.blur();
        }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!navSearch.contains(e.target) && navSearch.classList.contains('active')) {
            navSearch.classList.remove('active');
        }
    });
}

function initCartSidebar() {
    const cartIcon = document.querySelector('.cart-icon');
    const cartSidebar = document.getElementById('cartSidebar');
    const cartClose = document.querySelector('.close-cart');

    if (!cartSidebar || !cartIcon) return;

    cartIcon.addEventListener('click', (e) => {
        e.preventDefault();
        cartSidebar.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    if(cartClose) {
        cartClose.addEventListener('click', () => {
            cartSidebar.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
}
