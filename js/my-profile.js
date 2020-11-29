//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {


    var userName = document.getElementById("userName");
    var userSurname = document.getElementById("userSurname");
    var userMail = document.getElementById("userMail");
    var userPhone = document.getElementById("userPhone");
    var saveUser = document.getElementById("saveUser");
    
    saveUser.addEventListener("click", () =>{

        sessionStorage.setItem("Nombre de Usuario", userName.value);
        sessionStorage.setItem("Apellido de Usuario", userSurname.value);
        sessionStorage.setItem("Mail de Usuario", userMail.value);
        sessionStorage.setItem("Telefono de Usuario", userPhone.value);

    })

    showChanges();

});

function showChanges(){

    document.getElementById("userName").value = sessionStorage.getItem("Nombre de Usuario");
    document.getElementById("userSurname").value = sessionStorage.getItem("Apellido de Usuario");
    document.getElementById("userMail").value = sessionStorage.getItem("Mail de Usuario");
    document.getElementById("userPhone").value = sessionStorage.getItem("Telefono de Usuario");
    
}