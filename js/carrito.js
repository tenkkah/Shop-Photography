//Si el localStorage esta vacio añademe la listaCarrito
if(localStorage.getItem("carrito") != null){
  listaCarrito = JSON.parse(localStorage.getItem('carrito'));
}

//En el window cargas todas las paginas de los productos inluyendo los html que contengan cargarProductos
window.onload = function(){
  if(location.href.includes("camaras.html")){
     cargarCamaras();
  }
  if(location.href.includes("objetivos.html")){
    cargarObjetivos();
 }
 if(location.href.includes("tripodes.html")){
  cargarTripodes();
}
if(location.href.includes("flash.html")){
  cargarIluminacion();
}

  //Si el localStorage existe pinta el carrito
  if(location.href.includes("carrito.html")){
    if(localStorage.getItem("carrito") != null){
      pintarCarrito(listaCarrito);
    }
  }
}

  //Es una funcion para añadir un producto y guardarlo en el localStorage
  function anadirProducto(id,modelo,precio,foto){
    let listaCarrito = [];
    if(localStorage.getItem('carrito')){
        listaCarrito = JSON.parse(localStorage.getItem('carrito'));
    }
    listaCarrito.push({'Id' : id, 'Modelo' : modelo, 'Precio' : precio, 'Imagen' : foto});
    localStorage.setItem('carrito', JSON.stringify(listaCarrito));
}

//Si el carrito html existe pinta el carrito
if(location.href.includes("carrito.html")){
  //Funcion para pintar el carrito y sumar los precios totales de los productos
  function pintarCarrito(listaCarrito) {
    var precioTotal = 0;
    var precioTotalFinal = 0;
    for(let i = 0; i<listaCarrito.length; i++){
         precioTotal = parseFloat(listaCarrito[i].Precio);
         precioTotalFinal = precioTotal + precioTotalFinal;
    }
  //Con el foreach se recorre la lista del carrito y se pinta la tabla
    listaCarrito.forEach(producto => {
      var carrito =
        `<tbody>
          <tr>
          <td>${producto.Precio}</td>
          <td>${producto.Modelo}</td>
          <td><img src = "${producto.Imagen}" class="w-25"></td>
        </tr>
        </tbody>`;
      document.getElementById("tablaCarrito").innerHTML += carrito; 
    });
  
    var cantidad = document.createElement("td");
    cantidad.innerHTML = precioTotalFinal;
    document.getElementById('tablaCarrito').appendChild(cantidad);
  
    var finalizarCompra = document.createElement("button");
    finalizarCompra.className = "botonFinalizarCompra";
    finalizarCompra.addEventListener("click", function(){
      alert("Compra Realizada :)");
      localStorage.removeItem("carrito");
      location.reload();
    });
    finalizarCompra.innerHTML = "Realizar compra";
    document.getElementById('tablaCarrito').appendChild(finalizarCompra);
    
    var vaciarCarrito = document.createElement("button");
    vaciarCarrito.className = "botonFinalizarCompra";
    vaciarCarrito.addEventListener("click", function(){
      localStorage.removeItem("carrito");
      location.reload();
    });
    vaciarCarrito.innerHTML = "Vaciar carrito";
    document.getElementById('tablaCarrito').appendChild(vaciarCarrito);
  }
}
