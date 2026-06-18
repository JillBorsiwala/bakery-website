// ===== DATA =====
// MENU DATA - REPLACE images with your own image URLs
const menuItems = [
    {
        id: 1,
        name: 'Classic Croissant',
        price: '$4.50',
        description: 'Butter, flaky, and perfectly golden',
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400'
    },
    {
        id: 2,
        name: 'Chocolate Cake',
        price: '$6.00',
        description: 'Rich, moist, with dark chocolate ganache',
        category: 'cake',
        image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400'
    },
    {
        id: 3,
        name: 'Sourdough Bread',
        price: '$5.50',
        description: 'Tangy, crusty artisan loaf',
        category: 'bread',
        image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400'
    },
    {
        id: 4,
        name: 'Blueberry Muffin',
        price: '$3.75',
        description: 'Packed with fresh blueberries',
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400'
    },
    {
        id: 5,
        name: 'Vanilla Cupcake',
        price: '$4.00',
        description: 'Fluffy vanilla with buttercream frosting',
        category: 'cake',
        image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400'
    },
    {
        id: 6,
        name: 'Cinnamon Roll',
        price: '$5.00',
        description: 'Gooey, spiced, with cream cheese icing',
        category: 'pastry',
        image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=400'
    }
];

// SPECIALITY DATA - REPLACE images with your own image URLs
const specialityItems = [
    {
        id: 101,
        name: 'Signature Red Velvet',
        price: '$8.00',
        description: 'Our most-loved cake with cream cheese frosting',
        badge: '⭐ Bestseller',
        image: 'https://images.unsplash.com/photo-1586788224331-947f68671cf1?w=400'
    },
    {
        id: 102,
        name: 'Artisan Croissant Platter',
        price: '$12.00',
        description: 'Assorted croissants with house-made jams',
        badge: '🥐 Chef\'s Choice',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400'
    },
    {
        id: 103,
        name: 'Honey Lavender Cake',
        price: '$9.00',
        description: 'Delicate, floral, and perfectly sweet',
        badge: '🌸 Seasonal',
        image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=400'
    }
];

// ===== RENDER MENU =====
function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    
    grid.innerHTML = menuItems.map(item => `
        <div class="menu-item" data-name="${item.name.toLowerCase()}" data-category="${item.category}">
            <img src="${item.image}" alt="${item.name}" />
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
            <p class="price">${item.price}</p>
        </div>
    `).join('');
}

// ===== RENDER SPECIALITY =====
function renderSpeciality() {
    const grid = document.getElementById('specialityGrid');
    if (!grid) return;
    
    grid.innerHTML = specialityItems.map(item => `
        <div class="speciality-item" data-name="${item.name.toLowerCase()}">
            <span class="badge">${item.badge}</span>
            <img src="${item.image}" alt="${item.name}" />
            <h4>${item.name}</h4>
            <p class="description">${item.description}</p>
            <p class="price">${item.price}</p>
        </div>
    `).join('');
}

// ===== SEARCH FUNCTIONALITY =====
const searchBtn = document.getElementById('searchBtn');
const searchOverlay = document.getElementById('searchOverlay');
const searchClose = document.getElementById('searchClose');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// All items combined for search
const allItems = [...menuItems, ...specialityItems];

function performSearch(query) {
    const trimmed = query.trim().toLowerCase();
    
    if (!trimmed) {
        searchResults.innerHTML = '<p class="no-results">Start typing to search for items...</p>';
        return;
    }
    
    const results = allItems.filter(item => 
        item.name.toLowerCase().includes(trimmed) ||
        item.description.toLowerCase().includes(trimmed) ||
        (item.category && item.category.toLowerCase().includes(trimmed))
    );
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <p class="no-results">😕 No items found for "<strong>${query}</strong>"</p>
            <p class="no-results" style="font-size:0.9rem;">Try searching for cake, bread, pastry, or a specific name</p>
        `;
        return;
    }
    
    searchResults.innerHTML = results.map(item => `
        <div class="search-result-item" data-id="${item.id}" data-name="${item.name}">
            <h4>${item.name}</h4>
            <p>${item.description} — ${item.price}</p>
            ${item.badge ? `<p style="font-size:0.8rem;color:#E8A87C;">${item.badge}</p>` : ''}
        </div>
    `).join('');
    
    // Add click to scroll to section
    document.querySelectorAll('.search-result-item').forEach(el => {
        el.addEventListener('click', function() {
            const name = this.dataset.name;
            // Find if it's in menu or speciality
            const isSpeciality = specialityItems.some(i => i.name === name);
            const targetId = isSpeciality ? 'speciality' : 'menu';
            
            closeSearch();
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            
            // Highlight the item
            setTimeout(() => {
                const items = document.querySelectorAll(
                    isSpeciality ? '.speciality-item' : '.menu-item'
                );
                items.forEach(item => {
                    const itemName = item.querySelector('h4')?.textContent;
                    if (itemName === name) {
                        item.style.transition = 'all 0.3s ease';
                        item.style.boxShadow = '0 0 0 3px #E8A87C, 0 8px 30px rgba(232,168,124,0.3)';
                        setTimeout(() => {
                            item.style.boxShadow = '';
                        }, 3000);
                    }
                });
            }, 500);
        });
    });
}

// Search with debounce
let searchTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        performSearch(this.value);
    }, 300);
});

// Open search
searchBtn.addEventListener('click', function() {
    searchOverlay.classList.add('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="no-results">Start typing to search for items...</p>';
    setTimeout(() => searchInput.focus(), 100);
    document.body.style.overflow = 'hidden';
});

// Close search
function closeSearch() {
    searchOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

searchClose.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', function(e) {
    if (e.target === this) closeSearch();
});

// Close on Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeSearch();
});

// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu
            document.getElementById('navLinks').classList.remove('open');
        }
    });
});

// ===== MOBILE HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon. 🧁');
        this.reset();
    });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    renderMenu();
    renderSpeciality();
    console.log('🍰 Just Yummy Bakery — Baked with love!');
});