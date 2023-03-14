

function openModal() {
    const modal = document.querySelector('#modal');
    modal.style.display = 'flex';
  
    const closeButton = document.querySelector('.modal__close__button');
    closeButton.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  
    window.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
  }