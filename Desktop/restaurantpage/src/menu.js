import './menu.css';

function section_two(){
    const main_div = document.getElementById('content');
    const bigbox = document.createElement('div');
    bigbox.classList.add('bigbox')
    const div1 = document.createElement('div');
    div1.classList.add('div');
    bigbox.appendChild(div1);
    const div2 = document.createElement('div');
    div2.classList.add('div');
    bigbox.appendChild(div2);
    const div3 = document.createElement('div');
    div3.classList.add('div');
    bigbox.appendChild(div3);
    const div4 = document.createElement('div');
    div4.classList.add('div');
    bigbox.appendChild(div4);
    const div5 = document.createElement('div');
    div5.classList.add('div');
    bigbox.appendChild(div5);
    main_div.appendChild(bigbox)
}

export default section_two