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
      boxNombre.appendChild(errorText)
      setTimeout(() => {
        errorText.remove()
      }, 1500);
      
      return;
    }

    if (apellidoValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese Apellido";
      boxApellido.appendChild(errorText)
      setTimeout(() => {
        errorText.remove()
      }, 1500);
      return
    }

    if (emailValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese Email valido";
      boxEmail.appendChild(errorText)
      setTimeout(() => {
        errorText.remove()
      }, 1500);
      return
    }

    if (mensajeValue.value.trim() === "") {
      errorText.textContent = "Por favor ingrese un mensaje";
      boxMensaje.appendChild(errorText)
      setTimeout(() => {
        errorText.remove()
      }, 1500);
      return
    }

    //alert("Mensaje enviado exitosamente!");

  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();
  });
});

let mensajeEnviadoExitosamente = document.querySelector("#modal");

const abrirModalDeExito = document.getElementById("enviar")
const cerrarModal = document.getElementById("cerrarModal")
const modalContainerExito = document.getElementsByClassName("modalContainerExito")[0]


if (nombreValue && apellidoValue && emailValue && mensajeValue) {
  formulario.reset();

  modalContainerExito.classList.toggle("modalExitosoActive")

  document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
      icono.classList.remove('formulario__grupo-correcto');
  });
};
