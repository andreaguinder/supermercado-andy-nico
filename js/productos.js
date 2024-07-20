
document.addEventListener("DOMContentLoaded", () => {
  // Datos del producto

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
    "Casancrem Light",
    "Mochila Unicornio",
    "Alfombra Baño",
  ];
  const priceProducts = [
    "3500",
    "5200",
    "22000",
    "1850",
    "120000",
    "2000",
    "2000",
    "6500",
    "10000",
    "3700",
    "18000",
    "8000",
  ];
  const stockProducts = [10, 15, 11, 25, 33, 5, 12, 14, 17, 15, 4, 6];
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
    "../images/casancrem-light.webp",
    "../images/mochila-unicornio.webp",
    "../images/alfombra-de-banio.webp",
  ];

  // Renderizar modal de notificación de stock agotado

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

    const message = document.createElement("h5");
    message.textContent = "No hay más stock disponible.";

    // Agregar elementos

    buttonModal.appendChild(icon);
    modalNotification.appendChild(buttonModal);
    modalNotification.appendChild(message);
    containerModal.appendChild(modalNotification);

    document.body.appendChild(containerModal);
  };

  // Renderizar modal de confirmación de pedido

  const renderModalConfirmation = (
    productName,
    selectedQuantity,
    productTotalPrice,
    index 
  ) => {
    // Crear elementos

    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalConfirm = document.createElement("div");
    modalConfirm.classList.add("modalForm");

    const buttonAbort = document.createElement("button");
    buttonAbort.type = "button";
    buttonAbort.classList.add("btnModal", "pt-2", "px-3", "mx-2");
    buttonAbort.textContent = "Cancelar";
    buttonAbort.id = "cerrarModal";

    const buttonConfirm = document.createElement("button");
    buttonConfirm.type = "button";
    buttonConfirm.classList.add("btnModal", "pt-2", "px-3", "mx-2");
    buttonConfirm.textContent = "Agregar";

    buttonAbort.addEventListener("click", () => {
      containerModal.remove();
    });

    const labelName = document.createElement("h4");
    labelName.classList.add("card-title", "grande");
    labelName.textContent = productName;

    const labelStock = document.createElement("h6");
    labelStock.classList.add("card-title", "grande");
    labelStock.textContent = `Stock ${selectedQuantity} U.`;

    const labelTotalPrice = document.createElement("h5");
    labelTotalPrice.classList.add("card-title", "grande");
    labelTotalPrice.textContent = `$${productTotalPrice}`;

    buttonConfirm.addEventListener("click", () => {

      //Almacena en local storage

      let purchases = JSON.parse(localStorage.getItem('purchases')) || [];

      const purchase = [
        productName,
        selectedQuantity,
        productTotalPrice
      ];

      let updatePurchases = [...purchases, purchase];

      localStorage.setItem('purchases', JSON.stringify(updatePurchases));

      modalWarningSucces("Producto agregado!");
      
      containerModal.remove();

      // Resetea valor del input
      const input = document.getElementById(`input-${index}`);
      if (input) {
        input.value = 0;
      } else {
        console.error(`Input con ID input-${index} no encontrado.`);
      }

    });

    // Agregar elementos

    modalConfirm.appendChild(labelName);
    modalConfirm.appendChild(labelStock);
    modalConfirm.appendChild(labelTotalPrice);
    containerModal.appendChild(modalConfirm);
    modalConfirm.appendChild(buttonConfirm);
    modalConfirm.appendChild(buttonAbort);

    document.body.appendChild(containerModal);
  };

  // Renderizar modal de advertencia de agregar al menos un producto o exito

  const modalWarningSucces = (text) => {
    // Crear elementos
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
    message.textContent = text

    // Agregar elementos
    buttonModal.appendChild(icon);
    modalWarning.appendChild(buttonModal);
    modalWarning.appendChild(message);
    containerModal.appendChild(modalWarning);

    document.body.appendChild(containerModal);
  };

  // Renderizar productos

  const renderProducts = () => {
    nameProducts.forEach((nameProduct, index) => {
      // Crear elementos
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

      const buttonRemove = document.createElement("button");
      buttonRemove.type = "button";
      buttonRemove.id = `btnRemove-${index}`;
      buttonRemove.classList.add("btnModal", "px-3", "mb-0");
      buttonRemove.textContent = "-";

      const buttonAdd = document.createElement("button");
      buttonAdd.type = "button";
      buttonAdd.id = `btnAdd-${index}`;
      buttonAdd.classList.add("btnModal", "px-3", "mb-0");
      buttonAdd.textContent = "+";

      const input = document.createElement("input");
      input.readOnly = true;
      input.type = "text";
      input.placeholder = 0;
      input.id = `input-${index}`;

      // Agregar elemntos

      span.appendChild(buttonRemove);
      span.appendChild(input);
      span.appendChild(buttonAdd);

      const buttonAddToCart = document.createElement("button");
      buttonAddToCart.type = "button";
      buttonAddToCart.classList.add("btnModal", "px-3", "mb-0");
      buttonAddToCart.textContent = "Agregar al carrito";

      cardBody.appendChild(labelNameProduct);
      cardBody.appendChild(labelStockProduct);
      cardBody.appendChild(labelPriceProduct);
      cardBody.appendChild(span);
      cardBody.appendChild(buttonAddToCart);
      containerCard.appendChild(imgProduct);
      containerCard.appendChild(cardBody);

      containerProducts.appendChild(containerCard);

      // Escuchar eventos

      buttonRemove.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue > 0) {
          input.value = currentValue - 1;
          stockProducts[index]++;
          labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;
        }
      });

      buttonAdd.addEventListener("click", () => {
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

      buttonAddToCart.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue === 0) {
          modalWarningSucces("Debe agregar al menos un producto");
        } else {
          const totalPrice = currentValue * priceProducts[index];
          renderModalConfirmation(nameProducts[index], currentValue, totalPrice,index);
        }
      });
    });
  };

  // Render inicial
  setTimeout(() => {
    renderProducts();
  }, 500);

})