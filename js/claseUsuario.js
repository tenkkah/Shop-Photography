//Clase Usuario donde se recogeran los datos para el Registro y el Inicio de sesion
class Usuario {
    constructor(nombreUsuario,email,clave,claveConfirmacion){
        this.nombreUsuario = nombreUsuario;
        this.email = email;
        this.clave = clave;
        this.claveConfirmacion = claveConfirmacion;
    };
    cambiarClave(nuevaClave){
        this.clave = nuevaClave;
    };
    cambiarnombreUsuario(nuevoNombre){
        this.nombreUsuario = nuevoNombre;
    }
    cambiarEmail(nuevoEmail){
        this.email = nuevoEmail;
    }    
}