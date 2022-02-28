const CACHE_KEY = "calculation_history";

function checkForStorage() {
    return typeof(Storage) !== undefined;
}

function putHistory(data) {
    if (checkForStorage()) {
        let historyData = null;
        if (localStorage.getItem(CACHE_KEY) === null) {
            historyData = [];
        } else {
            historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
        }

        historyData.unshift(data);

        if (historyData.length > 5) {
            historyData.pop();
        }

        localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
    }
    
    const removeHistory = document.querySelector("#removeHistory")
    removeHistory.addEventListener('click', function(event) {
        const remove = confirm('Anda yakin ingin menghapus riwayat?');
        if (remove) {
            localStorage.removeItem(CACHE_KEY);
            window.location = window.location.href;
            setInterval(window.location, 2000);
        }
    });
}

function showHistory() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
    } else {
        return [];
    }
}

function renderHistory() {
    const historyData = showHistory();
    let calculationList = document.querySelector("#calculationList");
    calculationList.innerHTML = "";

    for (let history of historyData) {
        let row = document.createElement('tr');
        row.innerHTML = "<td>" + history.firstNumber + "</td>";
        row.innerHTML += "<td>" + history.operator + "</td>";
        row.innerHTML += "<td>" + history.secondNumber + "</td>";
        row.innerHTML += "<td>" + history.result + "</td>";

        calculationList.appendChild(row);
    }
}

renderHistory();