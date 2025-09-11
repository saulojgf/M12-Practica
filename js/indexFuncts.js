const shoppingCart = document.getElementById("cart-ctner");
const shoppingCartButton = document.getElementById("shoppingCartButton");
const shoppingCartIcon = document.getElementById("shoppingCartIcon");
const shoppingCartBtnClose = document.getElementById("cart_btn-close");
const menu = document.getElementById("main_menu");
const menuBtn = document.getElementById("menu_btn");
const menuBtnClose = document.getElementById("menu_btn-close");
const cartButton = document.querySelectorAll(".icon-addCart");
const cartItemsCtner = document.getElementById("cart_items-ctner");
const cartBubbleItems = document.getElementById("bubble_NumItems");


let cartItems = [];
let cartNumItems = 0;

// console.log(menuBtn);
// console.log(shoppingCart);
// console.log(shoppingCartButton);
// console.log(shoppingCartBtnClose);


const shoppingCartActive = (e) => {
    shoppingCart.classList.toggle("cart--active");
    e.stopPropagation();
    console.log("Shopping Cart Active");
}
const shoppingCartDisable = (e) => {
    shoppingCart.classList.remove("cart--active");
    console.log("Shopping cart disabled by Close button");
}

const menuActive = (e) => {
    menu.classList.toggle("menu--active");
    e.stopPropagation();
    console.log("Menu Active");
}

const menuDisable = (e) => {
    menu.classList.remove("menu--active");
    console.log("Menu is disabled by close btn")
}

document.addEventListener("click", (e) => {
    if(!shoppingCart.contains(e.target) && 
       shoppingCart.classList.contains("cart--active")) {
        shoppingCart.classList.remove("cart--active");
        console.log("Shopping cart disabled by clicking outside the cart");
    }
    if(!menu.contains(e.target) &&
       menu.classList.contains("menu--active")){
        menu.classList.remove("menu--active");
        console.log("Menu is disabled by clicking outside");
    }
  }
);

shoppingCartButton.addEventListener("click", shoppingCartActive);
shoppingCartIcon.addEventListener("click", shoppingCartActive);
shoppingCartBtnClose.addEventListener("click", shoppingCartDisable);
menuBtn.addEventListener("click", menuActive);
menuBtnClose.addEventListener("click", menuDisable);


cartButton.forEach(btn => {
    btn.addEventListener("click", (e) => {
        // Get parent article
        const article = e.target.closest('article');
        // Extract product info
        const productInfo = {
            id: article.id,
            name: article.querySelector(".main__atle-desc").textContent,
            price: article.querySelector(".main__price").textContent,
            image: article.querySelector(".main__img-article").src,
        };

        const articleHTML = 
        `<section class="cart__item-container">
            <input class="item__checkbox" type="checkbox" checked>
            <img class="item__image" src="${productInfo.image}" alt="${productInfo.name}">
            <p class="item__description">${productInfo.name}</p>
            <input class="item__quantity" type="number" min="1" max="100" step="1" value="1">
            <p class="item__price">${productInfo.price}</p>
            <i class="cart__icon-trash" data-feather="trash-2"></i>
        </section>`;

        // Adding product to list cart
        cartItemsCtner.innerHTML += articleHTML;
        if(window.feather){
            feather.replace();
        }
        // Count elements in the list cart
        
        cartBubbleItems.innerText = cartItemsCtner.children.length;

        // Debug information 
        console.log(`${productInfo.name} added to the cart`);
        console.log(cartItems)
        console.log(`Items: ${cartItemsCtner.children.length}`);
        console.log(articleHTML);
    })
})

cartItemsCtner.addEventListener("click", (e) => {
    if(e.target.closest(".cart__icon-trash")){
        e.stopPropagation(); // Prevent click from bubnling to parent
        const item = e.target.closest(".cart__item-container");
        item.remove();
        cartBubbleItems.innerText = cartItemsCtner.children.length;
        console.log("Item deleted sucessful");
        console.log(`Items: ${cartItemsCtner.children.length}`)
    }
})

