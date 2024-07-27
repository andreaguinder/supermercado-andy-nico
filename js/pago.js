document.addEventListener("DOMContentLoaded", () => {
  const containerPurchase = document.getElementById("titProducts");

  let purchases = JSON.parse(localStorage.getItem("purchases")) || [];

  const cartDiv = document.createElement("div");

  if (purchases.length === 0) {
    const messageText = document.createElement("p");
    messageText.textContent = "El carrito está vacío.";
    containerPurchase.appendChild(messageText);
  } else {
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
      cartDiv.appendChild(hrEspaciado);



      containerPurchase.appendChild(cartDiv);

    });
  }
  
});


