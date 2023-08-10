const productosCarrito = JSON.parse(localStorage.getItem("productosCarrito"))

const carritoVacio = document.getElementById("carrito-vacio")
const carritoProductos = document.getElementById("productos-carrito")
const accionesCarrito = document.getElementById("acciones-carrito")
const carritoComprado = document.getElementById("carrito-comprado")
let btnEliminar = document.querySelectorAll(".eliminar-producto-carrito")
const btnVaciar = document.getElementById("vaciar-acciones-carrito")
const total = document.getElementById("total")
const btnComprar = document.getElementById("pagar-acciones-carrito")


function CargarCarrito(){
    if (productosCarrito.length > 0){
        carritoVacio.classList.add("deshabilitado")
        carritoProductos.classList.remove("deshabilitado")
        accionesCarrito.classList.remove("deshabilitado")
        carritoComprado.classList.add("deshabilitado")

        carritoProductos.innerHTML = ""
        productosCarrito.forEach(producto =>{
            const div = document.createElement("div")
            div.classList.add("producto-carrito")
            div.innerHTML = `
            <img class="imagen-producto-carrito" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="titulo-producto-carrito">
                <small>Producto</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="cantidad-producto-carrito">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="precio-producto-carrito">
                <small><P></P>Precio</small>
                <p>$${producto.precio}</p>
            </div>
            <div class="subtotal-producto-precio">
                <small>Subtotal</small>
                <p>$${producto.precio*producto.cantidad}</p>
            </div>
            <button class="eliminar-producto-carrito" id="${producto.id}"><i class="bi bi-x"></i></button>
            `
            carritoProductos.append(div)
        })
    }else{
        carritoVacio.classList.remove("deshabilitado")
        carritoProductos.classList.add("deshabilitado")
        accionesCarrito.classList.add("deshabilitado")
        carritoComprado.classList.add("deshabilitado")
    }
    actualizarBtnsEliminar()
    actualizarTotal()
}

CargarCarrito()

function actualizarBtnsEliminar(){
    btnEliminar = document.querySelectorAll(".eliminar-producto-carrito")
    btnEliminar.forEach(boton =>{
        boton.addEventListener("click",eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    const idBtn = e.currentTarget.id
    const lugar = productosCarrito.findIndex(producto => producto.id === idBtn)
    productosCarrito.splice(lugar,1)
    CargarCarrito()
    localStorage.setItem("productosCarrito",JSON.stringify(productosCarrito))
}

btnVaciar.addEventListener("click",vaciarCarrito)

function vaciarCarrito(){
    productosCarrito.length = 0
    localStorage.setItem("productosCarrito",JSON.stringify(productosCarrito))
    CargarCarrito()
}

function actualizarTotal(){
    totalCalculado = productosCarrito.reduce((x,producto) => x + (producto.precio * producto.cantidad),0)
    total.innerText = `$${totalCalculado}`
}


btnComprar.addEventListener("click",comprarCarrito)

function comprarCarrito(){
    productosCarrito.length = 0
    localStorage.setItem("productosCarrito",JSON.stringify(productosCarrito))

    Swal.fire({
        icon: 'success',
        title: 'Muchas gracias!',
        text: 'La compra ha sido exitosa',
        })
        
    carritoVacio.classList.add("deshabilitado")
    carritoProductos.classList.add("deshabilitado")
    accionesCarrito.classList.add("deshabilitado")
    carritoComprado.classList.remove("deshabilitado")
}
