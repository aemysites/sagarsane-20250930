/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each card element
  function extractCardContent(card) {
    // Defensive: Find the main content container
    const inner = card.querySelector('.flex-1');
    if (!inner) return null;

    // Heading (optional)
    const heading = inner.querySelector('h3');
    // Description (optional)
    const desc = inner.querySelector('div.mt-3');
    // Tags (optional)
    const tags = inner.querySelector('div.mt-4');
    // CTA (optional) - not present in this HTML
    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (desc) cellContent.push(desc);
    if (tags && tags.children.length > 0) cellContent.push(tags);
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  }

  // Get all immediate card children
  const cards = Array.from(element.querySelectorAll(':scope > div'));
  // Table header row
  const headerRow = ['Cards (cardsNoImages7)'];
  // Build table rows
  const rows = cards.map(card => [extractCardContent(card)].filter(Boolean));
  // Compose table data
  const cells = [headerRow, ...rows];
  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
