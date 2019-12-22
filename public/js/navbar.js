let tabs = document.getElementsByClassName('tab')
for (let i = 0; i < tabs.length; i++) {
    if (window.location.pathname == tabs[i].firstChild.pathname) {
        tabs[i].classList.add('active');
    } else {
        tabs[i].classList.remove('active');
    }
}

$("#search").click(function () {
    let searchValue = document.getElementById('search-bar-input').value;

    $("#search").attr("href", `/s/${searchValue}`);
});

if (document.getElementById('productsWrapper')) {
    document.getElementById('search-result-text').innerText = `Search results for: ${window.location.href.replace(/^.*[\\\/]/, '', /["']/g, "")}`
}