var Juego = function () {
    var cartonesVendidos, numerosMarcados, linea, bingo;

    cartonesVendidos = [];
    numerosMarcados = [];
    linea = 0;
    bingo = false;

    this.Init = function (numero) {
        for (var i = 0; i < numero; i++) {
            var carton = new Carton();
            carton.GenerarPosicionesFilas();
            carton.GenerarValores();
            this.SetCartonesVendidos(carton);
        }
    };

    this.GetCartonesVendidos = function() {
        return cartonesVendidos;
    };

    this.SetCartonesVendidos = function(item) {
        cartonesVendidos.push(item);
    };

    this.CheckNumero = function(numero) {

        for (var carton = 0; carton < cartonesVendidos.length; carton++) {

            //buscar rango al cual pertenece el numero
            var numeroDeColumna = cartonesVendidos[carton].PreguntarPorRango(numero);

            //buscar en todas las filas de una columna en concreto
            for (var fila = 0; fila < cartonesVendidos[carton].length; fila++) {
                if (cartonesVendidos[fila][numeroDeColumna] === numero) {
                    this.MarcarNumeroEncontrado(carton, fila, numeroDeColumna);
                }
            }
        }
    };

    this.MarcarNumeroEncontrado = function(carton, fila, columna) {

        if (numerosMarcados[carton][fila][columna] >= 5) {
            this.GritarLinea();
            this.CheckBingo();
        } else {
            numerosMarcados[carton][fila][columna]++;
        }
    };

    this.GritarLinea = function() {
        alert("Linea!");
    };

    this.CheckBingo = function() {
        if (linea > 3) {
            this.GritarBingo();
        }
    };

    this.GritarBingo = function() {
        bingo = true;
        alert("Bingo!");
    };

};