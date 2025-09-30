/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card content from each experience block
  function extractCardContent(expBlock) {
    // Left column: company, title, dates, location
    const leftCol = expBlock.querySelector('[class*="col-span-4"]');
    let heading = null;
    if (leftCol) {
      const h2 = leftCol.querySelector('h2');
      const role = leftCol.querySelector('p');
      const spans = leftCol.querySelectorAll('span');
      heading = document.createElement('div');
      if (h2) heading.appendChild(h2.cloneNode(true));
      if (role) heading.appendChild(role.cloneNode(true));
      if (spans.length) {
        const metaDiv = document.createElement('div');
        spans.forEach(span => metaDiv.appendChild(span.cloneNode(true)));
        heading.appendChild(metaDiv);
      }
    }

    // Right column: description, technologies, achievements
    const rightCol = expBlock.querySelector('[class*="col-span-8"]');
    let description = null;
    let technologies = null;
    let achievements = null;
    if (rightCol) {
      // Description (first prose block)
      const prose = rightCol.querySelector('.prose');
      if (prose) {
        description = prose.cloneNode(true);
      }
      // Technologies
      const techSection = Array.from(rightCol.querySelectorAll('h3')).find(h3 => h3.textContent.trim().toLowerCase().includes('technologies'));
      if (techSection) {
        const techWrap = techSection.parentElement;
        if (techWrap) {
          technologies = techWrap.cloneNode(true);
        }
      }
      // Achievements
      const achSection = Array.from(rightCol.querySelectorAll('h3')).find(h3 => h3.textContent.trim().toLowerCase().includes('key achievements'));
      if (achSection) {
        const achWrap = achSection.parentElement;
        if (achWrap) {
          achievements = achWrap.cloneNode(true);
        }
      }
    }

    // Compose card cell
    const cardCell = document.createElement('div');
    if (heading) cardCell.appendChild(heading);
    if (description) cardCell.appendChild(description);
    if (technologies) cardCell.appendChild(technologies);
    if (achievements) cardCell.appendChild(achievements);
    return cardCell;
  }

  // Find all experience blocks (each grid)
  const expBlocks = element.querySelectorAll(':scope > div');

  // Build table rows
  const headerRow = ['Cards (cardsNoImages6)'];
  const rows = [headerRow];

  expBlocks.forEach(block => {
    // Only process blocks that have the expected columns
    if (block.querySelector('[class*="col-span-4"]') && block.querySelector('[class*="col-span-8"]')) {
      const cardContent = extractCardContent(block);
      rows.push([cardContent]);
    }
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
