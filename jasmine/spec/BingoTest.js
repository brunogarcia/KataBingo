describe("En la Kata Bingo", function() {
    var bombo, carton, jugador;

    beforeEach(function() {
        bombo = new Bombo();
        bombo.Iniciar();
        carton = new Carton();
        jugador = new Jugador();
        jugador.NuevoCarton();
    });


    describe("El bombo...", function() {

        it("Solo puede existir un bombo activo", function() {
            expect(bombo.GetActivarBombo()).toBeTruthy();

            var otroBombo;
            otroBombo = new Bombo();
            expect(otroBombo.GetActivarBombo()).toBeFalsy();

        });

        it("Solo puede cantar un maximo de 90 numeros", function() {
            expect(bombo.GetContador()).toBe(90);
        });

        it("Debe saber que numeros se han cantado", function() {
            expect(bombo.GetTablaNumerosCantados().length).toBe(90);
        });

        xit("El bombo debe notificar a los jugadores los numeros que van saliendo", function() {

        })

    });

    describe("Cada jugador...", function() {

        xit("Debe tener un carton", function() {

        });
    });

    describe("Cada carton...", function() {

        it("Debe tener 3 filas", function() {
            expect(carton.GetCuadricula().length).toBe(3);
        });

        it("Debe tener 9 columnas por fila", function() {
            expect(carton.GetCuadricula()[0].length).toBe(9);
        });

        it("Debe tener 12 casillas nulas", function() {
            expect(carton.GetTotalPosicionesPorTipo(0)).toBe(12);
        });

        it("Debe tener 15 casillas validas", function () {
            expect(carton.GetTotalPosicionesPorTipo(1)).toBe(15);
        });

        it("Cada columna tiene un rango de valores predeterminado", function() {
            for (var i = 0; i < carton.GetCuadricula().length; i++) {
                for (var j = 0; j < carton.GetCuadricula()[i].length; j++) {
                    if (carton.GetPosiciones(i, j) === 1) {
                        expect(carton.GetCuadricula()[i][j]).toBeGreaterThan(carton.GetRango('inicio', i)-1);
                        expect(carton.GetCuadricula()[i][j]).toBeLessThan(carton.GetRango('fin', i)+1);
                    } else {
                        expect(carton.GetCuadricula()[i][j]).toBe(0);
                    }
                }
            }
        })
    })
});