describe("En la Kata Bingo", function() {
    var bombo, juego;

    beforeEach(function() {
        bombo = new Bombo();
        bombo.Init();
        juego = new Juego();
        juego.Init(3);
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

        it("El bombo debe notificar a los jugadores los numeros que van saliendo", function() {
            expect(juego.CheckNumero(1)).toBeTruthy();
        })

    });

    describe("Cada carton...", function() {

        it("Debe tener 3 filas", function() {
            expect(juego.GetCartonesVendidos()[0].GetCuadricula().length).toBe(3);
        });

        it("Debe tener 9 columnas por fila", function() {
            expect(juego.GetCartonesVendidos()[0].GetCuadricula()[0].length).toBe(9);
        });

        it("Debe tener 12 casillas nulas", function() {
            expect(juego.GetCartonesVendidos()[0].GetTotalPosicionesPorTipo('nula')).toBe(12);
        });

        it("Debe tener 15 casillas validas", function () {
            expect(juego.GetCartonesVendidos()[0].GetTotalPosicionesPorTipo('valida')).toBe(15);
        });

        it("Cada columna tiene un rango de valores predeterminado", function() {
            for (var i = 0; i < juego.GetCartonesVendidos()[0].GetCuadricula().length; i++) {
                for (var j = 0; j < juego.GetCartonesVendidos()[0].GetCuadricula()[i].length; j++) {
                    if (juego.GetCartonesVendidos()[0].GetPosiciones(i, j) === 1) {
                        expect(juego.GetCartonesVendidos()[0].GetCuadricula()[i][j]).toBeGreaterThan(juego.GetCartonesVendidos()[0].GetRango('inicio', i)-1);
                        expect(juego.GetCartonesVendidos()[0].GetCuadricula()[i][j]).toBeLessThan(juego.GetCartonesVendidos()[0].GetRango('fin', i)+1);
                    } else {
                        expect(juego.GetCartonesVendidos()[0].GetCuadricula()[i][j]).toBe(0);
                    }
                }
            }
        })
    })
});



