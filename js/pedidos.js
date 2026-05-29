// 1. Cuando cargue la página de pedidos, seleccionamos el contenedor donde los mostraremos
// (Asegúrate de tener un <div id="lista-pedidos"></div> en tu pedidos.html)
const contenedorPedidos = document.getElementById("lista-pedidos");

function renderizarPedido() {
    // 2. Traemos los productos guardados en el localStorage
    const carrito = JSON.parse(localStorage.getItem("carrito_pedidos")) || [];

    // 3. Si no hay nada, mostramos un mensaje de alerta
    if (carrito.length === 0) {
        contenedorPedidos.innerHTML = "<p class='text-center'>No tienes productos en tu pedido aún.</p>";
        return;
    }

    // 4. Creamos una plantilla HTML simplificada para la lista de pedidos (puede ser una tabla o una lista)
    const htmlPedido = carrito.map(item => {
        return `
            <div class="card mb-2 p-3 d-flex flex-row justify-content-between align-items-center">
                <div>
                    <h5>${item.nombre}</h5>
                    <small class="text-muted">Añadido el: ${item.fecha}</small>
                </div>
                <div>
                    <span class="badge bg-success p-2">Cantidad: ${item.cantidad}</span>
                </div>
            </div>
        `;
    }).join(""); // Juntamos todas las tarjetas de pedido en un solo texto

    // 5. ¡El famoso innerHTML! Inyectamos el pedido armado en la pantalla
    contenedorPedidos.innerHTML = htmlPedido;
}

// Ejecutamos la función apenas se abra pedidos.html
renderizarPedido();