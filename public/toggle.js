


const button = document.querySelector('.btn');
const menu = document.querySelector('nav ul');

function eventHandler() {
    
  menu.classList.toggle('visible');
}

button.addEventListener('click', eventHandler);



