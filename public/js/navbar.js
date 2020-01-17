let tabs = document.getElementsByClassName('tab')
for (let i = 0; i < tabs.length; i++) {
    if (window.location.pathname == tabs[i].firstChild.pathname) {
        tabs[i].classList.add('active');
    } else {
        tabs[i].classList.remove('active');
    }
}

let searchElement = document.getElementById('search-bar-input');
let searchValue;
searchElement.addEventListener('keypress', (event) => {

    if (event.key === 'Enter') {
        searchValue = searchElement.value;
        if (searchValue == '') {
            event.preventDefault();
            M.toast({
                html: 'Insert a search value!',
            })
        } else {
            location.pathname = `/s/${searchValue}`;
        }
    }

});

$("#search").click(function (event) {
    searchValue = searchElement.value;
    if (searchValue == '') {
        event.preventDefault();
        M.toast({
            html: 'Insert a search value!',
        })
    } else {
        location.pathname = `/s/${searchValue}`;
    }
});

if (document.getElementById('productWrapper') && document.getElementById('search-result-text')) {
    document.getElementById('search-result-text').innerText = `Search results for: ${window.location.href.replace(/^.*[\\\/]/, '', /["']/g, "").replace("%20", " ")}`
}