/////Busca no BD o nome do animal, idade, cidade, estado//////
//////////////////////////////////////////////////////////////
fetch('http://localhost:8080/animal')
    .then(response => response.json())
    .then(data => {
        data.forEach(animal => {
            const app = document.getElementById('root');

            const block = document.createElement('blockquote');
            if(animal.profileImage == null ){
                block.setAttribute('data-id', 'ygf81Ww');//caso não tenha imagem mostra imagem padrão

            }else{
                block.setAttribute('data-id', animal.profileImage.imgurId);
            }
            block.setAttribute('class', 'imgur-embed-pub');
            block.setAttribute('width', '3px');
            block.setAttribute('height', '3px');

            const script = document.createElement('script');
            script.src='//s.imgur.com/min/embed.js';

            const left_image = document.createElement('div');
            left_image.setAttribute('class', 'left-image');
            
            const aga4 = document.createElement('h4');
            aga4.textContent = animal.name;

            const aga6 = document.createElement('h6');
            aga6.textContent = animal.description;

            const outroaga6 = document.createElement('h6');
            outroaga6.textContent = animal.physicalCharacteristics;

            const right_content = document.createElement('div');
            right_content.setAttribute('class', 'right-content align-self-center');

            const listItem = document.createElement('div');
            listItem.setAttribute('class', 'listing-item');

            const col12 = document.createElement('div');
            col12.setAttribute('class', 'col-lg-12');

            const row = document.createElement('div');
            row.setAttribute('class', 'row');

            const item = document.createElement('div');
            item.setAttribute('class', 'item');

            left_image.appendChild(block);
            left_image.appendChild(script);
            right_content.appendChild(aga4); //coloca elemento h4 dentro de rigth_content
            right_content.appendChild(aga6); //coloca elemento h6 dentro de rigth_content
            right_content.appendChild(outroaga6); //coloca elemento h6 dentro de rigth_content
            listItem.appendChild(left_image);//coloca elemento left-image dentro de listItem
            listItem.appendChild(right_content);//coloca elemento right-content dentro de listItem
            col12.appendChild(listItem);//coloca elemento listItem dentro de col12
            row.appendChild(col12);//coloca elemento col12 dentro de row
            item.appendChild(row);//coloca elemento row dentro de item
            app.appendChild(item);
        })
    })
    .catch(err => {
        console.log(err)
    });