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
