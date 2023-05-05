
//Se llama a la funcion enviarMensaje
onload = function(){
    document.getElementById("btnMensaje").addEventListener("click", enviarMensaje);
}

//Funcion para validar todos los campos, cualquier persona puede registrarse y mandar un mensaje 
function enviarMensaje(){
    const nombreUsuario = document.getElementById("nombreUsuario");
    const emailUsuario = document.getElementById("emailUsuario");
    const contrasenaUsuario = document.getElementById("consulta");
    if(nombreUsuario.value == ""){
        alert("Debe introducir el nombre");
    }else if(emailUsuario.value == ""){
        alert("Debe introducir el correo electronico");
    }else if(contrasenaUsuario.value == ""){
        alert("Debe introducir la contrasena");
    }else{
        alert("Mensaje enviado con exito");
        location.href = "./index.html";
    
    }
}