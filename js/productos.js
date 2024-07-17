document.addEventListener("DOMContentLoaded", () => {
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
    "../images/toallitas-nosotras.jpg",
    "../images/tequila.webp",
    "../images/juego-de-bateria.jpg",
    "../images/plato-cuadrado.webp",
    "../images/plato-redondo.jpg",
    "../images/hueso-mordisco.jpg",
    "../images/cubo-rubik.jpg",
    "../images/coca-cola.jpg",
  ];

  const renderModalNotificaction = () => {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalForm = document.createElement("div");
    modalForm.classList.add("modalForm");

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
    modalForm.appendChild(buttonModal);
    modalForm.appendChild(message);
    containerModal.appendChild(modalForm);

    document.body.appendChild(containerModal);
  };

  const orderConfirmationModal = () => {
    const containerModal = document.createElement("div");
    containerModal.classList.add("modalContainerExito");

    const modalConfirm = document.createElement("div");
    modalConfirm.classList.add("modalForm");

    const buttonModal = document.createElement("button");
    buttonModal.type = "button";
    buttonAbort.classList.add("btnModal", "pt-2", "px-3");
    buttonAbort.textContent = "Cancelar";
    buttonAbort.id = "cerrarModal";

    const buttonConfirm = document.createElement("button");
    buttonConfirm.type = "button";
    buttonConfirm.classList.add("btnModal", "pt-2", "px-3");
    buttonConfirm.textContent = "Agregar";

    buttonModal.addEventListener("click", () => {
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

    modalConfirm.appendChild(buttonModal);
    modalConfirm.appendChild(labelName);
    modalConfirm.appendChild(labelStock);
    modalConfirm.appendChild(labelTotalPrice);
    containerModal.appendChild(modalConfirm);

    document.body.appendChild(containerModal);
  };

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
      btnRemove.id = `btnAdd-${index}`;
      btnRemove.classList.add("btnModal", "px-3", "mb-0");
      btnRemove.textContent = "-";

      const btnAdd = document.createElement("button");
      btnAdd.type = "button";
      btnAdd.id = `btnAdd-${index}`;
      btnAdd.classList.add("btnModal", "px-3", "mb-0");
      btnAdd.textContent = "+";

      const input = document.createElement("input");
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

      btnRemove.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue > 0) {
          input.value = currentValue - 1;
          stockProducts[index]++;
          labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;
          //containerCard.classList.remove("card-disabled");
        }
      });

      btnAdd.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (stockProducts[index] > 0) {
          input.value = currentValue + 1;
          stockProducts[index]--;
          labelStockProduct.textContent = `Stock ${stockProducts[index]} unidades`;

          if (stockProducts[index] === 0) {
            // containerCard.classList.add("card-disabled");
            renderModalNotificaction();
          }
        }
      });

      btnAddToCart.addEventListener("click", () => {
        orderConfirmationModal();
      });
    });
  };

  setTimeout(() => {
    renderProducts();
  }, 500);
});
