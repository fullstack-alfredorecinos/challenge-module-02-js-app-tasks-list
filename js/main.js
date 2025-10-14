// --- Resalta el label de fecha cuando el input está en foco ---
const dateInput = document.querySelector('.date-box input[type="date"]');
const dateLabel = document.querySelector('.date-box .static-label');

if (dateInput && dateLabel) {
  dateInput.addEventListener('focus', () => {
    dateLabel.classList.add('focused');
  });

  dateInput.addEventListener('blur', () => {
    dateLabel.classList.remove('focused');
  });
}
