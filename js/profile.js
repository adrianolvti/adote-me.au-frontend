// Solicitação GET.
fetch('http://localhost:8080/animal/all-by-user')
    // Tratamento do sucesso
    .then(response => response.json())  // converter para json
    .then(json => console.log(json))    //imprimir dados no console
    .catch(err => console.log('Erro de solicitação', err)); // lidar com os erros por catch

    function allAnimals(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

function newLineTable(animal) {
    let line = document.createElement("tr");
    let tdId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdType = document.createElement("td");
    let tdAdopted = document.createElement("td");
   

    tdId.innerHTML = animal.id;
    tdName.innerHTML = animal.name;
    tdType.innerHTML = animal.type;
    tdAdopted.innerHTML = animal.adopted;
    

    line.appendChild(tdId);
    line.appendChild(tdName);
    line.appendChild(tdType);
    line.appendChild(tdAdopted);
    

    return line;
}

function main() {
    let data = allAnimal("https://localhost:8080/animal/");
    let animals = JSON.parse(data);
    let table = document.getElementById("table");

    animals.forEach(animal => {
        let line = newLineTable(animal);
        table.appendChild(line);
    });
}

main()