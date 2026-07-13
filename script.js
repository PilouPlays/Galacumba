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

const prixBoissons = {
    "Eau plate / Eau gazeuse": 2.5,
    "Coca-Cola / Coca-Cola Zéro": 3.5,
    "Fanta Orange": 3.5,
    "Sprite": 3.5,
    "Schweppes Tonic": 3.5,
    "Schweppes Agrum'": 3.5,
    "Ice Tea Pêche": 3.5,
    "Red Bull": 4.5,
    "Jus d'orange": 3.5,
    "Jus d'ananas": 3.5,
    "Jus de cranberry": 3.5,
    "Jus de pomme": 3.5,
    "Limonade": 3.5,
    "Diabolo": 3.5,
    "Mojito": 12,
    "Caipirinha": 12,
    "Sex on the Beach": 12,
    "Piña Colada": 12,
    "Gin Fizz": 12,
    "Vodka Smirnoff": 10,
    "Vodka Grey Goose": 14,
    "Vodka Belvedere": 14,
    "Rhum Bacardi Carta Blanca": 10,
    "Rhum Havana Club 3 ans": 10,
    "Rhum Diplomatico Reserva": 14,
    "Gin Bombay Sapphire": 12,
    "Gin Hendrick's": 14,
    "Whisky J&B": 10,
    "Whisky Jameson": 10,
    "Whisky Jack Daniel's": 12,
    "Whisky Chivas Regal 12 ans": 14,
    "Tequila Jose Cuervo Especial": 10,
    "Tequila Don Julio Blanco": 14,
    "Get 27 / Get 31": 8,
    "Verre de Soft": 5,
    "Verre de Vin": 6,
    "Coupe de Champagne": 15,
    "Verre d'Alcool": 10,
    "Cocktail": 18,
    "Shot": 5,
    "Softs (1L)": 15,
    "Alcools": 130
};

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
