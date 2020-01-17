let num = 0;
let cartProducts = []
while (localStorage.getItem('key' + num)) {
    cartProducts.push(localStorage.getItem('key' + num));
    num++;
}
if (window.location.search == '' && cartProducts != '') {
    window.location.search = 'id=' + cartProducts;
}

let itemRemoveButtons = document.getElementsByClassName('item-remove-button');
for (let i = 0; i < itemRemoveButtons.length; i++) {
    itemRemoveButtons[i].addEventListener('click', (event) => {
        event.preventDefault();
        itemRemoveButtons[i].parentElement.parentElement.style.display = 'none';
        localStorage.removeItem('key' + i);
        cartProducts.splice(i, 1);
        history.pushState(null, null, '?id=' + cartProducts);
        if (cartProducts.length === 0 && window.location.search.includes('?id=')) {
            history.replaceState('', null, '?');
        }
    });
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