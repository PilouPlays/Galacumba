const identifiant = "bar_galacumba_seclin";
const motDePasse = "galacumba_gestion_bar_seclin";

const boissons = [
    "Eau plate / Eau gazeuse",
    "Coca-Cola / Coca-Cola Zéro",
    "Fanta Orange",
    "Sprite",
    "Schweppes Tonic",
    "Schweppes Agrum'",
    "Ice Tea Pêche",
    "Red Bull",
    "Jus d'orange",
    "Jus d'ananas",
    "Jus de cranberry",
    "Jus de pomme",
    "Limonade",
    "Diabolo",
    "Mojito",
    "Caipirinha",
    "Sex on the Beach",
    "Piña Colada",
    "Gin Fizz",
    "Vodka Smirnoff",
    "Vodka Grey Goose",
    "Vodka Belvedere",
    "Rhum Bacardi Carta Blanca",
    "Rhum Havana Club 3 ans",
    "Rhum Diplomatico Reserva",
    "Gin Bombay Sapphire",
    "Gin Hendrick's",
    "Whisky J&B",
    "Whisky Jameson",
    "Whisky Jack Daniel's",
    "Whisky Chivas Regal 12 ans",
    "Tequila Jose Cuervo Especial",
    "Tequila Don Julio Blanco",
    "Get 27 / Get 31",
    "Verre de Soft",
    "Verre de Vin",
    "Coupe de Champagne",
    "Verre d'Alcool",
    "Cocktail",
    "Shot",
    "Softs (1L)",
    "Alcools"
];

let entrees = 0;

function login() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;

    if (user === identifiant && pass === motDePasse) {
        document.getElementById("loginPage").classList.add("hidden");
        document.getElementById("homePage").classList.remove("hidden");
    } else {
        alert("Identifiant ou mot de passe incorrect.");
    }
}

function goHome() {
    cacherTout();
    document.getElementById("homePage").classList.remove("hidden");
}

function showCreate() {
    cacherTout();
    document.getElementById("createPage").classList.remove("hidden");
}

function showReports() {
    cacherTout();
    document.getElementById("reportsPage").classList.remove("hidden");
    chargerRapports();
}

function cacherTout() {
    document.getElementById("homePage").classList.add("hidden");
    document.getElementById("createPage").classList.add("hidden");
    document.getElementById("reportsPage").classList.add("hidden");
}

function modifierEntrees(valeur) {
    entrees += valeur;

    if (entrees < 0) {
        entrees = 0;
    }

    document.getElementById("nbEntrees").innerText = entrees;
}

const ventes = document.getElementById("ventes");

boissons.forEach((boisson, index) => {
    const div = document.createElement("div");
    div.className = "boisson";

    div.innerHTML = `
        <span>${boisson}</span>
        <input type="number" min="0" value="0" id="b${index}">
    `;

    ventes.appendChild(div);
});

ventes.addEventListener("input", calculClassement);

function calculClassement() {
    let data = [];

    boissons.forEach((b, i) => {
        const qte = parseInt(document.getElementById(`b${i}`).value) || 0;

        data.push({
            nom: b,
            qte: qte
        });
    });

    data.sort((a, b) => b.qte - a.qte);

    const classement = document.getElementById("classement");

    classement.innerHTML = `
        <li>${data[0].nom} (${data[0].qte})</li>
        <li>${data[1].nom} (${data[1].qte})</li>
        <li>${data[2].nom} (${data[2].qte})</li>
    `;
}

function enregistrerRapport() {
    const rapport = {
        nom: document.getElementById("nom").value,
        date: document.getElementById("date").value,
        entrees: entrees,
        ventes: {}
    };

    boissons.forEach((b, i) => {
        rapport.ventes[b] =
            parseInt(document.getElementById(`b${i}`).value) || 0;
    });

    let rapports =
        JSON.parse(localStorage.getItem("rapports")) || [];

    rapports.push(rapport);

    localStorage.setItem(
        "rapports",
        JSON.stringify(rapports)
    );

    alert("Rapport enregistré.");
    goHome();
}

function chargerRapports() {
    const div = document.getElementById("listeRapports");

    div.innerHTML = "";

    let rapports =
        JSON.parse(localStorage.getItem("rapports")) || [];

    rapports.forEach((r, i) => {
        const ligne = document.createElement("div");

        ligne.className = "rapport";

        ligne.innerHTML = `
            <strong>${r.date}</strong> - ${r.nom}
            <button onclick="modifierRapport(${i})">✏️</button>
        `;

        ligne.onclick = () => {
            alert(
                "Rapport de " +
                r.nom +
                "\nDate : " +
                r.date +
                "\nEntrées : " +
                r.entrees
            );
        };

        div.appendChild(ligne);
    });
}

function modifierRapport(i) {
    alert(
        "Fonction modification à compléter si besoin."
    );
}
