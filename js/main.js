import { fetchCategorias, fetchProductos } from "./api.js";

console.log("Archivo main.js cargado correctamente");

const lightBtn = document.getElementById("lightThemeBtn");
const darkBtn = document.getElementById("darkThemeBtn");
const redBtn = document.getElementById("redThemeBtn");

//En caso de que los botones no existan, se evita el error al agregar los event listeners
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

// Función para cambiar el tema de la barra de navegación
function setNavbarTheme(theme) {
    const navbar = document.getElementById("mainNavbar");

    if(navbar) {

        navbar.classList.remove(
            "navbar-light-theme",
            "navbar-dark-theme",
            "navbar-red-theme",
            "navbar-light",
            "navbar-dark"
        );

        navbar.classList.add(`navbar-${theme}-theme`);

        if(theme === "light") {
            navbar.classList.add("navbar-light");
        } else {
            navbar.classList.add("navbar-dark");
        }

        localStorage.setItem("navbarTheme", theme);
    }
}

// Función para agregar productos al carrito (simulada, solo suma 1 al número de productos en el carrito)
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

// Funciones para crear tarjetas de productos

// Función para escapar caracteres especiales en HTML, para evitar problemas de seguridad y formato, código puesto en enunciado de la evaluación
function escapeHTML(str) {
    return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

// Función para crear el HTML de una tarjeta de producto, usando la función de escapeHTML para evitar problemas de seguridad y formato, código puesto en enunciado de la evaluación
function crearTarjetaProductoHTML(producto) {
    return `
        <div class="producto-card h-100 shadow-sm">
            <img src="./img/Placeholder-producto.jpg" class="card-img-top" alt="Placeholder">
            <div class="card-body">
                <h5 class="producto-card-title">${escapeHTML(producto.title)}</h5>
                <p class="producto-card-text">${escapeHTML(producto.description)}</p>
                <p class="precio">$${escapeHTML(producto.price)}</p>
                <button type="button" class="btn btn-producto shadow-none" onclick="agregarAlCarrito(${escapeHTML(producto.id)})">Agregar al carrito</button>
            </div>
        </div>
    `
}

// Función para renderizar los productos de una categoría en el contenedor correspondiente, mostrando un mensaje de carga mientras se obtienen los datos, y un mensaje de error si no se encuentran productos para esa categoría
async function renderProductos(categoria)   {
    const contenedor = document.getElementById("productos");
    if(contenedor) {
        contenedor.textContent = "Cargando productos...";
        
        const productos = await fetchProductos(categoria);
        
        if(productos.length === 0) {
            contenedor.textContent = "No se encontraron productos para esta categoría.";
            return;
        }
        
        contenedor.innerHTML = productos.map(crearTarjetaProductoHTML).join("");
    }
}

// Renderizamos los productos de la categoría "groceries" al cargar la página, para mostrar algo de contenido, y también para probar que la función de renderizado funciona correctamente
renderProductos("groceries");

// Función para crear el HTML de una tarjeta de categoría, usando la función de escapeHTML para evitar problemas de seguridad y formato, código puesto en enunciado de la evaluación
function crearTarjetaCategoriaHTML(categoria) {
    return `
            <div class="card">
                <a href="products.html">
                    <img src="./img/Placeholder-producto.jpg" class="card-img-top" alt="Categoría ${escapeHTML(categoria.name)}">
                </a>
                    <div class="card-body">
                        <h5 class="card-title">${escapeHTML(categoria.name)}</h5>
                    </div>
            </div>`
}

async function renderCategorias()   {
    const contenedor = document.getElementById("container-categorias");
    console.log("Contenedor de categorías:", contenedor);
    if(contenedor) {
        contenedor.textContent = "Cargando categorías...";
        
        const categorias = await fetchCategorias();
        
        if(categorias.length === 0) {
            contenedor.textContent = "No se encontraron categorías.";
            return;
        }
        
        contenedor.innerHTML = categorias.map(crearTarjetaCategoriaHTML).join("");
    }
}

// Al cargar la página, se aplica el tema guardado en localStorage (o el tema claro por defecto) y se renderizan las categorías para mostrar algo de contenido, y también para probar que la función de renderizado funciona correctamente
setNavbarTheme(localStorage.getItem("navbarTheme") || "light");
renderCategorias();