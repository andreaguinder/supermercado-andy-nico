document.addEventListener("DOMContentLoaded", () => {
  // Product Data
  const containerProducts = document.getElementById("productsProduct");
  const nameProducts = [
    "Fideos Marolio",
    "Toallitas Nosotras",
    "Tequila José Cuervo",
    "Juego de Batería x 5",
    "Plato cuadrado",
    "Plato redondo",
    "Hueso mordisco",
    "Cubo Rubik",
    "Coca Cola 1L",
  ];
  const priceProducts = [
    "1100",
    "640",
    "3500",
    "1850",
    "8500",
    "6350",
    "1500",
    "920",
    "1350",
  ];
  const stockProducts = [10, 15, 11, 25, 33, 5, 12, 14, 17];
  const imagesProducts = [
    "../images/fideos-marolio.webp",
    "../images/toallitas-nosotras_2.webp",
    "../images/tequila.webp",
    "../images/juego-de-bateria.webp",
    "../images/plato-cuadrado.webp",
    "../images/plato-redondo.webp",
    "../images/hueso-mordisco.webp",
    "../images/cubo-rubik.webp",
    "../images/coca-cola.webp",
  ];

  // Render Modal for Out of Stock Notification
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

    const message = document.createElement("h5");
    message.textContent = "No hay más stock disponible.";

    buttonModal.appendChild(icon);
    modalNotification.appendChild(buttonModal);
    modalNotification.appendChild(message);
    containerModal.appendChild(modalNotification);

    document.body.appendChild(containerModal);
  };

  // Render Modal for Order Confirmation
  const renderConfirmationModal = () => {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalConfirm = document.createElement("div");
    modalConfirm.classList.add("modalForm");

    const buttonAbort = document.createElement("button");
    buttonAbort.type = "button";
    buttonAbort.classList.add("btnModal", "pt-2", "px-3");
    buttonAbort.textContent = "Cancelar";
    buttonAbort.id = "cerrarModal";

    const buttonConfirm = document.createElement("button");
    buttonConfirm.type = "button";
    buttonConfirm.classList.add("btnModal", "pt-2", "px-3");
    buttonConfirm.textContent = "Agregar";

    buttonAbort.addEventListener("click", () => {
      containerModal.remove();
    });

    const labelName = document.createElement("h5");
    labelName.classList.add("card-title", "grande");
    labelName.textContent = "Nombre del Producto";

    const labelStock = document.createElement("h5");
    labelStock.classList.add("card-title", "grande");
    labelStock.textContent = "5";

    const labelTotalPrice = document.createElement("h6");
    labelTotalPrice.classList.add("card-title", "grande");
    labelTotalPrice.textContent = "$2500";

    modalConfirm.appendChild(buttonAbort);
    modalConfirm.appendChild(buttonConfirm);
    modalConfirm.appendChild(labelName);
    modalConfirm.appendChild(labelStock);
    modalConfirm.appendChild(labelTotalPrice);
    containerModal.appendChild(modalConfirm);

    document.body.appendChild(containerModal);
  };

  const renderWarningModal = () => {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalWarning = document.createElement("div");
    modalWarning.classList.add("modalForm");

    const buttonModal = document.createElement("button");
    buttonModal.type = "button";
    buttonModal.classList.add("btnModal", "pt-2", "px-3");
    buttonModal.id = "cerrarModal";

    buttonModal.addEventListener("click", () => {
      containerModal.remove();
    });

    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-x");

    const message = document.createElement("h5");
    message.textContent = "Debe agregar al menos un producto.";

    buttonModal.appendChild(icon);
    modalWarning.appendChild(buttonModal);
    modalWarning.appendChild(message);
    containerModal.appendChild(modalWarning);

    document.body.appendChild(containerModal);
  };

  // Render Products
  const renderProducts = () => {
    nameProducts.forEach((nameProduct, index) => {
      const containerCard = document.createElement("div");
      containerCard.classList.add("card-img-top");
      containerCard.style = "width: 18rem";

      const imgProduct = document.createElement("img");
      imgProduct.classList.add("card-img-top");
      imgProduct.src = imagesProducts[index];
      imgProduct.alt = nameProduct;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "mb-4");

      const labelNameProduct = document.createElement("h5");
      labelNameProduct.classList.add("card-title", "grande");
      labelNameProduct.textContent = nameProduct;

      const labelStockProduct = document.createElement("h6");
      labelStockProduct.classList.add("card-title", "grande");
      labelStockProduct.id = `stock-${index}`;
      labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;

      const labelPriceProduct = document.createElement("h6");
      labelPriceProduct.textContent = `$${priceProducts[index]} por unidad`;

      const span = document.createElement("span");
      span.type = "text";
      span.classList.add("span__products-input");

      const btnRemove = document.createElement("button");
      btnRemove.type = "button";
      btnRemove.id = `btnRemove-${index}`;
      btnRemove.classList.add("btnModal", "px-3", "mb-0");
      btnRemove.textContent = "-";

      const btnAdd = document.createElement("button");
      btnAdd.type = "button";
      btnAdd.id = `btnAdd-${index}`;
      btnAdd.classList.add("btnModal", "px-3", "mb-0");
      btnAdd.textContent = "+";

      const input = document.createElement("input");
      input.readOnly = true;
      input.type = "text";
      input.placeholder = 0;
      input.id = `input-${index}`;

      span.appendChild(btnRemove);
      span.appendChild(input);
      span.appendChild(btnAdd);

      const btnAddToCart = document.createElement("button");
      btnAddToCart.type = "button";
      btnAddToCart.classList.add("btnModal", "px-3", "mb-0");
      btnAddToCart.textContent = "Agregar al carrito";

      cardBody.appendChild(labelNameProduct);
      cardBody.appendChild(labelStockProduct);
      cardBody.appendChild(labelPriceProduct);
      cardBody.appendChild(span);
      cardBody.appendChild(btnAddToCart);
      containerCard.appendChild(imgProduct);
      containerCard.appendChild(cardBody);

      containerProducts.appendChild(containerCard);

      // Event Listeners
      btnRemove.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue > 0) {
          input.value = currentValue - 1;
          stockProducts[index]++;
          labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;
        }
      });

      btnAdd.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (stockProducts[index] > 0) {
          input.value = currentValue + 1;
          stockProducts[index]--;
          labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;

          if (stockProducts[index] === 0) {
            renderModalNotification();
          }
        }
      });

      btnAddToCart.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue === 0) {
          renderWarningModal();
        } else {
          const totalPrice = currentValue * priceProducts[index];
          renderConfirmationModal(nameProduct, currentValue, totalPrice);
        }
      });
    });
  };

  // Initial Render
  setTimeout(() => {
    renderProducts();
  }, 500);
});
