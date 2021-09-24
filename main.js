const URL = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"

fetch(URL).then(res => {
    res.json().then(datos => {

        let tbodyEventos = document.getElementById("events");
        for(let i=0; i<datos.length; i++) {
            console.log(datos[i]);
            let row = document.createElement("tr");
            let number = document.createElement("td");
            let events = document.createElement("td");
            let squirrel = document.createElement("td");

            number.textContent = i+1;
            number.style.fontWeight = "bold";
            events.textContent = datos[i].events;
            squirrel.textContent = datos[i].squirrel;
            if(datos[i].squirrel === true) {
                row.style.backgroundColor = "#F9C6CB";
            }

            row.appendChild(number);
            row.appendChild(events);
            row.appendChild(squirrel);
            tbodyEventos.appendChild(row);
        }
    })
})