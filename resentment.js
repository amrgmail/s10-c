function toggleVisibility(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.classList.toggle('hidden');
  }
}

// Event delegation for checkboxes
document.querySelectorAll('.dropdown-option').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    const targetTextareaId = this.getAttribute('data-target');
    const textarea = document.getElementById(targetTextareaId);
    if (this.checked) {
      textarea.classList.remove('hidden');
    } else {
      textarea.classList.add('hidden');
    }
  });
});

// Collect and Redirect function
function collectAndRedirectToShare(event) {
  event.preventDefault();

  const resentmentPerson = document.getElementById('resentment-person').value || '';
  const resentmentReason = document.getElementById('resentment-reason').value || '';

  // Collect selected "أثر علي" checkboxes
  const selectedEffects = Array.from(document.querySelectorAll('.dropdown-option:checked'))
    .map(option => option.value)  // Collect the value of the checkbox
    .join(', ');

  // Generate the "اناني - متعلق ب" text
  const selfishnessText = collectSelfishnessText([
    'value-textarea', 'image-textarea', 'money-textarea', 
    'security-textarea', 'plan-textarea', 'relationship-textarea', 'sexual-textarea'
  ]);

  // Collect optional fields only if they have content
  const lyingField = document.querySelector('#lying-field textarea');
  const egoField = document.querySelector('#self-section textarea');
  const fearField = document.getElementById('fear-input');

  const lyingText = lyingField && lyingField.value ? `🤥كذب؟: ${lyingField.value}` : '';
  const egoText = egoField && egoField.value ? `🏃 سعي وراء الأنا؟: ${egoField.value}` : '';
  const fearText = fearField && fearField.value ? `😱 خوف؟: ${fearField.value}` : '';

  // Combine all fields into the shared text
  const sharedText = [
    `😡 مستاء من: ${resentmentPerson}.`,
    `😡 السبب: ${resentmentReason}.`,
    `😡 أثر علي: ${selectedEffects}.`,
    `😎أناني متعلق ب- ${selfishnessText}`,
    lyingText,
    egoText,
    fearText
  ].filter(Boolean).join(' ');

  // Append the text to the shared text box instead of replacing it
  const currentSharedText = window.localStorage.getItem('sharedText') || '';
  const separator = currentSharedText.trim() ? '\n---\n' : '';
  window.localStorage.setItem('sharedText', currentSharedText + separator + sharedText);
  window.location.href = '/Share.html';
}

function collectAndRedirectToIndex(event) {
  event.preventDefault();
}

function collectSelfishnessText(ids) {
  return ids
    .map(id => {
      const checkbox = document.querySelector(`input[data-target="${id}"]`);
      const textarea = document.getElementById(id);
      if (checkbox.checked && textarea && textarea.value) {
        return `${checkbox.value}: ${textarea.value}`;
      }
      return '';
    })
    .filter(text => text.length > 0)
    .join(' ، ');
}
