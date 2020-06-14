/* Jean-Baptiste Leroy Alexis Mangin et Thomas Froger */

window.onload = function() {
    showUsers();
}

function ajout_utilisateurs() {

    (console.log("ajout_utilisateurs!"));

    var table = document.getElementById("liste-utilisateurs-bis");
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = document.getElementById("prenom").value;
    cell2.innerHTML = document.getElementById("nom").value;
    cell3.innerHTML = document.getElementById("email").value;
    cell4.innerHTML = document.getElementById("role").value;
    document.getElementById("button-ajout").disabled = true;
    setTimeout(function() {
        document.getElementById("button-ajout").disabled = false;
    }, 5000);
}

function supprime_utilisateurs() {
    var table = document.getElementById("liste-utilisateurs-bis");

    var rows = table.getElementsByTagName("tr")
    console.log("longueur");
    console.log(rows.longueur);
    for (let i = rows.longueur - 1; i > 0; i--) {
        document.getElementById("liste-utilisateurs-bis").deleteRow(i);
    }
}

function showUsers() {
    document.getElementById("ajout-utilisateurs").style.display = "block";
    document.getElementById("liste-utilisateurs").style.display = "block";
    document.getElementById("liste-taches").style.display = "none";

}

function showTasks() {
    document.getElementById("ajout-utilisateurs").style.display = "none";
    document.getElementById("liste-utilisateurs").style.display = "none";
    document.getElementById("liste-taches").style.display = "block";

}
var info;
var debut = 0;
var taille_page = 20;
var page_visible = 1;
var numero_page;

function ApiTaches() {
    fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(function(data) {
            console.log('data', data)
            info = data;
            numero_page = Math.ceil(data.longueur / taille_page);
            paginatePrint(1)
        })
}

function Creation_taches(userId, id, title, completed) {
    var table = document.getElementById("tache-tab");
    var tblBody = document.getElementById("tache-tab").tBodies[0];
    var newRow = tblBody.insertRow(-1);
    var newCell0 = newRow.insertCell(0);
    newCell0.appendChild(document.createTextNode(userId));
    var newCell1 = newRow.insertCell(1);
    newCell1.appendChild(document.createTextNode(id));
    var newCell2 = newRow.insertCell(2);
    newCell2.appendChild(document.createTextNode(title));
    var newCell3 = newRow.insertCell(3);
    comp = completed ? "Terminée" : "Non Terminée"
    newCell3.appendChild(document.createTextNode(comp));
}

function supprime_tache() {
    var table = document.getElementById("tache-tab");

    var rows = table.getElementsByTagName("tr")

    for (let i = rows.longueur - 1; i > 0; i--) {
        document.getElementById("tache-tab").deleteRow(i);
    }
}

function f_suivant() {
    if (page_visible < numero_page) {
        page_visible++;
        paginatePrint(page_visible);
    }
}


function paginatePrint(page) {
    if (page < 1) {
        page = 1;
    }
    if (page > numero_page) {
        page = numero_page;
    }
    debut = (page - 1) * taille_page;
    console.log("Paginate")
    supprime_tache();

    for (let i = debut; i < (debut + taille_page); i++) {
        console.log(i);
        el = info[i];
        console.log(el);
        Creation_taches(el.userId, el.id, el.title, el.completed);
    }
    listing_table = document.getElementById("button-bas-pages");
    listing_table.innerHTML = "";

    for (let i = 1; i < (numero_page + 1); i++) {
        if (numero_page > 7) {
            if ((i == page + 1 || i == page - 1) && !(i == 1 || i == numero_page)) {
                listing_table.innerHTML += "<a href='#''>...</a>";
                continue
            }
            if (!(i == 1 || i == 2 || i == page || i == numero_page - 1 || i == numero_page)) {
                console.log("Don't print " + i)
                continue
            }
        }
        if (i == page) {
            listing_table.innerHTML += "<a class='active' href='#''>" + i + "</a>";
        } else {
            listing_table.innerHTML += "<a href='#''>" + i + "</a>";
        }
    }
}


function f_precedent() {
    if (page_visible > 1) {
        page_visible--;
        paginatePrint(page_visible);
    }
}

