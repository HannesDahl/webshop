let addToCartButton = document.getElementsByClassName('add-to-cart-button');

let number = 0;

for (let i = 0; i < addToCartButton.length; i++) {
    addToCartButton[i].addEventListener('click', (event) => {
        event.preventDefault();
        addToCart();
    });
}

function addToCart() {
    let key = 'key' + number++;

    localStorage.setItem(key, event.target.parentElement.parentElement.getElementsByClassName('card-content')[0].getElementsByClassName('card-id')[0].getElementsByTagName('span')[0].innerHTML);
}