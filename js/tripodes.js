window.onload = function () {
  cargarTripodes();
}



var listaConBusqueda = [];
var listaArrayTripodes = [];
//PARA CARGAR LOS DATOS DEL JSON DE TRIPODES
function cargarTripodes() {
  var urlPagina = (window.location.href).split("=");
  var urlPagina2 = urlPagina[1];

  $.get("tripodes.json", {}, (resultado) => {
    listaArrayTripodes = resultado; //Aqui te va a meter en el array todos los resultados que coge del json
    
    if (urlPagina2 == null) {
      pintarTripodes(resultado.tripodes);
    }
    //Aqui hacemos la busqueda sobre las camaras de la palabra introducida (que contenga)
    if (urlPagina2 != null) {
      var texto5 = urlPagina2.trim().toUpperCase(); //Se le quita los espacios y se ponen en mayusculas
      //Lista ya filtrada de las camaras
      var listaConBusqueda = resultado.tripodes.filter((elemento) => elemento.modelo.toString().toUpperCase().includes(texto5)); //Aqui lo que hago es filtrar la lista de camaras por el modelo que se coge del json
      pintarTripodes(listaConBusqueda);
    }
  });
}

//PARA CARGAR LOS PRODUCTOS DE LA TRIPODES
function pintarTripodes(lista) {
  lista.forEach(tripodes => {
    var texto3 =
      `<div class="class col-md-3">
              <div class="card mt-3">
                  <div class="product-1 align-items-center p-2 text-center">
                   <a href="${tripodes.foto}"> <img src="${tripodes.foto}" alt="" class="rounded"></a>
                    <h4>${tripodes.modelo}</h4>
                    <div class="mt-3 info">
                      <span class="text1 d-block">Lorem ipsuim dolor sit amet</span>
                      <span class="text1">Lorem ipsuim dolor</span>
                    </div>
                    <div class="cost mt-3 text-dark">
                      <span>${tripodes.precio}€</span>
                      <div class="star mt-3 align-items-center">
                        <i class="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                  </div>
                  <div class="p-3 camera text-center text-white mt-3 cursor">
                  <button type="button" onclick="anadirProducto('${tripodes.id}','${tripodes.modelo}','${tripodes.precio}','${tripodes.foto}')"> <span class="text-uppercase">AÑADIR AL CARRITO</span> </button>
                  </div>
              </div>`;

    document.getElementById("tablaTripodes").innerHTML += texto3;
  });
}


//SEARCH PARA BUSCAR LOS PRODUCTOS 
function buscarTripodes(){
  var tripodes = document.getElementById("buscadorTripodes").value;
  console.log(tripodes);
  location.href="tripodes.html?filtro="+tripodes;
}

//Esta es la funcion del select de las objetivos.html
function SelectOrdenar(){
  document.getElementById("tablaTripodes").innerHTML = "";
  var ValorSelect = document.getElementById("contenidoFiltros").value;
  var listaTripodes=[];
  listaTripodes.push(listaArrayTripodes["tripodes"]); 
  console.log(listaTripodes);
  //Ordenar por el precio mas caro
  if(ValorSelect == "PrecioMasCaro"){
    var PrecioMasCaro = listaTripodes[0].sort(function ordenCaro(menor, mayor) { 
      return mayor.precio > menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio < menor.precio ? -1 
          : 0;              
    });
    document.getElementById("tablaTripodes").innerHTML+= "<h2>Ordenado por el precio mas caro</h2><br>";
    pintarTripodes(PrecioMasCaro);
  }

   //Ordenar por el precio mas barato
   if(ValorSelect == "PrecioMasBarato"){
    var PrecioMasBarato = listaTripodes[0].sort(function ordenPrecioBarato(menor, mayor) { 
      return mayor.precio < menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio > menor.precio ? -1 
          : 0;              
    });

    document.getElementById("tablaTripodes").innerHTML+= "<h2>Ordenado por el precio mas barato</h2><br>";
    pintarTripodes(PrecioMasBarato);
  }

  //Ordenar por el orden alfabetico
  if(ValorSelect == "OrdenarAlfabeticamente"){
    var OrdenarAlfabeticamente = listaTripodes[0].sort(function ordenAlfabetico(menor, mayor) { 
      return mayor.modelo < menor.modelo ?  1 //El precio lo coge del array que carga el json
          : mayor.modelo > menor.modelo ? -1 
          : 0;              
    });

    document.getElementById("tablaTripodes").innerHTML+= "<h2>Ordenado por orden alfabetico</h2><br>";
    pintarTripodes(OrdenarAlfabeticamente);
  }
}