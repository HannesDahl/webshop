let pricesHTML = document.getElementsByClassName('price');
let prices = [];
for (let i = 0; i < pricesHTML.length; i++) {
    prices.push(parseFloat(pricesHTML[i].attributes['value'].value))
}
let wrapper = $('#productWrapper');
let productContainers = document.getElementsByClassName('card-container');
let products = wrapper.children('.card-container')
let pricesClone = prices.slice(0);
let newOrder = [];

let cardNames = document.getElementsByClassName('card-title');
let names = [];
for (let i = 0; i < cardNames.length; i++) {
    names.push(cardNames[i].innerText)
}
let namesClone = names.slice(0);

// order by
$(document).ready(function () {
    $('select').formSelect({
        dropdownOptions: {
            coverTrigger: false
        }
    });
});
let orderHTML = document.getElementById('order');
let orderOptions = document.getElementsByClassName('orderOption');
orderHTML.addEventListener('change', changeOrder)

function changeOrder() {
    let currentOrder = orderHTML.options[orderHTML.selectedIndex].value
    if (currentOrder == 'priceAsc') {
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
    if (currentOrder == 'priceDesc') {
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
    if (currentOrder == 'alphabeticalAsc') {
        names.sort()

        for (let i = 0; i < names.length; i++) {
            newOrder.push(namesClone.indexOf(names[i]))
        }
        wrapper.append($.map(newOrder, function (v) {
            return products[v]
        }));
        newOrder = [];
    }
    if (currentOrder == 'alphabeticalDesc') {
        names.sort();
        names.reverse();

        for (let i = 0; i < names.length; i++) {
            newOrder.push(namesClone.indexOf(names[i]))
        }
        wrapper.append($.map(newOrder, function (v) {
            return products[v]
        }));
        newOrder = [];
    }
}

for (let i = 0; i < orderOptions.length; i++) {
    if (window.location.search === orderOptions[i].value) {
        orderHTML.value = orderOptions[i].value
    }
}

// search
let searchBar = document.getElementById('category-search');
let filter;
let textValue;
searchBar.addEventListener('input', updateProducts)


// price range

let minPrice = Math.floor(Math.min.apply(null, prices));
let maxPrice = Math.ceil(Math.max.apply(null, prices));
let currentSliderValues;
let minInput = document.getElementById('minInput');
let maxInput = document.getElementById('maxInput');
let setprice = document.getElementById('setprice');
maxInput.setAttribute('min', minPrice)
maxInput.setAttribute('max', maxPrice)
minInput.setAttribute('min', minPrice)
minInput.setAttribute('max', maxPrice)
minInput.value = minPrice
maxInput.value = maxPrice

var slider = document.getElementById('price-slider');
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
    margin: 10,
    format: wNumb({
        decimals: 0
    })
});

slider.noUiSlider.on('update', updatePriceRange)

function updatePriceRange() {
    currentSliderValues = slider.noUiSlider.get();
    minInput.value = currentSliderValues[0]
    maxInput.value = currentSliderValues[1]
    updateProducts()
}

setprice.addEventListener('click', changePriceRange)
minInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (parseInt(minInput.value, 10) > parseInt(maxInput.value, 10)) {
            M.toast({
                html: 'Minimum price can\'t be higher than maximum'
            })
        } else {
            slider.noUiSlider.set([minInput.value, null]);
        }
    }
})
maxInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        if (parseInt(minInput.value, 10) > parseInt(maxInput.value, 10)) {
            M.toast({
                html: 'Minimum price can\'t be higher than maximum'
            })
        } else {
            slider.noUiSlider.set([null, maxInput.value]);
        }
    }
})

function changePriceRange() {
    if (parseInt(minInput.value, 10) > parseInt(maxInput.value, 10)) {
        M.toast({
            html: 'Minimum price can\'t be higher than maximum'
        })
    } else {
        slider.noUiSlider.set([minInput.value, maxInput.value]);
    }
}

function updateProducts() {
    currentSliderValues = slider.noUiSlider.get();
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