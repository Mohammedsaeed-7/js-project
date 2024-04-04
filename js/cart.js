var fav_section = document.getElementById("product-fav")
let fav_products = []
let index;
let carts = [];
if (localStorage.getItem("index") != -1) {
    index = +localStorage.getItem("index");
    if (localStorage.getItem("carts")) {
        carts = JSON.parse(localStorage.getItem("carts"));
    }
    if (localStorage.getItem("fav_products")) {
        fav_products = JSON.parse(localStorage.getItem("fav_products"));
    }
}

let heart_icon

getItem = (id) => {
    let item = fav_products.find(p => p.id == id)
    return item;
}
var scroll

////////////////////////////////////////////////////////////////
var cart_section = document.getElementById("product-container")
const cartItem = () => {

    carts[index].map((item) => {
        if (item.count == 0) {
            carts[index].splice(carts[index].findIndex(p => p.id == item.id), 1);

        } localStorage.setItem("carts", JSON.stringify(carts));
    })

    let product_cart = carts[index].map((item) => {

        item.TotalPrice = +item.price * +item.count

        return `
                <div class="cart-item ">
                <div class="figure">
                 <img src=${item.img} alt="" />
                </div>
                <div class="cart-info">
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>

                    <div class="info-div">
                      <div> <h3> Price: </h3> <b>${item.price} $</b> </div>
                         <div><h3>Total price: </h3><b>${item.TotalPrice} $</b></div>

                    </div>
                    <div class="cart-sell">
                        <i class="fas fa-plus ff" name="${item.id}"></i>
                        <p>${item.count}</p>
                        <i class="fas fa-minus ff" name="${item.id}"></i>
                    </div>
                </div>
            </div>
        `
    })
    let TotalPrice_div = document.querySelector("#cart .TotalPrice .TPrice")
    let TotPrice = 0;
    carts[index].map(item => (TotPrice += +item.TotalPrice))
    TotalPrice_div.innerHTML = TotPrice + " $"
    if (carts[index].length == 0) {
        product_cart = [`<h2 class="NotItem">don't have items in cart <a href="index.html">click here to add items</a></h2>
        `]
    }

    cart_section.innerHTML = product_cart.join(" ");
    var cart_ff = document.querySelectorAll(".cart-item .ff")

    cart_ff.forEach((z) => {
        z.onclick = function () {
            let id = z.getAttribute("name")
            let op = carts[index][carts[index].findIndex(p => p.id == id)];
            if (z.className === "fas fa-plus ff") {
                op.count++;
            } else op.count--;
            op.TotalPrice = op.count * op.price
            localStorage.setItem("carts", JSON.stringify(carts));
            cartItem();
            Productbag();
        }

    })

}

////////////////////////////////////////////////////////////////
const ProductItem = () => {

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

    scroll = [];
    let product = fav_products[index].map((item) => {
        scroll.push(`bb${item.id}`);
        return `<div class="product-item pb-3" id="bb${item.id}">
                <div class="figure">
                    <img src=${item.img} alt="${item.name}" />
                    <div class="product-info">
                        <div class="d_col" >
                            <span>${item.name}</span>
                            <i class="fas fa-heart" name="${item.id}"></i>
                        </div>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `
    })
    fav_section.innerHTML = product.join(" ");
    let notitem = document.querySelector("#scroll-fav .NotItem")
    let con = document.getElementById("product-fav-contianer")
    if (fav_products[index].length == 0) {
        notitem.style.display = "block";
        con.style.display = "none"
    } else {
        con.style.display = "block"
        notitem.style.display = "none";
    }
    heart_icon = document.querySelectorAll(".product-item .product-info i")
    cartItem();
    heart_icon.forEach((z) => {
        z.onclick = function () {
            let id = z.getAttribute("name")
            let item = getItem(id);
            if (z.className === "fas fa-heart") {
                z.className = "far fa-heart";
                fav_products[index].splice(fav_products[index].findIndex(p => p.id == id), 1);
                localStorage.setItem("fav_products", JSON.stringify(fav_products));

            } else {
                z.className = "fas fa-heart";
                fav_products[index].push(item);
                localStorage.setItem("fav_products", JSON.stringify(fav_products));

            }
            ProductItem();
        }

    })

}
ProductItem();

////////////////////////////////////////////////////////////////

let it = document.querySelectorAll(".product-item ");
let wx = window.innerWidth;
let b = 4
let n = fav_products[index].length;
setInterval(() => {
    n = fav_products[index].length;
    wx = window.innerWidth
    b = 4
    fav_section.style.width = `${(wx * 0.8 * (n / b)) - (40 * (n / b))}`
    if (wx < 770) {
        b = 2
        fav_section.style.width = `${wx * n / b - 20 * n / b}`
    } if (wx < 450) {
        b = 1
        fav_section.style.width = `${wx * n / b - 20 * n / b}`
    }
    localStorage.setItem("b", b)

}, 600)
/////////////////////////////////////////////////////////////////
let RScroll = document.querySelector("#scroll-fav .i .right-scroll ");
let LScroll = document.querySelector("#scroll-fav .i .left-scroll ");
let xr = +localStorage.getItem("b");
let xl = 0;
if (n > +localStorage.getItem("b")) {
    RScroll.href = `#${scroll[xr]}`
    LScroll.href = `#${scroll[xl]}`
}
RS = () => {
    if (xr + 1 < scroll.length) {
        RScroll.href = `#${scroll[++xr]}`
        xl++;
    }
}
LS = () => {
    if (xl > 0) {
        LScroll.href = `#${scroll[--xl]}`
        xr--;
    }
}

RScroll.addEventListener("click", RS)
LScroll.addEventListener("click", LS)