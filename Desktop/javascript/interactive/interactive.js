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


function showSlide(slideIndex){
    console.log(slideIndex)
    const slides = document.querySelectorAll('img')
    for(const slide of slides){
        console.log(slide)
        if(!slide.classList.contains('hideSlide')){
            setTimeout( () => slide.classList.add('hideSlide'), 200)
            
        }
        if(slide.id == slideIndex){
            setTimeout( () => slide.classList.remove('hideSlide'), 200)
            setTimeout( () => slide.classList.add('show'), 200)
            continue
        }
        setTimeout( () => slide.classList.remove('show'), 200)
        
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
