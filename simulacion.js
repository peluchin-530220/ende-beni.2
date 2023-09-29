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
        const precioEnergia = parseFloat(document.getElementById("precio-energia").value);
        const porcentajeAlumbrado = parseFloat(document.getElementById("porcentaje-alumbrado").value);
        const tarifaBasura = parseFloat(document.getElementById("tarifa-basura").value);

        if (!isNaN(lecturaAnterior) && !isNaN(lecturaActual)) {
            const consumo = lecturaActual - lecturaAnterior;
            let costo = 0;

            // Calcular el costo de la energía personalizado
            costo = consumo * precioEnergia;

            // Calcular el aumento del alumbrado público personalizado
            const aumentoAlumbrado = (costo * porcentajeAlumbrado) / 100;

            // Calcular el costo de la basura personalizado
            let costoBasura = 0;
            if (!isNaN(tarifaBasura)) {
                costoBasura = tarifaBasura;
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
