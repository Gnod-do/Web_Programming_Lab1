document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button").addEventListener("click", submit);
});

function submit() {
    if (validateInput()) {
        let xSelect = document.getElementById("select");
        let x = xSelect.value;
        let form = new FormData();
        let y = document.getElementById("y").value;
        let r = document.getElementById("r").value;
        form.append("x",x);
        form.append("y",y.replace(',','.'));
        form.append("r",r.replace(',','.'));
        let request = new XMLHttpRequest();
        request.open('POST', '/php/server.php');
        request.onreadystatechange = function () {
            if (request.readyState === 4 && request.status === 200) {
                document.querySelector(".not-main-table").innerHTML = request.responseText;
            }
        }
        request.send(form);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("cleaningbutton").addEventListener("click", clean);
});

function clean() {
    let cleaningform = new FormData();
    let cleaningrequest = new XMLHttpRequest();
    cleaningrequest.open('POST', '/php/clean.php');
    cleaningrequest.onreadystatechange = function () {
        if (cleaningrequest.readyState === 4 && cleaningrequest.status === 200) {
            document.querySelector(".not-main-table").innerHTML = cleaningrequest.responseText;
        }
    }
    cleaningrequest.send(cleaningform);
}

function validateInput() {
    let y = document.getElementById("y");
    let r = document.getElementById("r");
    let errorContainer = document.getElementById("error-container");

    // Xóa tất cả thông báo lỗi trước đó
    while (errorContainer.firstChild) {
        errorContainer.removeChild(errorContainer.firstChild);
    }

    let hasError = false;

    if (y.value.trim() === "") {
        displayError("You need to fill the Y field!");
        hasError = true;
    } else if (!isFinite(y.value.replace(',', '.'))) {
        displayError("Y must be a number!");
        hasError = true;
    } else if (y.value.replace(',', '.') >= 5 || y.value.replace(',', '.') <= -5) {
        displayError("Y must be in the range (-5; 5)");
        hasError = true;
    }

    if (r.value.trim() === "") {
        displayError("You need to fill the R field!");
        hasError = true;
    } else if (!isFinite(r.value.replace(',', '.'))) {
        displayError("R must be a number!");
        hasError = true;
    } else if (r.value.replace(',', '.') >= 4 || r.value.replace(',', '.') <= 1) {
        displayError("R must be in the range (1; 4)");
        hasError = true;
    }

    errorContainer.style.display = hasError ? "block" : "none";

    return !hasError;
}

function displayError(errorMessage) {
    let errorNode = document.createElement("div");
    errorNode.className = "error-message";
    errorNode.textContent = errorMessage;
    let errorContainer = document.getElementById("error-container");
    errorContainer.appendChild(errorNode);
}