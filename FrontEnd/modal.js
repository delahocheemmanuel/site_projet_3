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
  
  function openModalContentForm() {
    const modal = document.querySelector('.modal__content__form');
    modal.style.display = 'flex';
  
    const returnButtonContentForm = document.querySelector('.modal__content__return__button');
    returnButtonContentForm.addEventListener('click', function() {
      modal.style.display = 'none';
    })
  
    const closeButtonContentForm = document.querySelector('.modal__content__close__button');
    closeButtonContentForm.addEventListener('click', function() {
      modal.style.display = 'none';
      window.location.href = 'index.html';
    });
  }
  

  