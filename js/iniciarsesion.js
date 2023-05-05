let listaUsuarios;


if(localStorage.getItem("Usuarios") == null){
    listaUsuarios = [];
}else{
    listaUsuarios = JSON.parse(localStorage.getItem("Usuarios"));
}

onload = function(){
    document.getElementById("btnLoguear").addEventListener("click", comprobarUsuario);
}

//Funcion para comprobar Usuario, si existe se accede, sino existe te manda al registro y tambien se validan los datos del usuario
function comprobarUsuario(){
    const emailIniciarSesion = document.getElementById("email");
    const contrasenaUsuario = document.getElementById("contrasena");

    
    if(emailIniciarSesion.value == "" || contrasenaUsuario.value == ""){
        alert("No han introducido todos los datos, por favor introduce los datos");
    }else{
        var Usuarioencontrado = false;
        listaUsuarios.forEach(Usuario => {
            if(emailIniciarSesion.value == Usuario['email'] && contrasenaUsuario.value == Usuario['clave']){
                Usuarioencontrado = true;
                guardarUsuarioLogueado(Usuario);
            }
        });
        if(Usuarioencontrado){
            if(emailIniciarSesion.value == "root@hotmail.com" && contrasenaUsuario.value == "1234"){
                alert("Usuario root entrando al sistema...");
                location.href = "./indexAdmin";
            }else{
                location.href = "./index.html";
            }
        }else{
                alert("Los datos introducidos son erroneos");
        }
        
    }
}
//Si se han encontrado los datos introducidos del usuario root se le mostrata el panel donde podra anadir productos
function guardarUsuarioLogueado(Usuario){
    sessionStorage.setItem("UsuarioLogueado", JSON.stringify(Usuario));
}