
redirectIfUserLogged();

const formE = document.getElementById('form-login');
const formE1 = document.getElementById('form-api');

formE.addEventListener('submit', evento => {
  evento.preventDefault();

  //Monta Objeto a partir do formulario
  const userLogin = {
    email: document.getElementById('email_login').value,
    password: document.getElementById('senha_login').value
  }
  //Cadastra USER
  fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/api/v1/auth/authenticate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userLogin)
  })
    .then(response => {

      if (response.status == '403') {

        const divMessage = document.getElementById('flash-message');
        divMessage.classList.add('alert');
        divMessage.classList.add('alert-danger');
        const message = document.createElement('h4');
        message.textContent = 'Email ou senha invalidos!';
        divMessage.appendChild(message);

      }

      if (response.status != 403) {

        response.json()
          .then(json => {
            localStorage.jwt = json.token;
          });

        getUserByJwt();
        userLocalStorage = JSON.parse(localStorage.getItem('user'));
        window.location.href = "/userProfile.html?" + userLocalStorage.id;
      }
    })
})


formE1.addEventListener('submit', evento => {
  evento.preventDefault();

  //Monta Objeto a partir do formulario
  const user = {
    id: null,
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  }
  //Cadastra USER
  fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/api/v1/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  })
    .then(response => response.json())// converte para json
    .then(json => {

      localStorage.jwt = json.token;
      getUserByJwt();
      userLocalStorage = JSON.parse(localStorage.getItem('user'));

      const user_address = {
        city: document.getElementById('city').value,
        district: document.getElementById('district').value,
        state: document.getElementById('state').value,
        user: {
          id: userLocalStorage.id,
        }
      }

      //Envia endereço com retorno da API
      fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/user-address', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user_address)
      })
        .then(document.getElementById('form-api').reset())
    })
    .then(window.location.href = "#paralogin")
})


async function getUserByJwt() {

  jwt = localStorage.getItem('jwt');
  if (jwt != null) {

    const response = await fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/api/v1/auth/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.jwt}`,
      }
    })
      .then(response => {
        return response.json().then(json => {

          user = {
            'id': json.id,
            'nome': json.name,
            'email': json.email,
          };

          localStorage.user = JSON.stringify(user);
          return user;
        })

      })

    return response;
  }
}

function redirectIfUserLogged() {

  getUserByJwt();
  userLocalStorage = JSON.parse(localStorage.getItem('user'));
  if (userLocalStorage != null) {
    window.location.href = "/userProfile.html?" + userLocalStorage.id;
  }

}