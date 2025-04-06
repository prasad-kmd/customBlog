document.addEventListener("DOMContentLoaded", () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll(".filter-btn")
    const blogPosts = document.querySelectorAll(".blog-post-card")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Update active button
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
  
        const filterValue = button.getAttribute("data-filter")
  
        // Filter blog posts
        blogPosts.forEach((post) => {
          if (filterValue === "all") {
            post.classList.remove("hidden")
            setTimeout(() => {
              post.classList.add("visible")
            }, 100)
          } else {
            if (post.getAttribute("data-category") === filterValue) {
              post.classList.remove("hidden")
              setTimeout(() => {
                post.classList.add("visible")
              }, 100)
            } else {
              post.classList.remove("visible")
              post.classList.add("hidden")
            }
          }
        })
      })
    })
  
    // Search functionality
    const searchInput = document.querySelector(".blog-search input")
    const searchButton = document.querySelector(".blog-search button")
  
    function performSearch() {
      const searchTerm = searchInput.value.toLowerCase().trim()
  
      if (searchTerm === "") {
        // If search is empty, show all posts
        blogPosts.forEach((post) => {
          post.classList.remove("hidden")
          post.classList.add("visible")
        })
  
        // Reset filter buttons
        filterButtons.forEach((btn) => {
          if (btn.getAttribute("data-filter") === "all") {
            btn.classList.add("active")
          } else {
            btn.classList.remove("active")
          }
        })
  
        return
      }
  
      // Filter posts based on search term
      blogPosts.forEach((post) => {
        const title = post.querySelector(".blog-post-title").textContent.toLowerCase()
        const excerpt = post.querySelector(".blog-post-excerpt").textContent.toLowerCase()
        const category = post.getAttribute("data-category").toLowerCase()
  
        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || category.includes(searchTerm)) {
          post.classList.remove("hidden")
          setTimeout(() => {
            post.classList.add("visible")
          }, 100)
        } else {
          post.classList.remove("visible")
          post.classList.add("hidden")
        }
      })
  
      // Reset filter buttons
      filterButtons.forEach((btn) => {
        btn.classList.remove("active")
        if (btn.getAttribute("data-filter") === "all") {
          btn.classList.add("active")
        }
      })
    }
  
    searchButton.addEventListener("click", (e) => {
      e.preventDefault()
      performSearch()
    })
  
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        performSearch()
      }
    })
  
    // Pagination functionality
    const paginationButtons = document.querySelectorAll(".pagination-btn")
  
    paginationButtons.forEach((button) => {
      button.addEventListener("click", () => {
        if (button.classList.contains("active") || button.classList.contains("pagination-next")) {
          return
        }
  
        paginationButtons.forEach((btn) => {
          if (!btn.classList.contains("pagination-next")) {
            btn.classList.remove("active")
          }
        })
  
        button.classList.add("active")
  
        // Simulate page change with smooth scroll to top of blog posts
        document.querySelector(".blog-posts").scrollIntoView({
          behavior: "smooth",
        })
  
        // Add animation effect to blog posts
        blogPosts.forEach((post) => {
          post.style.opacity = "0"
          post.style.transform = "translateY(20px)"
  
          setTimeout(() => {
            post.style.opacity = "1"
            post.style.transform = "translateY(0)"
          }, 300)
        })
      })
    })
  
    // Next button functionality
    const nextButton = document.querySelector(".pagination-next")
  
    if (nextButton) {
      nextButton.addEventListener("click", () => {
        let currentActive = null
        let nextActive = null
  
        paginationButtons.forEach((btn, index) => {
          if (btn.classList.contains("active") && !btn.classList.contains("pagination-next")) {
            currentActive = index
            nextActive = index + 1
          }
        })
  
        if (nextActive !== null && nextActive < paginationButtons.length - 1) {
          paginationButtons[currentActive].classList.remove("active")
          paginationButtons[nextActive].classList.add("active")
  
          // Simulate page change
          document.querySelector(".blog-posts").scrollIntoView({
            behavior: "smooth",
          })
  
          // Add animation effect to blog posts
          blogPosts.forEach((post) => {
            post.style.opacity = "0"
            post.style.transform = "translateY(20px)"
  
            setTimeout(() => {
              post.style.opacity = "1"
              post.style.transform = "translateY(0)"
            }, 300)
          })
        }
      })
    }
  
    // Lazy loading for blog post images
    if ("IntersectionObserver" in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target
            const src = img.getAttribute("data-src")
  
            if (src) {
              img.src = src
              img.removeAttribute("data-src")
            }
  
            observer.unobserve(img)
          }
        })
      })
  
      const imgs = document.querySelectorAll("img[data-src]")
      imgs.forEach((img) => {
        imageObserver.observe(img)
      })
    }
  })
  
  