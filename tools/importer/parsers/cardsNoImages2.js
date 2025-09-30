/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the card content in the right order
  function extractCardContent(cardDiv) {
    const content = [];
    // Heading (optional)
    const heading = cardDiv.querySelector('h3, h2, h4, h5, h6');
    if (heading) content.push(heading);
    // Description (optional)
    // Find the first <p> after heading
    const paragraphs = cardDiv.querySelectorAll('p');
    if (paragraphs.length > 0) {
      content.push(paragraphs[0]);
    }
    // CTA (optional)
    // Find the first <a> that is not inside the heading
    const cta = cardDiv.querySelector('a');
    if (cta) content.push(cta);
    return content;
  }

  // Find all immediate card divs (cards are direct children of the grid)
  // The grid is the first .grid inside the section
  const grid = element.querySelector('.grid');
  const cardDivs = grid ? Array.from(grid.children) : [];

  // Build the table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cardsNoImages2)'];
  rows.push(headerRow);

  // Each card becomes a row
  cardDivs.forEach((cardDiv) => {
    const cardContent = extractCardContent(cardDiv);
    rows.push([cardContent]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
