document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      icon.classList.toggle('active');
    });
  });
  