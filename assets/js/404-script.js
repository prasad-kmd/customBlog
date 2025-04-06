document.addEventListener("DOMContentLoaded", () => {
  // Astronaut rescue animation
  const rescueButton = document.getElementById("rescueAstronaut");
  const astronaut = document.querySelector(".astronaut");
  const tether = document.querySelector(".tether");

  if (rescueButton && astronaut && tether) {
    let isRescuing = false;

    rescueButton.addEventListener("click", () => {
      if (isRescuing) return;

      isRescuing = true;
      rescueButton.disabled = true;
      rescueButton.textContent = "Rescuing...";

      // Animate the tether pulling the astronaut
      tether.style.animation = "none";
      astronaut.style.animation = "none";

      // Force reflow
      void astronaut.offsetWidth;

      // Add rescue animations
      tether.style.animation = "tether-rescue 2s forwards";
      astronaut.style.animation = "astronaut-rescue 2s forwards";

      // After animation completes, redirect to home
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    });

    // Add the rescue animations to the stylesheet
    const style = document.createElement("style");
    style.textContent = `
        @keyframes tether-rescue {
          0% {
            height: 100px;
            transform: translate(-50%, 0) rotate(45deg);
          }
          100% {
            height: 10px;
            transform: translate(-50%, 0) rotate(0deg);
          }
        }
        
        @keyframes astronaut-rescue {
          0% {
            transform: translate(-50%, -50%) rotate(5deg);
          }
          50% {
            transform: translate(-50%, -70%) rotate(0deg) scale(0.8);
          }
          100% {
            transform: translate(-50%, -100%) rotate(0deg) scale(0.5);
            opacity: 0;
          }
        }
      `;
    document.head.appendChild(style);
  }

  // Interactive stars
  const starsContainer = document.querySelector(".stars");

  if (starsContainer) {
    starsContainer.addEventListener("mousemove", (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      // Parallax effect for stars
      starsContainer.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
  }

  // Add random twinkling stars
  function createTwinklingStars() {
    const twinklingContainer = document.querySelector(".twinkling");

    if (!twinklingContainer) return;

    for (let i = 0; i < 50; i++) {
      const star = document.createElement("div");
      star.className = "twinkling-star";

      // Random position
      const x = Math.random() * 100;
      const y = Math.random() * 100;

      // Random size
      const size = Math.random() * 3 + 1;

      // Random animation delay
      const delay = Math.random() * 5;

      star.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          background-color: white;
          border-radius: 50%;
          top: ${y}%;
          left: ${x}%;
          animation: twinkle-star 3s ease-in-out infinite;
          animation-delay: ${delay}s;
        `;

      twinklingContainer.appendChild(star);
    }

    // Add the twinkling animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes twinkle-star {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `;
    document.head.appendChild(style);
  }

  createTwinklingStars();

  // Search form functionality
  const searchForm = document.querySelector(".search-form");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const searchInput = searchForm.querySelector("input");
      const searchTerm = searchInput.value.trim();

      if (!searchTerm) return;

      // Simulate search - in a real app, this would redirect to search results
      searchInput.disabled = true;
      const searchButton = searchForm.querySelector("button");
      const originalHTML = searchButton.innerHTML;

      searchButton.innerHTML = `
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="spinner">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M12 6v6l4 2"></path>
          </svg>
        `;

      // Add rotation animation to the spinner
      const style = document.createElement("style");
      style.textContent = `
          .spinner {
            animation: spin 2s linear infinite;
          }
          
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `;
      document.head.appendChild(style);

      // Simulate search delay
      setTimeout(() => {
        // In a real app, this would navigate to search results
        window.location.href = `blog.html?search=${encodeURIComponent(
          searchTerm
        )}`;
      }, 1500);
    });
  }

  // Add parallax effect to planets
  document.addEventListener("mousemove", (e) => {
    const planets = document.querySelectorAll(".planet");

    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    planets.forEach((planet, index) => {
      const factor = (index + 1) * 10;
      planet.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });

  // Add custom cursor trail effect
  function createCursorTrail() {
    const errorMain = document.querySelector(".error-main");

    if (!errorMain) return;

    errorMain.addEventListener("mousemove", (e) => {
      const trail = document.createElement("div");
      trail.className = "cursor-trail";

      trail.style.cssText = `
          position: absolute;
          width: 5px;
          height: 5px;
          background-color: rgba(var(--primary-color-rgb), 0.5);
          border-radius: 50%;
          top: ${e.clientY}px;
          left: ${e.clientX}px;
          pointer-events: none;
          z-index: 9999;
          animation: trail-fade 1s forwards;
        `;

      document.body.appendChild(trail);

      // Remove the trail element after animation completes
      setTimeout(() => {
        trail.remove();
      }, 1000);
    });

    // Add the trail animation
    const style = document.createElement("style");
    style.textContent = `
        @keyframes trail-fade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0);
          }
        }
      `;
    document.head.appendChild(style);
  }

  // Only create cursor trail on non-touch devices
  if (!("ontouchstart" in window)) {
    createCursorTrail();
  }

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    // Remove animations for users who prefer reduced motion
    const style = document.createElement("style");
    style.textContent = `
        * {
          animation-duration: 0.001s !important;
          transition-duration: 0.001s !important;
        }
      `;
    document.head.appendChild(style);
  }
});
