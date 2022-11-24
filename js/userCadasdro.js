const formE1 = document.getElementById('form-api');

formE1.addEventListener('submit', evento =>{
  evento.preventDefault();

  const formData = new FormData(formE1);
  const data = Object.fromEntries(formData);

  fetch( 'http://adotemeau-env.eba-4y3afswp.us-east-1.elasticbeanstalk.com/user', {
    method: 'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(document.getElementById('form-api').reset())
  .then(window.location.href="#paralogin")
})