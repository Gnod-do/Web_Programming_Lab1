document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("button").addEventListener("click", submit);
});

function submit() {
    if (checkY() && checkR()) {
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

function checkY() {
    let y = document.getElementById("y");
    if (y.value.trim() === "") {
        alert("You need to fill this field!");
        return false;
    } else if(!isFinite(y.value.replace(',','.'))) {
        alert("Y must be number!");
    } else if (y.value.replace(',','.') >= 5 || y.value.replace(',','.') <= -5) {
        alert("Y must be in (-5;5)");
        return false;
    } else {
        return true;
    }
}

function checkR() {
    let r = document.getElementById("r");
    if (r.value.trim() === "") {
        alert("You need to fill this field!");
        return false;
    } else if(!isFinite(r.value.replace(',','.'))) {
        alert("R must be number!");
    } else if (r.value.replace(',','.') >= 4 || r.value.replace(',','.') <= 1) {
        alert("R must be in (-5;5)");
        return false;
    } else {
        return true;
    }
}