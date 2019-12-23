let tabs = document.getElementsByClassName('tab')
for (let i = 0; i < tabs.length; i++) {
    if (window.location.pathname == tabs[i].firstChild.pathname) {
        tabs[i].classList.add('active');
    } else {
        tabs[i].classList.remove('active');
    }
}

$("#search").click(function (event) {
    let searchValue = document.getElementById('search-bar-input').value;
    if (searchValue == '') {
        event.preventDefault();
        M.toast({
            html: 'Insert a search value!',
        })
    } else {
        $("#search").attr("href", `/s/${searchValue}`);
    }

});

if (document.getElementById('productsWrapper')) {
    document.getElementById('search-result-text').innerText = `Search results for: ${window.location.href.replace(/^.*[\\\/]/, '', /["']/g, "").replace("%20", " ")}`
}