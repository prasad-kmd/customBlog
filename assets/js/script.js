document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const loadingOverlay = document.querySelector(".loading-overlay");

  // Loading indicator functionality
  function hideLoader() {
    loadingOverlay.classList.add("hidden");
    // Enable scrolling once content is loaded
    document.body.style.overflow = "";

    // Start animations for blog cards and other elements after loading
    animateOnScroll();
  }

  // Prevent scrolling while loading
  document.body.style.overflow = "hidden";

  // Hide loader when page is fully loaded
  window.addEventListener("load", () => {
    // Add a small delay to make the loader visible even on fast connections
    setTimeout(hideLoader, 1000);
  });

  // Fallback to hide loader if load event doesn't fire
  setTimeout(hideLoader, 5000);

  // Toggle menu when hamburger is clicked
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Prevent scrolling when menu is open
    body.classList.toggle("menu-open");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = navMenu.contains(event.target);
    const isClickOnToggle = menuToggle.contains(event.target);
    const isClickOnThemeToggle = themeToggle.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      !isClickOnThemeToggle &&
      navMenu.classList.contains("active")
    ) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Toggle theme
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-theme");

    // Save theme preference to localStorage
    if (body.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }

    // Update aria-label for accessibility
    updateThemeToggleAccessibility();
  });

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-theme");
  }

  // Update theme toggle accessibility label
  function updateThemeToggleAccessibility() {
    if (body.classList.contains("dark-theme")) {
      themeToggle.setAttribute("aria-label", "Switch to light theme");
    } else {
      themeToggle.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  // Initialize accessibility label
  updateThemeToggleAccessibility();

  // Close menu when window is resized to desktop size
  window.addEventListener("resize", () => {
    if (window.innerWidth > 991 && navMenu.classList.contains("active")) {
      menuToggle.classList.remove("active");
      navMenu.classList.remove("active");
      body.classList.remove("menu-open");
    }
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close menu when a link is clicked
      if (navMenu.classList.contains("active")) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        body.classList.remove("menu-open");
      }

      // Scroll to the target section
      const targetId = this.getAttribute("href");
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Add parallax effect to hero background
  window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      // Parallax effect - move background slightly as user scrolls
      heroBackground.style.transform = `translateY(${scrollPosition * 0.3}px)`;
    }

    // Check for elements to animate on scroll
    animateOnScroll();
  });

  // Animate elements when they come into view
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll(
      ".blog-card, .newsletter-container, .footer-column, .footer-bottom, .footer-grid > div"
    );

    animatedElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight;

      // If element is in viewport
      if (elementPosition < screenPosition) {
        element.style.animationPlayState = "running";
      }
    });
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const emailInput = this.querySelector('input[type="email"]');

      if (emailInput.value) {
        // Simulate form submission
        const submitButton = this.querySelector(".btn-subscribe");
        const originalText = submitButton.textContent;

        submitButton.textContent = "Subscribing...";
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(() => {
          submitButton.textContent = "Subscribed!";
          emailInput.value = "";

          // Reset after 2 seconds
          setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
          }, 2000);
        }, 1500);
      }
    });
  }

  // Add hover effects to blog cards
  const blogCards = document.querySelectorAll(".blog-card");
  blogCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-15px)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(-10px)";
      this.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.15)";
    });
  });

  // Add floating animation to footer social icons
  const socialLinks = document.querySelectorAll(".social-icon");
  socialLinks.forEach((link, index) => {
    link.style.animation = `float 3s ease-in-out ${index * 0.2}s infinite`;
  });

  // Add pulse animation to CTA button
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("mouseenter", function () {
      this.style.animation = "pulse 1s ease-in-out infinite";
    });

    ctaButton.addEventListener("mouseleave", function () {
      this.style.animation = "none";
    });
  }

  // Add fade-in animation to footer elements
  const footerElements = document.querySelectorAll(
    ".footer-brand, .footer-links-column"
  );
  footerElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.animation = `fadeInUp 0.6s ease forwards ${0.1 * index}s`;
  });
});
