/**
 * Automatically adds unique IDs to H1 and H2 elements within a specified container.
 * IDs are generated based on heading text, made URL-friendly, and ensure uniqueness.
 * Skips headings that already have an ID attribute.
 *
 * @param {string} containerSelector - CSS selector for the parent element containing the headings.
 */
function autoAddHeadingIds(containerSelector) {
  // Ensure the script runs after the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Find the container element
    const container = document.querySelector(containerSelector);
    if (!container) {
      // console.warn(`Auto heading ID script: Container "${containerSelector}" not found.`);
      return; // Exit if the container doesn't exist
    }

    // Select all H1 and H2 elements within the container
    const headings = container.querySelectorAll("h1, h2");

    // Keep track of generated slugs to ensure uniqueness within this run
    const usedSlugs = {};
    let genericHeadingCounter = 0; // For headings with no usable text

    /**
     * Generates a URL-friendly slug from text.
     * Converts to lowercase, trims, replaces spaces with hyphens,
     * removes non-alphanumeric characters (except hyphens),
     * and collapses multiple hyphens.
     * @param {string} text - The text to slugify.
     * @returns {string} The generated slug.
     */
    const generateSlug = (text) => {
      if (!text) return "";
      return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars except hyphens
        .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    };

    // Iterate through each heading found
    headings.forEach((heading) => {
      // --- Step 1: Skip if heading already has an ID ---
      if (heading.id) {
        return; // Don't overwrite existing IDs
      }

      // --- Step 2: Generate a base slug from text content ---
      const textContent = heading.textContent;
      let baseSlug = generateSlug(textContent);

      // Handle cases where slug generation results in an empty string
      // (e.g., heading text was only symbols)
      if (!baseSlug) {
        genericHeadingCounter++;
        baseSlug = `heading-${genericHeadingCounter}`;
      }

      // --- Step 3: Ensure the slug is unique ---
      let uniqueSlug = baseSlug;
      let counter = 1; // Start counter for duplicates at 1 (e.g., slug, slug-2, slug-3)

      // Check if this base slug has been used before
      if (usedSlugs[baseSlug] !== undefined) {
        // If used, increment the counter for this base slug
        counter = usedSlugs[baseSlug] + 1;
        uniqueSlug = `${baseSlug}-${counter}`;
        usedSlugs[baseSlug] = counter; // Update the count
      } else {
        // If it's a new base slug, record it with count 1
        usedSlugs[baseSlug] = counter;
        // uniqueSlug remains baseSlug
      }

      // --- Step 4: Assign the unique ID to the heading ---
      heading.id = uniqueSlug;
      // console.log(`Assigned ID "${uniqueSlug}" to heading: ${textContent.substring(0, 30)}...`);
    });
  });
}

// --- How to Use ---
// Call the function with the CSS selector for your main post content area.
// Make sure this script runs on your post pages.
// Example usage:
autoAddHeadingIds(".article-main-content"); // Replace '.article-main-content' if your container has a different class or ID
