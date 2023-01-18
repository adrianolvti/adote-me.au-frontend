
// busca dados do usuario
function createSetInformationUserProfile() {

  userLocalStorage = JSON.parse(localStorage.getItem('user'));

  const perfilUsuarioDiv = document.getElementById('perfil-usuario');

  const cod = document.createElement('h4');
  cod.textContent = 'Cod: ' + userLocalStorage.id;

  const nome = document.createElement('h4');
  nome.textContent = 'Nome: ' + userLocalStorage.nome;

  const email = document.createElement('h4');
  email.textContent = 'Email: ' + userLocalStorage.email;

  perfilUsuarioDiv.appendChild(cod);
  perfilUsuarioDiv.appendChild(nome);
  perfilUsuarioDiv.appendChild(email);
}

// Solicitação GET animais.
fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/all-by-user', {
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
    table = createTableAndHeader(['Cod', 'Nome', 'Raça', 'Adotado', '-']);

    json.forEach(animal => {
      let line = newLineTable(animal);
      table.appendChild(line);
    });

    tableDiv.append(table)

  })


function createTableAndHeader(headers) {


  let table = document.createElement("table");
  table.classList.add('table');

  let thead = document.createElement("thead");

  headers.forEach(header => {
    let th = document.createElement("th");
    th.textContent = header;
    thead.append(th);
  });

  table.append(thead)

  return table;
}

function patchAdoted(idAnimal, adoted) {

  fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/adopted/' + idAnimal + '/' + adoted, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.jwt}`,
    }
  });
}

function newLineTable(animal) {
  let line = document.createElement("tr");
  let tdId = document.createElement("td");
  let tdName = document.createElement("td");
  let tdBreedType = document.createElement("td");
  let tdAdopted = document.createElement("td");

  let tdAdoptedAction = document.createElement("td");
  let aAdopted = document.createElement("a");
  aAdopted.classList.add('btn');
  aAdopted.classList.add('btn-success');
  aAdopted.classList.add('text-dark');
  aAdopted.setAttribute('onClick', 'patchAdoted('+animal.id+',true)');
  aAdopted.textContent = 'Adotado';

  let aNotAdopted = document.createElement("a");
  aNotAdopted.classList.add('btn');
  aNotAdopted.classList.add('btn-danger');
  aNotAdopted.classList.add('text-dark');
  aNotAdopted.setAttribute('onClick', 'patchAdoted('+animal.id+',false)');
  aNotAdopted.textContent = 'Não Adotado';

  tdAdoptedAction.appendChild(aAdopted);
  tdAdoptedAction.appendChild(aNotAdopted);


  tdId.innerHTML = animal.id;
  tdName.innerHTML = animal.name;
  tdBreedType.innerHTML = animal.breed.type;
  tdAdopted.innerHTML = animal.adopted;

  line.appendChild(tdId);
  line.appendChild(tdName);
  line.appendChild(tdBreedType);
  line.appendChild(tdAdopted);
  line.appendChild(tdAdoptedAction);

  return line;
}

createSetInformationUserProfile();