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
    
    let sumaTotal = purchases.reduce((acumulador, purchase) => {
      const [productName, selectedQuantity, productTotalPrice] = purchase;
      return acumulador + productTotalPrice;
    }, 0);

    // Aplicar descuento del 20% si el total supera los 100,000
    let descuento = 0;
    if (sumaTotal > 100000) {
      descuento = sumaTotal * 0.20;
      sumaTotal -= descuento;
    }

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
      priceP.textContent = `Precio Total: $${productTotalPrice.toLocaleString('es-ES')}`;
      purchaseDiv.appendChild(priceP);

      cartDiv.appendChild(hrEspaciado);
      cartDiv.appendChild(purchaseDiv);
    });

    // Mostrar el total calculado y el descuento aplicado (si corresponde)
    const totalDiv = document.createElement("div");
    totalDiv.className = "total";

    if (descuento > 0) {
      const descuentoP = document.createElement("p");
      descuentoP.textContent = `Descuento aplicado: $${descuento.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      totalDiv.appendChild(descuentoP);
    }

    const totalP = document.createElement("p");
    totalP.textContent = `Precio Final: $${sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    totalDiv.appendChild(totalP);

    cartDiv.appendChild(totalDiv);
    containerPurchase.appendChild(cartDiv);

    const buttonConfirmar = document.getElementById("buttonConfirmar");

    // Crear modal confirmación de compra
    const renderModalNotification = () => {
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

      cancelarCompra.addEventListener("click", function (){
        localStorage.removeItem("purchases");
      });

      const message = document.createElement("h5");
      message.textContent = "¡Gracias por tu compra! Te enviaremos el código de seguimiento lo antes posible por email.";

      buttonModal.appendChild(icon);
      modalNotification.appendChild(buttonModal);
      modalNotification.appendChild(message);
      containerModal.appendChild(modalNotification);

      document.body.appendChild(containerModal);
    };

    buttonConfirmar.addEventListener("click", function(){
      renderModalNotification();
    });
  }
});
