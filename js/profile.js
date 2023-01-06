// Solicitação GET.
fetch('http://http://localhost:8080/')
    // Tratamento do sucesso
    .then(response => response.json())  // converter para json
    .then(json => console.log(json))    //imprimir dados no console
    .catch(err => console.log('Erro de solicitação', err)); // lidar com os erros por catch