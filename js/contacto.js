document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const nameValue = document.getElementById("name");
  const surnameValue = document.getElementById("surname");
  const emailValue = document.getElementById("email");
  const phoneValue = document.getElementById("phone");
  const messageValue = document.getElementById("message");

  const fields = [
    nameValue,
    surnameValue,
    emailValue,
    phoneValue,
    messageValue,
  ];

  const validateForm = () => {
    let isValid = true;

    fields.forEach((field) => {
      if (field.value.trim() === "") {
        isValid = false;
      }
    });

    if (!isValid) {
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("errorMensaje");
      errorMessage.textContent = "Todos los campos son obligatorios";
      form.appendChild(errorMessage);

      setTimeout(() => {
        errorMessage.remove();
      }, 1500);

      return;
    }

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

    buttonModal.appendChild(icon);
    modalForm.appendChild(buttonModal);
    modalForm.appendChild(success);
    containerModal.appendChild(modalForm);

    document.body.appendChild(containerModal);
  };

  const resetForm = () => {
    fields.forEach((field) => {
      field.value = "";
    });
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm();
  });
});
