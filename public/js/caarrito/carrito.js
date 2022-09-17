export const carrito = document.querySelector('.cart-products');
export const listaProductos = document.querySelector('.container-product');
export const contenedorCarrito = document.querySelector('.card-items');
let articculosCarrito = [];
export let precioTotal = document.querySelector('.price-total');

let totalPrecio = 0;

export function eventosCarrito() {
  listaProductos.addEventListener('click', agregarCurso);
  carrito.addEventListener('click', eliminarCurso);
}

export function agregarCurso(e) {
  if (e.target.classList.contains('cart-btn')) {
    const productSeleccionado =
      e.target.parentElement.parentElement.parentElement;
    leerDaatosProductos(productSeleccionado);
  }
}
//eliminar curso del carrito
export function eliminarCurso(e) {
  if (e.target.classList.contains('dalete-product')) {
    const productID = e.target.getAttribute('data-id');
    articculosCarrito.forEach((value) => {
      if (value.id == productID) {
        let reducirPrecio =
          parseFloat(value.precio) * parseFloat(value.cantidad);
        totalPrecio = totalPrecio - reducirPrecio;
        totalPrecio = totalPrecio.toFixed(2);
      }
    });

    articculosCarrito = articculosCarrito.filter(
      (productos) => productos.id !== productID
    );

    if (articculosCarrito.length === 0) {
      precioTotal.innerHTML = 0;
    }
    carritoHTMl();
  }
}

export function leerDaatosProductos(productoSeleccionado) {
  //objeto con contenido del producto
  const infoproductos = {
    imagen: productoSeleccionado.querySelector('.product-img img').src,
    nombre:
      productoSeleccionado.querySelector('.product-detail h2').textContent,
    precio: productoSeleccionado.querySelector(
      '.product-detail .buttons__card-product .price '
    ).textContent,
    id: productoSeleccionado.querySelector('button').getAttribute('data-id'),
    cantidad: 1,
  };

  totalPrecio = parseFloat(totalPrecio) + parseFloat(infoproductos.precio);
  totalPrecio = totalPrecio.toFixed(2);

  //elementos del carrrito
  const existe = articculosCarrito.some(
    (productoSeleccionado) => productoSeleccionado.id === infoproductos.id
  );
  if (existe) {
    //actualizaamos la cantidad
    const productosR = articculosCarrito.map((productoSeleccionado) => {
      if (productoSeleccionado.id === infoproductos.id) {
        productoSeleccionado.cantidad++;
        return productoSeleccionado;
      } else {
        return productoSeleccionado;
      }
    });
  } else {
    //agregar elementos al carrito
    articculosCarrito = [...articculosCarrito, infoproductos];
  }

  console.log(articculosCarrito);
  carritoHTMl();
}

//mustra el carrito de compras en el html
export function carritoHTMl() {
  //limpiar el html
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }

  articculosCarrito.forEach((prroduct) => {
    const { imagen, nombre, cantidad, precio, id } = prroduct;
    const divCarrito = document.createElement('div');
    divCarrito.classList.add('item');
    divCarrito.innerHTML = ` 
    <img src="${imagen}" alt="">
                <div class="item-content">
                  <h5>${nombre}</h5>
                  <h5 class="cart-price">${precio}</h5>
                  <h6>cantidad: ${cantidad}</h6>
                </div>
                <span  class="dalete-product" data-id="${id}">X</span>
    `;

    contenedorCarrito.appendChild(divCarrito);
    precioTotal.innerHTML = totalPrecio;
  });
}
