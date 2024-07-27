document.addEventListener("DOMContentLoaded", () => {
  // carga productos
  const loadProducts = async () => {
    try {
      const response = await fetch("../json/products.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const products = await response.json();
      initializeStock(products);
      renderProducts(products);
    } catch (error) {
      console.error(
        "There has been a problem with your fetch operation:",
        error,
      );
    }
  };

  const initializeStock = (products) => {
    const storedStock = JSON.parse(localStorage.getItem("stock")) || {};
    products.forEach((product) => {
      if (storedStock[product.nombre] !== undefined) {
        product.stock = storedStock[product.nombre];
      } else {
        storedStock[product.nombre] = product.stock;
      }
    });
    localStorage.setItem("stock", JSON.stringify(storedStock));
  };

  const updateStock = (productName, newStock) => {
    const storedStock = JSON.parse(localStorage.getItem("stock")) || {};
    storedStock[productName] = newStock;
    localStorage.setItem("stock", JSON.stringify(storedStock));
  };

  // Modal confirmacion pedido
  const renderModalConfirmation = (
    productName,
    selectedQuantity,
    productTotalPrice,
    index,
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

    const buttonConfirm = document.createElement("button");
    buttonConfirm.type = "button";
    buttonConfirm.classList.add("btnModal", "pt-2", "px-3", "mx-2");
    buttonConfirm.textContent = "Agregar";

    // Agregar eventos
    buttonAbort.addEventListener("click", () => {
      containerModal.remove();
    });

    buttonConfirm.addEventListener("click", () => {
      // Almacena en local storage
      let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

      // Variable para verificar si el producto ya existe
      let productExists = false;

      // Iterar sobre el array de compras para encontrar el producto existente
      for (let i = 0; i < purchases.length; i++) {
        if (purchases[i][0] === productName) {
          // Producto encontrado, actualizar cantidad y precio total
          purchases[i][1] += selectedQuantity;
          purchases[i][2] += productTotalPrice;
          productExists = true;
        }
      }

      // Si el producto no existe en el carrito, agregarlo
      if (!productExists) {
        const purchase = [productName, selectedQuantity, productTotalPrice];
        purchases.push(purchase);
      }

      // Actualiza el localStorage
      localStorage.setItem("purchases", JSON.stringify(purchases));

      modalWarningSucces("¡Producto agregado!");
      containerModal.remove();

      // Resetea valor del input
      const input = document.getElementById(`input-${index}`);
      if (input) {
        input.value = 0;
      } else {
        console.error(`Input con ID input-${index} no encontrado.`);
      }
    });

    // Crear y agregar elementos de texto
    const labelName = document.createElement("h4");
    labelName.classList.add("card-title", "grande");
    labelName.textContent = productName;

    const labelStock = document.createElement("h6");
    labelStock.classList.add("card-title", "grande");
    labelStock.textContent = `Stock ${selectedQuantity} U.`;

    const labelTotalPrice = document.createElement("h5");
    labelTotalPrice.classList.add("card-title", "grande");
    labelTotalPrice.textContent = `$${productTotalPrice}`;

    // Agregar elementos
    modalConfirm.appendChild(labelName);
    modalConfirm.appendChild(labelStock);
    modalConfirm.appendChild(labelTotalPrice);
    modalConfirm.appendChild(buttonConfirm);
    modalConfirm.appendChild(buttonAbort);

    containerModal.appendChild(modalConfirm);

    document.body.appendChild(containerModal);
  };

  // Modal de advertencia  o confirmacion
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
    message.textContent = text;

    // Agregar elementos
    buttonModal.appendChild(icon);
    modalWarning.appendChild(buttonModal);
    modalWarning.appendChild(message);
    containerModal.appendChild(modalWarning);

    document.body.appendChild(containerModal);
  };
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

  const renderProducts = (products) => {
    const containerProducts = document.getElementById("productsProduct");

    if (!containerProducts) {
      console.error('El contenedor de productos no se encontró en el DOM.');
      return;
    }
    products.forEach((product, index) => {
      // Crear elementos
      const containerCard = document.createElement("div");
      containerCard.classList.add("card-img-top");
      containerCard.style = "width: 18rem";

      const imgProduct = document.createElement("img");
      imgProduct.classList.add("card-img-top");
      imgProduct.src = product.imagen;
      imgProduct.alt = product.nombre;

      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "mb-4");

      const labelNameProduct = document.createElement("h5");
      labelNameProduct.classList.add("card-title", "grande");
      labelNameProduct.textContent = product.nombre;

      const labelStockProduct = document.createElement("h6");
      labelStockProduct.classList.add("card-title", "grande");
      labelStockProduct.id = `stock-${index}`;
      labelStockProduct.textContent = `Stock ${product.stock} unidades`;

      const labelPriceProduct = document.createElement("h6");
      labelPriceProduct.textContent = `$${product.precio} por unidad`;

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

      // Agregar elementos
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
          product.stock++;
          labelStockProduct.textContent = `Stock ${product.stock} unidades`;
          updateStock(product.nombre, product.stock);
        }
      });

      buttonAdd.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (product.stock > 0) {
          input.value = currentValue + 1;
          product.stock--;
          labelStockProduct.textContent = `Stock ${product.stock} unidades`;
          updateStock(product.nombre, product.stock);

          if (product.stock === 0) {
            renderModalNotification();
          }
        }
      });

      buttonAddToCart.addEventListener("click", () => {
        let currentValue = parseInt(input.value) || 0;
        if (currentValue === 0) {
          modalWarningSucces("Debe agregar al menos un producto");
        } else {
          const totalPrice = currentValue * product.precio;
          renderModalConfirmation(
            product.nombre,
            currentValue,
            totalPrice,
            index,
          );
        }
      });
    });
  };

  loadProducts();
});
