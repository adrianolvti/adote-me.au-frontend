
const formE1 = document.getElementById('form-api');

formE1.addEventListener('submit', evento =>{
  evento.preventDefault();

  //Monta Objeto a partir do formulario
  const user = {
    id: null,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value, 
    password: document.getElementById('password').value
  }
  //Cadastra USER
  fetch('http://localhost:8080/user', {
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(user)
  })
  .then(response => response.json())// converte para json
  .then(json => {
    const user_address = {
      city: document.getElementById('city').value,
      district: document.getElementById('district').value,
      state: document.getElementById('state').value,
      user: {
        id: null,
        name: "",
        email: "",
        password: null
      }
    }
    user_address.user.id = json.id,
    user_address.user.name = json.name,
    user_address.user.email = json.email
    //Envia endereço com retorno da API
    fetch('http://localhost:8080/user-address', {
      method: 'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body: JSON.stringify(user_address)
    })
    .then(document.getElementById('form-api').reset())
  })
  .then(window.location.href="#paralogin")
})

