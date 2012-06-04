var Bombo = function() {

    var tablaNumeros = []
    var tablaCantados = [];

    var numeroMinimo = 1;
    var numeroMaximo = 90;
    var contador = 0;

    this.LlenarBombo = function() {
        for (var i = numeroMinimo; i <= numeroMaximo; i++) {
            tablaNumeros.push(i);
        }
    }

    this.CantarNumero = function() {
        var numero = this.GenerarNumeroRandom(numeroMinimo,numeroMaximo);

        if (contador < numeroMaximo) {
            if (tablaNumeros[numero-1] === numero) {
                tablaNumeros[numero-1] = 0;
                this.SetContador();
                this.SetNumerosCantados(numero);
            }
        } else {
            return false;
        }
    }

    this.ComenzarJuego = function() {
        for (var i = 0; this.GetContador() < numeroMaximo; i++) {
            this.CantarNumero();
        }
    }

    this.GetTablaNumeros = function() {
        return tablaNumeros;
    }

    this.GetTablaCantados = function() {
        return tablaCantados;
    }

    this.GetContador = function() {
        return contador;
    }

    this.SetContador = function() {
        contador++;
    }

    this.SetNumerosCantados = function(numero) {
        tablaCantados.push(numero);
    }

    //Arrancar bombo
    this.LlenarBombo();
    this.ComenzarJuego();
};


var Carton = function() {

    var cuadricula = [ [], [], [] ];
    var posiciones = [ [], [], [] ];

    var rangoInicio = [1,10,20,30,40,50,60,70,80];
    var rangoFin    = [9,19,29,39,49,59,69,79,90];

    var numeroMaximoFilas = 3;
    var numeroMaximoColumnas = 9;

    var numeroMaximoPosicionesNulas = 4;
    var numeroMaximoPosicionesValidas = 5;

    this.GetCuadricula = function() {
        return cuadricula;
    }

    this.GetPosiciones = function(x, y) {
        return posiciones[x][y];
    }

    this.GetRango = function(tipo, posicion) {
        return (tipo === 'inicio' || tipo === 'fin') ? rangoInicio[posicion] : rangoFin[posicion];
    }

    this.GetPosicionesPorTipo = function(tipo) {
        var contador = 0;
        for (var i = 0; i < numeroMaximoFilas; i++) {
            for (var j = 0; j < numeroMaximoColumnas; j++) {
                if (posiciones[i][j] === tipo) contador++;
            }
        }
        return contador;
    }

    this.GenerarPosiciones = function() {
        for (var i = 0; i < numeroMaximoFilas; i++) {

            var contadorPosicionesNulas = 0;
            var contadorPosicionesValidas = 0;

            for (var j = 0; j < numeroMaximoColumnas; j++) {

                var numeroRandom = this.GenerarNumeroRandom(0,1);

                if (numeroRandom === 0) {
                    contadorPosicionesNulas++
                } else {
                    contadorPosicionesValidas++
                };

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
    }

    this.GenerarValores = function() {
        var numeroRandom = 0;
        for (var i = 0; i < numeroMaximoFilas; i++) {
            for (var j = 0; j < numeroMaximoColumnas; j++) {
                if (this.GetPosiciones(i, j) === 1) {
                    numeroRandom = this.GenerarNumeroRandom(this.GetRango('inicio', i), this.GetRango('fin', i));
                    this.SetValores(i, j, numeroRandom);
                } else {
                    this.SetValores(i, j, 0);
                }
            }
        }
    }


    this.SetValores = function(coordenadaX, coordenadaY, valor) {
        cuadricula[coordenadaX][coordenadaY] = valor;
    }

    //Inicializar el carton con datos
    this.GenerarPosiciones();
    this.GenerarValores();

}

var Jugador = function() {
    this.MiCarton = function() {
        var nuevoCarton;
        nuevoCarton = new Carton();
    }
}


var Commons = function()  {
    this.GenerarNumeroRandom = function(inicio, fin) {

        /*Random a number with Math Objects
         https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Math/random*/
        return Math.floor(Math.random() * (fin - inicio + 1)) + inicio;
    }
}

Carton.prototype = new Commons();
Bombo.prototype = new Commons();