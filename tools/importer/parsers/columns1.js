/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the columns
  const grid = element.querySelector('[class*="lg:grid"]');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: text content and buttons
  const leftCol = columns[0];
  const col1 = [];

  // Heading (preserve semantic structure)
  const heading = leftCol.querySelector('h1');
  if (heading) col1.push(heading);

  // Paragraph
  const para = leftCol.querySelector('p');
  if (para) col1.push(para);

  // Buttons - any <a> inside leftCol
  const btns = Array.from(leftCol.querySelectorAll('a'));
  btns.forEach(btn => col1.push(btn));

  // Second column: image
  const rightCol = columns[1];
  const col2 = [];
  const img = rightCol.querySelector('img');
  if (img) col2.push(img);

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns1)'];
  const tableRows = [headerRow, [col1, col2]];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace original element
  element.replaceWith(table);
}
