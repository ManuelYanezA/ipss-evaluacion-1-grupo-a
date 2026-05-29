import { fetchCategorias, fetchProductos, fetchProductosBusqueda } from "./api.js";

console.log("Archivo main.js cargado correctamente");

//Obtiene los temas del DOM
const lightBtn = document.getElementById("lightThemeBtn");
const darkBtn = document.getElementById("darkThemeBtn");
const redBtn = document.getElementById("redThemeBtn");

//Obtiene los componentes del formulario de búsqueda del DOM
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

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
                <button type="button" class="btn btn-producto shadow-none" onclick="agregarAlCarrito(${escapeHTML(producto.id)}, '${escapeHTML(producto.title)}')">Agregar al carrito</button>
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

// Esta función se activa cada vez que aprietan el botón de una tarjeta
function agregarAlCarrito(idProducto, nombreProducto) {
    // 1. Intentamos traer los pedidos que ya existan guardados, si no hay ninguno, empezamos con una lista vacía []
    let carrito = JSON.parse(localStorage.getItem("carrito_pedidos")) || [];

    // 2. Agregamos el nuevo ID del producto a nuestra lista
    // (Opcional: podrías buscar si ya existe para sumarle cantidad, aquí lo agregamos directo)
    carrito.push({
        id: idProducto,
        nombre: nombreProducto,
        cantidad: 1,
        fecha: new Date().toLocaleDateString()
    });

    // 3. Guardamos la lista actualizada en el localStorage convertida en texto
    localStorage.setItem("carrito_pedidos", JSON.stringify(carrito));

    // 4. Un aviso visual para que el cliente sepa que funcionó
    alert("¡Producto añadido al pedido!");
}

// Función para manejar el envío del formulario de búsqueda, obteniendo el texto ingresado, limpiándolo y mostrándolo en la consola
if(searchForm && searchInput) {

    searchForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const textoBusqueda = searchInput.value.trim().toLowerCase();

        console.log("Texto buscado:", textoBusqueda);

    });

}

async function buscarCategorias(textoBusqueda) {
    try {
        const categorias = await fetchCategorias();
        const categoriasFiltradas = categorias.filter(categoria =>
            categoria.toLowerCase().includes(textoBusqueda)
        );
        console.log(categoriasFiltradas);
    } catch (error) {
        console.error("Error al buscar categorías:", error);
    }
}

async function buscarProductos(textoBusqueda) {
    try {
        const productos = await fetchProductosBusqueda(textoBusqueda);
        const contenedor = document.getElementById("productos");      
        if(contenedor) {
            if(productos.length === 0) {
                contenedor.textContent = "No se encontraron productos.";
                return;
            }
            
            contenedor.innerHTML = productos
            .map(crearTarjetaProductoHTML)
            .join("");
        }
    } catch (error) {
        console.error("Error al buscar productos:", error);
    }
}

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

// Función para renderizar las categorías en el contenedor correspondiente
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

const contenedorCategorias = document.getElementById("categorias");
const contenedorProductos = document.getElementById("productos");

if(searchForm && searchInput) {

    searchForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const textoBusqueda = searchInput.value.trim().toLowerCase();

        if(contenedorCategorias) {

            buscarCategorias(textoBusqueda);

        } else {
            console.log("No se encuentra contenedor de categorías en el DOM");
        }

        if(contenedorProductos) {

            buscarProductos(textoBusqueda);

        } else {
            console.log("No se encuentra contenedor de productos en el DOM");
        }

    });

}

// IMPORTANTE: Si usas type="module" en tu HTML, los módulos aíslan las funciones.
// Para que el 'onclick' del HTML pueda ver la función, debes colgarla de la ventana global de esta forma:
window.agregarAlCarrito = agregarAlCarrito;
renderCategorias();
