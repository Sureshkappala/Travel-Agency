/**
 * WANDERLUST TRAVEL AGENCY - MAIN JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript (ES6+) - Fast, Modular & Lightweight
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initDashboardDrawer();
  initHomepageWizard();
  initTestimonialSlider();
  initFAQAccordion();
  initItineraryAccordion();
  initGalleryThumbnails();
  initLiveSearchAndFilters();
  initBookingSystem();
  initAuthValidation();
  initWishlist();
  initDashboardCharts();
  initScrollRevealAnimations();
  initUserSession();
});

/* ==========================================================================
   1. STICKY NAVBAR & SCROLL EFFECTS
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE HAMBURGER MENU & DRAWER
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-toggle');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  if (!hamburger || !drawer || !overlay) return;

  function openMenu() {
    hamburger.classList.add('active');
    drawer.classList.add('open');
    overlay.classList.add('active');
    document.body.classList.add('no-scroll');
    hamburger.setAttribute('aria-expanded', 'true');
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  overlay.addEventListener('click', closeMenu);

  // Close when clicking explicit close button inside drawer header
  const closeBtn = drawer.querySelector('.mobile-drawer-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close when clicking any nav link inside mobile drawer
  const mobileLinks = drawer.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   3. DASHBOARD MOBILE SIDEBAR DRAWER (USER & ADMIN)
   ========================================================================== */
function initDashboardDrawer() {
  const drawerBtn = document.querySelector('.dashboard-drawer-btn');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.dashboard-overlay');
  if (!drawerBtn || !sidebar) return;

  function openSidebar() {
    sidebar.classList.add('open');
    if (overlay) overlay.classList.add('active');
    document.body.classList.add('no-scroll');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
  }

  drawerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (sidebar.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  const sidebarClose = sidebar.querySelector('.sidebar-close-btn');
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Click outside to close
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && sidebar.classList.contains('open')) {
      if (!sidebar.contains(e.target) && !drawerBtn.contains(e.target)) {
        closeSidebar();
      }
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Close when clicking sidebar links on mobile
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-link');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992) {
        closeSidebar();
      }
    });
  });
}

/* ==========================================================================
   4. HOMEPAGE INTERACTIVE TRIP PLANNER (SECTION 6)
   ========================================================================== */
function initHomepageWizard() {
  const wizardContainer = document.querySelector('.plan-wizard-card');
  if (!wizardContainer) return;

  const tabs = wizardContainer.querySelectorAll('.wizard-step-tab');
  const panels = wizardContainer.querySelectorAll('.wizard-step-panel');
  const prevBtn = wizardContainer.querySelector('.wizard-prev-btn');
  const nextBtn = wizardContainer.querySelector('.wizard-next-btn');

  let currentStep = 1;
  const maxStep = 4;

  const wizardState = {
    destination: 'Bali, Indonesia',
    dates: 'Next Month (Flexible)',
    experience: 'Adventure & Nature',
    travelers: 2
  };

  function updateWizardUI() {
    tabs.forEach((tab, index) => {
      const stepNum = index + 1;
      tab.classList.toggle('active', stepNum === currentStep);
    });

    panels.forEach((panel, index) => {
      const stepNum = index + 1;
      panel.classList.toggle('active', stepNum === currentStep);
    });

    if (prevBtn) {
      prevBtn.style.visibility = currentStep === 1 ? 'hidden' : 'visible';
    }

    if (nextBtn) {
      if (currentStep === maxStep) {
        nextBtn.textContent = 'Book This Trip →';
      } else {
        nextBtn.textContent = 'Next Step →';
      }
    }

    // Update Step 4 Review summary fields
    const reviewDest = document.getElementById('review-dest');
    const reviewDates = document.getElementById('review-dates');
    const reviewExp = document.getElementById('review-exp');
    const reviewTravelers = document.getElementById('review-travelers');

    if (reviewDest) reviewDest.textContent = wizardState.destination;
    if (reviewDates) reviewDates.textContent = wizardState.dates;
    if (reviewExp) reviewExp.textContent = wizardState.experience;
    if (reviewTravelers) reviewTravelers.textContent = `${wizardState.travelers} Persons`;
  }

  // Handle Tab clicks
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      currentStep = index + 1;
      updateWizardUI();
    });
  });

  // Handle Option Clicks in panels
  const optionItems = wizardContainer.querySelectorAll('.wizard-option-item');
  optionItems.forEach(item => {
    item.addEventListener('click', function () {
      const parentPanel = this.closest('.wizard-step-panel');
      if (!parentPanel) return;

      parentPanel.querySelectorAll('.wizard-option-item').forEach(el => el.classList.remove('selected'));
      this.classList.add('selected');

      const dataField = this.getAttribute('data-field');
      const dataValue = this.getAttribute('data-value') || this.querySelector('strong')?.textContent.trim();

      if (dataField && dataValue) {
        wizardState[dataField] = dataValue;
      }
    });
  });

  // Next / Continue button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep < maxStep) {
        currentStep++;
        updateWizardUI();
      } else {
        // Redirect to booking with query parameters
        const query = new URLSearchParams({
          destination: wizardState.destination,
          type: wizardState.experience,
          travelers: wizardState.travelers
        }).toString();
        window.location.href = `booking.html?${query}`;
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }

  updateWizardUI();
}

/* ==========================================================================
   5. TESTIMONIAL SLIDER / CAROUSEL (SECTION 9)
   ========================================================================== */
function initTestimonialSlider() {
  const container = document.querySelector('.testimonial-slider-container');
  if (!container) return;

  const track = container.querySelector('.testimonial-track');
  const slides = container.querySelectorAll('.testimonial-slide');
  const prevBtn = container.querySelector('.slider-prev');
  const nextBtn = container.querySelector('.slider-next');
  const dotsContainer = container.querySelector('.slider-dots');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  // Generate Dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = `slider-dot ${i === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentIndex));
    }
  }

  function goToSlide(index) {
    currentIndex = (index + slides.length) % slides.length;
    updateSlider();
    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  container.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
  container.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
}

/* ==========================================================================
   6. FAQ ACCORDION (SMOOTH TOGGLE)
   ========================================================================== */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  // Guarantee all items start closed by default
  faqItems.forEach(item => item.classList.remove('open'));

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close other items for single-accordion style
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('open');
        }
      });

      item.classList.toggle('open', !isOpen);
    });
  });
}

/* ==========================================================================
   7. TOUR ITINERARY ACCORDION
   ========================================================================== */
function initItineraryAccordion() {
  const itineraryItems = document.querySelectorAll('.itinerary-item');
  if (itineraryItems.length === 0) return;

  // Guarantee all itinerary items start closed by default
  itineraryItems.forEach(item => item.classList.remove('open'));

  itineraryItems.forEach(item => {
    const header = item.querySelector('.itinerary-header');
    if (!header) return;

    header.addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

/* ==========================================================================
   8. IMAGE GALLERY THUMBNAIL SWITCHER
   ========================================================================== */
function initGalleryThumbnails() {
  const mainImage = document.querySelector('.gallery-main-view img');
  const thumbs = document.querySelectorAll('.gallery-thumb');
  if (!mainImage || thumbs.length === 0) return;

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function () {
      const thumbImg = this.querySelector('img');
      if (!thumbImg) return;

      thumbs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');

      mainImage.style.opacity = '0.4';
      setTimeout(() => {
        mainImage.src = thumbImg.src;
        mainImage.alt = thumbImg.alt;
        mainImage.style.opacity = '1';
      }, 150);
    });
  });
}

/* ==========================================================================
   9. LIVE SEARCH & MULTI-FILTER ENGINE (DESTINATIONS, PACKAGES, HOTELS)
   ========================================================================== */
function initLiveSearchAndFilters() {
  const filterContainer = document.querySelector('.filter-bar-card');
  if (!filterContainer) return;

  const searchInput = document.querySelector('.filter-search-input');
  const regionSelect = document.querySelector('.filter-region-select');
  const typeSelect = document.querySelector('.filter-type-select');
  const priceSelect = document.querySelector('.filter-price-select');
  const durationSelect = document.querySelector('.filter-duration-select');
  const ratingSelect = document.querySelector('.filter-rating-select');
  const clearBtn = document.querySelector('.filter-clear-btn');
  const tagPills = document.querySelectorAll('.filter-tag-pill');
  const noResults = document.querySelector('.no-results-state');

  const items = document.querySelectorAll('[data-filterable-item]');
  if (items.length === 0) return;

  let activeTag = 'all';

  function applyFilters() {
    const query = (searchInput ? searchInput.value : '').toLowerCase().trim();
    const regionVal = regionSelect ? regionSelect.value.toLowerCase() : 'all';
    const typeVal = typeSelect ? typeSelect.value.toLowerCase() : 'all';
    const priceVal = priceSelect ? priceSelect.value : 'all';
    const durationVal = durationSelect ? durationSelect.value : 'all';
    const ratingVal = ratingSelect ? ratingSelect.value : 'all';

    let matchCount = 0;

    items.forEach(item => {
      const name = (item.getAttribute('data-name') || '').toLowerCase();
      const country = (item.getAttribute('data-country') || '').toLowerCase();
      const region = (item.getAttribute('data-region') || '').toLowerCase();
      const type = (item.getAttribute('data-type') || '').toLowerCase();
      const price = parseFloat(item.getAttribute('data-price') || '0');
      const duration = parseInt(item.getAttribute('data-duration') || '0', 10);
      const rating = parseFloat(item.getAttribute('data-rating') || '0');

      let matches = true;

      // Text query match (name, country, or type)
      if (query && !name.includes(query) && !country.includes(query) && !type.includes(query)) {
        matches = false;
      }

      // Region match
      if (matches && regionVal !== 'all' && region !== regionVal) {
        matches = false;
      }

      // Type match
      if (matches && typeVal !== 'all' && !type.includes(typeVal)) {
        matches = false;
      }

      // Tag match
      if (matches && activeTag !== 'all' && region !== activeTag && !type.includes(activeTag)) {
        matches = false;
      }

      // Price match
      if (matches && priceVal !== 'all') {
        if (priceVal === 'under-1000' && price > 1000) matches = false;
        else if (priceVal === '1000-2000' && (price < 1000 || price > 2000)) matches = false;
        else if (priceVal === 'over-2000' && price < 2000) matches = false;
      }

      // Duration match
      if (matches && durationVal !== 'all') {
        if (durationVal === 'short' && duration > 4) matches = false;
        else if (durationVal === 'medium' && (duration < 5 || duration > 7)) matches = false;
        else if (durationVal === 'long' && duration < 8) matches = false;
      }

      // Rating match
      if (matches && ratingVal !== 'all') {
        if (rating < parseFloat(ratingVal)) matches = false;
      }

      if (matches) {
        item.style.display = '';
        matchCount++;
      } else {
        item.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.classList.toggle('show', matchCount === 0);
    }
  }

  if (searchInput) searchInput.addEventListener('input', applyFilters);
  if (regionSelect) regionSelect.addEventListener('change', applyFilters);
  if (typeSelect) typeSelect.addEventListener('change', applyFilters);
  if (priceSelect) priceSelect.addEventListener('change', applyFilters);
  if (durationSelect) durationSelect.addEventListener('change', applyFilters);
  if (ratingSelect) ratingSelect.addEventListener('change', applyFilters);

  tagPills.forEach(pill => {
    pill.addEventListener('click', function () {
      tagPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      activeTag = (this.getAttribute('data-tag') || 'all').toLowerCase();
      applyFilters();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (regionSelect) regionSelect.value = 'all';
      if (typeSelect) typeSelect.value = 'all';
      if (priceSelect) priceSelect.value = 'all';
      if (durationSelect) durationSelect.value = 'all';
      if (ratingSelect) ratingSelect.value = 'all';
      tagPills.forEach(p => p.classList.remove('active'));
      if (tagPills[0]) tagPills[0].classList.add('active');
      activeTag = 'all';
      applyFilters();
    });
  }

  // Pre-fill search from URL params if present (e.g., from hero search panel)
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get('search');
  const typeParam = urlParams.get('type');
  const regionParam = urlParams.get('region');

  if (searchParam && searchInput) searchInput.value = searchParam;
  if (typeParam && typeSelect) typeSelect.value = typeParam.toLowerCase();
  if (regionParam && regionSelect) regionSelect.value = regionParam.toLowerCase();

  applyFilters();
}

/* ==========================================================================
   10. TRIP BOOKING FORM VALIDATION & SUMMARY CALCULATION
   ========================================================================== */
function initBookingSystem() {
  const bookingForm = document.getElementById('trip-booking-form');
  const confirmationContainer = document.getElementById('booking-confirmation-details');

  // Handle Booking Page
  if (bookingForm) {
    const urlParams = new URLSearchParams(window.location.search);
    const destParam = urlParams.get('destination') || urlParams.get('dest');
    const pkgParam = urlParams.get('package') || urlParams.get('pkg');
    const typeParam = urlParams.get('type');
    const travelersParam = urlParams.get('travelers');

    const destSelect = document.getElementById('booking-destination');
    const pkgSelect = document.getElementById('booking-package');
    const travelersInput = document.getElementById('booking-travelers');
    const dateInput = document.getElementById('booking-date');
    const returnDateInput = document.getElementById('booking-return-date');

    if (destParam && destSelect) destSelect.value = destParam;
    if (pkgParam && pkgSelect) pkgSelect.value = pkgParam;
    if (travelersParam && travelersInput) travelersInput.value = travelersParam;

    // Live Summary Calculation
    function updateBookingSummary() {
      const numTravelers = parseInt(travelersInput?.value || '1', 10);
      const pkgBasePrice = getPackageBasePrice(pkgSelect?.value || 'bali-escape');
      const subtotal = pkgBasePrice * numTravelers;
      const taxes = Math.round(subtotal * 0.12);
      const total = subtotal + taxes;

      const summaryPkg = document.getElementById('summary-pkg-name');
      const summaryTravelers = document.getElementById('summary-travelers');
      const summarySubtotal = document.getElementById('summary-subtotal');
      const summaryTaxes = document.getElementById('summary-taxes');
      const summaryTotal = document.getElementById('summary-total');

      if (summaryPkg) summaryPkg.textContent = pkgSelect ? pkgSelect.options[pkgSelect.selectedIndex]?.text : 'Selected Package';
      if (summaryTravelers) summaryTravelers.textContent = `${numTravelers} ${numTravelers > 1 ? 'Travelers' : 'Traveler'}`;
      if (summarySubtotal) summarySubtotal.textContent = `$${subtotal.toLocaleString()}`;
      if (summaryTaxes) summaryTaxes.textContent = `$${taxes.toLocaleString()}`;
      if (summaryTotal) summaryTotal.textContent = `$${total.toLocaleString()}`;
    }

    function getPackageBasePrice(pkg) {
      const priceMap = {
        'bali-escape': 890,
        'dubai-explorer': 1250,
        'maldives-getaway': 1950,
        'swiss-adventure': 2450,
        'thailand-discovery': 780,
        'safari-kenya': 2100,
        'amalfi-coast': 1850,
        'iceland-aurora': 2200,
        'santorini-romance': 1650
      };
      return priceMap[pkg] || 950;
    }

    if (pkgSelect) pkgSelect.addEventListener('change', updateBookingSummary);
    if (travelersInput) travelersInput.addEventListener('input', updateBookingSummary);
    updateBookingSummary();

    // Form Submission Validation
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = document.getElementById('booking-name');
      const email = document.getElementById('booking-email');
      const phone = document.getElementById('booking-phone');

      // Clear previous error states
      bookingForm.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));

      if (!name || name.value.trim().length < 3) {
        showError(name, 'Please enter a valid full name');
        isValid = false;
      }

      if (!email || !isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        isValid = false;
      }

      if (!phone || phone.value.trim().length < 7) {
        showError(phone, 'Please enter a valid phone number');
        isValid = false;
      }

      if (!dateInput || !dateInput.value) {
        showError(dateInput, 'Please select a departure date');
        isValid = false;
      }

      if (dateInput && returnDateInput && returnDateInput.value && returnDateInput.value <= dateInput.value) {
        showError(returnDateInput, 'Return date must be after departure date');
        isValid = false;
      }

      if (!isValid) return;

      // Save Booking details in localStorage
      const bookingData = {
        bookingId: 'WAN-' + Math.floor(100000 + Math.random() * 900000),
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        destination: destSelect ? destSelect.options[destSelect.selectedIndex]?.text : 'Bali, Indonesia',
        package: pkgSelect ? pkgSelect.options[pkgSelect.selectedIndex]?.text : 'Bali Escape',
        departureDate: dateInput.value,
        returnDate: returnDateInput?.value || 'Flexible',
        travelers: travelersInput?.value || '1',
        tripType: bookingForm.querySelector('input[name="tripType"]:checked')?.value || 'Couple',
        total: document.getElementById('summary-total')?.textContent || '$996',
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      localStorage.setItem('lastBooking', JSON.stringify(bookingData));
      window.location.href = 'booking-confirmation.html';
    });
  }

  // Handle Confirmation Page Display
  if (confirmationContainer) {
    const rawData = localStorage.getItem('lastBooking');
    const booking = rawData ? JSON.parse(rawData) : {
      bookingId: 'WAN-847291',
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+1 (555) 234-5678',
      destination: 'Bali, Indonesia',
      package: 'Bali Escape (5 Days)',
      departureDate: '2026-11-15',
      returnDate: '2026-11-20',
      travelers: '2',
      tripType: 'Couple',
      total: '$1,994',
      createdAt: 'Today'
    };

    const setField = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setField('conf-id', booking.bookingId);
    setField('conf-name', booking.name);
    setField('conf-email', booking.email);
    setField('conf-phone', booking.phone);
    setField('conf-dest', booking.destination);
    setField('conf-pkg', booking.package);
    setField('conf-dates', `${booking.departureDate} to ${booking.returnDate}`);
    setField('conf-travelers', `${booking.travelers} Persons (${booking.tripType})`);
    setField('conf-total', booking.total);
    setField('conf-date-created', booking.createdAt);

    const printBtn = document.getElementById('btn-print-receipt');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  function showError(inputEl, msg) {
    if (!inputEl) return;
    const parent = inputEl.closest('.form-group');
    if (parent) {
      parent.classList.add('has-error');
      const err = parent.querySelector('.form-error');
      if (err) err.textContent = msg;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
}

/* ==========================================================================
   11. AUTH FORMS VALIDATION (LOGIN & REGISTER)
   ========================================================================== */
function initAuthValidation() {
  // Password Visibility Toggle
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const input = this.parentElement.querySelector('input');
      if (!input) return;
      if (input.type === 'password') {
        input.type = 'text';
        this.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"></path></svg>`;
      } else {
        input.type = 'password';
        this.innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
      }
    });
  });

  // Login Form & Role Toggle
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    const roleRadios = loginForm.querySelectorAll('input[name="auth-role"]');
    const submitBtn = document.getElementById('login-submit-btn') || loginForm.querySelector('button[type="submit"]');
    const emailInput = document.getElementById('login-email');
    const hintBox = document.getElementById('login-hint-box');
    const subtext = document.getElementById('login-subtext');

    roleRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'admin') {
          if (emailInput && (emailInput.value === 'traveler@wanderlust.com' || !emailInput.value)) {
            emailInput.value = 'admin@wanderlust.com';
          }
          if (submitBtn) submitBtn.textContent = 'Sign In to Admin Portal →';
          if (subtext) subtext.textContent = 'Sign in to access Agency Admin operations, tour metrics, and bookings.';
          if (hintBox) hintBox.innerHTML = '💡 <strong>Admin Demo:</strong> Submitting will sign you directly into the <strong>Agency Admin Dashboard</strong>.';
        } else {
          if (emailInput && (emailInput.value === 'admin@wanderlust.com' || !emailInput.value)) {
            emailInput.value = 'traveler@wanderlust.com';
          }
          if (submitBtn) submitBtn.textContent = 'Sign In as Traveler →';
          if (subtext) subtext.textContent = 'Select your role to access your personalized travel dashboard.';
          if (hintBox) hintBox.innerHTML = '💡 <strong>Traveler Demo:</strong> Submitting will sign you directly into the <strong>Customer Travel Dashboard</strong>.';
        }
      });
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email');
      const pass = document.getElementById('login-pass');
      const selectedRole = loginForm.querySelector('input[name="auth-role"]:checked')?.value || 'customer';
      let valid = true;

      if (!email || !email.value.includes('@')) {
        loginForm.querySelector('.login-email-group')?.classList.add('has-error');
        valid = false;
      }
      if (!pass || pass.value.length < 6) {
        loginForm.querySelector('.login-pass-group')?.classList.add('has-error');
        valid = false;
      }

      if (valid) {
        // Redirect based on chosen role
        if (selectedRole === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'user-dashboard.html';
        }
      }
    });
  }

  // Register Form & Role Toggle
  const regForm = document.getElementById('register-form');
  if (regForm) {
    const regRoleRadios = regForm.querySelectorAll('input[name="reg-role"]');
    const regSubmitBtn = document.getElementById('reg-submit-btn') || regForm.querySelector('button[type="submit"]');
    const regSubtext = document.getElementById('reg-subtext');
    const regTypeLabel = document.getElementById('reg-type-label');
    const regTypeSelect = document.getElementById('reg-travel-type');

    regRoleRadios.forEach(radio => {
      radio.addEventListener('change', () => {
        if (radio.value === 'admin') {
          if (regSubmitBtn) regSubmitBtn.textContent = 'Register Agency Admin Account →';
          if (regSubtext) regSubtext.textContent = 'Register an authorized staff account for Agency Operations & Tour Management.';
          if (regTypeLabel) regTypeLabel.textContent = 'Agency Department / Role';
          if (regTypeSelect) {
            regTypeSelect.innerHTML = `
              <option value="tour-ops">Tour Operations & Logistics</option>
              <option value="booking-agent">Booking Specialist & Concierge</option>
              <option value="finance">Finance & Revenue Management</option>
              <option value="super-admin">Executive Agency Director</option>
            `;
          }
        } else {
          if (regSubmitBtn) regSubmitBtn.textContent = 'Create Traveler Account →';
          if (regSubtext) regSubtext.textContent = 'Choose your registration role to set up your account.';
          if (regTypeLabel) regTypeLabel.textContent = 'Preferred Travel Style';
          if (regTypeSelect) {
            regTypeSelect.innerHTML = `
              <option value="couple">Couple / Romantic Escapes</option>
              <option value="adventure">Adventure & Trekking</option>
              <option value="luxury">Luxury Stays & Private Villas</option>
              <option value="family">Family Vacations</option>
              <option value="solo">Solo Cultural Expeditions</option>
            `;
          }
        }
      });
    });

    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('reg-name');
      const email = document.getElementById('reg-email');
      const phone = document.getElementById('reg-phone');
      const pass = document.getElementById('reg-pass');
      const confirmPass = document.getElementById('reg-confirm-pass');
      const selectedRole = regForm.querySelector('input[name="reg-role"]:checked')?.value || 'customer';
      let valid = true;

      if (!name || name.value.trim().length < 2 || /[0-9]/.test(name.value)) {
        name?.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
      if (!email || !email.value.includes('@')) {
        email?.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
      if (!phone || phone.value.trim().length < 7 || /[a-zA-Z]/.test(phone.value)) {
        phone?.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
      if (!pass || pass.value.length < 6) {
        pass?.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }
      if (pass && confirmPass && pass.value !== confirmPass.value) {
        confirmPass.closest('.form-group')?.classList.add('has-error');
        valid = false;
      }

      if (valid) {
        if (selectedRole === 'admin') {
          window.location.href = 'admin-dashboard.html';
        } else {
          window.location.href = 'user-dashboard.html';
        }
      }
    });
  }

  // Real-time Input Sanitization & Validation:
  // Disallow numbers in Name fields & Disallow alphabets in Mobile/Phone fields
  const nameInputs = document.querySelectorAll('#reg-name, #contact-name, #booking-name, input[name="name"], input[name="fullName"]');
  nameInputs.forEach(input => {
    input.addEventListener('input', function () {
      // Remove any numeric digits typed or pasted
      const sanitized = this.value.replace(/[0-9]/g, '');
      if (this.value !== sanitized) {
        this.value = sanitized;
      }
      const parent = this.closest('.form-group');
      if (parent) {
        if (this.value.trim().length >= 2 && !/[0-9]/.test(this.value)) {
          parent.classList.remove('has-error');
        }
      }
    });
    input.addEventListener('keydown', function (e) {
      // Block number keys 0-9 from being typed
      if ((e.key >= '0' && e.key <= '9') && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    });
  });

  const phoneInputs = document.querySelectorAll('#reg-phone, #contact-phone, #booking-phone, input[type="tel"], input[name="phone"]');
  phoneInputs.forEach(input => {
    input.addEventListener('input', function () {
      // Remove any alphabetic characters typed or pasted
      const sanitized = this.value.replace(/[a-zA-Z]/g, '');
      if (this.value !== sanitized) {
        this.value = sanitized;
      }
      const parent = this.closest('.form-group');
      if (parent) {
        const digitsOnly = this.value.replace(/\D/g, '');
        if (digitsOnly.length >= 7 && !/[a-zA-Z]/.test(this.value)) {
          parent.classList.remove('has-error');
        }
      }
    });
    input.addEventListener('keydown', function (e) {
      // Block alphabet keys a-z, A-Z from being typed
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
      }
    });
  });

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const cName = document.getElementById('contact-name');
      const cEmail = document.getElementById('contact-email');
      const cPhone = document.getElementById('contact-phone');
      const cSubject = document.getElementById('contact-subject');
      const cMessage = document.getElementById('contact-message');
      let isFormValid = true;

      if (!cName || cName.value.trim().length < 2 || /[0-9]/.test(cName.value)) {
        cName?.closest('.form-group')?.classList.add('has-error');
        isFormValid = false;
      }
      if (!cEmail || !cEmail.value.includes('@')) {
        cEmail?.closest('.form-group')?.classList.add('has-error');
        isFormValid = false;
      }
      if (cPhone && cPhone.value.trim().length > 0) {
        const digitsOnly = cPhone.value.replace(/\D/g, '');
        if (digitsOnly.length < 7 || /[a-zA-Z]/.test(cPhone.value)) {
          cPhone?.closest('.form-group')?.classList.add('has-error');
          isFormValid = false;
        }
      }
      if (!cSubject || cSubject.value.trim().length < 2) {
        cSubject?.closest('.form-group')?.classList.add('has-error');
        isFormValid = false;
      }
      if (!cMessage || cMessage.value.trim().length < 5) {
        cMessage?.closest('.form-group')?.classList.add('has-error');
        isFormValid = false;
      }

      if (isFormValid) {
        const successMsg = document.getElementById('contact-success-msg');
        if (successMsg) {
          successMsg.style.display = 'block';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        contactForm.reset();
      }
    });
  }
}

/* ==========================================================================
   12. WISHLIST MANAGEMENT
   ========================================================================== */
function initWishlist() {
  const wishlistButtons = document.querySelectorAll('.wishlist-toggle-btn');
  const wishlistBadge = document.querySelector('.nav-wishlist-count');

  let savedWishlist = JSON.parse(localStorage.getItem('travelWishlist') || '[]');

  function updateBadge() {
    if (wishlistBadge) {
      wishlistBadge.textContent = savedWishlist.length;
      wishlistBadge.style.display = savedWishlist.length > 0 ? 'flex' : 'none';
    }
  }

  wishlistButtons.forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (savedWishlist.includes(id)) {
      btn.classList.add('active');
    }

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const itemId = btn.getAttribute('data-id') || 'item-' + Math.random();
      if (savedWishlist.includes(itemId)) {
        savedWishlist = savedWishlist.filter(item => item !== itemId);
        btn.classList.remove('active');
      } else {
        savedWishlist.push(itemId);
        btn.classList.add('active');
      }

      localStorage.setItem('travelWishlist', JSON.stringify(savedWishlist));
      updateBadge();
    });
  });

  updateBadge();
}

/* ==========================================================================
   13. DASHBOARD CHARTS (LIGHTWEIGHT CUSTOM SVG & CANVAS)
   ========================================================================== */
function initDashboardCharts() {
  const chartCanvas = document.getElementById('admin-revenue-chart');
  if (!chartCanvas) return;

  const ctx = chartCanvas.getContext('2d');
  if (!ctx) return;

  // Render smooth demo canvas bar & line chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const data = [28000, 35000, 42000, 39000, 56000, 68000, 85000, 92000, 78000, 64000, 88000, 98000];

  const width = chartCanvas.width = chartCanvas.parentElement.clientWidth || 600;
  const height = chartCanvas.height = 240;
  const padding = 35;
  const chartHeight = height - padding * 2;
  const chartWidth = width - padding * 2;
  const maxVal = Math.max(...data) * 1.15;

  ctx.clearRect(0, 0, width, height);

  // Background Grid lines
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  for (let i = 0; i <= 4; i++) {
    const y = padding + (chartHeight / 4) * i;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  // Draw Bars
  const barWidth = (chartWidth / data.length) * 0.55;
  data.forEach((val, i) => {
    const x = padding + (chartWidth / data.length) * i + ((chartWidth / data.length) - barWidth) / 2;
    const barH = (val / maxVal) * chartHeight;
    const y = height - padding - barH;

    // Gradient bar
    const grad = ctx.createLinearGradient(0, y, 0, height - padding);
    grad.addColorStop(0, '#0284C7');
    grad.addColorStop(1, '#0B2545');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barWidth, barH, [4, 4, 0, 0]);
    ctx.fill();

    // Month Label
    ctx.fillStyle = '#64748B';
    ctx.font = '11px Outfit, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(months[i], x + barWidth / 2, height - 12);
  });
}

// Re-render chart on window resize
let chartResizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(chartResizeTimer);
  chartResizeTimer = setTimeout(() => {
    initDashboardCharts();
  }, 150);
});

/* ==========================================================================
   14. SCROLL-DRIVEN REVEAL ANIMATIONS
   ========================================================================== */
function initScrollRevealAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const targets = document.querySelectorAll(
    '.dest-card, .pkg-card, .hotel-card, .stat-card, .section-header, .feature-card, .team-card, .testimonial-card, .data-table-card, .faq-item, .info-card-item, .about-story-grid > div, .review-card, .billing-card'
  );

  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  targets.forEach((el, index) => {
    el.classList.add('reveal-fade-up');
    el.style.transitionDelay = `${(index % 4) * 80}ms`;
    observer.observe(el);
  });
}



/* ==========================================================================
   15. DYNAMIC USER SESSION & CREDENTIALS SYNC
   ========================================================================== */
function initUserSession() {
  let user = null;
  try {
    const raw = localStorage.getItem('stackly_user');
    if (raw) user = JSON.parse(raw);
  } catch (e) {
    user = null;
  }

  // If no user saved, set default profile
  if (!user || !user.name) {
    user = {
      name: 'Suresh Kappala',
      email: 'suresh.kappala@gmail.com',
      role: 'Explorer Traveler • Stackly'
    };
  }

  // Update sidebar user names
  document.querySelectorAll('.sidebar-user-name').forEach(el => {
    el.textContent = user.name;
  });

  // Update sidebar initials avatar
  const initials = user.name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'SK';

  document.querySelectorAll('.sidebar-user-avatar').forEach(el => {
    el.innerHTML = `${initials} <span class="online-status-dot"></span>`;
  });

  // Update welcome credentials banner h2 & details
  document.querySelectorAll('.welcome-credentials-banner h2').forEach(el => {
    el.textContent = `Welcome back, ${user.name} 👏`;
  });

  document.querySelectorAll('.cred-pill').forEach(pill => {
    if (pill.innerHTML.includes('Name:')) {
      pill.innerHTML = `<span>👤</span> Name: <strong>${user.name}</strong>`;
    }
    if (pill.innerHTML.includes('Email:') && user.email) {
      pill.innerHTML = `<span>✉️</span> Email: <strong>${user.email}</strong>`;
    }
    if (pill.innerHTML.includes('Role:') && user.role) {
      pill.innerHTML = `<span>🛡️</span> Role: <strong>${user.role}</strong>`;
    }
  });
}
