var product = {};

function showImages(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `

        document.getElementById("images").innerHTML = htmlContentToAppend;
    }
}

function showRelatedProducts(array){
     let htmlContentToAppend = "";

     for(let i = 0; i < array.length; i++){
         let relPsSrc = array[i];
        
         if ( i == 1 || i == 3) {

            htmlContentToAppend += `
             <div class="card" style="width: 18rem;">
                <img src="` + relPsSrc.imgSrc + `" class="card-img-top" alt="">
                    <div class="card-body">
                        <h5 class="card-title"><strong>` + relPsSrc.name +`</strong></h5>
                            <p class="card-text">` + relPsSrc.description +`</p>
                            <a href="./product-info.html" class="btn btn-primary" style="border-color: darkmagenta; background-color: darkmagenta;"><strong>Ver</strong></a>
                    </div>
            </div>
         `
         

         }
         document.getElementById("relatedProducts").innerHTML = htmlContentToAppend;
     }
}

function showComments(array){

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++){
        let comment = array[i];
        let score = "";

        for ( let i = 1; i <= comment.score; i++){
            score+= `<span class= "fa fa-star checked"></span>`

        }
        for (let i = comment.score+1; i <= 5; i++){
            score+=`<span class="fa fa-star"></span>`
        }
        htmlContentToAppend +=`
        <div>
            <p>`+ comment.user +`  `+ comment.dateTime +`  `+ score +`</p>
            <p>`+ comment.description +`</p>
            <hr class="my-3">
            </div>
        `
        document.getElementById("productsComments").innerHTML = htmlContentToAppend;
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("name");
            let productDescriptionHTML = document.getElementById("description");
            let productCostHTML = document.getElementById("cost");
            let productCurrencyHTML = document.getElementById("currency");
            let productSoldCountHTML = document.getElementById("soldCount");            
            let productCategoryHTML = document.getElementById("category");
            let productImagesHTML = document.getElementById("images");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            productImagesHTML.innerHTML = product.images;

            //Muestro las imagenes en forma de galería
            showImages(product.images);        }
    });
});

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            product = resultObj.data;

            showRelatedProducts(resultObj.data);

        }
    });
});
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){

            comments = resultObj.data;

            showComments(resultObj.data);

        }
    });
});