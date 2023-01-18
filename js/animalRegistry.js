const formRegistry = document.getElementById('form-registry');

formRegistry.addEventListener('submit', evento => {
  evento.preventDefault();

  //Monta Objeto a partir do formulario
  const animal = {
    "name": document.getElementById('nome_apelido').value,
    "description": document.getElementById('historia_descricao').value,
    "age": document.getElementById('idade').value,
    "physicalCharacteristics": document.getElementById('caracteristicas_fisicas').value,
    "specialNeeds": document.getElementById('necessidade_especial').value,
    "sex": document.getElementById('sexo').value,
    "breed": {
      "id": document.getElementById('raca').value
    },
    "family": {
      "id": document.getElementById('familia').value
    },
    "temperaments": [
      { "id": document.getElementById('temperamento').value }
    ]
  }
  //Cadastra Animal
  fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.jwt}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(animal)
  })
    .then(response => {

      if (response.status == '201') {

        response.json()
          .then(json => {
            window.location.href = "/animalProfile.html?" + json.id
          });

      }
    })

})

function setSelectTemperamento() {
  var data = findAll('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/temperament/find?status=1'),
    select = document.getElementById('temperamento');
  temperamentos = JSON.parse(data);

  temperamentos.forEach(temperamento => {

    var opt = document.createElement('option');
    opt.value = temperamento.id;
    opt.innerHTML = temperamento.type;
    select.appendChild(opt);
  });

}

function setSelectRaca() {
  var data = findAll('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/breed/find?status=1'),
    select = document.getElementById('raca');
  racas = JSON.parse(data);

  racas.forEach(raca => {

    var opt = document.createElement('option');
    opt.value = raca.id;
    opt.innerHTML = raca.type;
    select.appendChild(opt);
  });

}

function setSelectFamilia() {
  var data = findAll('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/family/find?status=1'),
    select = document.getElementById('familia');
  familias = JSON.parse(data);

  familias.forEach(familia => {

    var opt = document.createElement('option');
    opt.value = familia.id;
    opt.innerHTML = familia.type;
    select.appendChild(opt);
  });

}

function findAll(url) {

  let request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send();
  return request.responseText;
}

setSelectTemperamento();
setSelectRaca();
setSelectFamilia();