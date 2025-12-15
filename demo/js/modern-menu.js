// Modern Header Menu JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Theme functionality (preserved from original)
  const body = document.body;
  const savedTheme = localStorage.getItem('vitrina-theme') || 'dark';
  
  // Apply saved theme on load
  if (savedTheme === 'forest') {
    body.classList.add('theme-forest');
  } else {
    body.classList.remove('theme-forest');
  }
  
  // Force re-render to ensure initial theme applies immediately
  void body.offsetWidth;

  // Update toggle knobs based on saved theme
  const updateToggleKnobs = (isForest) => {
    const toggleButtons = document.querySelectorAll('.theme-toggle');
    toggleButtons.forEach(toggleBtn => {
      if (isForest) {
        toggleBtn.classList.add('theme-forest');
      } else {
        toggleBtn.classList.remove('theme-forest');
      }
    });
  };

  // Set initial state for toggle knobs
  updateToggleKnobs(savedTheme === 'forest');

  const toggleButtons = document.querySelectorAll('.theme-toggle');
  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      const isNowForest = body.classList.contains('theme-forest');
      const newTheme = isNowForest ? 'dark' : 'forest';
      
      // Remove old theme classes and add new one
      body.classList.remove('theme-forest');
      if (newTheme === 'forest') {
        body.classList.add('theme-forest');
      }
      
      localStorage.setItem('vitrina-theme', newTheme);
      
      // Update all toggle knobs
      updateToggleKnobs(newTheme === 'forest');
      
      // Force re-render to ensure theme changes apply immediately
      void body.offsetWidth;
    });
  });

  // Modern header scroll effect
  const header = document.querySelector('.modern-header');
  if (header) {
    let timeoutId;
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      // Clear the timeout if it exists
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      
      // Set a new timeout
      timeoutId = setTimeout(() => {
        // Additional scroll handling if needed
      }, 10);
    };
    
    window.addEventListener('scroll', handleScroll);
  }

  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMobileMenu = document.querySelector('.close-mobile-menu');
  
  if (hamburger && mobileMenu && closeMobileMenu) {
    hamburger.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    
    closeMobileMenu.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('.mobile-nav a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Add active class to current page link
  const currentPage = window.location.pathname;
  const navLinks = document.querySelectorAll('.modern-nav a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Shopping cart functionality
  const cartIcon = document.querySelector('.cart-icon');
  if (cartIcon) {
    // Example cart count - would normally come from real data
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
      // Initialize with example count
      let cartCount = parseInt(cartCountElement.textContent) || 0;
      
      cartIcon.addEventListener('click', () => {
        alert(`Товаров в корзине: ${cartCount}`);
        // In a real implementation, this would navigate to the cart page
      });
    }
  }

  // Search functionality
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  
  if (searchInput && searchButton) {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });
  }
  
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      alert(`Поиск по запросу: ${searchTerm}`);
      // In a real implementation, this would submit the search
    }
  }

  // Animate hamburger when clicked
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      
      // Reset animation to replay
      const style = this.style;
      style.animation = 'none';
      setTimeout(() => {
        style.animation = '';
      }, 10);
    });
  }

  // Handle dropdown menus
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    if (dropdownContent) {
      // For better mobile experience, we might want to toggle on click
      const dropdownToggle = dropdown.querySelector('a');
      if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
          }
        });
      }
    }
  });
});