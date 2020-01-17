let addToCartButton = document.getElementsByClassName('add-to-cart-button');
let number = 0;

let index;
for (let i = 0; i < addToCartButton.length; i++) {
    index = i;
    addToCartButton[i].addEventListener('click', (event) => {
        event.preventDefault();
        if (localStorage.length) {
            number = localStorage.length
        }
        let key = 'key' + number++;
        localStorage.setItem(key, document.getElementsByClassName('product-id')[i].innerHTML);
    });
}