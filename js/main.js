const lightBtn = document.getElementById("lightThemeBtn");
const darkBtn = document.getElementById("darkThemeBtn");
const redBtn = document.getElementById("redThemeBtn");

lightBtn.addEventListener("click", () => {
    setNavbarTheme("light");
});

darkBtn.addEventListener("click", () => {
    setNavbarTheme("dark");
});

redBtn.addEventListener("click", () => {
    setNavbarTheme("red");
});

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
cartButton.addEventListener("click", () => {
    cartCount++;
    document.getElementById("cartItemCount").textContent = cartCount;
    console.log(`Producto agregado al carrito. Total: ${cartCount}`);
});