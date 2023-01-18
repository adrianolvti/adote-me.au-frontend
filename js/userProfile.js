// Solicitação GET.
fetch('http://localhost:8080/animal/all-by-user', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.jwt}`,
  }
})

  // Tratamento do sucesso
  .then(response => response.json())  // converter para json
  .then(json => {
    
    const tableDiv = document.getElementById('table');
    table = createTableAndHeader(['Cod', 'Nome', 'Raça', 'Adotado']);

    json.forEach(animal => {
      let line = newLineTable(animal);
      table.appendChild(line);
    });
    
    tableDiv.append(table)
    
  })    //imprimir dados no console
// .catch(err => console.log('Erro de solicitação', err)); // lidar com os erros por catch


function createTableAndHeader(headers) {
 

  let table =  document.createElement("table");
  table.classList.add('table');

  let thead =  document.createElement("thead");

  headers.forEach(header => {
    console.log(header);
    let th = document.createElement("th");
    th.textContent = header;
    thead.append(th);
  });

  table.append(thead)
  
  return table;  
}



// function allAnimals(url) {
//     let request = new XMLHttpRequest();
//     request.open("GET", url, false);
//     request.send();
//     return request.responseText;
// }

function newLineTable(animal) {
  let line = document.createElement("tr");
  let tdId = document.createElement("td");
  let tdName = document.createElement("td");
  let tdBreedType = document.createElement("td");
  let tdAdopted = document.createElement("td");


  tdId.innerHTML = animal.id;
  tdName.innerHTML = animal.name;
  tdBreedType.innerHTML = animal.breed.type;
  tdAdopted.innerHTML = animal.adopted;


  line.appendChild(tdId);
  line.appendChild(tdName);
  line.appendChild(tdBreedType);
  line.appendChild(tdAdopted);


  return line;
}

// function main() {
//   let data = allAnimal("https://localhost:8080/animal");
//   let animals = JSON.parse(data);
//   let table = document.getElementById("table");

//   animals.forEach(animal => {
//     let line = newLineTable(animal);
//     table.appendChild(line);
//   });
// }

// main()