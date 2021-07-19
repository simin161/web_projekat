var logInModal = document.getElementById("logInModal");

// Get the button that opens the modal
var btnLogInOpen = document.getElementById("logInOpenModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btnLogInOpen.onclick = function() {
  logInModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  logInModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == logInModal) {
    logInModal.style.display = "none";
  }
}

var registerModal = document.getElementById("registerModal");

// Get the button that opens the modal
var btnRegisterOpen = document.getElementById("registerOpenModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the modal 
btnRegisterOpen.onclick = function() {
  registerModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  registerModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
}