////////// SCROLL TO TOP //////////
const scrollTopBtn = document.querySelector(".scrollToTop-Btn");

window.addEventListener("scroll", function () {
  scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

////////// CONTACT //////////
const contactSection = document.querySelector(".contact")
const form = document.querySelector("#form");
const inputs = document.querySelectorAll("#form input");

const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const textarea = document.getElementById("textarea");

const alertName = document.getElementById("alert-name");
const alertEmail = document.getElementById("alert-email");
const alertTextarea = document.getElementById("alert-textarea");

const modalContact = document.getElementById("modal-contact");
const modalContactLoader = document.getElementById("modal-contact-loader");
const modalContactSuccess = document.getElementById("modal-contact-success");
const modalContactError = document.getElementById("modal-contact-error");
const closeModalContact = document.querySelectorAll(".close-modal-contact");

/* Regular Expressions */
const expName = /^[\S][\DÀ-ÿ\s]{1,30}$/;
const expEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expMessage = /^[\S][0-9a-zA-ZÀ-ÿ\s\,.¡!¿?]{3,1000}$/;

const campos = {
  nombre: false,
  correo: false,
  mensaje: false
}

/* Validate Regular Expressions */
function validateRegularExpressions(e) {
  
  const check = e.target.parentElement.querySelector('.check');
  
  switch (e.target.id) {

    case "input-name":
      if (expName.test(e.target.value)) {
        alertName.classList.remove("active");
        check.classList.add("active");
        campos.nombre = true;
      }
      else {
        alertName.classList.add("active");
        check.classList.remove("active");
        campos.nombre = false;
      }
      break;

    case "input-email":
      if (expEmail.test(e.target.value)) {
        alertEmail.classList.remove("active");
        check.classList.add("active");
        campos.correo = true;
      }
      else {
        alertEmail.classList.add("active");
        check.classList.remove("active");
        campos.correo = false;
      }
      break;

    case "textarea":
      if (expMessage.test(e.target.value)) {
        alertTextarea.classList.remove("active");
        check.classList.add("active");
        campos.mensaje = true;
      }
      else {
        alertTextarea.classList.add("active");
        check.classList.remove("active");
        campos.mensaje = false;
      }
      break;
  }
}

/* Replace white spaces on the input email */
inputEmail.addEventListener("input", () => {
  inputEmail.value = inputEmail.value.replace(/ /g, "");
})

/* Inputs events */
inputs.forEach((input) => {
  input.addEventListener('input', validateRegularExpressions);
  input.addEventListener('blur', validateRegularExpressions);
});

/* Textarea events */
textarea.addEventListener('input', validateRegularExpressions);
textarea.addEventListener('blur', validateRegularExpressions);

/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!campos.nombre) {
    alertName.classList.add('active');
    location.href = "#form";
  }

  if (!campos.correo) {
    alertEmail.classList.add('active');
    location.href = "#form";
  }

  if (!campos.mensaje) {
    alertTextarea.classList.add('active');
    location.href = "#form";
  }

  if (campos.nombre && campos.correo && campos.mensaje) {

    modalContact.classList.add("active");

    emailjs.sendForm('service_ba4mobo', 'template_gvxrhty', '#form', 'hUS51mu8VJq2dQccV').then(() => {
      setTimeout(() => {
        modalContactLoader.style.display = "none";
        modalContactSuccess.style.display = "block";
        form.reset();
      }, 3000);
    },

      (error) => {
        setTimeout(() => {
          modalContactLoader.style.display = "none";
          modalContactError.style.display = "block";
          form.reset();
        }, 3000);
        console.log(error);
      })
  }
});

////////// CLOSE MODAL CONTACT //////////
closeModalContact.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.remove("active");
    location.href = "index.html"
  })
});