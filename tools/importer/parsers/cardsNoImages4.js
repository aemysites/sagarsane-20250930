/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Cards (cardsNoImages4)'];
  const rows = [headerRow];

  // Defensive: get all direct <a> children (each card)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach((card) => {
    // Each card's content is inside the first <div class="p-6">
    const contentDiv = card.querySelector(':scope > div');
    if (!contentDiv) return; // skip if no content

    // Extract heading (optional)
    const heading = contentDiv.querySelector('h2');
    // Extract description (optional)
    const description = contentDiv.querySelector('p');
    // Extract date/time (optional)
    const time = contentDiv.querySelector('time');
    let timeElem = null;
    if (time) {
      // Wrap time in a <div> for layout consistency
      timeElem = document.createElement('div');
      timeElem.appendChild(time);
    }

    // Compose cell content: heading, description, date/time (all optional)
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (description) cellContent.push(description);
    if (timeElem) cellContent.push(timeElem);

    // Add row: always one column, cell is array of elements
    rows.push([cellContent]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
