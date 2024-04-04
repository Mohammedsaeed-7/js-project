let username = document.querySelector(".section-form #username");
let phone = document.querySelector(".section-form #phone");
let email = document.querySelector(".section-form #email");
let password = document.querySelector(".section-form #password");
let submit = document.querySelector(".section-form #submit")

submit.addEventListener("click", function (e) {

    let users = [];
    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
    }

    e.preventDefault();
    if (username.value === "" || phone.value === "" || email.value === "" || password.value === "") {
        alert("please complete the form")
    } else if (password.value.length < 8) {
        alert("The Password must be at least 8 characters")
    } else {
        let user = {
            username: username.value.trim(),
            phone: phone.value.trim(),
            email: email.value.trim(),
            password: password.value.trim()
        }
        users.push(user)
        localStorage.setItem("users", JSON.stringify(users));
        setTimeout(() => {
            window.location = "login.html"
        }, 1500)
    }
})