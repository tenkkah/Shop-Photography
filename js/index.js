window.onload = function () {
    cargarCategorias();
    cargarProductosMasVendidos();
  }
  
  

//PARA CARGAR LOS DATOS DEL JSON DE LAS CATEGORIAS
function cargarCategorias() {
  $.get("categoriasRelevantes.json", {}, (resultado) => {
    pintarCategorias(resultado.categoriasRelevantes);
  });
}

//PARA CARGAR LOS PRODUCTOS DE LAS CAMARAS
function pintarCategorias(lista) {
  lista.forEach(categoriasRelevantes => {
    var categorias =
      `<div class="col-md-3">
      <div class="card text-center">
        <img src="${categoriasRelevantes.foto}" class="card-img-top" height="200px">
        <div class="card-body">
          <h5 class="card-title">${categoriasRelevantes.categoria}</h5>
          <a href="${categoriasRelevantes.enlace}">Saber más</a>
        </div>
      </div>
    </div>`;

    document.getElementById("tablaCategorias").innerHTML += categorias; //1 FORMA DE HACERLO
  });
}

//----------------------------------------------------------------------------------------------------

//PARA CARGAR LOS DATOS DEL JSON DE LOS PRODUCTOS MAS VENDIDOS
function cargarProductosMasVendidos() {
  $.get("productosMasVendidos.json", {}, (resultado) => {
    pintarMasVendidos(resultado.productosMasVendidos);
  });
}
//FUNCION PARA PINTAR LA LISTA DE LOS OBJETOS COGIDOS DEL JSON
function pintarMasVendidos(lista) {
  lista.forEach(productosMasVendidos => {
    var cardMasVendidos =
      `<div class="col-md-4">
      <div class="card text-center cardshopping">
         <a href="${productosMasVendidos.enlace}"><img src="${productosMasVendidos.foto}" class="card-img-top" height="400px" width="300px"></a>
        <div class="card-body">
          <h5 class="card-title">${productosMasVendidos.modelo}</h5>
          <p class="card-text">${productosMasVendidos.precio}€</p>
        </div>
      </div>
    </div>`;

    document.getElementById("tablaMasVendidos").innerHTML += cardMasVendidos; //1 FORMA DE HACERLO
  });
}


