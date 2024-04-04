let username1 = document.querySelector(".section-form #username");
let password1 = document.querySelector(".section-form #password");
let loginBtn1 = document.querySelector(".section-form #submit");

let users = [];
let index = -1;

loginBtn1.addEventListener("click", function (e) {
    e.preventDefault()

    if (localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"));
        if (username1.value === "" || password1.value === "") {
            alert("please complete the form")
        } else {

            let user
            users.forEach((u, i) => {
                if (u.username.trim() === username1.value.trim() && u.password.trim() == password1.value.trim()) {
                    index = i;
                    user = u;
                }
            });
            console.log(user)
            if (user) {
                localStorage.setItem("userName", user.username)
                localStorage.setItem("index", index)
                setTimeout(() => {
                    window.location = "index.html";
                }, 1500)
            } else {
                alert("The username or password is incorrect !")
            }
        }
    } else {
        alert("you must sign up first")
    }

})