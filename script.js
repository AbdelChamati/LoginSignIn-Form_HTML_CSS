// Initialize the intl-tel-input plugin
const phoneInputField = document.getElementById("register-phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "DE",
    geoIpLookup: function(callback) {
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => callback(data.country))
            .catch(() => callback("de"));
    },
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
});

function validateLogin() {
    const username = document.getElementById('login-username');
    const password = document.getElementById('login-password');
    let isValid = true;

    if (username.value.trim() === '') {
        showError(username, 'Field required!!!');
        isValid = false;
    } else {
        clearError(username);
    }

    if (password.value.trim() === '') {
        showError(password, 'Field required!!!');
        isValid = false;
    } else {
        clearError(password);
    }

    if (isValid) {
        alert("You are ready to go ... Post method");
    }
}

function validateRegister() {
    const firstname = document.getElementById('register-firstname');
    const lastname = document.getElementById('register-lastname');
    const email = document.getElementById('register-email');
    const phone = document.getElementById('register-phone');
    const genderError = document.getElementById('gender-error');
    const genderInputs = document.querySelectorAll('input[name="gender"]');
    let isValid = true;

    if (firstname.value.trim() === '') {
        showError(firstname, 'Field required!!!');
        isValid = false;
    } else {
        clearError(firstname);
    }

    if (lastname.value.trim() === '') {
        showError(lastname, 'Field required!!!');
        isValid = false;
    } else {
        clearError(lastname);
    }

    if (email.value.trim() === '') {
        showError(email, 'Field required!!!');
        isValid = false;
    } else if (!validateEmail(email.value)) {
        showError(email, 'Invalid email!!!');
        isValid = false;
    } else {
        clearError(email);
    }

    if (!phoneInput.isValidNumber()) {
        showError(phone, 'Invalid phone number!!!');
        isValid = false;
    } else {
        clearError(phone);
    }

    let genderSelected = false;
    genderInputs.forEach(input => {
        if (input.checked) genderSelected = true;
    });

    if (!genderSelected) {
        genderError.textContent = 'Field required!!!';
        isValid = false;
    } else {
        genderError.textContent = '';
    }

    if (isValid) {
        alert("You are ready to go ... Post method");
    }
}

function showError(input, message) {
    const error = input.nextElementSibling;
    error.textContent = message;
    input.classList.add('input-error');
}

function clearError(input) {
    const error = input.nextElementSibling;
    error.textContent = '';
    input.classList.remove('input-error');
}

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

document.getElementById("toggle-form").addEventListener("click", function(e) {
    e.preventDefault();
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const toggleLink = document.getElementById("toggle-form");

    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
        registerForm.style.display = "none";
        toggleLink.textContent = "Register now";
    } else {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
        toggleLink.textContent = "Login";
    }
});
