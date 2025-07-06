// Contact Form Handling
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();
  
  const name = this.elements[0].value;
  const email = this.elements[1].value;
  
  // Show success message
  const successMsg = document.createElement('div');
  successMsg.innerHTML = `
    <div class="success-message">
      <p>Thank you for your message, ${name}! I'll get back to you soon at ${email}.</p>
    </div>
  `;
  this.parentNode.insertBefore(successMsg, this.nextSibling);
  
  // Reset form
  this.reset();
  
  // Remove message after 5 seconds
  setTimeout(() => {
    successMsg.remove();
  }, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      if (history.pushState) {
        history.pushState(null, null, targetId);
      } else {
        location.hash = targetId;
      }
    }
  });
});

// Animate elements when they come into view
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.rectangle-box, .profile-section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
};

// Initialize animations when page loads
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Add current year to footer
  document.querySelector('footer p').innerHTML = `&copy; ${new Date().getFullYear()} Bibechana Khadka. All rights reserved.`;
});

// Handle page transitions
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// Add smooth transition for spatial tools link
document.querySelector('a[href="spatialTool.html"]').addEventListener('click', (e) => {
  if (!e.ctrlKey && !e.metaKey) {
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = 'spatialTool.html';
    }, 300);
  }
});