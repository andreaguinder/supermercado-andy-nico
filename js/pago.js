document.addEventListener("DOMContentLoaded", () => {
  const containerPurchase = document.getElementById("titProducts");

  // Obtener objetos del local storage
  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  const cartDiv = document.createElement("div");

  let precioSinDescuento = 0;
  let descuento = 0;
  let sumaTotal = 0;

  // Mensaje para carrito vacío
  if (purchases.length === 0) {
    const messageText = document.createElement("p");
    messageText.textContent = "El carrito está vacío.";
    containerPurchase.appendChild(messageText);
  } else {
    sumaTotal = purchases.reduce((acumulador, purchase) => {
      const [productName, selectedQuantity, productTotalPrice] = purchase;
      return acumulador + productTotalPrice;
    }, 0);

    precioSinDescuento = sumaTotal;

    // Aplicar descuento del 20% si el total supera los 100,000
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

    // Actualizar el elemento priceDiscount o mostrar que no hay descuento
    const priceDiscount = document.getElementById("priceDiscount");
    if (descuento > 0) {
      priceDiscount.textContent = `Precio Total con descuento aplicado: $${sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    } else {
      priceDiscount.textContent = "No hay descuento.";
    }

    const containerButtons = document.getElementById("buttons");
    
    // Botones para confirmar o cancelar compra
    if (purchases.length !== 0) {
      const buttonConfirm = document.createElement("button");
      buttonConfirm.classList.add("btnModal");
      buttonConfirm.textContent = "Confirmar compra";

      const buttonAbort = document.createElement("button");
      buttonAbort.classList.add("btnModal");
      buttonAbort.textContent = "Cancelar compra";

      containerButtons.appendChild(buttonConfirm);
      containerButtons.appendChild(buttonAbort);

      buttonConfirm.addEventListener("click", () => {
        renderModalNotification();
      });

      buttonAbort.addEventListener("click", () => {
        // Limpia local storage
        localStorage.clear();

        // Recarga la página
        location.reload();
      });
    }
  }

  // Función para guardar las compras en un archivo txt
  function savePurchaseToTxt(purchases, precioSinDescuento, descuento, sumaTotal) {
    let content = 'Resumen de Compra:\n\n';
    purchases.forEach((purchase) => {
      const [productName, selectedQuantity, productTotalPrice] = purchase;
      content += `Producto: ${productName}\nCantidad: ${selectedQuantity}\nPrecio Total: $${productTotalPrice.toLocaleString('es-ES')}\n\n`;
    });

    content += `Precio Total sin descuento: $${precioSinDescuento.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    if (descuento > 0) {
      content += `Descuento aplicado: $${descuento.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
      content += `Precio Total con descuento aplicado: $${sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    } else {
      content += `Precio Total: $${sumaTotal.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}\n`;
    }

    // Crea un Blob con el contenido en formato de texto
    const blob = new Blob([content], { type: 'text/plain' });

    // Crea un enlace para descargar el archivo
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'resumen_compra.txt';
    a.click();
  }

  // Función para mostrar el modal de confirmación de compra
  function renderModalNotification() {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalNotification = document.createElement("div");
    modalNotification.classList.add("modalForm");

    const buttonAbort = document.createElement("button");
    buttonAbort.classList.add("btnModal", "pt-2", "px-3", "mx-2")
   
    buttonAbort.addEventListener('click', () => {
      
      savePurchaseToTxt(purchases, precioSinDescuento, descuento, sumaTotal);
      localStorage.clear();
      location.reload();

    })
 
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-x");
    icon.addEventListener("click", () => {
      document.body.removeChild(containerModal);
    });

    const message = document.createElement("h5");
    message.textContent = "¡Gracias por tu compra! Te enviaremos el código de seguimiento lo antes posible por email.";


    buttonAbort.appendChild(icon)
    modalNotification.appendChild(buttonAbort);
    modalNotification.appendChild(message);
    containerModal.appendChild(modalNotification);
    document.body.appendChild(containerModal);
  }
});
