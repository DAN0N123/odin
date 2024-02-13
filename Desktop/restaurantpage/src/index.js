import section_one from './home';
import section_two from './menu';
import section_three from './about';

const content = document.getElementById('content') 
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
function changeDisplay(func){
    content.innerHTML = '';
    const main_div = document.getElementById('content');
    const bigbox = func();
    main_div.appendChild(bigbox);
    fade_in(bigbox)
}
const home = document.querySelector('.home');
const menu = document.querySelector('.menu');
const about = document.querySelector('.about');
home.addEventListener('click', () => changeDisplay(section_one))
menu.addEventListener('click', () => changeDisplay(section_two))
about.addEventListener('click', () => changeDisplay(section_three))