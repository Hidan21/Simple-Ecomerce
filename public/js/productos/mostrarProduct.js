export const btnValue = document.querySelectorAll('.categoria__btn-filtrar');
export const resultado = document.querySelector('.container-product');
let categoryBtn = '';

export function llamarAPi() {
  const url = '../database/data.json';
  fetch(url)
    .then((datos) => datos.json())
    .then((respuesta) => mostrarProducts(respuesta.products));
  // .then((respuesta) => mostrarProductos(respuesta.products));
}

/* mostrar productos en el html */

export function mostrarProducts(productos) {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
  for (let prod of productos) {
    const totalStrellas = 5;
    const { picture, categoryId, name, estrellas, price, description, id } =
      prod;

    const porcentaje = (estrellas / totalStrellas) * 100;
    const resultadoPorcentaje = `${Math.round((porcentaje / 10) * 10)}%`;

    let resultadoProductos = document.createElement('div');
    resultadoProductos.classList.add('card', categoryId);
    resultadoProductos.innerHTML += `
  <div class="product__card">
    <div class="product-img">
      <img src="${picture}" alt="">
    </div>

    <div class="product-detail">
      <h2>${name}</h2>
   <div class="rating">
      <div class="star_vacias"></div>
      <div class="star_llenas" style="width:${resultadoPorcentaje}"></div>
    </div>
      <p>
        ${description}
      </p>
      <div class="buttons__card-product">
        <div class="price">${price}$</div>
        <button class="cart-btn btn-pd" data-id="${id}" >add to car</button>
      </div>
    </div>
  </div>
    `;
    resultado.appendChild(resultadoProductos);
  }

  btnValue.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      categoryBtn = e.target.value;
      filtrarCategoriaP(categoryBtn);
    });
  });

  function filtrarCategoriaP(button) {
    const btnCategoria = document.querySelectorAll('.categoria__btn-filtrar');
    btnCategoria.forEach((btn) => {
      if (button.toUpperCase() == btn.innerText.toUpperCase()) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    let elementsCard = document.querySelectorAll('.card');
    elementsCard.forEach((element) => {
      if (button === 'todos') {
        element.classList.remove('hiden');
      } else {
        if (element.classList.contains(button)) {
          element.classList.remove('hiden');
        } else {
          element.classList.add('hiden');
        }
      }
    });
  }

  //Search button click
  const buscadorInput = document.querySelector('#buscador__input');
  buscadorInput.addEventListener('keyup', (e) => {
    if (e.target.value) {
      const elementoCardP = document.querySelectorAll('.product-detail h2');
      elementoCardP.forEach((elementP) => {
        console.log(elementP.parentElement.parentElement.parentElement);
        if (
          elementP.textContent
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        ) {
          elementP.parentElement.parentElement.parentElement.classList.remove(
            'hiden'
          );
        } else {
          elementP.parentElement.parentElement.parentElement.classList.add(
            'hiden'
          );
        }
      });
    }
  });
}
