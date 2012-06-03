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
}

var Carton = function() {

    var cuadricula = [];
    cuadricula[0] = new Array(9);
    cuadricula[1] = new Array(9);
    cuadricula[2] = new Array(9);

    var posiciones = [];
    posiciones[0] = new Array(9);
    posiciones[1] = new Array(9);
    posiciones[2] = new Array(9);

    var rangoInicio = [1,10,20,30,40,50,60,70,80];
    var rangoFin    = [9,19,29,39,49,59,69,79,90];

    this.GetCuadricula = function() {
        return cuadricula;
    }

    this.GetPosiciones = function(x, y) {
        return posiciones[x][y];
    }

    this.GetRango = function(tipo, posicion) {
        if (tipo === 'inicio') {
            return rangoInicio[posicion];
        } else {
            return rangoFin[posicion];
        }
    }

    this.GetPosicionesPorTipo = function(tipo) {
        var numero = 0;
        for (var i = 0; i < posiciones.length; i++) {
            for (var j = 0; j < posiciones[i].length; j++) {
                if (posiciones[i][j] === tipo) numero++;
            }
        }
        return numero;
    }

    this.GenerarPosiciones = function() {
        for (var i = 0; i < posiciones.length; i++) {

            var contadorVacios = 0;
            var contadorValidos = 0;

            for (var j = 0; j < posiciones[i].length; j++) {

                var numero = this.GenerarNumeroRandom(0,1);

                if (numero === 0) {
                    contadorVacios++
                } else {
                    contadorValidos++
                };

                if (contadorVacios <= 4) {
                    if (contadorValidos <= 5) {
                        posiciones[i][j] = numero;
                    } else {
                        posiciones[i][j] = 0;
                    }
                } else if (contadorValidos <= 5) {
                    if (contadorVacios <= 4) {
                        posiciones[i][j] = numero;
                    } else {
                        posiciones[i][j] = 1;
                    }
                }
            }
        }
    }

    this.GenerarValores = function() {
        var num = 0;
        for (var i = 0; i < this.GetCuadricula().length; i++) {
            for (var j = 0; j < this.GetCuadricula()[i].length; j++) {
                if (this.GetPosiciones(i, j) === 1) {
                num = this.GenerarNumeroRandom(this.GetRango('inicio', i), this.GetRango('fin', i));
                    this.SetValores(i, j, num);
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