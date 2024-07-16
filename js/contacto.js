document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const nameValue = document.getElementById("name");
  const surnameValue = document.getElementById("surname");
  const emailValue = document.getElementById("email");
  const phoneValue = document.getElementById("phone");
  const messageValue = document.getElementById("message");
  const validateForm = () => {
    if (nameValue.value.trim() === "") {
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("errorMensaje");
      errorMessage.textContent = "Todos los campos son obligatorios";

      form.appendChild(errorMessage);

      setTimeout(() => {
        errorMessage.remove();
      }, 1500);

      return;
    }
    // Aquí puedes llamar a otra función como `renderModal()` si todos los campos están validados
    renderModal();
  };

  const renderModal = () => {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalForm = document.createElement("div");
    modalForm.classList.add("modalForm");

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("btnModal", "pt-2", "px-3");
    buttonModal.id = "cerrarModal";

    buttonModal.addEventListener("click", () => {
      containerModal.remove();
      resetForm();
    });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-x");

    const success = document.createElement("h5");
    success.textContent = "¡Su consulta fue enviada!";

    modalForm.appendChild(buttonModal);
    modalForm.appendChild(success);
    buttonModal.appendChild(icon);
    containerModal.appendChild(modalForm);

    form.appendChild(containerModal);
  };

  const resetForm = () => {
    nameValue.value = "";
    surnameValue.value = "";
    emailValue.value = "";
    phoneValue.value = "";
    messageValue.value = "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();
  });
});
