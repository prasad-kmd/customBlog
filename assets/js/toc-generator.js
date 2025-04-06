/**
 * Generates a Table of Contents (TOC) based on H1 and H2 elements with IDs
 * found within a specified content area.
 * Populates a target UL element with links to these headings.
 * Includes smooth scrolling and active link highlighting based on scroll position.
 *
 * @param {string} contentSelector - CSS selector for the element containing the post content (h1, h2).
 * @param {string} tocListSelector - CSS selector for the UL element where the TOC should be generated.
 * @param {string} tocContainerSelector - CSS selector for the main container div of the TOC (to hide if no headings).
 */
function generateTableOfContents(
  contentSelector,
  tocListSelector,
  tocContainerSelector
) {
  // Run after the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    const contentElement = document.querySelector(contentSelector);
    const tocListElement = document.querySelector(tocListSelector);
    const tocContainerElement = document.querySelector(tocContainerSelector);

    // --- Basic validation ---
    if (!contentElement) {
      // console.warn(`TOC Generator: Content container "${contentSelector}" not found.`);
      return;
    }
    if (!tocListElement) {
      // console.warn(`TOC Generator: TOC list element "${tocListSelector}" not found.`);
      return;
    }
    if (!tocContainerElement) {
      // console.warn(`TOC Generator: TOC container element "${tocContainerSelector}" not found.`);
    }

    // --- Find headings with IDs (assumes autoAddHeadingIds script ran) ---
    const headings = contentElement.querySelectorAll("h1[id], h2[id]");

    // --- Check if headings were found ---
    if (headings.length === 0) {
      // console.log("TOC Generator: No H1 or H2 elements with IDs found.");
      if (tocContainerElement) {
        tocContainerElement.style.display = "none"; // Hide the entire TOC container
      } else {
        tocListElement.innerHTML = "<li>No headings found for TOC.</li>"; // Fallback message
      }
      return;
    }

    // --- Clear existing TOC list items (like the "Loading..." message) ---
    tocListElement.innerHTML = "";

    // --- Generate TOC list items ---
    headings.forEach((heading) => {
      const id = heading.id;
      const level = heading.tagName.toLowerCase(); // 'h1' or 'h2'
      const text = heading.textContent.trim();

      // Create list item and link
      const listItem = document.createElement("li");
      const link = document.createElement("a");

      // Add classes for styling (e.g., indentation)
      listItem.classList.add("toc-item", `toc-level-${level}`);
      link.classList.add("toc-link");

      link.href = `#${id}`;
      link.textContent = text;

      // Append link to list item, and list item to the TOC list
      listItem.appendChild(link);
      tocListElement.appendChild(listItem);
    });

    // --- Add Smooth Scrolling to TOC links ---
    tocListElement.querySelectorAll(".toc-link").forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.getElementById(targetId.substring(1));

        if (targetElement) {
          // Calculate offset considering potential fixed header
          const headerOffset =
            document.querySelector("header")?.offsetHeight || 60; // Adjust selector/fallback height
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset - 20; // Extra padding

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });

    // --- Add Scroll Spy for Active Link Highlighting ---
    const tocLinks = tocListElement.querySelectorAll(".toc-link");
    const headingElements = Array.from(headings); // Use the actual heading elements

    if (tocLinks.length > 0 && headingElements.length > 0) {
      const observerOptions = {
        rootMargin: "-100px 0px -65% 0px", // Adjust top/bottom % to control activation area
        threshold: 0, // Fire as soon as any part enters/leaves the rootMargin area
      };

      const observer = new IntersectionObserver((entries) => {
        let latestActiveFound = null; // Track the topmost visible heading's link

        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const correspondingLink = tocListElement.querySelector(
            `.toc-link[href="#${id}"]`
          );

          if (entry.isIntersecting && entry.intersectionRatio > 0) {
            // If multiple are intersecting, we only want the topmost one to be active
            // Check its position relative to others potentially found in this batch
            if (
              !latestActiveFound ||
              entry.target.getBoundingClientRect().top <
                document
                  .getElementById(
                    latestActiveFound.getAttribute("href").substring(1)
                  )
                  .getBoundingClientRect().top
            ) {
              latestActiveFound = correspondingLink;
            }
          }
        });

        // After checking all entries, update active classes
        tocLinks.forEach((link) => {
          link.classList.remove("active"); // Clear all first
        });
        if (latestActiveFound) {
          latestActiveFound.classList.add("active"); // Activate the topmost visible one
        }
        // Handle case where user scrolls above the first heading
        else if (window.pageYOffset < headingElements[0].offsetTop) {
          // No link should be active
        }
        // Handle case where user scrolls below the last heading - keep last active?
        // else if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight - 50) { // Near bottom
        //    const lastLink = tocLinks[tocLinks.length - 1];
        //    if (lastLink) lastLink.classList.add('active');
        // }
      }, observerOptions);

      // Observe each heading element
      headingElements.forEach((heading) => observer.observe(heading));
    }
  }); // End DOMContentLoaded
}

// --- How to Use ---
// Call this function after the autoAddHeadingIds script has run.
// Pass the selectors for your content area, the TOC list (UL), and the TOC container (DIV).
generateTableOfContents(
  ".article-main-content", // 1. Selector for the content area containing H1/H2s
  "#dynamic-toc-list", // 2. Selector for the UL element to populate
  "#toc-container" // 3. Selector for the main DIV containing the TOC (for hiding)
);
