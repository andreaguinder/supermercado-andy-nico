document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const box3 = document.getElementById("box3");
  const box4 = document.getElementById("box4");
  const box5 = document.getElementById("box5");

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

    const regExName = /^\d{7,14}$/;
    if (!regExName.test(nameValue.value.trim())) {
      const nameError = document.createElement("span");
      nameError.classList.add("errorMensaje");
      isValid = false;

      nameError.textContent =
        "Debe ingresar un nombre";
      box1.appendChild(nameError);
      setTimeout(() => {
        nameError.remove();
      }, 1500);
    }

    const regExSurname = /^\d{7,14}$/;
    if (!regExSurname.test(surnameValue.value.trim())) {
      const surnameError = document.createElement("span");
      surnameError.classList.add("errorMensaje");
      isValid = false;

      surnameError.textContent =
        "Debe ingresar un apellido";
      box2.appendChild(surnameError);
      setTimeout(() => {
        surnameError.remove();
      }, 1500);
    }

    const regExEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!regExEmail.test(emailValue.value.trim())) {
      const emailError = document.createElement("span");
      emailError.classList.add("errorMensaje");
      isValid = false;
      emailError.textContent = "Formato no válido";
      box3.appendChild(emailError);
      setTimeout(() => {
        emailError.remove();
      }, 1500);
    }

    const regExPhone = /^\d{7,14}$/;
    if (!regExPhone.test(phoneValue.value.trim())) {
      const phoneError = document.createElement("span");
      phoneError.classList.add("errorMensaje");
      isValid = false;

      phoneError.textContent =
        "Debe contener solo números";
      box4.appendChild(phoneError);
      setTimeout(() => {
        phoneError.remove();
      }, 1500);
    }



    if (!isValid) {
      const errorMessage = document.createElement("span");
      errorMessage.classList.add("errorMensaje");
      errorMessage.textContent = "Todos los campos son obligatorios";
      box5.appendChild(errorMessage);

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
