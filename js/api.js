export async function fetchCategorias() {
    const url = `https://dummyjson.com/products/categories`
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const data = await res.json()
        return data
    } catch (err) {
        console.error('Error al obtener productos:', err)
        return []
    } finally {
        console.log('Petición a la API finalizada')
        console.log('URL solicitada:', url)
    }
}

export async function fetchProductos(categoria) {
    const url = `https://dummyjson.com/products/category/${categoria}`
    try {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Error ${res.status}`)
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