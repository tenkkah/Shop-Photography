let listaUsuarios;

//Se obtiene la lista de usuarios en el localStorage
if(localStorage.getItem("Usuarios") == null){
    listaUsuarios = [];
}else{
    listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}

//Se carga activa el evento para poder crear el usuario
onload = function(){
    document.getElementById("btnRegistrar").addEventListener("click",crearUsuario);
}

//Funcion para crear el usuario, aquí se declaran las variables del formulario
function crearUsuario(){
    const nombreUsuario = document.getElementById("nombre");
    const emailUsuario = document.getElementById("email");
    const contrasenaUsuario = document.getElementById("contrasena");
    const contrasenaValidacion = document.getElementById("contrasenaConfirmacion");


    //Se validan los campos escritos del formulario
    if(nombreUsuario.value == ""){
        alert("Debe introducir el nombre");
    }else if(emailUsuario.value == ""){
        alert("Debe introducir el correo electronico");
    }else if(contrasenaUsuario.value == ""){
        alert("Debe introducir la contrasena");
    }else if(contrasenaUsuario.value != contrasenaValidacion.value){
        alert("Las claves son diferentes");
    }else{
        //Se llama a la funcion de comprobar usuario, porque si ya existe el email de usuario te salta un error de que ya existe
        if(comprobarUsuario(emailUsuario.value, listaUsuarios)){
            alert("Este correo electonico ya existe, introduce otro");
    }else{
    //Aqui si todas las validaciones son correctas se añade el usuario en el localStorage 
        let nuevoUsuario = new Usuario(nombreUsuario.value,email.value,contrasenaUsuario.value);
        listaUsuarios.push(nuevoUsuario);
        guardarUsuarioLocalStorage();
        guardarUsuarioActivo(nuevoUsuario);
        alert("Usuario registrado correctamente, debe loguearse");
        location.href = "./singin.html";
         }
    }
    
}

//Si todo esta bien se guarda el usuario Activo que se este usando en el momento en el sesion storage
function guardarUsuarioActivo(usuario){
    sessionStorage.setItem("UsuarioActivo", JSON.stringify(usuario));
}


function guardarUsuarioLocalStorage(){
    localStorage.setItem("Usuarios",JSON.stringify(listaUsuarios));
}


//Con esta funcion compruebas si el usuario existe sino se tendria que registrar y si el email del usuario ya existe te salta un error
function comprobarUsuario(emailUsuario, lista){
    var Usuarioencontrado = false;
    lista.forEach(element => {
        if(element['email'] == emailUsuario)
        Usuarioencontrado = true;
         });
    return Usuarioencontrado;
}
