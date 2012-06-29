var Carton = function () {

    var cuadricula, posiciones, cartones,
        rangoInicio, rangoFin,
        numeroMaximoFilas, numeroMaximoColumnas,
        numeroMaximoPosicionesNulas, numeroMaximoPosicionesValidas,
        contadorPosiciones;

    cuadricula = [
        [],
        [],
        []
    ];

    posiciones = [
        [],
        [],
        []
    ];

    rangoInicio = [1, 10, 20, 30, 40, 50, 60, 70, 80];
    rangoFin = [9, 19, 29, 39, 49, 59, 69, 79, 90];

    numeroMaximoFilas = 3;
    numeroMaximoColumnas = 9;

    numeroMaximoPosicionesNulas = 4;
    numeroMaximoPosicionesValidas = 5;

    contadorPosiciones = {};

    this.GetNumeroMaximoColumas = function() {
        return numeroMaximoColumnas;
    }

    this.GetCuadricula = function () {
        return cuadricula;
    };

    this.GetPosiciones = function (x, y) {
        return posiciones[x][y];
    };

    this.GetRango = function (tipo, posicion) {
        return (tipo === 'inicio' || tipo === 'fin') ? rangoInicio[posicion] : rangoFin[posicion];
    };

    this.PreguntarPorRango = function(numero) {
        for (var i = 0; i < numeroMaximoColumnas; i++) {
            if (rangoInicio[i] >= numero && rangoFin[i] <= numero) {
                return i;
            }
        }
    };

    this.GetTotalPosicionesPorTipo = function (tipo) {
        var tipoCast = (tipo === 'nula') ? 0 : 1;
        var contador = 0;
        for (var i = 0; i < numeroMaximoFilas; i++) {
            for (var j = 0; j < numeroMaximoColumnas; j++) {
                if (posiciones[i][j] === tipoCast) {
                    contador++;
                }
            }
        }
        return contador;
    };

    this.GetLinea = function (fila) {
        var contador = 0;
        for (var i = 0; i < cuadricula[fila].length; i++) {
            if (posiciones[fila][i] === 1) {
                contador++;
            }
        }
        return contador;
    };

    this.GenerarPosicionesFilas = function () {
        for (var fila = 0; fila < numeroMaximoFilas; fila++) {
            this.GenerarPosicionesColumnas(fila);
        }
    };

    this.GenerarPosicionesColumnas = function(fila) {
        contadorPosiciones.nulas = 0;
        contadorPosiciones.validas = 0;

        for (var columna = 0; columna < numeroMaximoColumnas; columna++) {

            var numeroRandom = GenerarNumeroRandom(0, 1);

            if (numeroRandom === 0) {
                contadorPosiciones.nulas++;
            } else {
                contadorPosiciones.validas++;
            }

            if (contadorPosiciones.nulas <= numeroMaximoPosicionesNulas) {
                posiciones[fila][columna] = (contadorPosiciones.validas <= numeroMaximoPosicionesValidas) ? numeroRandom : 0;

            } else if (contadorPosiciones.validas <= numeroMaximoPosicionesValidas) {
                posiciones[fila][columna] = (contadorPosiciones.nulas <= numeroMaximoPosicionesNulas) ? numeroRandom : 1;
            }
        }
    }

    this.GenerarValores = function () {
        var numeroRandom = 0;
        for (var i = 0; i < numeroMaximoFilas; i++) {
            for (var j = 0; j < numeroMaximoColumnas; j++) {
                if (this.GetPosiciones(i, j) === 1) {
                    numeroRandom = GenerarNumeroRandom(this.GetRango('inicio', i), this.GetRango('fin', i));
                    this.SetValores(i, j, numeroRandom);
                } else {
                    this.SetValores(i, j, 0);
                }
            }
        }
    };


    this.SetValores = function (coordenadaX, coordenadaY, valor) {
        cuadricula[coordenadaX][coordenadaY] = valor;
    };
};
