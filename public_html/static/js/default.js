///////////////////
// Cookie Notice //
///////////////////

document.addEventListener('DOMContentLoaded', () => {
  const cookieNotice = document.getElementById('cookieNotice');
  const acceptCookies = document.getElementById('acceptCookies');

  // Check if cookies have already been accepted
  if (!localStorage.getItem('cookiesAccepted')) {
    cookieNotice.style.display = 'block';
  }

  // Handle accept button click
  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieNotice.style.display = 'none';
  });
});


//////////////////
// Contact Form //
//////////////////

document.addEventListener('DOMContentLoaded', () => {
  const openContactForm = document.getElementById('openContactForm');
  const contactFormPopup = document.getElementById('contactFormPopup');
  const closeContactForm = document.getElementById('closeContactForm');

  // Ensure the form is hidden by default
  if (contactFormPopup.style.display !== 'none') {
    contactFormPopup.style.display = 'none';
  }

  // Open the contact form popup
  openContactForm.addEventListener('click', (event) => {
    event.preventDefault();
    contactFormPopup.style.display = 'flex';
  });

  // Close the contact form popup
  closeContactForm.addEventListener('click', () => {
    contactFormPopup.style.display = 'none';
  });

  // Close the popup when clicking outside the form
  window.addEventListener('click', (event) => {
    if (event.target === contactFormPopup) {
      contactFormPopup.style.display = 'none';
    }
  });

  // Optional: Handle form submission
  document.getElementById('contactForm').addEventListener('submit', (event) => {
    event.preventDefault();
    // Add form submission logic here (e.g., AJAX request)
    alert('Form submitted!');
    contactFormPopup.style.display = 'none';
  });
});
