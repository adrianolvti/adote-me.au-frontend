/////////////////Lista dados do animal selecionado na página principal/////////////////////////////
var params = window.location.search.substring(1);

let mail;
fetch('http://adote-me-au.us-east-1.elasticbeanstalk.com/animal/' + params)
    .then(response => response.json())
    .then(data => {

        const block = document.getElementById('block');
        let imgurId = 'ygf81Ww';

        if (data.profileImage != null) {
           imgurId = data.profileImage.imgurId;
        }

        block.setAttribute('data-id', imgurId);
        const script = document.createElement('script');
        script.src='//s.imgur.com/min/embed.js';

        const perfil = document.getElementById('perfil');

        const nome = document.createElement('h4');
        nome.textContent = 'Nome: ' + data.name;

        const raca = document.createElement('h4');
        raca.textContent = 'Raça: ' + data.breed.type;

        const idade = document.createElement('h4');
        idade.textContent = 'Idade: ' + data.age + ' ano(s)';

        const carac = document.createElement('h4');
        carac.textContent = 'Características Físicas: ' + data.physicalCharacteristics;

        const desc = document.createElement('h4');
        desc.textContent = 'Descrição: ' + data.description;

        const doador = document.createElement('h4');
        doador.textContent = 'Nome do Doador: ' + data.user.name;

        const email = document.createElement('h4');
        email.textContent = 'Forma de Contato: ' + data.user.email;
        mail = data.user.email;

        perfil.appendChild(nome);
        perfil.appendChild(raca);
        perfil.appendChild(idade);
        perfil.appendChild(carac);
        perfil.appendChild(desc);
        perfil.appendChild(doador);
        perfil.appendChild(email);
        perfil.appendChild(script);
    })
    .catch(err => {
        console.log(err)
    });

function mostraEmail() {
    console.log(mail);
    document.getElementById('email').innerHTML = mail;
}