import './menu.css';
import pizza_image from './pizza_pie.jpg';
import mozzarella_sticks_image from './mozzarella_sticks.jpg'
import gelato_image from './gelato.jpg'
function make_menu_item(name, description, price, img){
    const menu_item = document.createElement('div');
    menu_item.classList.add('menu_item');
    const menu_item_image = document.createElement('img');
    menu_item_image.src = img;
    menu_item_image.style.width = '200px'
    menu_item.appendChild(menu_item_image);
    const menu_item_info = document.createElement('div');
    const menu_item_name = document.createElement('h1');
    menu_item_name.textContent = name;
    const menu_item_description = document.createElement('p');
    menu_item_description.textContent = description;
    const menu_item_price = document.createElement('h2');
    menu_item_price.textContent = '$' + price;
    menu_item_info.appendChild(menu_item_name);
    menu_item_info.appendChild(menu_item_description);
    menu_item_info.appendChild(menu_item_price);
    menu_item.appendChild(menu_item_info);
    return menu_item
}
function section_two(){
    const bigbox = document.createElement('div');
    bigbox.setAttribute('id', "bigbox_menu");
    bigbox.classList.add('bigbox');
    const pizza = make_menu_item('Pizza', 'Freshly made pizza with highest quality Ventriciliana Piccante salami and San Marzano tomatoes', '19', pizza_image);
    const mozzarella_sticks = make_menu_item('Mozzarella sticks', 'Delightfully crispy served with sweet marinara sauce', '6', mozzarella_sticks_image);
    const gelato = make_menu_item('Gelato', 'Handmade from high quality whole milk, sugar, and various fresh fruits', '4', gelato_image);
    bigbox.appendChild(pizza)
    bigbox.appendChild(mozzarella_sticks)
    bigbox.appendChild(gelato)
    bigbox.style.opacity = 0;
    return bigbox
}

export default section_two