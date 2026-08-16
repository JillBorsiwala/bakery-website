import { useState } from 'react';

const CONTACT_EMAIL = '12302040701074@mbit.edu.in';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = 'Name is required.';
    }

    if (!trimmedEmail) {
      newErrors.email = 'Email is required.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!trimmedMessage) {
      newErrors.message = 'Message is required.';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }

    if (showSuccess) {
      setShowSuccess(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isProcessing) {
      return;
    }

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsProcessing(true);
    setErrors({});

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    const subject = encodeURIComponent('Website Contact Form');
    const body = encodeURIComponent(
      `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nMessage: ${trimmedMessage}`
    );
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    const link = document.createElement('a');
    link.href = mailtoUrl;
    link.click();

    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setIsProcessing(false);
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-grid">
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>📍 AV Road, Vallabh Vidyanagar, Anand, 388001</p>
            <p>📞 (+91) 2705060911</p>
            <p>✉️ <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
            <p>🕐 Monday – Saturday: 8:00 AM – 6:00 PM</p>
            <p>🕐 Sunday: 9:00 AM – 1:00 PM</p>
            <div className="social-links">
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="Facebook">👍</a>
              <a href="#" aria-label="Twitter">🐦</a>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                disabled={isProcessing}
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                required
              />
              {errors.name ? <p id="name-error" className="form-error">{errors.name}</p> : null}
            </div>

            <div className="form-field">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                disabled={isProcessing}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
              />
              {errors.email ? <p id="email-error" className="form-error">{errors.email}</p> : null}
            </div>

            <div className="form-field">
              <textarea
                name="message"
                placeholder="Your Message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                disabled={isProcessing}
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
                required
              />
              {errors.message ? <p id="message-error" className="form-error">{errors.message}</p> : null}
            </div>

            {showSuccess ? (
              <p className="form-success" aria-live="polite">✓ Your message has been sent! We'll get back to you soon. 🧁</p>
            ) : null}

            <button
              type="submit"
              className="submit-btn"
              disabled={isProcessing}
            >
              {isProcessing ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
