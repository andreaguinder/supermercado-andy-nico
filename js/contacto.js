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
    if (nombreValue.value.trim() === "") {
      console.log("Por favor ingrese nombre!");
      return;
    }

    if (apellidoValue.value.trim() === "") {
      console.log("Por favor ingrese apellido!");
      return;
    }

    if (emailValue.value.trim() === "") {
      console.log("Por favor ingrese un email valido!");
      return;
    }

    if (mensajeValue.value.trim() === "") {
      console.log("Por favor ingrese su mensaje!");
      return;
    }

    alert("Mensaje enviado exitosamente!");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();
  });
});
