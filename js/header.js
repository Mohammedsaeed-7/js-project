let Login_header = document.querySelector("header .header-content .nav")

isTrue = () => {
    return `
             <ul id="links">
                        <li><a href="index.html" >Home</a></li>
                        <li><a href="login.html">Sign In</a></li>
                        <li><a href="register.html">Sign Up</a></li>
             </ul>`

}
isFalse = () => {
    return `
                <ul id="user_info">
                    <li><a href="index.html" >Home</a></li>
                    <li>
                        <div  class="shopping_cart">
                             <i class="fas fa-shopping-cart"></i>
                            <span id="badge">0</span>
                        </div>
                        <div id="carts-products">
                            <div class="c-bag"></div>
                            <a href="cart.html">View All products</a>
                        </div>
                    </li>
                    <li><a href="#" id="user"></a></li>
                    <li><a href="login.html" id="logout" onclick="logout()">Log out</a></li>
                </ul>`
}
Login_header.innerHTML = isTrue();
let userName = localStorage.getItem('userName');
if (userName) {
    Login_header.innerHTML = isFalse();
}

function logout() {
    localStorage.removeItem("userName");
    localStorage.setItem("index",null)
    setTimeout(() => {
        window.location = "index.html";
    }, 400)
}
let userData = document.querySelector("#user_info #user")

if (localStorage.getItem("userName")) {
    userData.innerHTML = localStorage.getItem("userName");
}

////////////////////////////////////////////////////////////////
let bag = document.querySelector("header .shopping_cart")
let bag_show = document.getElementById("carts-products")
let CartBag = document.querySelector("header .c-bag")
const Productbag = () => {

    if (localStorage.getItem("index")) {
        index = +localStorage.getItem("index");

        if (localStorage.getItem("carts")) {
            carts = JSON.parse(localStorage.getItem("carts"));
        }
        if (carts[index]) {
        } else { carts.push([]); }
        if (localStorage.getItem("fav_products")) {
            fav_products = JSON.parse(localStorage.getItem("fav_products"));
        }
        if (fav_products[index]) {
        } else fav_products.push([]);
    }

    carts[index].map((item) => {
        if (item.count == 0) {
            carts[index].splice(carts[index].findIndex(p => p.id == item.id), 1);

        } localStorage.setItem("carts", JSON.stringify(carts));
    })
    let product = carts[index].map((item) => {

        return `
                 <div class="bagItem">
                 <div class="cart-sell">
                        <i class="fas fa-plus fff" name="${item.id}"></i>
                        <p>${item.count}</p>
                        <i class="fas fa-minus fff" name="${item.id}"></i>
                    </div>
                    <b>${item.name}</b>
                 </div>
        `
    })
    CartBag.innerHTML = product.join(" ");

    let badge = document.querySelector("#user_info #badge")
    badge.innerHTML = carts[index].length;
    badge.innerHTML = carts[index].length;

    var cart_fff = document.querySelectorAll(".cart-sell .fff")
    cart_fff.forEach((z) => {
        z.onclick = function () {
            let id = z.getAttribute("name")
            let op = carts[index][carts[index].findIndex(p => p.id == id)];
            if (z.className === "fas fa-plus fff") {
                op.count++;
            } else op.count--;
            op.TotalPrice = op.count * op.price

            carts[index].map((item) => {
                if (item.count == 0) {
                    carts[index].splice(carts[index].findIndex(p => p.id == item.id), 1);
                }
            })
            localStorage.setItem("carts", JSON.stringify(carts));
            Productbag();

            ProductItem();

        }

    })

}
Productbag();

////////////////////////////////////////////////////////////////

let flag = true;
bag.onclick = () => {
    if (flag) {
        bag_show.style.display = "block"
    } else {
        bag_show.style.display = "none"
    }
    flag = !flag
    Productbag();

}
