const CATEGORIES_URL = "http://localhost:3000/all1.json";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publish.json";
const CATEGORY_INFO_URL = "http://localhost:3000/1234.json";
const PRODUCTS_URL = "http://localhost:3000/all2.json";
const PRODUCT_INFO_URL = "http://localhost:3000/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/5678-comments.json";
const CART_INFO_URL = "http://localhost:3000/987.json";
const CART_BUY_URL = "http://localhost:3000/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function cerrarSesion(){
  sessionStorage.removeItem("saved_user");
  window.location.replace("index.html");
  sessionStorage.removeItem("Nombre de Usuario");
  sessionStorage.removeItem("Apellido de Usuario");
  sessionStorage.removeItem("Mail de Usuario");
  sessionStorage.removeItem("Telefono de Usuario");
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  var usuario = sessionStorage.getItem("saved_user");
   var lugar = document.getElementById("user");
   lugar.innerHTML = usuario;
});