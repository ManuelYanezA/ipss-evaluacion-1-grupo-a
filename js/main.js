import { fetchCategorias, fetchProductos } from "./api.js";

console.log("Archivo main.js cargado correctamente");

const lightBtn = document.getElementById("lightThemeBtn");
const darkBtn = document.getElementById("darkThemeBtn");
const redBtn = document.getElementById("redThemeBtn");

if (lightBtn && darkBtn && redBtn) {
    lightBtn.addEventListener("click", () => {
        setNavbarTheme("light");
    });
    
    darkBtn.addEventListener("click", () => {
        setNavbarTheme("dark");
    });
    
    redBtn.addEventListener("click", () => {
        setNavbarTheme("red");
    });
}
    
function setNavbarTheme(theme) {
    const navbar = document.getElementById("mainNavbar");
    navbar.classList.remove(
        "navbar-light-theme",
        "navbar-dark-theme",
        "navbar-red-theme"
    );

    if (theme === "light") {
        navbar.classList.add("navbar-light-theme");
        console.log("Tema claro aplicado");
    }

    if (theme === "dark") {
        navbar.classList.add("navbar-dark-theme");
        console.log("Tema oscuro aplicado");
    }

    if (theme === "red") {
        navbar.classList.add("navbar-red-theme");
        console.log("Tema rojo aplicado");
    }
}

let cartCount = 0;
const cartButton = document.getElementById("addToCartBtn");
if(cartButton) {
    cartButton.addEventListener("click", () => {
        cartCount++;
        document.getElementById("cartItemCount").textContent = cartCount;
        console.log(`Producto agregado al carrito. Total: ${cartCount}`);
    });
}

// Funciones de prueba, para mostrar categorías y productos en la consola

async function mostrarCategorias() {
    const categorias = await fetchCategorias();
    console.log("Categorías obtenidas:", categorias);
}
mostrarCategorias();

async function mostrarProductos(categoria) {
    const productos = await fetchProductos(categoria);
    console.log(`Productos en la categoría "${categoria}":`, productos);
}
mostrarProductos("beauty");
mostrarProductos("groceries");

// Funciones para crear tarjetas de productos

function escapeHTML(str) {
    return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function crearTarjetaProductoHTML(producto) {
    return `
        <div class="card" style="width: 18rem;">
            <img src="./img/Placeholder-producto.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${escapeHTML(producto.title)}</h5>
                <p class="card-text">${escapeHTML(producto.description)}</p>
                <p class="precio">$${escapeHTML(producto.price)}</p>
                <button type="button" class="btn" onclick="agregarAlCarrito(${escapeHTML(producto.id)})">Agregar al carrito</button>
            </div>
        </div>
    `
}

function crearTarjetaCategoriaHTML(categoria) {
    return `
        <div class="card" style="width: 18rem;">
            <img src="./img/Placeholder-producto.jpg" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${escapeHTML(categoria.name)}</h5>
            </div>
        </div>`
}

async function renderProductos(categoria)   {
    const contenedor = document.getElementById("productos");
    contenedor.textContent = "Cargando productos...";

    const productos = await fetchProductos(categoria);

    if(productos.length === 0) {
        contenedor.textContent = "No se encontraron productos para esta categoría.";
        return;
    }

    contenedor.innerHTML = productos.map(crearTarjetaProductoHTML).join("");
}

renderProductos("groceries");