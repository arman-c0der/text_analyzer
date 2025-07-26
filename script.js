const textInput = document.getElementById('text-input');
const wordCount = document.getElementById('word-count');
const charCount = document.getElementById('char-count');
const sentenceCount = document.getElementById('sentence-count');
const paragraphCount = document.getElementById('paragraph-count');
const copyButton = document.getElementById('copy-button');

// Real-time update on input
textInput.addEventListener('input', () => {
  const text = textInput.value;

  // Word count
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  wordCount.textContent = words.length;

  // Character count (includes all characters)
  charCount.textContent = text.length;

  // Sentence count (ends with ., !, ?)
  const sentences = text
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
  sentenceCount.textContent = sentences.length;

  // Paragraph count (based on non-empty lines)
  const paragraphs = text
    .split(/\n+/)
    .map(p => p.trim())
    .filter(p => p.length > 0);
  paragraphCount.textContent = paragraphs.length;
});

// Copy to clipboard
copyButton.addEventListener('click', () => {
  const text = textInput.value;

  // Copy text using Clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showCopiedMessage();
    });
  } else {
    // Fallback for older browsers
    textInput.select();
    document.execCommand('copy');
    showCopiedMessage();
  }
});

// Show temporary feedback on copy
function showCopiedMessage() {
  const originalText = copyButton.innerHTML;

  copyButton.innerHTML = '✅ Copied!';
  copyButton.disabled = true;
  copyButton.classList.add('bg-green-600', 'hover:bg-green-700');
  copyButton.classList.remove('bg-purple-600', 'hover:bg-purple-700');

  setTimeout(() => {
    copyButton.innerHTML = originalText;
    copyButton.disabled = false;
    copyButton.classList.remove('bg-green-600', 'hover:bg-green-700');
    copyButton.classList.add('bg-purple-600', 'hover:bg-purple-700');
  }, 2000);
}
