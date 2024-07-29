// Function to escape HTML entities
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Function to copy text to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Copy successful
  }).catch(err => {
    console.error('Error copying text: ', err);
  });
}

// Function to show tooltip
function showTooltip(element, message) {
  const tooltip = document.getElementById('copyTooltip');
  tooltip.textContent = message;
  tooltip.style.left = `${element.getBoundingClientRect().left + window.scrollX}px`;
  tooltip.style.top = `${element.getBoundingClientRect().bottom + window.scrollY + 5}px`;
  tooltip.style.opacity = 1;
}

// Function to hide tooltip
function hideTooltip() {
  const tooltip = document.getElementById('copyTooltip');
  tooltip.style.opacity = 0;
}

// Function to remove leading whitespace based on the first line and handle blank lines
function removeLeadingWhitespace(code) {
  const lines = code.split('\n');
  const leadingSpaces = lines.reduce((minSpaces, line) => {
    if (line.trim().length > 0) {
      const match = line.match(/^\s*/); // Match leading spaces
      return Math.min(minSpaces, match[0].length);
    }
    return minSpaces;
  }, Infinity);

  const adjustedLines = lines.map(line => line.slice(leadingSpaces));
  while (adjustedLines.length > 0 && adjustedLines[0].trim().length === 0) {
    adjustedLines.shift();
  }

  return adjustedLines.join('\n');
}

// Function to add copy functionality to code snippets
function addCodeSnippetCopyFunctionality() {
  document.querySelectorAll('.code-snippet').forEach(snippet => {
    snippet.style.cursor = 'pointer'; // Indicate that it's clickable

    snippet.addEventListener('click', () => {
      copyToClipboard(snippet.textContent);
      showTooltip(snippet, 'Copied!');
      setTimeout(() => hideTooltip(), 1000);
    });

    // Show tooltip on hover
    snippet.addEventListener('mouseenter', () => showTooltip(snippet, 'Click to copy'));
    snippet.addEventListener('mouseleave', hideTooltip);
  });
}

// Function to add copy buttons to code blocks and apply syntax highlighting
function addCopyButtons() {
  document.querySelectorAll('.code-block').forEach(block => {
    let topBar = block.querySelector('.top-bar');
    if (!topBar) {
      topBar = document.createElement('div');
      topBar.className = 'top-bar';

      const titleSpan = document.createElement('span');
      titleSpan.className = 'title';
      titleSpan.textContent = block.dataset.title || 'Code Block'; // Use data-title attribute or default to 'Code Block'
      topBar.appendChild(titleSpan);

      const copyButton = document.createElement('span');
      copyButton.className = 'copy-button';
      copyButton.innerHTML = '<img src="https://img.icons8.com/material-outlined/24/000000/copy.png" alt="Copy" />';
      topBar.appendChild(copyButton);

      block.insertBefore(topBar, block.firstChild);

      copyButton.addEventListener('click', (event) => {
        event.stopPropagation();
        const codeContent = block.querySelector('code').textContent;
        copyToClipboard(codeContent);

        showTooltip(copyButton, 'Copied!');
        setTimeout(() => hideTooltip(), 1000);
      });

      copyButton.addEventListener('mouseenter', () => showTooltip(copyButton, 'Click to copy'));
      copyButton.addEventListener('mouseleave', hideTooltip);
    }

    const codeElement = block.querySelector('code');
    const sanitizedCode = escapeHtml(removeLeadingWhitespace(codeElement.textContent));
    codeElement.innerHTML = sanitizedCode;

    // Determine the language from the ID and apply syntax highlighting
    const language = block.id.split('.').pop(); // Extract file extension
    codeElement.className = `language-${language}`;
    hljs.highlightElement(codeElement); // Highlight code using highlight.js
  });
}

// Call the functions on page load
document.addEventListener('DOMContentLoaded', () => {
  addCodeSnippetCopyFunctionality(); // Add copy functionality to code snippets
  addCopyButtons();                 // Add copy buttons to code blocks
});
