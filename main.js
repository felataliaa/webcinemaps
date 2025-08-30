const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute(
    "class",
    isOpen ? "ri-close-line" : "ri-menu-3-line"
  );
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-3-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".choose__image img", {
  ...scrollRevealOption,
  origin: "right",
  interval: 500,
});
ScrollReveal().reveal(".reveal-img.delay1", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".reveal-img.delay2", {
  ...scrollRevealOption,
  delay: 1500,
});
ScrollReveal().reveal(".reveal-img.delay3", {
  ...scrollRevealOption,
  delay: 2000,
});

ScrollReveal().reveal(".reveal-img.delay4", {
  ...scrollRevealOption,
  origin: "left",
});

// Enhanced Image Click Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Create modal for image viewing
  createImageModal();
  
  // Add click events to all images and videos in choose sections
  const mediaElements = document.querySelectorAll('.choose__image img, .choose__image video');
  
  mediaElements.forEach(element => {
    // Make elements focusable for accessibility
    element.setAttribute('tabindex', '0');
    element.setAttribute('role', 'button');
    element.setAttribute('aria-label', 'Click to view larger image');
    
    // Add click event
    element.addEventListener('click', function() {
      handleMediaClick(this);
    });
    
    // Add keyboard support
    element.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMediaClick(this);
      }
    });
    
    // Add loading effect
    if (element.tagName === 'IMG') {
      element.addEventListener('load', function() {
        this.classList.add('loaded');
      });
    }
    
    // Add hover sound effect (optional)
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });
});

function createImageModal() {
  // Check if modal already exists
  if (document.querySelector('.image-modal')) return;
  
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  modal.innerHTML = `
    <button class="close-btn" aria-label="Close modal">&times;</button>
    <div class="modal-content"></div>
  `;
  
  document.body.appendChild(modal);
  
  // Close modal events
  const closeBtn = modal.querySelector('.close-btn');
  closeBtn.addEventListener('click', closeModal);
  
  modal.addEventListener('click', function(e) {
    if (e.target === modal) {
      closeModal();
    }
  });
  
  // Keyboard support for modal
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function handleMediaClick(element) {
  const modal = document.querySelector('.image-modal');
  const modalContent = modal.querySelector('.modal-content');
  
  // Clear previous content
  modalContent.innerHTML = '';
  
  // Clone the clicked element
  const clonedElement = element.cloneNode(true);
  clonedElement.style.maxWidth = '90%';
  clonedElement.style.maxHeight = '90%';
  clonedElement.style.objectFit = 'contain';
  
  modalContent.appendChild(clonedElement);
  
  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  
  // Focus on close button for accessibility
  setTimeout(() => {
    modal.querySelector('.close-btn').focus();
  }, 100);
}

function closeModal() {
  const modal = document.querySelector('.image-modal');
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

// Inisialisasi Peta
const map = L.map('map').setView([-7.878, 110.451], 9);

const baseMaps = {
  "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap'
  }).addTo(map),
  "Satellite": L.tileLayer('https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
  })
};

L.control.layers(baseMaps).addTo(map);

const locations = [
  {
    name: "Posko KKN",
    lat: -7.9227912118,
    lng: 110.5110922810,
    img: "aset/posko 6.jpg"
  },
  {
    name: "Jembatan Plunyon",
    lat: -7.6048005312,
    lng: 110.4350423158,
    img: "aset/plunyon 1.jpg"
  },
  {
    name: "Batu Kapal",
    lat: -7.8214305619,
    lng: 110.4530797353,
    img: "aset/kapal 2.jpg"
  },
  {
    name: "Joglo Wanagama",
    lat: -7.9115978485,
    lng: 110.5232889001,
    img: "aset/joglo 1.jpg"
  }
];

let control;
function routeTo(lat, lng) {
  if (control) map.removeControl(control);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const userLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude);
      control = L.Routing.control({
        waypoints: [userLatLng, L.latLng(lat, lng)],
        routeWhileDragging: false
      }).addTo(map);
    }, () => {
      alert("Gagal mengakses lokasi. Aktifkan izin lokasi.");
    });
  } else {
    alert("Browser tidak mendukung geolokasi.");
  }
}

locations.forEach(loc => {
  const marker = L.marker([loc.lat, loc.lng]).addTo(map);

  const popupContent = `
    <div style="text-align:center; max-width: 220px; font-family: 'KKNhorror', sans-serif; letter-spacing: 1.5px;">
      <b style="font-size: 1rem; color: #333; margin-bottom: 10px; display: block; letter-spacing: 1.2px;">${loc.name}</b>
      <img src="${loc.img}" alt="${loc.name}" 
           style="width:100%; max-width: 200px; height: 120px; object-fit: cover; border-radius: 8px; margin: 10px 0; box-shadow: 0 2px 8px rgba(0,0,0,0.2);" />
      <div style="margin-top: 15px;">
        <button onclick="navigateWithGoogle(${loc.lat}, ${loc.lng})" 
                style="background: linear-gradient(45deg, #918e8eff, #ff0707ff); 
                       color: white; 
                       border: none; 
                       padding: 10px 20px; 
                       border-radius: 25px; 
                       cursor: pointer; 
                       font-size: 14px; 
                       font-weight: 600;
                       box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
                       transition: all 0.3s ease;
                       width: 100%;
                       letter-spacing: 1.5px;"
                onmouseover="this.style.transform='scale(1.05)'"
                onmouseout="this.style.transform='scale(1)'">
          📍Rute ke Lokasi
        </button>
      </div>
    </div>
  `;
  marker.bindPopup(popupContent, {
    maxWidth: 250,
    className: 'custom-popup'
  });

  marker.on('click', () => {
    map.flyTo([loc.lat, loc.lng], 16, { duration: 1.5 });
  });
});

// Tombol find my location
const locateBtn = L.control({ position: 'topleft' });
locateBtn.onAdd = function () {
  const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
  div.innerHTML = '<button title="Temukan Lokasiku">📍</button>';
  div.onclick = function () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        const userLatLng = L.latLng(pos.coords.latitude, pos.coords.longitude);
        L.marker(userLatLng).addTo(map).bindPopup('Lokasi Anda').openPopup();
        map.flyTo(userLatLng, 15, { duration: 1.5 });
      }, () => {
        alert("Tidak dapat menemukan lokasi Anda.");
      });
    }
  };
  return div;
};
locateBtn.addTo(map);

function navigateWithGoogle(lat, lng) {
  const dest = `${lat},${lng}`;
  const ua = navigator.userAgent || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  if (isIOS) {
    // iOS → coba buka aplikasi Google Maps dulu
    const appUrl = `comgooglemaps://?daddr=${dest}&directionsmode=driving`;
    const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;

    // Harus pakai window.location supaya dianggap klik user
    window.location = appUrl;

    // Kalau app tidak ada, fallback ke browser setelah 1 detik
    setTimeout(() => {
      window.location = fallbackUrl;
    }, 1000);
  } else {
    // Android & Desktop → langsung buka Google Maps web
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;
    window.open(url, "_blank");
  }
}

// Scroll animations with enhanced intersection observer
document.addEventListener("DOMContentLoaded", function () {
  const animElements = document.querySelectorAll(
    ".anim-slide-up, .anim-fade-in, .anim-zoom-in, .anim-slide-left"
  );

  const observerOptions = {
    threshold: 0.2, 
    rootMargin: '0px 0px -50px 0px' 
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    observerOptions
  );

  animElements.forEach((el) => observer.observe(el));
});

// Enhanced back to top functionality
window.addEventListener('scroll', function() {
  const backToTop = document.querySelector('.back-to-top');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Newsletter functionality with validation
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if (email) {
    if (isValidEmail(email)) {
      // Show success message with animation
      showNotification('Terima kasih! Anda berhasil berlangganan newsletter CineMaps.', 'success');
      document.getElementById('newsletterEmail').value = '';
    } else {
      showNotification('Masukkan alamat email yang valid.', 'error');
    }
  } else {
    showNotification('Silakan masukkan alamat email Anda.', 'error');
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
  // Remove existing notification
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 10000;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
    max-width: 300px;
    word-wrap: break-word;
  `;
  
  // Set background color based on type
  const colors = {
    success: '#4CAF50',
    error: '#f44336',
    info: '#2196F3'
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 10);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// Enhanced newsletter input handling
document.addEventListener('DOMContentLoaded', function() {
  const newsletterInput = document.getElementById('newsletterEmail');
  if (newsletterInput) {
    newsletterInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        subscribeNewsletter();
      }
    });
    
    // Add real-time validation
    newsletterInput.addEventListener('input', function() {
      const email = this.value;
      if (email && !isValidEmail(email)) {
        this.style.borderColor = '#f44336';
      } else {
        this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      }
    });
  }
});

// Smooth scroll for footer navigation links
document.querySelectorAll('.footer-section a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Enhanced animation sensitivity function
function setAnimationSensitivity(threshold = 0.2, rootMargin = '0px 0px -50px 0px') {
  const animElements = document.querySelectorAll(
    ".anim-slide-up, .anim-fade-in, .anim-zoom-in, .anim-slide-left"
  );
  
  const newObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        } else {
          entry.target.classList.remove("animate");
        }
      });
    },
    {
      threshold: threshold,
      rootMargin: rootMargin
    }
  );

  animElements.forEach((el) => newObserver.observe(el));
}

// Performance optimization: Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        }
      });
    });

    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => imageObserver.observe(img));
  }
});

// Touch gesture support for mobile
let startY = 0;
let endY = 0;

document.addEventListener('touchstart', function(e) {
  startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
  endY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startY - endY;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe up - could trigger next section scroll
      console.log('Swipe up detected');
    } else {
      // Swipe down - could trigger previous section scroll
      console.log('Swipe down detected');
    }
  }
}

// Add loading animation for the page
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.style.display = 'none';
      console.warn(`Image failed to load: ${this.src}`);
    });
  });
});

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = modal.querySelector(".close-btn");

document.querySelectorAll(".choose__image img").forEach(item => {
  item.addEventListener("click", () => {
    modalImg.src = item.src;
    modal.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Klik di luar gambar untuk menutup
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.classList.remove("active");
  }
});
