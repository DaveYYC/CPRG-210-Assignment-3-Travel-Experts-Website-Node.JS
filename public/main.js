

fetch('http://localhost:3000/api/destinations')
  .then(function(response){
    return response.json();
  })
  .then(function(destinations){

  const imgList = destinations;

  let imgTemplate = ''; 

  const gallery = document.querySelector('.gallery'); 

  imgList.forEach(function(item){
    imgTemplate += 
      `<figure>
        <a href="${item.id}">
          <img src="https://picsum.photos/id/${item.id}/250" alt="${item.description}">
          <figcaption>Click for tourism info about ${item.title}</figcaption>
        </a>
      </figure>`
  });
    gallery.innerHTML = imgTemplate;
});



 

























