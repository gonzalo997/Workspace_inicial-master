function saveUser(){
    var usuario = document.getElementById("lg_username").value;
    sessionStorage.setItem("saved_user", usuario);
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.addEventListener("submit", (event) => {
        event.preventDefault();
        window.location.replace("home.html");
    });
});