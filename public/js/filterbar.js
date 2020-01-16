let pricesHTML = document.getElementsByClassName('price');
let prices = [];
for (let i = 0; i < pricesHTML.length; i++) {
    prices.push(parseFloat(pricesHTML[i].attributes['value'].value))
}
let wrapper = $('#productWrapper');
let productContainers = document.getElementsByClassName('card-container');
let products = wrapper.children('.card-container')
console.log(products)
let pricesClone = prices.slice(0);
let newOrder = [];

// order by
let orderHTML = document.getElementById('order');
let orderOptions = document.getElementsByClassName('orderOption');
orderHTML.addEventListener('change', changeOrder)

//orderHTML.options[orderHTML.selectedIndex].value

function changeOrder() {
    if (orderHTML.options[orderHTML.selectedIndex].value == '?ob=priceAsc') {
        prices = prices.sort(function (a, b) {
            return a - b
        });
        for (let i = 0; i < prices.length; i++) {
            newOrder.push(pricesClone.indexOf(prices[i]))
        }
        wrapper.append($.map(newOrder, function (v) {
            return products[v]
        }));
        newOrder = [];
    }
    if (orderHTML.options[orderHTML.selectedIndex].value == '?ob=priceDesc') {
        prices = prices.sort(function (a, b) {
            return b - a
        });
        for (let i = 0; i < prices.length; i++) {
            newOrder.push(pricesClone.indexOf(prices[i]))
        }
        wrapper.append($.map(newOrder, function (v) {
            return products[v]
        }));
        newOrder = [];
    }
}


//orderHTML.options[orderHTML.selectedIndex].value
for (let i = 0; i < orderOptions.length; i++) {
    if (window.location.search === orderOptions[i].value) {
        orderHTML.value = orderOptions[i].value
    }
}

// search
let searchBar = document.getElementById('category-search');
let cardNames = document.getElementsByClassName('card-title');
let filter;
let textValue;
searchBar.addEventListener('input', updateProducts)


// price range

let minPrice = Math.min.apply(null, prices);
let maxPrice = Math.max.apply(null, prices);

var slider = document.getElementById('test-slider');
noUiSlider.create(slider, {
    start: [minPrice, maxPrice],
    connect: true,
    step: 1,
    orientation: 'horizontal', // 'horizontal' or 'vertical'
    tooltips: true,
    range: {
        'min': minPrice,
        'max': maxPrice
    },
    format: wNumb({
        decimals: 0
    })
});

slider.noUiSlider.on('update', updateProducts)

function updateProducts() {
    let currentSliderValues = slider.noUiSlider.get();
    filter = searchBar.value.toUpperCase();

    for (let i = 0; i < products.length; i++) {
        textValue = cardNames[i].textContent

        if (filter == "") {
            if (prices[i] >= currentSliderValues[0] && prices[i] <= currentSliderValues[1]) {
                productContainers[i].style.display = "";
            } else {
                productContainers[i].style.display = "none";
            }
        } else {
            if ((textValue.toUpperCase().indexOf(filter) > -1) && (prices[i] >= currentSliderValues[0] && prices[i] <= currentSliderValues[1])) {
                productContainers[i].style.display = "";
            } else {
                productContainers[i].style.display = "none";
            }
        }

    }
}