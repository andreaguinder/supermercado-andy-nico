document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");

  const nombreValue = document.getElementById("nombre");
  const apellidoValue = document.getElementById("apellido");
  const emailValue = document.getElementById("email");
  const mensajeValue = document.getElementById("mensaje");

  const buttonReset = document.getElementById("btn-reset");

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

    //alert("Mensaje enviado exitosamente!");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalForm = document.createElement("div");
    modalForm.classList.add("modalForm");

    const buttonModal = document.createElement("button");
    buttonModal.classList.add("btnModal", "pt-2", "px-3");
    buttonModal.id = "cerrarModal";

    buttonModal.addEventListener("click", () => {
      containerModal.remove();
    });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-x");

    const succes = document.createElement("h5");
    succes.innerHTML = "Su consulta fue enviada!";
    containerModal.appendChild(modalForm);

    modalForm.appendChild(buttonModal);
    modalForm.appendChild(succes);

    buttonModal.appendChild(icon);

    form.appendChild(containerModal);
  });
});
