const email = document.getElementById("mail");

email.addEventListener("input", (event) => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an email address!");
  } else {
    email.setCustomValidity("");
  }
});

const form = document.querySelector('form')
form.addEventListener('submit', (event) => {
    email.setCustomValidity('testing yo')
    event.preventDefault()
})