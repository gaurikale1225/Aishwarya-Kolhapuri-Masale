/**
 * Aishwarya Kolhapuri Masale - Main JavaScript File
 */

// Product Dataset
const products = [
  {
    id: 'kanda-lasun-masala',
    name: 'Authentic Kolhapuri Kanda Lasun Masala',
    category: 'kolhapuri-specials',
    heat: 5,
    bestseller: true,
    price: '₹140',
    oldPrice: '₹160',
    weight: '500g Pack',
    image: 'https://images.unsplash.com/photo-1628773822503-936a5367097e?auto=format&fit=crop&w=800&q=85',
    description: 'The iconic traditional Kolhapuri Onion Garlic spice mix pounded using authentic heritage recipe. Gives rich red tari, fiery aroma, and unmatched flavor to Veg & Non-Veg curries.'
  },
  {
    id: 'special-garam-masala',
    name: 'Aishwarya Royal Garam Masala',
    category: 'everyday-spices',
    heat: 4,
    bestseller: true,
    price: '₹180',
    oldPrice: '₹200',
    weight: '250g Pack',
    image: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=85',
    description: 'Artisanal blend of 24 sun-dried whole spices roasted over slow wood flame. Essential for biryani, rich curries, and royal Maharashtrian gravy dishes.'
  },
  {
    id: 'tambda-rassa-masala',
    name: 'Special Tambda Rassa Masala',
    category: 'nonveg-gravy',
    heat: 5,
    bestseller: true,
    price: '₹195',
    oldPrice: '₹220',
    weight: '500g Pack',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=85',
    description: 'Special formulation for making genuine Kolhapuri hotel-style Tambda Rassa (Red Mutton Curry). Unbeatable color, oil layer float (tari), and bold spice note.'
  },
  {
    id: 'sankeshwari-chili-powder',
    name: 'Pure Sankeshwari Red Chili Powder',
    category: 'everyday-spices',
    heat: 4,
    bestseller: false,
    price: '₹160',
    oldPrice: '₹175',
    weight: '500g Pack',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=800&q=85',
    description: '100% natural, deep crimson Sankeshwari chilies sourced directly from Kolhapuri farms. Delivers vibrant red natural color without added artificial dyes.'
  },
  {
    id: 'kolhapuri-mirchi-thecha',
    name: 'Traditional Green Mirchi Thecha',
    category: 'chutneys',
    heat: 5,
    bestseller: true,
    price: '₹95',
    oldPrice: '₹110',
    weight: '250g Jar',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=85',
    description: 'Coarsely hand-pounded spicy green chilies with garlic, roasted peanuts, and groundnut oil. Authentic Maharashtrian accompaniment for Bhakri and Jowar roti.'
  },
  {
    id: 'mutton-kolhapuri-masala',
    name: 'Special Mutton & Chicken Masala',
    category: 'nonveg-gravy',
    heat: 4,
    bestseller: false,
    price: '₹175',
    oldPrice: '₹195',
    weight: '500g Pack',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85',
    description: 'A rich roasted coconut and whole spice blend for authentic Maharashtrian meat curries, sukka chicken, and spicy gravy specialties.'
  },
  {
    id: 'dry-coconut-garlic-chutney',
    name: 'Shenga & Garlic Dry Chutney',
    category: 'chutneys',
    heat: 3,
    bestseller: false,
    price: '₹85',
    oldPrice: '₹100',
    weight: '200g Pack',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=85',
    description: 'Crispy roasted peanuts, dry coconut flakes, and garlic crushed with red chili. Perfect flavor booster for rice, chapati, and snack pairings.'
  },
  {
    id: 'haldi-turmeric-powder',
    name: 'Waigaon Pure Turmeric Powder',
    category: 'everyday-spices',
    heat: 1,
    bestseller: false,
    price: '₹120',
    oldPrice: '₹135',
    weight: '500g Pack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=85',
    description: 'High curcumin content pure golden turmeric powder. Steam sterilized and ground to preserve natural essential oils and immunity boosting properties.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  renderProducts('all');
  initCategoryFilters();
  initCounters();
  initBackToTop();
  initFormHandler();
  initSearchFilter();
});

// 1. Sticky Navbar Effect
function initNavbarScroll() {
  const navbar = document.querySelector('.custom-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 2. Render Products Grid
function renderProducts(categoryFilter = 'all', searchQuery = '') {
  const container = document.getElementById('products-grid');
  if (!container) return;

  let filtered = products;

  if (categoryFilter !== 'all') {
    filtered = filtered.filter(p => p.category === categoryFilter);
  }

  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="mb-3 text-muted fs-1"><i class="fas fa-pepper-hot"></i></div>
        <h4>No products found</h4>
        <p class="text-muted">Try selecting a different category or clearing search filter.</p>
        <button class="btn btn-outline-crimson mt-2" onclick="resetFilters()">Show All Products</button>
      </div>
    `;
    return;
  }

  const fallbackImg = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85';

  container.innerHTML = filtered.map(product => {
    const heatFlames = '🌶️'.repeat(product.heat);
    return `
      <div class="col-lg-3 col-md-6 mb-4" data-aos="fade-up">
        <div class="product-card">
          <div class="product-img-box">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null; this.src='${fallbackImg}';">
            <span class="spice-heat-tag">${heatFlames} Heat</span>
            ${product.bestseller ? '<span class="product-badge-bestseller"><i class="fas fa-crown me-1"></i> Bestseller</span>' : ''}
          </div>
          <div class="product-body">
            <h5 class="product-title">${product.name}</h5>
            <p class="product-desc">${product.description}</p>
            <div class="product-meta">
              <span class="product-weight">${product.weight}</span>
              <div class="product-price">${product.price} <small>${product.oldPrice}</small></div>
            </div>
            <div class="product-actions">
              <button class="btn-quick-inquiry" onclick="openEnquiryModal('${product.id}')">
                <i class="fas fa-envelope me-1"></i> Order
              </button>
              <a href="tel:+919876543210" class="btn-call-product" title="Call Now to Order">
                <i class="fas fa-phone-alt"></i>
              </a>
              <button class="btn-quick-view" onclick="openQuickViewModal('${product.id}')" title="Quick View">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 3. Category Filters
function initCategoryFilters() {
  const pills = document.querySelectorAll('.category-pill-btn');
  pills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      pills.forEach(p => p.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-category');
      renderProducts(cat);
    });
  });
}

function resetFilters() {
  const pills = document.querySelectorAll('.category-pill-btn');
  pills.forEach(p => p.classList.remove('active'));
  document.querySelector('[data-category="all"]').classList.add('active');
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) searchInput.value = '';
  renderProducts('all');
}

// 4. Search Filter
function initSearchFilter() {
  const searchInput = document.getElementById('product-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const activePill = document.querySelector('.category-pill-btn.active');
      const cat = activePill ? activePill.getAttribute('data-category') : 'all';
      renderProducts(cat, e.target.value);
    });
  }
}

// 5. Open Quick View Modal
function openQuickViewModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const modalTitle = document.getElementById('quickViewTitle');
  const modalBody = document.getElementById('quickViewBody');
  const fallbackImg = 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85';

  modalTitle.innerText = product.name;
  modalBody.innerHTML = `
    <div class="row align-items-center">
      <div class="col-md-5 mb-3 mb-md-0">
        <img src="${product.image}" class="img-fluid rounded-4 shadow-sm" alt="${product.name}" onerror="this.onerror=null; this.src='${fallbackImg}';">
      </div>
      <div class="col-md-7">
        <span class="badge bg-warning text-dark mb-2">${'🌶️'.repeat(product.heat)} Heat Rating</span>
        <h4 class="font-heading mb-2">${product.name}</h4>
        <p class="text-muted small mb-3">${product.description}</p>
        <div class="d-flex align-items-center gap-3 mb-3">
          <span class="fs-4 fw-bold text-danger">${product.price}</span>
          <span class="text-muted text-decoration-line-through">${product.oldPrice}</span>
          <span class="badge bg-light text-dark border">${product.weight}</span>
        </div>
        <ul class="list-unstyled small text-secondary mb-4">
          <li><i class="fas fa-check-circle text-success me-2"></i>100% Traditional Stone Pounded (Danka)</li>
          <li><i class="fas fa-check-circle text-success me-2"></i>No Artificial Dyes or Preservatives</li>
          <li><i class="fas fa-check-circle text-success me-2"></i>FSSAI Certified Fresh Batch</li>
        </ul>
        <div class="d-flex gap-2">
          <button class="btn btn-crimson flex-grow-1" onclick="closeModalAndEnquire('${product.id}')">
            <i class="fas fa-paper-plane me-2"></i> Send Bulk / Retail Enquiry
          </button>
          <a href="tel:+919876543210" class="btn btn-gold px-3" title="Call Now">
            <i class="fas fa-phone-alt me-1"></i> Call Now
          </a>
        </div>
      </div>
    </div>
  `;

  const qvModal = new bootstrap.Modal(document.getElementById('quickViewModal'));
  qvModal.show();
}

function closeModalAndEnquire(productId) {
  const qvModalEl = document.getElementById('quickViewModal');
  const modal = bootstrap.Modal.getInstance(qvModalEl);
  if (modal) modal.hide();
  setTimeout(() => {
    openEnquiryModal(productId);
  }, 400);
}

// 6. Open Enquiry Modal & Pre-fill Product
function openEnquiryModal(productId = '') {
  const product = products.find(p => p.id === productId);
  const selectEl = document.getElementById('enquiry-product-select');
  if (selectEl && product) {
    selectEl.value = product.name;
  }

  const enqModal = new bootstrap.Modal(document.getElementById('enquiryModal'));
  enqModal.show();
}

// 7. Form Handler & Simulation
function initFormHandler() {
  const mainForm = document.getElementById('main-contact-form');
  if (mainForm) {
    mainForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your enquiry has been received. Our team will contact you shortly.', 'success');
      mainForm.reset();
    });
  }

  const modalForm = document.getElementById('modal-enquiry-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalEl = document.getElementById('enquiryModal');
      const bsModal = bootstrap.Modal.getInstance(modalEl);
      if (bsModal) bsModal.hide();
      showToast('Enquiry Sent Successfully! We will respond via WhatsApp/Call soon.', 'success');
      modalForm.reset();
    });
  }
}

// 8. Dynamic Counters
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  const speed = 200;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        const updateCount = () => {
          count += inc;
          if (count < target) {
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target;
          }
        };
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

// 9. Back To Top
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('show');
    } else {
      btn.classList.remove('show');
    }
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 10. Toast Notification Helper
function showToast(message, type = 'success') {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;

  const toastId = 'toast-' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0 shadow-lg mb-2" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="fas fa-check-circle text-warning fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);
  const toastEl = document.getElementById(toastId);
  const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
  bsToast.show();
  toastEl.addEventListener('hidden.bs.toast', () => {
    toastEl.remove();
  });
}
