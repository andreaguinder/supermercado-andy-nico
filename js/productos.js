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

  const sctockProducts = [10, 15, 11, 25, 33, 5, 12, 14, 17];

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
      labelStockProduct.textContent = `Stock ${sctockProducts[index]} unidades`;

      const labelPriceProduct = document.createElement("h6");
      labelPriceProduct.textContent = `$${priceProducts[index]} por unidad`;

      const span = document.createElement("span");
      span.type = "text";
      span.classList.add("span__products-input");

      const btnAdd = document.createElement("button");
      btnAdd.type = "button";
      btnAdd.id = "btnAdd";
      btnAdd.classList.add("btnModal", "px-3", "mb-0");
      btnAdd.textContent = "+";

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = 0;

      span.appendChild(btnAdd);
      span.appendChild(input);

      cardBody.appendChild(labelNameProduct);
      cardBody.appendChild(labelStockProduct);
      cardBody.appendChild(labelPriceProduct);
      cardBody.appendChild(span);
      containerCard.appendChild(imgProduct);
      containerCard.appendChild(cardBody);

      containerProducts.appendChild(containerCard);
      btnAdd.addEventListener("click", () => {
        console.log("Agregaste un producto");
      });
    });
  };

  setTimeout(() => {
    renderProducts();
  }, 500);
});
