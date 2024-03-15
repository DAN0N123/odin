const dropdownButton = document.querySelector('.dropdownButton');
dropdownButton.addEventListener('click', function(){
    const dropdownBody = document.querySelector('.dropdownBody')
    if(dropdownBody.classList.contains('hide')){
        dropdownBody.classList.remove('hide')
    }else{
        dropdownBody.classList.add('hide')
    }
})

let slideIndex = 1;

const buttons = document.querySelectorAll('.bottomButton')
buttons.forEach( button => {
    const index = parseInt(button.id.replace('button', ''))
    button.addEventListener('click', () => {
        showSlide(index)
        slideIndex = parseInt(index)
    })
    
})

const automaticSlider = setInterval( function(){
    if(slideIndex < 8){
        slideIndex++
    }else{
        slideIndex = 1
    }
    showSlide(slideIndex)
}, 5000)

function showSlide(slideIndex){
    console.log(slideIndex)
    buttons.forEach( button => {
        button.classList.remove('active');
        if(button.id == `button${slideIndex}`){
            button.classList.add('active')
        }
    })
    const slides = document.querySelectorAll('img')
    for(const slide of slides){
        if(slide.id == slideIndex){
            slide.classList.remove('hideSlide')
            setTimeout( () => { slide.classList.add('show') }, 20)
            continue
        }
        slide.classList.add('hideSlide')
        slide.classList.remove('show');
    }
}

const arrowLeft = document.querySelector('.arrowLeft')
arrowLeft.addEventListener('click', function(){
    if(slideIndex > 1){
        slideIndex -= 1
    }
    showSlide(slideIndex);
})

const arrowRight = document.querySelector('.arrowRight')
arrowRight.addEventListener('click', function(){
    if(slideIndex < 8){
        slideIndex += 1
    }
    showSlide(slideIndex);
})
