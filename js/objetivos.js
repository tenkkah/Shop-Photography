

  var listaConBusqueda=[];
  var listaArrayObjetivos=[];
  //PARA CARGAR LOS DATOS DEL JSON DE OBJETIVOS
function cargarObjetivos() {
  var urlPagina = (window.location.href).split("="); 
  var urlPagina2 = urlPagina[1]; 

  $.get("objetivos.json", {}, (resultado) => {
    listaArrayObjetivos=resultado; //Aqui te va a meter en el array todos los resultados que coge del json
    console.log(listaArrayObjetivos);
   if(urlPagina2 == null){
    pintarObjetivos(resultado.objetivos);
   }
 
  //Aqui hacemos la busqueda sobre las camaras de la palabra introducida (que contenga)
    if(urlPagina2 != null){
      var texto5 = urlPagina2.trim().toUpperCase(); //Se le quita los espacios y se ponen en mayusculas
      //Lista ya filtrada de las camaras
      var listaConBusqueda=resultado.objetivos.filter((elemento) => elemento.modelo.toString().toUpperCase().includes(texto5)); //Aqui lo que hago es filtrar la lista de camaras por el modelo que se coge del json
      pintarObjetivos(listaConBusqueda);
    }
  });
}

  
  //PARA CARGAR LOS PRODUCTOS DE LA OBJETIVOS
function pintarObjetivos(lista) {
  lista.forEach(objetivos => {
    var objetivos =
      `<div class="class col-md-3">
              <div class="card mt-3">
                  <div class="product-1 align-items-center p-2 text-center">
                   <a href="${objetivos.foto}"> <img src="${objetivos.foto}" alt="" class="rounded"></a>
                    <h4>${objetivos.modelo}</h4>
                    <!--CARD INFO-->
                    <div class="mt-3 info">
                      <span class="text1 d-block">${objetivos.descripcion}</span>
                    </div>
                    <div class="cost mt-3 text-dark">
                      <span>${objetivos.precio}€</span>
                      <div class="star mt-3 align-items-center">
                        <i class="fas fa-shopping-cart"></i>
                      </div>
                    </div>
                  </div>
                  <!--boton de cards-->
                  <div class="p-3 camera text-center text-white mt-3 cursor">
                  <button type="button" onclick="anadirProducto('${objetivos.id}','${objetivos.modelo}','${objetivos.precio}','${objetivos.foto}')"> <span class="text-uppercase">AÑADIR AL CARRITO</span> </button>
                  </div>
              </div>`;

    document.getElementById("tablaObjetivos").innerHTML += objetivos; //1 FORMA DE HACERLO
    // document.getElementById("tablaCamaras").insertAdjacentHTML("beforened",texto); 2 FORMA DE HACERLO
  });
}


//ES EL SEARCH PARA BUSCAR LOS PRODUCTOS REALIZADO CON UNA CABECERA
function buscarObjetivos(){
  var objetivos = document.getElementById("buscadorObjetivos").value;
  console.log(objetivos);
  location.href="objetivos.html?filtro="+objetivos;
}

//Esta es la funcion del select de las objetivos.html
function SelectOrdenar(){
  document.getElementById("tablaObjetivos").innerHTML = "";
  var ValorSelect = document.getElementById("contenidoFiltros").value;
  var listaObjetivos=[];
  listaObjetivos.push(listaArrayObjetivos["objetivos"]); 
  console.log(listaObjetivos);
  //Ordenar por el precio mas caro
  if(ValorSelect == "PrecioMasCaro"){
    var PrecioMasCaro = listaObjetivos[0].sort(function ordenCaro(menor, mayor) { 
      return mayor.precio > menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio < menor.precio ? -1 
          : 0;              
    });
    console.log(1);
    document.getElementById("tablaObjetivos").innerHTML+= "<h2>Ordenado por el precio mas caro</h2><br>";
    pintarObjetivos(PrecioMasCaro);
  }

   //Ordenar por el precio mas barato
   if(ValorSelect == "PrecioMasBarato"){
    var PrecioMasBarato = listaObjetivos[0].sort(function ordenPrecioBarato(menor, mayor) { 
      return mayor.precio < menor.precio ?  1 //El precio lo coge del array que carga el json
          : mayor.precio > menor.precio ? -1 
          : 0;              
    });

    document.getElementById("tablaObjetivos").innerHTML+= "<h2>Ordenado por el precio mas barato</h2><br>";
    pintarObjetivos(PrecioMasBarato);
  }

  //Ordenar por el orden alfabetico
  if(ValorSelect == "OrdenarAlfabeticamente"){
    var OrdenarAlfabeticamente = listaObjetivos[0].sort(function ordenAlfabetico(menor, mayor) { 
      return mayor.modelo < menor.modelo ?  1 //El precio lo coge del array que carga el json
          : mayor.modelo > menor.modelo ? -1 
          : 0;              
    });

    document.getElementById("tablaObjetivos").innerHTML+= "<h2>Ordenado por orden alfabetico</h2><br>";
    pintarObjetivos(OrdenarAlfabeticamente);
  }
}
