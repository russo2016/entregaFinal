const productos =[
    {
        id:"vape-01",
        titulo:"Supreme sin nicotina (2000pff)",
        imagen: "img/suprem-sin-nicotina-2000pff.jpg",
        precio:8000,
        categoria:"2500pff"
    },
    {
        id:"vape-02",
        titulo:"Supreme (2000pff)",
        imagen: "img/supreme-2000pff.jpg",
        precio:8000,
        categoria:"2500pff"
    },
    {
        id:"vape-03",
        titulo:"Fume Extra (1500pff)",
        imagen: "img/fume-extra-1500pff.jpg",
        precio:6950,
        categoria:"2500pff"
    },
    {
        id:"vape-04",
        titulo:"Fume Ultra (2500pff)",
        imagen: "img/fume-ultra-2500pff.jpg",
        precio:7700,
        categoria:"2500pff"
    },
    {
        id:"vape-05",
        titulo:"Fume Infinity (3500pff)",
        imagen: "img/fume-infinity-3500pff.jpg",
        precio:9700,
        categoria:"5000pff"
    },
    {
        id:"vape-06",
        titulo:"Supreme (5000pff)",
        imagen: "img/supreme-5000pff.jpg",
        precio:10500,
        categoria:"5000pff"
    },
    {
        id:"vape-07",
        titulo:"Fume Unlimited (7000pff)",
        imagen: "img/fume-unlimited-7000pff.jpg",
        precio:12500,
        categoria:"7000pff"
    },
    {
        id:"vape-08",
        titulo:"Supreme (7000pff)",
        imagen: "img/supreme-7000pff.jpg",
        precio:13000,
        categoria:"7000pff"
    }
]

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

cargarProductos(productos)

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
            }, 2000);
        });}
    localStorage.setItem("productosCarrito",JSON.stringify(carrito))
}

function actualizarNum(){
    let numero = carrito.reduce((x,producto) => x + producto.cantidad, 0)
    num.innerText = numero
}

