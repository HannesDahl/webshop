let num = 0;

while (localStorage.getItem('key' + num)) {
    num++;
}

let cartSubtotal = document.getElementById('cart-subtotal');
let cartMoms = document.getElementById('cart-moms');
let cartTotal = document.getElementById('cart-total');
let cartProductPrice = document.querySelectorAll('.cart-product-price');
const cartArray = Array.from(cartProductPrice)

let total = 0;
for (let i = 0; i < cartArray.length; i++) {
    let currentPrice = parseInt(cartArray[i].innerHTML.replace('€', ''));
    total += currentPrice;
    cartSubtotal.textContent = total + '€'
}

cartMoms.textContent = Math.round(total * .24) + '€';
cartTotal.textContent = total + '€';