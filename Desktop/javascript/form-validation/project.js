const emailField = document.getElementById('email')
const countryField = document.getElementById('country')
const zipcodeField = document.getElementById('zipcode')
const passwordField = document.getElementById('password')
const confirmPasswordField = document.getElementById('confirmPassword')
const form = document.querySelector('form')


const onClickOutside = (element, callback) => {
    document.addEventListener('click', e => {
      if (!element.contains(e.target)) callback();
    });
  };

onClickOutside(passwordField, function(){
    passwordField.innerHTML = ''
});

passwordField.addEventListener('click', function(){
    if(this.children.length == 0){
        const errorMessage = document.createElement('div')
        errorMessage.classList.add('errorMessage')
        passwordField.appendChild(errorMessage)
    }
    
})

function checkPasswordCorrectness(password){
    if(!/[A-Z]/.test(password)){
        return 'Password required to have at least one capital letter'
    }else if(!/[1-9]/.test(password)){
        return 'Password required to have at least one digit'
    }else if(!/[^\w\s]/.test(password)){
        return 'Password required to have at least one special character'
    }else{
        return true
    }

}

function checkPasswordValidity(password){
    if(password.length < 10){
        return "Password's too short"
    }else{
        const passwordCorrectness = checkPasswordCorrectness(password)
        return passwordCorrectness
    }
}

function showEmailError(){
    if(emailField.validity.valueMissing){
        emailField.setCustomValidity('This field is required')
    }else if(emailField.validity.typeMismatch){
        emailField.setCustomValidity('Please enter a valid email')
    }else{
        emailField.setCustomValidity('')
    }
};

function showCountryError(){
    console.log(countryField.value);
    if(countryField.validity.valueMissing){
        countryField.setCustomValidity('This field is required')
    }else if(countryField.validity.patternMismatch){
        countryField.setCustomValidity('Please enter a valid country')
        console.log('invalid country')
    }else{
        countryField.setCustomValidity('')
    }
};

function showZipcodeError(){
    if(zipcodeField.validity.valueMissing){
        zipcodeField.setCustomValidity('This field is required')
    }else{
        zipcodeField.setCustomValidity('')
    }
}



form.addEventListener('submit', function(event){
    const passwordCorrectness = checkPasswordValidity(passwordField.value)
    if (passwordCorrectness == true){
    passwordField.setCustomValidity('')
    event.preventDefault()
    }

    if (!emailField.validity.valid) {
        showEmailError();
        event.preventDefault();
        console.log('email wrong')
    } else if (!countryField.validity.valid) {
        showCountryError();
        event.preventDefault();
        console.log('country wrong')
    } else if (!zipcodeField.validity.valid) {
        showZipcodeError();
        event.preventDefault();
        console.log('zipcode wrong')
    } else if (passwordCorrectness != true){
        passwordField.setCustomValidity(passwordCorrectness)
        event.preventDefault();
        console.log('password wrong')
    }else if (confirmPasswordField.validity.valueMissing){
        confirmPasswordField.setCustomValidity('This field is required')
        event.preventDefault();
        console.log('confirm password wrong')
    }else if (passwordField.value != confirmPasswordField.value){
        confirmPasswordField.setCustomValidity("Passwords don't match")
        event.preventDefault();
        console.log('confirm password wrong')
    }else{
        emailField.setCustomValidity('');
        countryField.setCustomValidity('');
        zipcodeField.setCustomValidity('');
        passwordField.setCustomValidity('');
        confirmPasswordField.setCustomValidity('');
        form.submit()
    }
    
});

emailField.addEventListener('input', function() {
    emailField.setCustomValidity('');
});

countryField.addEventListener('input', function() {
    countryField.setCustomValidity('');
});

zipcodeField.addEventListener('input', function() {
    zipcodeField.setCustomValidity('');
});

passwordField.addEventListener('input', function() {
    passwordField.setCustomValidity('');
});

confirmPasswordField.addEventListener('input', function() {
    confirmPasswordField.setCustomValidity('');
});