window.onload = function () {
  cargarIluminacion();
}



var listaConBusqueda = [];
var listaArrayIluminacion = []
//PARA CARGAR LOS DATOS DEL JSON DE ILUMINACION
function cargarIluminacion() {
  var urlPagina = (window.location.href).split("="); 
  var urlPagina2 = urlPagina[1]; 

  $.get("iluminacion.json", {}, (resultado) => {
    listaArrayIluminacion=resultado; //Aqui te va a meter en el array todos los resultados que coge del json
    console.log(listaArrayIluminacion);
   if(urlPagina2 == null){
    pintarIluminacion(resultado.iluminacion);
   }
 
  //Aqui hacemos la busqueda sobre las camaras de la palabra introducida (que contenga)
    if(urlPagina2 != null){
      var texto5 = urlPagina2.trim().toUpperCase(); //Se le quita los espacios y se ponen en mayusculas
      //Lista ya filtrada de las camaras
      var listaConBusqueda=resultado.iluminacion.filter((elemento) => elemento.modelo.toString().toUpperCase().includes(texto5)); //Aqui lo que hago es filtrar la lista de camaras por el modelo que se coge del json
      pintarIluminacion(listaConBusqueda);
    }
  });
}
//PARA CARGAR LOS PRODUCTOS DE LA ILUMINACION
function pintarIluminacion(lista) {
  lista.forEach(iluminacion => {
    var texto4 =
      `<div class="class col-md-3">
                 <div class="card mt-3">
                     <div class="product-1 align-items-center p-2 text-center">
                      <a href="${iluminacion.foto}"> <img src="${iluminacion.foto}" alt="" class="rounded"></a>
                      <h4>${iluminacion.modelo}</h4>
                      <!--CARD INFO-->
                      <div class="mt-3 info">
                        <span class="text1 d-block">${iluminacion.descripcion}</span>
                      </div>
                      <div class="cost mt-3 text-dark">
                        <span>${iluminacion.precio}€</span>
                        <div class="star mt-3 align-items-center">
                         <i class="fas fa-shopping-cart"></i>
                        </div>
                      </div>
                    </div>
                    <!--boton de cards-->
                    <div class="p-3 camera text-center text-white mt-3 cursor">
                    <button type="button" onclick="anadirProducto('${iluminacion.id}','${iluminacion.modelo}','${iluminacion.precio}','${iluminacion .foto}')"> <span class="text-uppercase">AÑADIR AL CARRITO</span> </button>
                    </div>
                 </div>`;

    document.getElementById("tablaIluminacion").innerHTML += texto4; 
  });
}


//ES EL SEARCH PARA BUSCAR LOS PRODUCTOS REALIZADO CON UNA CABECERA
function buscarIluminacion(){
  var iluminacion = document.getElementById("buscadorIluminacion").value;
  console.log(iluminacion);
  location.href="flash.html?filtro="+iluminacion;
}

//Esta es la funcion del select de las objetivos.html
function SelectOrdenar(){
  document.getElementById("tablaIluminacion").innerHTML = "";
  var ValorSelect = document.getElementById("contenidoFiltros").value;
  var listaIluminacion=[];
  listaIluminacion.push(listaArrayIluminacion["iluminacion"]); 
  console.log(listaIluminacion);
  //Ordenar por el precio mas caro
  if(ValorSelect == "PrecioMasCaro"){
    var PrecioMasCaro = listaIluminacion[0].sort(function ordenCaro(menor, mayor) { 
      return mayor.precio > menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio < menor.precio ? -1 
          : 0;              
    });
    console.log(1);
    document.getElementById("tablaIluminacion").innerHTML+= "<h2>Ordenado por el precio mas caro</h2><br>";
    pintarIluminacion(PrecioMasCaro);
  }

   //Ordenar por el precio mas barato
   if(ValorSelect == "PrecioMasBarato"){
    var PrecioMasBarato = listaIluminacion[0].sort(function ordenPrecioBarato(menor, mayor) { 
      return mayor.precio < menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio > menor.precio ? -1 
          : 0;              
    });

    document.getElementById("tablaIluminacion").innerHTML+= "<h2>Ordenado por el precio mas barato</h2><br>";
    pintarIluminacion(PrecioMasBarato);
  }

  //Ordenar por el orden alfabetico
  if(ValorSelect == "OrdenarAlfabeticamente"){
    var OrdenarAlfabeticamente = listaIluminacion[0].sort(function ordenAlfabetico(menor, mayor) { 
      return mayor.modelo < menor.modelo ?  1 //El precio lo coge del array que carga el json
          : mayor.modelo > menor.modelo ? -1 
          : 0;              
    });

    document.getElementById("tablaIluminacion").innerHTML+= "<h2>Ordenado por orden alfabetico</h2><br>";
    pintarIluminacion(OrdenarAlfabeticamente);
  }
}
