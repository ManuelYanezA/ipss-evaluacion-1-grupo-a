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