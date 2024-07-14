document.addEventListener("DOMContentLoaded", () => {

    const cerrarModalProductos = document.getElementById("cerrarModalProductos")
const modalContainerProductos = document.getElementsByClassName("modalContainerProductos")[0]

cerrarModalProductos.addEventListener("click", () =>{
    modalContainerProductos.classList.toggle("modalProductosActive")
})

cerrarModalProductos.addEventListener("click", () =>{
    modalContainerProductos.style.display="block";
})

// Inserto DOM desde JS

const contenedorArticulo = document.getElementById("titProducts");
const articulo = document.createElement("article");

const container = document.createElement('div')

articulo.innerHTML = `
                    <div class="mb-5">
                    <h1 class="h1__index">Productos de nuestro negocio</h1>
                    <p class="productsProductEnlaces"></p>
                    <p class="productsProductEnlaces">Si buscás algún prodcuto en especial que no se encuentra en la lista por favor no dudes en contactarnos: <a href="../pages/contacto.html"><strong>CONTACTO</strong></a>.</p><br>
                    <h2 class="h2__index">Para más información y elección de nuestros productos haz click en el siguiente botón</h2>
                    </div>
                `;

contenedorArticulo.appendChild(articulo);

// Array de cards con info productos

const URL = "../json/data.json";

let productos = [];

const contenedorProducts = document.getElementById("productsProduct");

const verProducts = () => {

fetch(URL)
.then(response => response.json())
.then(activProd => {
    activProd.forEach((productsProduct) => {
    const div = document.createElement('div')
    div.className = "card-img-top"
    div.style = "width: 18rem"
    div.innerHTML = `
                    <img src=${productsProduct.img} class="card-img-top" alt="...">
                    <div class="card-body mb-4">
                        <h5 class="card-title grande">${productsProduct.nombreProduct}</h5>
                        <h6 class="card-title grande">${productsProduct.stock}</h6>
                        <h6 class="card-title grande">${productsProduct.precio}</h6>
                        <span class="span__products-input"><input type="text">
                        <button id="${productsProduct.id}" class="btnModal px-3 mb-0">+</button>
                        <input type="text">
                        </span>
                    </div>
                `;
    contenedorProducts.appendChild(div);

        document.getElementById(productsProduct.id).addEventListener("click", (e) =>{
        e.preventDefault();
        modalContainerProductos.classList.toggle("modalProductosActive");

        const contenedorDescripcion = document.getElementById("descriptionProducts");

        contenedorDescripcion.innerHTML = `
                                            <div>
                                                <h3 style= "color: rgb(7, 167, 153)"><strong>${productsProduct.nombreProduct}</strong></h3>
                                                <br>
                                                <img src="${productsProduct.img}" class="img-fluid"><br><br>
                                            </div>
                                            `;
        });
    });
});
}
}) 