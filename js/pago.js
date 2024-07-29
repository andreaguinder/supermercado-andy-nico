document.addEventListener("DOMContentLoaded", () => {
  const containerPurchase = document.getElementById("titProducts");

  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  const cartDiv = document.createElement("div");

  if (purchases.length === 0) {
    const messageText = document.createElement("p");
    messageText.textContent = "El carrito está vacío.";
    containerPurchase.appendChild(messageText);
  } else {
    let sumaTotal = purchases.reduce((acumulador, purchase) => {
      const [productName, selectedQuantity, productTotalPrice] = purchase;
      return acumulador + productTotalPrice;
    }, 0);

    let precioSinDescuento = sumaTotal;

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

    // Actualizar el elemento con id discount
    const discountP = document.getElementById("discount");
    if (descuento > 0) {
      const descuentoP = document.createElement("p");
      descuentoP.textContent = `Descuento aplicado: $${descuento.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      discountP.appendChild(descuentoP);
    }

    containerPurchase.appendChild(cartDiv);

    const priceTotal = document.getElementById('priceTotal');
    priceTotal.textContent = `Precio Total sin descuento: $${precioSinDescuento.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

    // Actualizar el elemento priceTotal
    const priceDiscount = document.getElementById("priceDiscount");
    if (priceDiscount) {
      priceDiscount.textContent = `Precio Total con descuento aplicado: $${sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }

    // Crear modal confirmación de compra
    const renderModalNotification = () => {
      const containerModal = document.createElement("div");
      containerModal.classList.add("modalContainerExito");

      const modalNotification = document.createElement("div");
      modalNotification.classList.add("modalForm");

      const icon = document.createElement("i");
      icon.classList.add("fa-solid", "fa-x");
      icon.addEventListener("click", () => {
        document.body.removeChild(containerModal);
      });

      const message = document.createElement("h5");
      message.textContent = "¡Gracias por tu compra! Te enviaremos el código de seguimiento lo antes posible por email.";

      modalNotification.appendChild(icon);
      modalNotification.appendChild(message);
      containerModal.appendChild(modalNotification);
      document.body.appendChild(containerModal);
    };

    const buttonConfirm = document.getElementById("buttonConfirm");
    const buttonAbort = document.getElementById("buttonAbort");

    buttonConfirm.addEventListener("click", () => {

      renderModalNotification();
    });
    buttonAbort.addEventListener("click", () => {
      localStorage.clear();
      location.reload();
    });
  }
});
