document.addEventListener("DOMContentLoaded", () => {
  // Remove reading progress indicator code
  // const progressContainer = document.createElement('div')
  // progressContainer.className = 'reading-progress-container'
  // const progressBar = document.createElement('div')
  // progressBar.className = 'reading-progress-bar'
  // progressContainer.appendChild(progressBar)
  // document.body.appendChild(progressContainer)

  // Reading Progress Indicator
  const articleContent = document.querySelector(".article-main-content");
  const sidebar = document.querySelector(".article-sidebar");

  function updateReadingProgress() {
    // Function disabled - progress indicator removed
  }

  // Back to top button
  const backToTopButton = document.getElementById("back-to-top");

  function toggleBackToTopButton() {
    if (window.scrollY > 500) {
      backToTopButton.classList.add("visible");
    } else {
      backToTopButton.classList.remove("visible");
    }
  }

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Code block copy button
  const copyButtons = document.querySelectorAll(".copy-btn");

  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const codeBlock = button.closest(".code-block");
      const code = codeBlock.querySelector("code").textContent;

      navigator.clipboard.writeText(code).then(() => {
        // Show copied feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        `;

        setTimeout(() => {
          button.innerHTML = originalHTML;
        }, 2000);
      });
    });
  });

  // Comment form submission
  const commentForm = document.querySelector(".comment-form");

  if (commentForm) {
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("comment-name").value;
      const email = document.getElementById("comment-email").value;
      const content = document.getElementById("comment-content").value;

      if (!name || !email || !content) return;

      // Simulate form submission
      const submitButton = document.querySelector(".comment-submit-btn");
      submitButton.disabled = true;
      submitButton.textContent = "Submitting...";

      setTimeout(() => {
        // Reset form
        commentForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Post Comment";

        // Show success message (in a real app, you'd show the new comment)
        alert(
          "Thank you for your comment! It will be visible after moderation."
        );
      }, 1500);
    });
  }

  // Reply button functionality
  const replyButtons = document.querySelectorAll(".comment-reply-btn");

  replyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const commentContent = button.closest(".comment-content");
      const authorName =
        commentContent.querySelector(".comment-author").textContent;

      // Scroll to comment form and focus
      document
        .querySelector(".comment-form-container")
        .scrollIntoView({ behavior: "smooth" });

      // Autofill reply info
      setTimeout(() => {
        const commentInput = document.getElementById("comment-content");
        commentInput.focus();
        commentInput.value = `@${authorName} `;
      }, 800);
    });
  });

  // Show more comments button
  const loadMoreCommentsBtn = document.querySelector(".load-more-comments");

  if (loadMoreCommentsBtn) {
    loadMoreCommentsBtn.addEventListener("click", () => {
      loadMoreCommentsBtn.innerHTML = `
        <span>Loading...</span>
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="spinner">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
      `;

      // Simulate loading more comments
      setTimeout(() => {
        loadMoreCommentsBtn.innerHTML = `
          No more comments
        `;
        loadMoreCommentsBtn.disabled = true;
      }, 1500);
    });
  }

  // Newsletter form submission
  const newsletterForm = document.querySelector(".sidebar-newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector("input[type='email']");
      const submitButton = newsletterForm.querySelector(
        ".sidebar-subscribe-btn"
      );

      if (!emailInput.value) return;

      // Simulate form submission
      submitButton.disabled = true;
      submitButton.textContent = "Subscribing...";

      setTimeout(() => {
        // Reset form
        newsletterForm.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Subscribed!";

        // Reset after 3 seconds
        setTimeout(() => {
          submitButton.textContent = "Subscribe";
        }, 3000);
      }, 1500);
    });
  }

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  // Like button functionality
  const likeButtons = document.querySelectorAll(".comment-like-btn");

  likeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const likeCount = this.querySelector("span");
      let currentLikes = Number.parseInt(likeCount.textContent);

      if (!this.classList.contains("liked")) {
        currentLikes++;
        this.classList.add("liked");
        this.style.color = "var(--primary-color)";
      } else {
        currentLikes--;
        this.classList.remove("liked");
        this.style.color = "";
      }

      likeCount.textContent = currentLikes;
    });
  });

  // Initialize event listeners
  window.addEventListener("scroll", () => {
    // updateReadingProgress() - removed
    toggleBackToTopButton();
  });

  // window.addEventListener("resize", updateReadingProgress) - removed

  // Run once on page load
  // updateReadingProgress() - removed
  toggleBackToTopButton();
});
