var Bombo, Carton, Jugador;

Bombo = function () {

    var tablaNumeros, tablaNumerosCantados,
        numeroMinimo, numeroMaximo,
        contador,
        activarBombo;

    tablaNumeros = [];
    tablaNumerosCantados = [];

    numeroMinimo = 1;
    numeroMaximo = 90;
    contador = 0;
    activarBombo = false;

    this.LlenarBombo = function () {
        for (var i = numeroMinimo; i <= numeroMaximo; i++) {
            tablaNumeros.push(i);
        }
    };

    this.ComenzarJuego = function () {
        for (var i = 0; this.GetContador() < numeroMaximo; i++) {
            this.CantarNumero();
        }
    };

    this.GetNumeroMinimo = function () {
        return numeroMinimo;
    };

    this.GetNumeroMaximo = function () {
        return numeroMaximo;
    };

    this.GetTablaNumeros = function () {
        return tablaNumeros;
    };

    this.GetTablaNumerosCantados = function () {
        return tablaNumerosCantados;
    };

    this.GetContador = function () {
        return contador;
    };

    this.GetActivarBombo = function () {
        return activarBombo;
    };

    this.SetActivarBombo = function (accion) {
        activarBombo = !!((accion === true || accion === false));
    };

    this.SetContador = function () {
        contador++;
    };

    this.SetNumerosCantados = function (numero) {
        tablaNumerosCantados.push(numero);
    };

    this.CantarNumero = function () {
        var numero = GenerarNumeroRandom(this.GetNumeroMinimo(), this.GetNumeroMaximo());

        if (this.GetContador() < this.GetNumeroMaximo()) {
            if (this.GetTablaNumeros()[numero - 1] === numero) {
                this.GetTablaNumeros()[numero - 1] = 0;
                this.SetContador();
                this.SetNumerosCantados(numero);
                //CheckNumero(numero);
            }
        } else {
            return false;
        }
    };

    this.Iniciar = function () {
        if (!(this.GetActivarBombo())) {
            this.LlenarBombo();
            this.ComenzarJuego();
            this.SetActivarBombo(true);
        } else {
            return false;
        }
    }



};

Carton = function () {

    var cuadricula, posiciones,
        rangoInicio, rangoFin,
        numeroMaximoFilas, numeroMaximoColumnas,
        numeroMaximoPosicionesNulas, numeroMaximoPosicionesValidas;

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

    this.GetCuadricula = function () {
        return cuadricula;
    };

    this.GetPosiciones = function (x, y) {
        return posiciones[x][y];
    };

    this.GetRango = function (tipo, posicion) {
        return (tipo === 'inicio' || tipo === 'fin') ? rangoInicio[posicion] : rangoFin[posicion];
    };

    this.GetTotalPosicionesPorTipo = function (tipo) {
        var contador = 0;
        for (var i = 0; i < numeroMaximoFilas; i++) {
            for (var j = 0; j < numeroMaximoColumnas; j++) {
                if (posiciones[i][j] === tipo) contador++;
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

    this.GenerarPosiciones = function () {
        for (var i = 0; i < numeroMaximoFilas; i++) {

            var contadorPosicionesNulas = 0;
            var contadorPosicionesValidas = 0;

            for (var j = 0; j < numeroMaximoColumnas; j++) {

                var numeroRandom = GenerarNumeroRandom(0, 1);

                if (numeroRandom === 0) {
                    contadorPosicionesNulas++
                } else {
                    contadorPosicionesValidas++
                }
                if (contadorPosicionesNulas <= numeroMaximoPosicionesNulas) {
                    if (contadorPosicionesValidas <= numeroMaximoPosicionesValidas) {
                        posiciones[i][j] = numeroRandom;
                    } else {
                        posiciones[i][j] = 0;
                    }
                } else if (contadorPosicionesValidas <= numeroMaximoPosicionesValidas) {
                    if (contadorPosicionesNulas <= numeroMaximoPosicionesNulas) {
                        posiciones[i][j] = numeroRandom;
                    } else {
                        posiciones[i][j] = 1;
                    }
                }
            }
        }
    };

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

    //Inicializar el carton con datos
    this.GenerarPosiciones();
    this.GenerarValores();

};

Jugador = function () {
    var carton, tablaEncontrado, linea, bingo;

    tablaEncontrado = [[],[],[]];
    linea = 0;
    bingo = false;

    this.NumeroEncontrado = function(fila, columna, numero) {
        tablaEncontrado[fila][columna] = numero;
        this.CheckLinea(fila);
        this.CheckBingo();
    };

    this.CheckLinea = function(fila) {
        var linea = 0;
        for (var i = 0; i < carton.length; i++) {
            for (var j = 0; j < carton[i].length; j++) {
                if (tablaEncontrado[i][j] === carton[i][j]) {
                    linea++;
                }
                if (carton.GetLinea(fila) === linea) {
                    this.GritarLinea();
                }
            }
        }
    };

    this.GritarLinea = function() {
        linea++;
    };

    this.CheckBingo = function() {
        if (linea > 3) {
            this.GritarBingo();
        }
    };

    this.GritarBingo = function() {
        bingo = true;
        this.Fin();
    };

    this.NuevoCarton = function () {
        carton = new Carton();
        return carton;
    };


    this.Fin = function() {
        return true;
    }

};

/*
var CheckNumero = function(numero) {
    for (var i = 0; i < carton.GetCuadricula().length; i++) {
        for (var j = 0; j < carton.GetCuadricula()[i].length; j++) {
            if (carton.GetCuadricula()[i][j] === numero) {
                this.NumeroEncontrado(i, j, numero);
            }
        }
    }

};
*/

var GenerarNumeroRandom = function (inicio, fin) {
    /*Random a number with Math Objects
     https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random*/
    return Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
};
