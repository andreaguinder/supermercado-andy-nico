document.addEventListener("DOMContentLoaded", () => {
  const containerPurchase = document.getElementById("titProducts");

  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  const cartDiv = document.createElement("div");


 const priceTotal = document.getElementById("priceTotal");
  if (purchases.length === 0) {
    const messageText = document.createElement("p");
    messageText.textContent = "El carrito está vacío.";
    containerPurchase.appendChild(messageText);
  } else {
    
    const sumaTotal = purchases.reduce(function (acumulador, purchase) {
      const [productName, selectedQuantity, productTotalPrice] = purchase;

      return acumulador + productTotalPrice;
      
    },0);

    //console.log(sumaTotal);
    purchases.forEach((purchase) => {
      const [productName, selectedQuantity, productTotalPrice] = purchase;
      
      const hrEspaciado = document.createElement("hr");
      hrEspaciado.classList.add("hr-espaciado");

      const purchaseDiv = document.createElement("div");
      purchaseDiv.className = "purchase";
      hrEspaciado.classList.add("hr-espaciado");

      const nameP = document.createElement("p");
      nameP.textContent = `Producto: ${productName}`;
      purchaseDiv.appendChild(nameP);

      const quantityP = document.createElement("p");
      quantityP.textContent = `Cantidad: ${selectedQuantity}`;
      purchaseDiv.appendChild(quantityP);


      const priceP = document.createElement("p");
      priceP.classList.add("productos-elegidos");

      priceP.textContent = `Precio Total: $${productTotalPrice}`;
      purchaseDiv.appendChild(priceP);
  


      



      cartDiv.appendChild(hrEspaciado);
      cartDiv.appendChild(purchaseDiv);

      const buttonConfirmar = document.getElementById("buttonConfirmar");
    // Crear modal confirmacion de compra
    const renderModalNotification = () => {
      // Crear elementos
      const containerModal = document.createElement("div");
      containerModal.classList.add("modalContainerExito");
  
      const modalNotification = document.createElement("div");
      modalNotification.classList.add("modalForm");
  
      const buttonModal = document.createElement("button");
      buttonModal.type = "button";
      buttonModal.classList.add("btnModal", "pt-2", "px-3");
      buttonModal.id = "cerrarModal";

      buttonModal.addEventListener("click", () => {
        containerModal.remove();
      });
  
      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-x");
  
      const cancelarCompra = document.getElementById("btn-reset");
  
      cancelarCompra.addEventListener("Click", function (){
        localstorage.removeItem("purchases");
      })
      const message = document.createElement("h5");
      message.textContent = "¡Gracias por tu compra! Te enviaremos el código de seguimiento lo antes posible por email.";
      // Agregar elementos
  
      buttonModal.appendChild(icon);

      modalNotification.appendChild(buttonModal);
      modalNotification.appendChild(message);
      containerModal.appendChild(modalNotification);
  
      document.body.appendChild(containerModal);
    };

    buttonConfirmar.addEventListener("click", function(){
      renderModalNotification();


    })
      cartDiv.appendChild(hrEspaciado);



      containerPurchase.appendChild(cartDiv);

    });
  }
  
});


// Crear productos totales de la pagina



