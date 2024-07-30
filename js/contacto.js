document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const box1 = document.getElementById("box1");
  const box2 = document.getElementById("box2");
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

  //Validacion formulario

  function validateForm() {
    let isValid = true;

    fields.forEach((field) => {
      if (field.value.trim() === "") {
        isValid = false;
      }
    });


    // Validaciones de campos con expresiones regulares

    const regExName = /^[a-zA-Z\s]{4,30}$/;
    if (!regExName.test(nameValue.value.trim())) {
      const nameError = document.createElement("span");
      nameError.classList.add("errorMensaje");
      isValid = false;

      // Muestra mensaje error
      nameError.textContent = "Debe ingresar un nombre";
      box1.appendChild(nameError);

      // Borra mensaje despues de un segundo y medio
      setTimeout(() => {
        nameError.remove();
      }, 1500);
    }

    
    const regExSurname = /^[a-zA-Z\s]{4,30}$/;
    if (!regExSurname.test(surnameValue.value.trim())) {
      const surnameError = document.createElement("span");
      surnameError.classList.add("errorMensaje");
      isValid = false;

      surnameError.textContent = "Debe ingresar un apellido";
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

      phoneError.textContent = "Min 7 - Max 14 números";
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
    saveToContact();
  };

  // Renderiza modal
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

  // Resetea el formulario
  const resetForm = () => {
    fields.forEach((field) => {
      field.value = "";
    });
  };

  const saveToContact = () => {
    const data = {
      name: nameValue.value.trim(),
      surname: surnameValue.value.trim(),
      email: emailValue.value.trim(),
      phone: phoneValue.value.trim(),
      message: messageValue.value.trim(),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formContacto.txt';
    a.click();
    URL.revokeObjectURL(url);
  };


  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateForm();
  });
});
