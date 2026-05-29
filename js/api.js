// Funciones para interactuar con la API de productos y categorías, usando fetch y async/await, con manejo de errores y mensajes de carga, código puesto en enunciado de la evaluación
export async function fetchCategorias() {
    // URL de la API para obtener las categorías de productos
    const url = `https://dummyjson.com/products/categories`
    try {
        // Realizamos la petición a la API usando fetch, y esperamos la respuesta
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Error ${res.status}`)
        // Si la respuesta es correcta, convertimos el cuerpo de la respuesta a JSON, y devolvemos los datos obtenidos
        const data = await res.json()
        return data
    } catch (err) {
        console.error('Error al obtener categorías:', err)
        return []
    } finally {
        console.log('Petición a la API finalizada')
        console.log('URL solicitada:', url)
        console.log('Categorías obtenidas')
    }
}

// Función para obtener los productos de una categoría específica, usando fetch y async/await, con manejo de errores y mensajes de carga, código puesto en enunciado de la evaluación
export async function fetchProductos(categoria) {
    // URL de la API para obtener los productos de una categoría específica, usando template literals para insertar la categoría en la URL
    const url = `https://dummyjson.com/products/category/${categoria}`
    try {
        // Realizamos la petición a la API usando fetch, y esperamos la respuesta
        const res = await fetch(url)
        // Si la respuesta no es correcta, lanzamos un error con el código de estado de la respuesta
        if (!res.ok) throw new Error(`Error ${res.status}`)
        // Si la respuesta es correcta, convertimos el cuerpo de la respuesta a JSON, y devolvemos los datos obtenidos (en este caso, el array de productos que se encuentra en la propiedad "products" del objeto devuelto por la API)
        const data = await res.json()
        return data.products
    } catch (err) {
        console.error('Error al obtener productos:', err)
        return []
    } finally {
        console.log('Petición a la API finalizada')
        console.log('URL solicitada:', url)
    }
}

export async function fetchProductosBusqueda(textoBusqueda) {
    try {
        const response = await fetch(`https://dummyjson.com/products/search?q=${textoBusqueda}`);
        const data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error al buscar productos:', error);
        return [];
    }
}