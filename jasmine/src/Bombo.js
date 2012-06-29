var Bombo = function () {

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
                juego.CheckNumero(numero);
            }
        } else {
            return false;
        }
    };

    this.Init = function () {
        if (!(this.GetActivarBombo())) {
            this.LlenarBombo();
            this.ComenzarJuego();
            this.SetActivarBombo(true);
        } else {
            return false;
        }
    };
};