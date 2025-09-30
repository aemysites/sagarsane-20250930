/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages3) block: 1 column, multiple rows, each row = card (heading + description)
  const headerRow = ['Cards (cardsNoImages3)'];
  const rows = [headerRow];

  // Defensive: get all immediate card divs
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv should have an h3 (heading) and a ul (list of items)
    const heading = cardDiv.querySelector('h3');
    const ul = cardDiv.querySelector('ul');

    // Compose card content: heading (optional) + list (as description)
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (ul) cellContent.push(ul);

    // Add card row (single column)
    rows.push([cellContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
