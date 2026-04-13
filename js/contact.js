// Contact form with Formspree
export function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const submitBtn = form.querySelector('.form-submit');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name').value.trim();
    const email = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      showFormStatus(form, 'error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      showFormStatus(form, 'error', 'Please enter a valid email address.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });

      if (response.ok) {
        form.reset();
        showFormStatus(form, 'success', 'Message sent! I\'ll get back to you soon.');
      } else {
        showFormStatus(form, 'error', 'Something went wrong. Please try emailing me directly.');
      }
    } catch {
      showFormStatus(form, 'error', 'Network error. Please try emailing me directly.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormStatus(form, type, message) {
  let status = form.querySelector('.form-status');
  if (!status) {
    status = document.createElement('p');
    status.className = 'form-status';
    form.appendChild(status);
  }
  status.className = 'form-status form-status--' + type;
  status.textContent = message;
}
