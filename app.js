// Traigo funciones de "Express"
var express = require("express");

// Llamo a la funcion "Epress" para crear app.
var app = express();

// Le doy acceso completo al servidor
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    // Creo una carpeta estatica, donde estara mi servidor
    app.use(express.static('public'));
    next();
  }
  app.use(allowCrossDomain);

// Le asigno un puerto al server
app.listen(3000);