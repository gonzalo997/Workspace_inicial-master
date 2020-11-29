let comissionPercentage = 0.15;
let MONEY_SYMBOL = "$";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
let DOLLAR_SYMBOL = "USD ";
let PESO_SYMBOL = "UYU ";
let PERCENTAGE_SYMBOL = '%';
let SUCCESS_MSG = "¡Se ha realizado la publicación con éxito! :)";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

document.addEventListener("DOMContentLoaded", function (e) {

    document.addEventListener("change", function () {


        var subTotalArt = document.getElementById("subTotal");
        var cantidadArt = document.getElementById("articlesCount").value;
        var costoUnitArt = articles.unitCost;

        var SubTotal = cantidadArt * costoUnitArt;
        subTotalArt.innerHTML = `U$` + " " + SubTotal;

        //actualización de los costos totales...
        var subTFinal = document.getElementById("productCostText");
        var Total = document.getElementById("totalCostText");

        //imprimo los resultados...
        subTFinal.innerHTML = `U$` + " " + SubTotal;
        seleccionEnvio();

        //función para calcular el costo de envío en base al subTotal...
        function seleccionEnvio() {

            if (document.querySelector('input[name="publicationType"]:checked') !== null) {

                let envioSelect = document.querySelector('input[name="publicationType"]:checked').id;
                let textoEnvio = document.getElementById("comissionText");

                //al seleccionar un input radio se recalcula e imprime texto...
                switch (envioSelect) {
                    case "goldradio":
                        totalEnvio = Math.round(SubTotal * 0.15);
                        textoEnvio.innerText = "ha seleccionado: envío Gold";
                        break;

                    case "premiumradio":
                        totalEnvio = Math.round(SubTotal * 0.07);
                        textoEnvio.innerText = "ha seleccionado: envío Premium";
                        break;
                    case "standardradio":
                        totalEnvio = Math.round(SubTotal * 0.05);
                        textoEnvio.innerText = "ha seleccionado: envío Standar";
                        break;
                }
            } else {
                totalEnvio = 0;
            }

            document.getElementById("comissionText").innerHTML = `U$` + " " + totalEnvio;
        };

        //imprimo los resultados...
        var TotalFinal = SubTotal + totalEnvio;
        Total.innerHTML = `U$` + " " + TotalFinal;

        //evento al clickear en "Realizar compra"...
        let comprar = document.getElementById("btn-comprar");
        let numeroTarjeta = document.getElementById("inputNumero").value;
        let vencimientoTarjeta = document.getElementById("inputVencimiento").value;
        let ccv = document.getElementById("inputCodigo").value;
        comprar.addEventListener("click", function () {

            if (numeroTarjeta != "" && vencimientoTarjeta != "" && ccv != "") {
                return false
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Tu compra ha sido realizada con éxito. !!Muchas gracias!!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });

        //Se obtiene el formulario de publicación de producto
        var sellForm = document.getElementById("sell-info");

        //Se agrega una escucha en el evento 'submit' que será
        //lanzado por el formulario cuando se seleccione 'Vender'.
        sellForm.addEventListener("submit", function (e) {

            let productNameInput = document.getElementById("ciudad");
            let productCategory = document.getElementById("calle");
            let productDoor = document.getElementById("puerta");
            let infoMissing = false;

            //Quito las clases que marcan como inválidos
            productNameInput.classList.remove('is-invalid');
            productCategory.classList.remove('is-invalid');
            productDoor.classList.remove('is-invalid');

            //Se realizan los controles necesarios,
            //En este caso se controla que se haya ingresado el nombre y categoría.
            //Consulto por el nombre del producto
            if (productNameInput.value === "") {
                productNameInput.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por la categoría del producto
            if (productCategory.value === "") {
                productCategory.classList.add('is-invalid');
                infoMissing = true;
            }

            //Consulto por el costo
            if (productDoor.value === "") {
                productDoor.classList.add('is-invalid');
                infoMissing = true;
            }

            if (!infoMissing) {
                //Aquí ingresa si pasó los controles, irá a enviar
                //la solicitud para crear la publicación.

                getJSONData(PUBLISH_PRODUCT_URL).then(function (resultObj) {
                    let msgToShowHTML = document.getElementById("resultSpan");
                    let msgToShow = "";

                    //Si la publicación fue exitosa, devolverá mensaje de éxito,
                    //de lo contrario, devolverá mensaje de error.
                    if (resultObj.status === 'ok') {
                        msgToShow = resultObj.data.msg;
                        document.getElementById("alertResult").classList.add('alert-success');
                    }
                    else if (resultObj.status === 'error') {
                        msgToShow = ERROR_MSG;
                        document.getElementById("alertResult").classList.add('alert-danger');
                    }

                    msgToShowHTML.innerHTML = msgToShow;
                    document.getElementById("alertResult").classList.add("show");
                });
            }

            //Esto se debe realizar para prevenir que el formulario se envíe (comportamiento por defecto del navegador)
            if (e.preventDefault) e.preventDefault();
            return false;



        });

        updateTotalCosts();

    });





});
// Funcion para validar los required y fijarme que el valor de los input no sean vacios.
function validarCampo() {

    var cardNum = document.getElementById("card-num");
    var cardDate = document.getElementById("card-date");
    var cardKey = document.getElementById("card-key");
    var tarjetaSeleccionada = document.getElementById("tarjetas");

    if (cardNum.value == "") {

        return alert("Por favor rellene el campo Numero de Tarjeta!");

    } else if (cardDate.value == "") {

        return alert("Por favor rellene el campo Fecha de Vencimiento!");

    } else if (cardKey.value == "") {

        return alert("Por favor rellene el campo CCV!");

    }

    document.getElementById("tarjetaSeleccionada").innerText = tarjetaSeleccionada.value;

    $('#modal').modal('hide');

}

function compraRealizada(){

    alert("Felicitaciones por su compra!");
    window.location.replace("./home.html");

}


getJSONData(CART_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
        articles = resultObj.data.articles[0];

        let articlesNameHTML = document.getElementById("articlesName");
        let articlesCountHTML = document.getElementById("articlesCount");
        let articlesUnitCostHTML = document.getElementById("articlesUnitCost");
        let articlesImagesHTML = document.getElementById("articlesImage");
        let subtotal1 = document.getElementById("subTotal");

        articlesNameHTML.innerHTML = articles.name;
        articlesCountHTML.value = articles.count;
        articlesUnitCostHTML.innerHTML = articles.currency + articles.unitCost;
        articlesImagesHTML.src = articles.src;
        subtotal1.innerHTML = articles.count * articles.unitCost;




    };
});

