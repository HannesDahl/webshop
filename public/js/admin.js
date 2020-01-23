if (document.getElementById('products-table')) {
    loadProductsTable();
} else if (document.getElementById('dashboard-chart')) {
    loadDashboardChart();
}

$(document).ready(function () {
    setTimeout(() => {
        $('.loader-wrapper').fadeOut("slow");
    }, 500);
});

$(document).ready(function () {
    $('.modal').modal();
});

function loadProductsTable() {
    $(document).ready(function () {
        $('#products-table').DataTable();
        $('#products-table').ready(function () {
            loadHTML();
        });
    });
}

function loadHTML() {
    if (document.getElementsByName('products-table_length')[0]) {
        const tableSelect = document.getElementsByName('products-table_length')[0];
        tableSelect.classList.add('browser-default')
    }

    if (document.getElementsByTagName('input')[0]) {
        document.getElementsByTagName('input')[0].setAttribute('placeholder', 'Search');
    }
}

const editRow = document.getElementsByClassName('edit-row');
for (let i = 0; i < editRow.length; i++) {
    editRow[i].addEventListener('click', (e) => {
        document.getElementById('productName').value = e.target.parentElement.parentElement.children[1].textContent;
        document.getElementById('productPrice').value = e.target.parentElement.parentElement.children[3].textContent.replace('€', '');
        document.getElementById('productDescription').value = e.target.parentElement.parentElement.children[2].textContent;
        document.getElementById('productID').value = e.target.parentElement.parentElement.children[0].textContent;

        M.updateTextFields();
    });
}

const modalCloseButton = document.getElementsByClassName('modal-close');
modalCloseButton[0].addEventListener('click', (e) => {
    e.preventDefault();
});

function loadDashboardChart() {
    var ctx = document.getElementById('dashboard-chart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['January', 'Febuary', 'Mars', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Sales',
                data: [50, 19, 3, 10, 25, 10, 20, 100, 80, 67, 90, 86],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1,
                pointBackgroundColor: "#4BC0C0"
            }],
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
        }
    });
}