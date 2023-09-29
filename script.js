document.addEventListener("DOMContentLoaded", function () {
    const calcularButton = document.getElementById("calcular");
    const resultadoDiv = document.getElementById("resultado");
    const consumoKwhSpan = document.getElementById("consumo-kwh");
    const costoBolivianosSpan = document.getElementById("costo-bolivianos");
    const costoAlumbradoSpan = document.getElementById("costo-alumbrado");
    const costoBasuraSpan = document.getElementById("costo-basura");
    const costoTotalSpan = document.getElementById("costo-total");

    calcularButton.addEventListener("click", function () {
        const lecturaAnterior = parseFloat(document.getElementById("lectura-anterior").value);
        const lecturaActual = parseFloat(document.getElementById("lectura-actual").value);

        if (!isNaN(lecturaAnterior) && !isNaN(lecturaActual)) {
            const consumo = lecturaActual - lecturaAnterior;
            let costo = 0;
            //  precio del rango de la energia por kwh
            const rangosEnergia = [
                { limiteSuperior: 20, tarifa: 11.275 },
                { limiteSuperior: 100, tarifa: 0.656 },
                { limiteSuperior: 200, tarifa: 0.761 },
                { limiteSuperior: 500, tarifa: 0.891 },
                { limiteSuperior: 1000, tarifa: 0.971 },
                { limiteSuperior: Infinity, tarifa: 1.372 },
            ];

            for (const rango of rangosEnergia) {
                if (consumo <= rango.limiteSuperior) {
                    costo = consumo * rango.tarifa;
                    break;
                }
            }

            // Calcular el aumento del 13% para alumbrado público
            const aumentoAlumbrado = (costo * 13.82) / 100;

            // Definir el arreglo de rangos y tarifas para la basura
            const rangosBasura = [
                { limiteSuperior: 50, tarifa: 5 },
                { limiteSuperior: 100, tarifa: 10 },
                { limiteSuperior: 150, tarifa: 18 },
                { limiteSuperior: 200, tarifa: 20 },
                { limiteSuperior: 250, tarifa: 25 },
                { limiteSuperior: 300, tarifa: 30 },
                { limiteSuperior: 350, tarifa: 35 },
                { limiteSuperior: 400, tarifa: 40 },
                { limiteSuperior: 450, tarifa: 45 },
                { limiteSuperior: 500, tarifa: 50 },
                { limiteSuperior: 600, tarifa: 60 },
                { limiteSuperior: 700, tarifa: 70 },
                { limiteSuperior: 800, tarifa: 80 },
                { limiteSuperior: 900, tarifa: 90 },
                { limiteSuperior: 1000, tarifa: 100 },
                { limiteSuperior: Infinity, tarifa: 150 },
            ];

            for (const rango of rangosBasura) {
                if (consumo <= rango.limiteSuperior) {
                    costoBasura = rango.tarifa;
                    break;
                }
            }

            // Calcular el costo total incluyendo el aumento del alumbrado público y basura
            const costoTotal = costo + aumentoAlumbrado + costoBasura;

            consumoKwhSpan.textContent = consumo.toFixed(2) + " kWh";
            costoBolivianosSpan.textContent = costo.toFixed(2) + " Bs";
            costoAlumbradoSpan.textContent = aumentoAlumbrado.toFixed(2) + " Bs";
            costoBasuraSpan.textContent = costoBasura.toFixed(2) + " Bs";
            costoTotalSpan.textContent = costoTotal.toFixed(2) + " Bolivianos";
        } else {
            resultadoDiv.innerHTML = "Por favor, ingresa lecturas válidas.";
        }
    });
});


