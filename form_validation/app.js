console.log("this is form validation html");

const name = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const message = document.getElementById("message");
const alert = document.getElementById("alert");
let validname = false;
let validemail = false;
let validphone = false;
// console.log(name,email,phone,alert)

name.addEventListener("blur", () => {
  console.log("name is blurred");
  let name_regex = /^[a-zA-Z0-9]{4,15}$/;
  let name_str = name.value;
  if (name_regex.test(name_str)) {
    console.log("valid");
    name.classList.remove("is-invalid");
    validname = true;
  } else {
    console.log("invalid");
    name.classList.add("is-invalid");
    validname = false;
  }
});

email.addEventListener("blur", () => {
  console.log("email is blurred");
  let email_regex = /^[a-zA-Z0-9]{2,20}@[a-z]{1,5}\.[a-z]{1,4}$/;
  let email_str = email.value;
  console.log(email_regex, email_str);
  if (email_regex.test(email_str)) {
    console.log("valid");
    email.classList.remove("is-invalid");
    validemail = true;
  } else {
    console.log("invalid");
    email.classList.add("is-invalid");
    validemail = false;
  }
});

phone.addEventListener("blur", () => {
  console.log("phone is blurred");
  let phone_regex = /^[0-9]{10}$/;
  let phone_str = phone.value;
  console.log(phone_regex, phone_str);
  if (phone_regex.test(phone_str)) {
    console.log("valid");
    phone.classList.remove("is-invalid");
    validphone = true;
  } else {
    console.log("invalid");
    phone.classList.add("is-invalid");
    validphone = false;
  }
});

const submitbtn = document.getElementById("submitbtn");
submitbtn.addEventListener("click", () => {
  if (validname && validemail && validphone) {
    console.log("submitting your form");
    alert.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success !</strong>Phone, email and user are valid. Form Submitted.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
          `;
    name.value = "";
    email.value = "";
    phone.value = "";
    message.value = "";
    validphone = false;
    validname = false;
    validemail = false;
  } else {
    console.log("Cannot Submit form");
    alert.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Something Went Wrong ! </strong>One of the phone, email or user are not valid. Hence not submitting the form. Please correct the errors and try again
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div>
            `;
  }
});
