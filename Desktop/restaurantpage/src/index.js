import section_one from './home';
import section_two from './menu';
const content = document.getElementById('content') 

function changeDisplay(func){
    console.log('yo')
    content.innerHTML = '';
    func();
}
const home = document.querySelector('.home');
const menu = document.querySelector('.menu');
const about = document.querySelector('.about');
home.addEventListener('click', () => changeDisplay(section_one))
menu.addEventListener('click', () => changeDisplay(section_two))
// about.addEventListener('click', () => changeDisplay(section_three))