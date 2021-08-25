const ModalInitiator = {
  show(message) {
    const modal = document.querySelector('.modal.hidden');
    const modalContent = modal.querySelector('.modal-content');
    modalContent.innerHTML = `<p>${message}</p>`;
    modal.classList.remove('hidden');

    window.onclick = (event) => {
      modalContent.innerHTML = `<p></p>`;
      modal.classList.add('hidden');
    };
  },
};

export default ModalInitiator;
