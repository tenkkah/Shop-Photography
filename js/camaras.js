
var listaConBusqueda = [];
var listaArrayCamaras=[];
//PARA CARGAR LOS DATOS DEL JSON DE CAMARAS
function cargarCamaras() {
  var urlPagina = (window.location.href).split("="); //Con el split separa el enlace de la funcion buscarCamaras
  var urlPagina2 = urlPagina[1]; //Lo que coges es el buscarCamaras la primera variable

  $.get("camaras.json", {}, (resultado) => {
    listaArrayCamaras=resultado; //Aqui te va a meter en el array todos los resultados que coge del json
    console.log(listaArrayCamaras);

   if(urlPagina2 == null){
    pintarCamaras(resultado.camaras);
   }
 
  //Aqui hacemos la busqueda sobre las camaras de la palabra introducida (que contenga)
    if(urlPagina2 != null){
      var texto5 = urlPagina2.trim().toUpperCase(); //Se le quita los espacios y se ponen en mayusculas
      //Lista ya filtrada de las camaras
      var listaConBusqueda=resultado.camaras.filter((elemento) => elemento.modelo.toString().toUpperCase().includes(texto5)); //Aqui lo que hago es filtrar la lista de camaras por el modelo que se coge del json
      pintarCamaras(listaConBusqueda);
    }
  });
}

//PARA PINTAR LOS PRODUCTOS DE LAS CAMARAS
function pintarCamaras(lista) {
  lista.forEach(camara => {
    var texto =
      `<div class="class col-md-3">
            <div class="card mt-3">
                <div class="product-1 align-items-center p-2 text-center">
                   <img src="${camara.foto}" alt="" class="rounded" onclick="mostrarDetalles('${camara.id}')"></a>
                  <h4>${camara.modelo}</h4>
                  <div class="mt-3 info">
                    <span class="text1 d-block">Lorem ipsuim dolor sit amet</span>
                    <span class="text1">Lorem ipsuim dolor</span>
                  </div>
                  <div class="cost mt-3 text-dark">
                    <span>${camara.precio}€</span>
                    <div class="star mt-3 align-items-center">
                      <i class="fas fa-shopping-cart"></i>
                    </div>
                  </div>
                </div>
                <div class="p-3 camera text-center text-white mt-3 cursor">
                <button type="button" onclick="anadirProducto('${camara.id}','${camara.modelo}','${camara.precio}','${camara.foto}')"> <span class="text-uppercase">AÑADIR AL CARRITO</span> </button>
                </div>
            </div>`;

    document.getElementById("tablaCamaras").innerHTML += texto; 
  });
}

//SEARCH PARA BUSCAR LOS PRODUCTOS 
function buscarCamaras(){
  var camaras = document.getElementById("buscador").value;
  console.log(camaras);
  location.href="camaras.html?filtro="+camaras;
}

//Esta es la funcion del select de las camaras.html
function SelectOrdenar(){
  document.getElementById("tablaCamaras").innerHTML = "";
  var ValorSelect = document.getElementById("contenidoFiltros").value;
  var listaCamaras=[];
   listaCamaras.push(listaArrayCamaras["camaras"]); 

  
  //Ordenar por el precio mas caro
  if(ValorSelect == "PrecioMasCaro"){
    var PrecioMasCaro = listaCamaras[0].sort(function ordenCaro(menor, mayor) { 
      return mayor.precio > menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio < menor.precio ? -1 
          : 0;              
    });
    document.getElementById("tablaCamaras").innerHTML+= "<h2>Ordenado por el precio mas caro</h2><br>";
    pintarCamaras(PrecioMasCaro);
  }

   //Ordenar por el precio mas caro
   if(ValorSelect == "PrecioMasBarato"){
    var PrecioMasBarato = listaCamaras[0].sort(function ordenPrecioBarato(menor, mayor) { 
      return mayor.precio < menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio > menor.precio ? -1 
          : 0;              
    });

    document.getElementById("tablaCamaras").innerHTML+= "<h2>Ordenado por el precio mas barato</h2><br>";
    pintarCamaras(PrecioMasBarato);
  }

  //Ordenar por el orden alfabetico
  if(ValorSelect == "OrdenarAlfabeticamente"){
    var OrdenarAlfabeticamente = listaCamaras[0].sort(function ordenAlfabetico(menor, mayor) { 
      return mayor.modelo < menor.modelo ?  1 //El precio lo coge del array que carga el json
          : mayor.modelo > menor.modelo ? -1 
          : 0;              
    });

    document.getElementById("tablaCamaras").innerHTML+= "<h2>Ordenado por orden alfabetico</h2><br>";
    pintarCamaras(OrdenarAlfabeticamente);
  }
}
