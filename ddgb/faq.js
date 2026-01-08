// FAQ toggle functionality
(function() {
  function initFAQ() {
    document.body.addEventListener('click', function(e) {
      // Check if the clicked element is a FAQ question button or inside one
      const button = e.target.closest('.faq-question');
      if (!button) return;
      
      const faqItem = button.parentElement;
      const answer = faqItem.querySelector('.faq-answer');
      const icon = button.querySelector('.faq-icon');
      
      if (!answer || !icon) return;
      
      // Toggle the 'open' class
      const isOpen = answer.classList.contains('open');
      
      if (isOpen) {
        answer.classList.remove('open');
        icon.textContent = '+';
        button.classList.remove('active');
      } else {
        answer.classList.add('open');
        icon.textContent = '−';
        button.classList.add('active');
      }
    });
  }
  
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
  } else {
    initFAQ();
  }
})();




