const identifiant = "bar_galacumba_seclin";
const motDePasse = "galacumba_gestion_bar_seclin";

const prixEntree = 5;

const prixBoissons = {
"Vodka Smirnoff":10,
"Vodka Grey Goose":14,
"Mojito":12,
"Coca-Cola / Coca-Cola Zéro":3.5,
"Fanta Orange":3.5,
"Sprite":3.5,
"Shot":5,
"Cocktail":18,
"Verre de Vin":6
};

const boissons = Object.keys(prixBoissons);

let entrees = 0;
let rapportModification = null;

const ventesDiv = document.getElementById("ventes");

boissons.forEach((b,i)=>{
    ventesDiv.innerHTML += `
    <div class="boisson">
        <span>${b}</span>
        <input type="number" min="0" value="0" id="b${i}">
    </div>`;
});

function cacherTout(){
    document.querySelectorAll(".page")
        .forEach(x=>x.classList.add("hidden"));
}

function accueil(){
    cacherTout();
    homePage.classList.remove("hidden");
}

function login(){

    if(
        username.value===identifiant &&
        password.value===motDePasse
    ){
        cacherTout();
        homePage.classList.remove("hidden");
    }
    else{
        alert("Identifiants incorrects");
    }
}

function nouveauRapport(){

    rapportModification = null;

    cacherTout();
    createPage.classList.remove("hidden");
}

function modifierEntrees(v){
    entrees += v;

    if(entrees<0){
        entrees=0;
    }

    nbEntrees.innerText = entrees;
}

ventesDiv.addEventListener("input",calculClassement);

function calculClassement(){

    let data=[];

    boissons.forEach((b,i)=>{

        data.push({
            nom:b,
            qte:parseInt(document.getElementById("b"+i).value)||0
        });

    });

    data.sort((a,b)=>b.qte-a.qte);

    classement.innerHTML=`
    <li>${data[0].nom} (${data[0].qte})</li>
    <li>${data[1].nom} (${data[1].qte})</li>
    <li>${data[2].nom} (${data[2].qte})</li>
    `;
}

function enregistrerRapport(){

    let rapport = {
        nom:nom.value,
        date:date.value,
        entrees:entrees,
        ventes:{}
    };

    boissons.forEach((b,i)=>{
        rapport.ventes[b] =
            parseInt(document.getElementById("b"+i).value)||0;
    });

    let rapports =
        JSON.parse(localStorage.getItem("rapports"))||[];

    if(rapportModification!==null){
        rapports[rapportModification]=rapport;
    }
    else{
        rapports.push(rapport);
    }

    localStorage.setItem(
        "rapports",
        JSON.stringify(rapports)
    );

    alert("Rapport enregistré");

    accueil();
}

function voirRapports(){

    cacherTout();
    reportsPage.classList.remove("hidden");

    let rapports =
        JSON.parse(localStorage.getItem("rapports"))||[];

    listeRapports.innerHTML="";

    rapports.forEach((r,i)=>{

        listeRapports.innerHTML += `
        <div class="rapport">
            <b>${r.date}</b> - ${r.nom}
            <button onclick="ouvrirRapport(${i})">Voir</button>
            <button onclick="modifierRapport(${i})">✏️</button>
        </div>
        `;
    });
}

function ouvrirRapport(i){

    let rapports =
        JSON.parse(localStorage.getItem("rapports"))||[];

    let r = rapports[i];

    let caBoissons = 0;
    let texte = "";
    let classementData = [];

    for(let b in r.ventes){

        let qte = r.ventes[b];

        if(qte>0){

            let total =
                qte * prixBoissons[b];

            caBoissons += total;

            texte += `
            <tr>
                <td>${b}</td>
                <td>${qte}</td>
                <td>${total.toFixed(2)} €</td>
            </tr>
            `;

            classementData.push({
                nom:b,
                qte:qte
            });
        }
    }

    classementData.sort((a,b)=>b.qte-a.qte);

    let caEntrees =
        r.entrees * prixEntree;

    let total =
        caBoissons + caEntrees;

    cacherTout();

    consultPage.classList.remove("hidden");

    contenuRapport.innerHTML = `
        <h2>${r.date}</h2>
        <h3>${r.nom}</h3>

        <p><b>Nombre d'entrées :</b> ${r.entrees}</p>
        <p><b>Chiffre d'affaires boissons :</b> ${caBoissons.toFixed(2)} €</p>
        <p><b>Chiffre d'affaires entrées :</b> ${caEntrees.toFixed(2)} €</p>
        <p><b>Total :</b> ${total.toFixed(2)} €</p>

        <h3>Boissons vendues</h3>

        <table>
            <tr>
                <th>Boisson</th>
                <th>Quantité</th>
                <th>Total</th>
            </tr>
            ${texte}
        </table>

        <h3>Classement</h3>

        <ol>
            ${classementData[0] ? `<li>${classementData[0].nom} (${classementData[0].qte})</li>` : ""}
            ${classementData[1] ? `<li>${classementData[1].nom} (${classementData[1].qte})</li>` : ""}
            ${classementData[2] ? `<li>${classementData[2].nom} (${classementData[2].qte})</li>` : ""}
        </ol>
    `;
}

function modifierRapport(i){

    let rapports =
        JSON.parse(localStorage.getItem("rapports"))||[];

    let r = rapports[i];

    rapportModification = i;

    cacherTout();
    createPage.classList.remove("hidden");

    nom.value = r.nom;
    date.value = r.date;

    entrees = r.entrees;
    nbEntrees.innerText = entrees;

    boissons.forEach((b,i)=>{
        document.getElementById("b"+i).value =
            r.ventes[b] || 0;
    });

    calculClassement();
}
