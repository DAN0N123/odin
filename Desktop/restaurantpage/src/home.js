import MainImage from './pizza.jpg';
import './home.css';
function fade_in(element) {
    var op = 0.1;
    element.style.display = 'flex';
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function section_one(){
    const bigbox = document.createElement('div');
    bigbox.setAttribute('id', "bigbox_home");
    bigbox.classList.add('bigbox');
    const text = document.createElement('div');
    text.classList.add('text');
    const h2 = document.createElement('h2');
    h2.textContent = 'Felipe Pizzeria';
    text.appendChild(h2);
    const p = document.createElement('p');
    p.textContent = 'Best pizza in this part of the galaxy. Carefully selected ingredients from the heart of Sicilly, made in the heart of Brooklyn.';
    text.appendChild(p);
    p.classList.add('description');
    bigbox.appendChild(text);
    const restaurantImage = document.createElement('img');
    restaurantImage.src = MainImage;
    restaurantImage.classList.add('restaurant_image')
    bigbox.appendChild(restaurantImage);
    bigbox.style.opacity = 0;
    return bigbox;
}


export default section_one
