const fs = require("fs");

export const saveProduct = (
  productName,
  selectedQuantity,
  productTotalPrice,
) => {
  const logData = `Producto: ${productName}, Cantidad: ${selectedQuantity}, Precio Total: $${productTotalPrice}\n`;
  fs.writeFileSync("data.txt", logData);
  console.log("Datos guardados correctamente");
};

// Datos de ejemplo
const productName = "Fideos Marolio";
const selectedQuantity = 3;
const productTotalPrice = 10500;

saveProduct(productName, selectedQuantity, productTotalPrice);
