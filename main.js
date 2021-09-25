// URL donde acceder a los datos
const URL = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

// Acceso a los datos de forma asincrónica
fetch(URL).then(res => {
    res.json().then(datos => {
        // Objeto para contar el número de datos por evento y por transformación a ardilla
        let quantity_events = {true: 0, false: 0}
        // Obtención del elemento HTML donde insertar los eventos
        let tbodyEventos = document.getElementById("events");
        for(let i=0; i<datos.length; i++) {
            // Creación de los elementos HTML asociados a cada fila de la tabla
            let row = document.createElement("tr");
            let number = document.createElement("td");
            let events = document.createElement("td");
            let squirrel = document.createElement("td");
            // Definición del contenido y estilo de cada elemento a partir de los datos
            number.textContent = i+1;
            number.style.fontWeight = "bold";
            events.textContent = datos[i].events;
            squirrel.textContent = datos[i].squirrel;
            // Se resalta la fila de datos si presentó una transformación
            if(datos[i].squirrel === true) {
                row.style.backgroundColor = "#F9C6CB";
            }
            // Se agregan los elementos creados al elemento base del documento
            row.appendChild(number);
            row.appendChild(events);
            row.appendChild(squirrel);
            tbodyEventos.appendChild(row);

            // Se actualiza el conteo de eventos
            for(let j=0; j<datos[i].events.length; j++) {
                if(!quantity_events[datos[i].events[j]]) {
                    quantity_events[datos[i].events[j]] = {true: 0, false: 0};
                }
                quantity_events[datos[i].events[j]][datos[i].squirrel] += 1
            }
            quantity_events[datos[i].squirrel] += 1
        }

        // Se calcula la correlación por evento a partir del objeto de conteos
        let corrs = [];
        for(let ev in quantity_events) {
            if(ev!=='true' && ev!=='false') {
                FN = quantity_events[ev][false];
                TN = quantity_events[false] - FN;
                TP = quantity_events[ev][true];
                FP = quantity_events[true] - TP;
                MCC = ((TP*TN)-(FP*FN)) / Math.sqrt((TP+FP)*(TP+FN)*(TN+FP)*(TN+FN))
                corrs.push([ev, MCC])
            }
        }
        // Se ordenan de forma descendente las correlaciones por evento
        corrs.sort((a,b)=>b[1]-a[1]);

        // Obtención del elemento HTML donde insertar las correlaciones
        let tbodyCorr = document.getElementById("corr");
        for(let i=0; i<corrs.length; i++) {
            // Creación de los elementos HTML asociados a cada fila de la tabla
            let row = document.createElement("tr");
            let number = document.createElement("td");
            let event = document.createElement("td");
            let correlation = document.createElement("td");
            // Definición del contenido y estilo de cada elemento a partir de los datos
            number.textContent = i+1;
            number.style.fontWeight = "bold";
            event.textContent = corrs[i][0];
            correlation.textContent = corrs[i][1]
            // Se agregan los elementos creados al elemento base del documento
            row.appendChild(number);
            row.appendChild(event);
            row.appendChild(correlation);
            tbodyCorr.appendChild(row);
        }
    })
});