let currentSlide = 1;

// Function to update the resentment box dynamically


// Event listeners for dynamically updating the resentment box
document.getElementById('resentment-person')?.addEventListener('input', updateResentmentBox);
document.getElementById('resentment-reason')?.addEventListener('input', updateResentmentBox);
document.querySelectorAll('#effects input').forEach(checkbox =>
  checkbox.addEventListener('change', updateResentmentBox)
);

function handleResentmentAndNext() {
  const selfishnessFieldsContainer = document.getElementById('selfishness-fields');
  if (selfishnessFieldsContainer) selfishnessFieldsContainer.innerHTML = ''; // Clear previous fields

  // Collect selected effects
  const selectedEffects = Array.from(document.querySelectorAll('#effects input:checked')).map(input => ({
    value: input.value, 
    labelText: input.parentElement.textContent.trim()
  }));

  selectedEffects.forEach(({ value, labelText }) => {
    const fieldContainer = document.createElement('div');
    fieldContainer.style.display = 'flex';
    fieldContainer.style.alignItems = 'center';
    fieldContainer.style.marginBottom = '10px';

    const label = document.createElement('label');
    label.textContent = value;

    const input = document.createElement('textarea');
    input.placeholder = labelText;
    input.classList.add('selfishness-input');
    input.style.flex = '1';
    input.style.fontSize = '80%';
    input.style.height = '25px'; // Make the textarea narrower
    input.style.width = '300px';  // Make the textarea wider
    input.style.marginRight = '10px';

    fieldContainer.appendChild(label);
    fieldContainer.appendChild(input);
    selfishnessFieldsContainer.appendChild(fieldContainer);
  });

  const resentmentBox = document.getElementById('resentment');
  if (resentmentBox) resentmentBox.dataset.firstSlideContent = resentmentBox.value; // Preserve content from the first slide

  attachInputListeners(); // Attach listeners for new fields
  nextSlide();
}



// Function to navigate to the next slide
function nextSlide() {
  const currentSlideElement = document.querySelector('.slide.active');
  currentSlideElement?.classList.remove('active');

  currentSlide++;
  const nextSlideElement = document.getElementById(`slide-${currentSlide}`);
  if (nextSlideElement) {
    nextSlideElement.classList.add('active');
  } else {
    console.error(`Slide ${currentSlide} not found.`);
  }
}

// Function to go back to the first slide
function goToFirstSlide() {
  const currentSlideElement = document.querySelector('.slide.active');
  currentSlideElement?.classList.remove('active');

  const firstSlideElement = document.getElementById('slide-1');
  if (firstSlideElement) {
    firstSlideElement.classList.add('active');
    currentSlide = 1;
  } else {
    console.error('First slide not found.');
  }
}

// Function to toggle visibility of additional fields
function toggleField(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.display = field.style.display === 'none' ? 'block' : 'none';
  } else {
    console.error(`Element with id "${fieldId}" not found.`);
  }
}

// Function to dynamically update content based on person input
document.getElementById('resentment-person')?.addEventListener('input', function () {
  const name = this.value || '😡';
  const contentElement = document.getElementById('dynamic-content');
  if (contentElement) {
    contentElement.innerHTML = `
      أسألك يا الله أن تساعدني على أن أظهر ل ${name} نفس التقبل، الشفقة و الصبر الذي كنت سأمنحه بسرور لصديق مريض.
      ${name} شخص مريض. كيف أكون نافعاً له؟ يا رب أنقذني من الغضب. لتكن مشيئتك.
    `;
  }
});

// Function to toggle ego-related fields
function toggleEgoFields() {
  const firstTextbox = document.getElementById('ego-fields-text');
  const secondSection = document.getElementById('ego-fields');

  if (firstTextbox && secondSection) {
    const isHidden = firstTextbox.style.display === 'none';
    firstTextbox.style.display = isHidden ? 'block' : 'none';
    secondSection.style.display = isHidden ? 'block' : 'none';
  } else {
    console.error('Ego fields not found.');
  }
}

// Function to toggle fear messages
function toggleFearMessages() {
  const fearInput = document.getElementById('fear-input');
  const fearMessagesSection = document.getElementById('fear-messages');

  if (fearInput && fearMessagesSection) {
    const isHidden = fearInput.style.display === 'none';
    fearInput.style.display = isHidden ? 'block' : 'none';
    fearMessagesSection.style.display = isHidden ? 'block' : 'none';
  } else {
    console.error('Fear fields not found.');
  }
}

// Function to redirect with an optional save
function addAndRedirect(targetUrl) {
  console.log(`Redirecting to ${targetUrl}`); // Debugging output
  window.location.href = targetUrl;
}

// Specific redirection functions
function addAndRedirectToIndex() {
  addAndRedirect('index.html');
}

function addAndRedirectToStep10() {
  addAndRedirect('/Share.html');
}

// Function to attach input listeners for dynamic fields
function attachInputListeners() {
  const inputs = document.querySelectorAll('.selfishness-input, textarea');
  inputs.forEach(input => {
    input.removeEventListener('input', updateResentmentBox); // Prevent duplicate listeners
    input.addEventListener('input', updateResentmentBox);
  });
}

// Initialize listeners for the first slide and dynamically created fields
document.addEventListener('DOMContentLoaded', () => {
  // Attach listeners for the first slide
  document.getElementById('resentment-person')?.addEventListener('input', updateResentmentBox);
  document.getElementById('resentment-reason')?.addEventListener('input', updateResentmentBox);
  document.querySelectorAll('#effects input').forEach(checkbox =>
    checkbox.addEventListener('change', updateResentmentBox)
  );

  // Attach listeners for other dynamically created fields
  attachInputListeners();
});

// Function to dynamically update the resentment box with input from all slides
function updateResentmentBox() {
  const person = document.getElementById('resentment-person')?.value.trim();
  const reason = document.getElementById('resentment-reason')?.value.trim();
  const effects = Array.from(document.querySelectorAll('#effects input:checked')).map(input => input.value);

  // Collect text from slide 2 textboxes with their corresponding labels and values
  const slide2TextInputs = Array.from(document.querySelectorAll('#slide-2 textarea'));

  const selfishnessDetails = slide2TextInputs
    .map(input => {
      // Check for a preceding <label> specifically for dynamically generated fields
      const dynamicLabel = input.previousElementSibling?.tagName === 'LABEL'
        ? input.previousElementSibling.textContent.trim()
        : null;

      // Fallback to the original logic for other text fields
      const fallbackLabel = input.closest('.label-textbox-wrapper')?.querySelector('button, p, label')?.textContent.trim();

      // Choose the label: dynamicLabel first, fallbackLabel second, or default to 'Valuer'
      const label = dynamicLabel || fallbackLabel || 'Valuer';

      const inputValue = input.value.trim();
      return inputValue ? `${label}: ${inputValue}` : null; // Remove `-` prefix
    })
    .filter(detail => detail !== null); // Exclude empty inputs

  // Construct the resentment text
  let resentmentText = '';
  if (person) resentmentText += `😡 مستاء من: ${person}. `;
  if (reason) resentmentText += `😡 السبب: ${reason}. `;
  if (effects.length > 0) resentmentText += `😡 أثر علي: ${effects.join(', ')}. `;
  if (selfishnessDetails.length > 0) {
    resentmentText += `\nأناني متعلق ب:\n${selfishnessDetails.join('\n')}`; // Add newlines for each label-value pair, no `-`
  }

  // Update the resentment box
  const resentmentBox = document.getElementById('resentment');
  if (resentmentBox) resentmentBox.value = resentmentText;
}



// Function to attach listeners to all textboxes and checkboxes
function attachListeners() {
  // Attach listeners to slide 1 fields
  document.getElementById('resentment-person')?.addEventListener('input', updateResentmentBox);
  document.getElementById('resentment-reason')?.addEventListener('input', updateResentmentBox);
  document.querySelectorAll('#effects input').forEach(checkbox => {
    checkbox.addEventListener('change', updateResentmentBox);
  });

  // Attach listeners to all textboxes in slide 2
  const slide2Inputs = document.querySelectorAll('#slide-2 textarea');
  slide2Inputs.forEach(input => {
    input.addEventListener('input', updateResentmentBox);
  });
}

// Function to toggle visibility of dynamically created fields and attach listeners
function toggleField(fieldId) {
  const field = document.getElementById(fieldId);
  if (field) {
    field.style.display = field.style.display === 'none' ? 'block' : 'none';
    // Attach listeners to the newly visible textarea
    if (field.style.display === 'block') {
      const textarea = field.querySelector('textarea');
      if (textarea) textarea.addEventListener('input', updateResentmentBox);
    }
  }
}
// Function to navigate to the next slide
function nextSlide() {
  const currentSlideElement = document.querySelector('.slide.active');
  currentSlideElement?.classList.remove('active');

  currentSlide++;
  const nextSlideElement = document.getElementById(`slide-${currentSlide}`);
  if (nextSlideElement) {
    nextSlideElement.classList.add('active');
  } else {
    console.error(`Slide ${currentSlide} not found.`);
  }
}

// Initialize listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
  attachListeners();
});

function addAndRedirect(redirectPath) {
  const resentmentText = document.getElementById('resentment').value.trim();
  const existingText = localStorage.getItem('sharedText') || '';

  // Add a separator if there's existing text
  const updatedText = existingText ?
    `${existingText}\n\n---\n\n${resentmentText}` :
    resentmentText;

  if (resentmentText !== '') {
    localStorage.setItem('sharedText', updatedText);

    // Create a custom message element
    const message = document.createElement('div');
    message.textContent = 'تمت اضافة مشاركتك!';
    message.style.position = 'fixed';
    message.style.top = '10px';
    message.style.left = '50%';
    message.style.transform = 'translateX(-50%)';
    message.style.backgroundColor = '#4CAF50';
    message.style.color = '#fff';
    message.style.padding = '10px 20px';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.3)';
    message.style.zIndex = '1000';
    document.body.appendChild(message);

    // Remove the message after 2 seconds
    setTimeout(() => {
      message.remove();
    }, 2000);
  }

  // Redirect to the specified path after 2 seconds
  setTimeout(() => {
    window.location.href = redirectPath;
  }, 2000);
}
