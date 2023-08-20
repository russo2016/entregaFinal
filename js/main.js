const carga = document.getElementById("carga")
const contenido = document.getElementById("contenido")

function mostrar(){
    carga.classList.add("oculto")
    contenido.classList.remove("oculto")
    contenido.classList.add("visible")
}

function simulacion(segs){
    return new Promise(resolve => setTimeout(resolve,segs))
}

window.onload = async function(){
    await simulacion(2000)
    mostrar()
}

let productos =[]

const URL = "js/productos.json"

fetch(URL)
    .then(response => response.json())
    .then(data =>{
        productos = data
        cargarProductos(productos)
    })

const containerProductos = document.getElementById("container-productos");
const btnCategorias = document.querySelectorAll(".btn-menu")
const titulo = document.getElementById("titulo-principal")
let btnsAgregar = document.querySelectorAll(".agregar-producto")
const num = document.getElementById("num")


function cargarProductos(productosElegidos){

    containerProductos.innerHTML = ""
    productosElegidos.forEach(producto =>{
        let div = document.createElement("div")
        div.classList.add("producto")
        div.innerHTML = `
            <img class="imagen-producto" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="detalles-producto">
                <h3 class="titulo-producto">${producto.titulo}</h3>
                <p class="precio-producto">$${producto.precio}</p>
                <button class="agregar-producto" id="${producto.id}">comprar</button>
            </div>
        `

        containerProductos.append(div)
    })

    actualizarBtnsAgregar()
}

btnCategorias.forEach(boton =>{
    boton.addEventListener("click", (e) =>{
        btnCategorias.forEach(boton =>boton.classList.remove("activo"))
        e.currentTarget.classList.add("activo")

        if (e.currentTarget.id != "todos"){
            const categoriaProducto = productos.find(producto => producto.categoria === e.currentTarget.id)

            titulo.innerText = "Vaporizadores de " + categoriaProducto.categoria
            const btnProductos = productos.filter(producto => producto.categoria === e.currentTarget.id)
            cargarProductos(btnProductos)
        }else{
            titulo.innerText = "Todos los productos"
            cargarProductos(productos)
        }
    })
})

function actualizarBtnsAgregar(){
    btnsAgregar = document.querySelectorAll(".agregar-producto")
    btnsAgregar.forEach(boton =>{
        boton.addEventListener("click",agregarCarrito)
    })
}

let carrito
const carritoLS = localStorage.getItem("productosCarrito")
if(carritoLS){
    carrito = JSON.parse(carritoLS)
    actualizarNum()
}else{
    carrito = []
}

function agregarCarrito(e){
    const idBtn = e.currentTarget.id
    const productoAgregado = productos.find(producto => producto.id === idBtn)

    if(carrito.some(producto => producto.id === idBtn)){
        const lugar = carrito.findIndex(producto => producto.id === idBtn)
        carrito[lugar].cantidad +=1
    }else{
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado)
    }    
    asincronia().then(() => {
        const newPopup = document.createElement("div");
        newPopup.className = "popup";
        newPopup.innerHTML = `<img class="foto" src="${productoAgregado.imagen}" alt="${productoAgregado.imagen}"></img>
        <p>Producto agregado al carrito</p>`;

        popupContainer.appendChild(newPopup);
        newPopup.classList.add("activo");

        setTimeout(function () {
            popupContainer.removeChild(popupContainer.firstChild);
        }, 2000);
    });

    function asincronia() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
                actualizarNum()
            }, 1000);
        });}
    localStorage.setItem("productosCarrito",JSON.stringify(carrito))
}

function actualizarNum(){
    let numero = carrito.reduce((x,producto) => x + producto.cantidad, 0)
    num.innerText = numero
}

