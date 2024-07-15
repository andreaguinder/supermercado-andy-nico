document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const nombreValue = document.getElementById("nombre");
  const apellidoValue = document.getElementById("apellido");
  const emailValue = document.getElementById("email");
  const mensajeValue = document.getElementById("mensaje");


  const boxNombre = document.getElementById("box1");
  const boxApellido = document.getElementById("box2");
  const boxEmail = document.getElementById("box3");
  const boxMensaje = document.getElementById("box4");

  const validateForm = () => {
    const errorText = document.createElement("span");
    errorText.classList.add("errorMensaje");
    if (nombreValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese nombre";
      boxNombre.appendChild(errorText);
      setTimeout(() => {
        errorText.remove();
      }, 1500);

      return;
    }

    if (apellidoValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese Apellido";
      boxApellido.appendChild(errorText);
      setTimeout(() => {
        errorText.remove();
      }, 1500);
      return;
    }

    if (emailValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese Email valido";
      boxEmail.appendChild(errorText);
      setTimeout(() => {
        errorText.remove();
      }, 1500);
      return;
    }

    if (mensajeValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese un mensaje";
      boxMensaje.appendChild(errorText);
      setTimeout(() => {
        errorText.remove();
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


    modalForm.appendChild(buttonModal);
    modalForm.appendChild(success);
    buttonModal.appendChild(icon);
    containerModal.appendChild(modalForm);

    form.appendChild(containerModal);
  };

  const resetForm = () => {
    nombreValue.value = "";
    apellidoValue.value = "";
    emailValue.value = "";
    mensajeValue.value = "";
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();


  });
});
