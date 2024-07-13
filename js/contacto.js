document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form");
  const nombreValue = document.getElementById("nombre");
  const apellidoValue = document.getElementById("apellido");
  const emailValue = document.getElementById("email");
  const mensajeValue = document.getElementById("mensaje");

  const validateForm = () => {
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

    console.log(nombreValue.value);
    console.log(apellidoValue.value);
    console.log(emailValue.value);
    console.log(mensajeValue.value);

    alert("Mensaje enviado exitosamente!");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    validateForm();
  });
});
