/*
* Bombo.js
* Carton.js
* */

 var GenerarNumeroRandom = function (inicio, fin) {
    /*Random a number with Math Objects
     https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random*/
    return Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
};
