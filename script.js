let joueurs = [];
let remainingPlayer = [];
    

let playerEliminate = [];

const joueursAvecRoles = [];

let roles = [] ;

const roleMister ='Mister White';
console.log(roleMister.toLocaleLowerCase());

let guess = '';

let dataframe =[];
let columns =[];


let motSecret =[] ;
let motSecretUndercover ='';

let datalength = 0;

let end = 'false';

let eliminatePlayer = [];

let remainingUndercover = '';
let remainingCivil = '';
let remainingMister = '';

let eliminatedPlayerValue = '';

const ptsUndercoverWin = 10;
const ptsCivilWin = 2;
const ptsMisterWin = 6;

let nbMister = 0;
let nbUndercover = 0;
let nbCivil = 0;
let win="";


fetch('WordCSV.csv')
  .then(response => response.text())
  .then(csvText => {

      // Conversion manuelle
    const rows = csvText.split(/\r?\n/)
    const headers = rows[0].split(';');
    
    const data = rows.slice(1).map(row => {
        const values = row.split(';');
        let obj = {};
        headers.forEach((header, index) => {

            obj[header] = values[index];
        });
        return obj;

    });
    console.log(data[0][headers[0]]); // Affiche la première entrée pour vérification
    console.log(data.length); // Affiche le nombre total d'entrées
    datalength = data.length;
    columns = headers;
    dataframe = data;

    choixMot();
});



function choixMot() {
    lineChoosen = Math.floor (Math.random() * datalength);
    motSecret = dataframe[lineChoosen][columns[0]];
    motSecretUndercover = dataframe[lineChoosen][columns[1]];
    console.log("Mot secret civil :", motSecret);
    console.log("Mot Undercover :", motSecretUndercover);
}





function getNbJoueurs() {
    const Nbjoueurs = document.getElementById("nbJoueurs").value;
    //document.getElementById("nbJoueurs").innerHTML=nbJoueurs;
    console.log(Nbjoueurs);
    if (Nbjoueurs < 3){
        alert("c'est 3 joueurs minimum !");
        return;
    }

    document.getElementById('getnbplayer').style.display = 'none';
    document.getElementById('etape2').style.display = 'block';
    
    const container = document.getElementById('formulaireJoueurs');
    container.innerHTML='';

    for(let i=0; i<Nbjoueurs;i++){
        container.innerHTML +=`
            <div style="margin : 10px 0;">
                <label>Joueur ${i+1}:</label>
                <input type="text" id="joueur${i}" placeholder="Nom du joueur ${i+1}" required>
            </div>
        `;
    }
}

function validerJoueurs(){
    const Nbjoueurs = document.getElementById("nbJoueurs").value;
    const mister_white = "Mister";
    const sous_couv = "Undercover";
    joueurs = [];

    for (let i=0 ; i<Nbjoueurs; i++){
        const name = document.getElementById(`joueur${i}`).value;
        
        if (name.trim() ==='') {
            alert(`veuillez entrer un nom correct pour le joueur${i+1}`);
            return;

        }
        
        joueurs.push({
            id: i,
            nom: name,
            score: 0

        });
        
    }
    
   document.getElementById("etape3").style.display= 'block';
   document.getElementById("etape2").style.display= 'none';  

   affichage();

   console.log(joueurs.nom)
}

function affichage(){

    const container = document.getElementById('etape3Affichage');
    container.innerHTML = '';
    
    joueurs.forEach((joueurs, index) => {
        container.innerHTML += `
            <div style="border: 2px solid #333; padding: 15px; margin: 10px 0; border-radius: 8px; background-color: #f0f0f0;">
                <h3>${joueurs.nom}</h3>
                <p style="font-size: 24px; font-weight: bold;">Score: ${joueurs.score}</p>
                
                
            </div>
            

        `;
    });
}

function changementPage() {
    document.getElementById("etape3").style.display= 'none';
    document.getElementById("roles").style.display= 'block'; 

}


function FirstPlayer(){
    const Nbjoueurs =document.getElementById("nbJoueurs").value;

    pos = Math.floor(Math.random()* Nbjoueurs);
    firstPlayer = joueurs[pos].nom;
    
    console.log(firstPlayer);

    document.getElementById('monPremierJoueur').textContent = firstPlayer;



}

function distribRole() {
    const NbJoueurs = parseInt(document.getElementById("nbJoueurs").value);
    nbMister = parseInt(document.getElementById("nbMister").value);
    nbUndercover = parseInt(document.getElementById("nbUndercover").value);
    nbCivil = parseInt(document.getElementById("nbCivil").value) ;
    



    if ((nbCivil+nbMister+nbUndercover) != NbJoueurs){
        alert("Le nombre de roles ne correspond pas au nombre de joueurs")
        return;
    }
    
    for (let i = 0; i < nbMister; i++) {
        roles.push("Mister White");

    }

    for (let i = 0; i < nbCivil; i++) {
        roles.push("Civil");
    }

    for (let i = 0; i < nbUndercover; i++) {
        roles.push("Undercover");
    }

    for (let i = roles.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    for (let i = 0; i < NbJoueurs; i++) {
        joueursAvecRoles.push({
            nom: joueurs[i].nom,
            role: roles[i]
        });
    }
    for (let n = 0; n < NbJoueurs; n++) {
        const joueur = joueursAvecRoles[n];
        let roleInfo = '';
        if (joueur.role === 'Mister White') {

            window.alert(`Seul ${joueur.nom} peut voir son mot secret. Appuyez sur OK à l'abris des regards.`);

            window.alert(`${joueur.nom}, votre rôle est Mister White. `);
        }
        else if (joueur.role === 'Undercover') {
            window.alert(`Seul ${joueur.nom} peut voir son mot secret. Appuyez sur OK à l'abris des regards.`);

            window.alert(`Le mot secret est : ${motSecretUndercover}`);
        }
        else if (joueur.role === 'Civil') {
            window.alert(`Seul ${joueur.nom} peut voir son mot secret. Appuyez sur OK à l'abris des regards.`);
            
            window.alert(`Le mot secret est : ${motSecret}`);
        }
            
    }
    document.getElementById("roles").style.display= 'none';
    document.getElementById("game-page").style.display= 'block'; 
    console.log("role length :", roles.length);
    console.log("Rôles distribués :", joueursAvecRoles);
    FirstPlayer();
    affichageRemaining();

    
    
    return joueursAvecRoles;


    

}


function affichageRemaining(){

    const Nbjoueurs =document.getElementById("nbJoueurs").value;


    container = document.getElementById('remaining-player');
    container.innerHTML = '';
    
    

    for (let i=0 ; i<Nbjoueurs;i++){
        remainingPlayer.push(joueurs[i].nom);
    }
    
    for (let i=0 ; i<remainingPlayer.length;i++){
        container2 = document.getElementById('selector');
        container2.innerHTML +=`
            <option value="${remainingPlayer[i]}">${remainingPlayer[i]}</option>
        `;
    }

    remainingPlayer.forEach((remainingPlayer) => {
        container.innerHTML += `
            <div class="remaining-player">
                <h3>${remainingPlayer}</h3>
            <div>
        `;
    });
    
}


function displayAll(){

    document.getElementById('getnbplayer').style.display = 'block';
    document.getElementById('etape2').style.display = 'block';
    document.getElementById('etape3').style.display='block';
    document.getElementById('roles').style.display='block';
    document.getElementById('game-page').style.display='block';


}


function getRoleByNom(name) {
    const entry = joueursAvecRoles.find(e => e.nom === name);
    return entry?.role ?? "Rôle inconnu";
}
function eliminated() {

  
    let eliminatedPlayer = document.getElementById('selector');
    eliminatedPlayerValue = eliminatedPlayer.value;
    if (eliminatedPlayer.value === ""   ){
        alert("Veuillez sélectionner un joueur à éliminer");
        return;
    }
    
    playerEliminate.push(eliminatedPlayer.value); 
    console.log("eliminés ",playerEliminate);

    remainingPlayer = remainingPlayer.filter(player => player !== eliminatedPlayer.value);
    console.log("restant ",remainingPlayer);

    const container2 = document.getElementById('selector');
    container2.innerHTML ='';

    remainingPlayer.forEach(player => {
        const option = document.createElement('option');
        option.value = player;
        option.textContent = player;
        selector.appendChild(option);
    });

    const container = document.getElementById('remaining-player');
    container.innerHTML = '';
    
    remainingPlayer.forEach((remainingPlayer) => {
        container.innerHTML += `
            <div class="remaining-player">
                <h3>${remainingPlayer}</h3>
            <div>
        `;
    });

    const eliminatedContainer = document.getElementById('eliminated-player');
    eliminatedContainer.innerHTML = '';
    
    let EliminatedRole = getRoleByNom(eliminatedPlayerValue);
    console.log("Rôle éliminé :", EliminatedRole);
    if (EliminatedRole === roleMister) {
        
        guess = window.prompt(`Le Mister White ${eliminatedPlayerValue} doit repondre. Quel est le mot secret ?`);
        if (guess.toLocaleLowerCase() === motSecret.toLocaleLowerCase()) {
            window.alert(`Mister White a trouvé le mot secret! Mister White gagne la partie!`);
            document.getElementById("game-page").style.display= 'none';
            document.getElementById("endGame").style.display = 'block';
            document.getElementById("CongratsMessage").innerHTML = `<h3>Félicitations à Mister White ${eliminatedPlayerValue} pour avoir gagné la partie en devinant le mot secret !</h3>`;
            win='Mister White';
            recap();
        

        } else {
            window.alert(`Mister White n'a pas trouvé le mot secret. La partie continue.`);
        }
    }

    playerEliminate.forEach((playerEliminate) => {
        eliminatedContainer.innerHTML += `
            <div class="eliminated-player">
                <h3>${playerEliminate}</h3>
                <h4>Rôle: ${getRoleByNom(playerEliminate)}</h4>
            <div>
        `;
    });
    winCheck();
}


function winCheck() {
    remainingUndercover = remainingPlayer.filter(player => getRoleByNom(player) === 'Undercover');
    remainingCivil = remainingPlayer.filter(player => getRoleByNom(player) === 'Civil');
    remainingMister = remainingPlayer.filter(player => getRoleByNom(player) === 'Mister White');
    
    

    if (remainingCivil.length <=1 && remainingUndercover.length > 0 && remainingMister.length === 0) {
        document.getElementById("game-page").style.display= 'none';
        document.getElementById("endGame").style.display = 'block';
        document.getElementById("CongratsMessage").innerHTML = `<h3>Félicitation les Undercovers gagnent ! </h3>`;
        win='Undercover';
        recap();
    }
    if (remainingCivil.length >=1 && remainingUndercover.length === 0 && remainingMister.length === 0) {
        document.getElementById("game-page").style.display= 'none';
        document.getElementById("endGame").style.display = 'block';
        document.getElementById("CongratsMessage").innerHTML = `<h3>Félicitation les Civils gagnent ! </h3>`;
        win='Civils';
        recap();
    }
    if (remainingCivil.length <=1 && remainingUndercover.length === 0 && remainingMister.length > 0) {
        document.getElementById("game-page").style.display= 'none';
        document.getElementById("endGame").style.display = 'block';
        document.getElementById("CongratsMessage").innerHTML = `<h3>Félicitation le Mister White gagne ! </h3>`;
        win='Mister White';
        recap();
    }
    
    if (remainingUndercover.length > 0 && remainingMister.length > 0 && remainingCivil.length <= 1) {
        document.getElementById("game-page").style.display= 'none';
        document.getElementById("endGame").style.display = 'block';
        document.getElementById("CongratsMessage").innerHTML = `<h3>Félicitation les Undercovers et le Mister White gagnent ! </h3>`;
        win='Undercover/Mister White';
        recap();

    }
    
    

    

}

function recap() {
    const recapContainer = document.getElementById('recapGame');
    recapContainer.innerHTML = '<h2>Récapitulatif des joueurs et rôles :</h2>';
    
    playerEliminate.forEach((playerEliminate) => {
        recapContainer.innerHTML += `
            <div class="recap-player">
                <h3>${playerEliminate}</h3>
                <p>Rôle: ${getRoleByNom(playerEliminate)}</p>
                <p class='eliminer'>Éliminé</p>
            </div>
        `;
    });
    remainingPlayer.forEach((remainingPlayer) => {
        recapContainer.innerHTML += `
            <div class="recap-player">
                <h3>${remainingPlayer}</h3>
                <p>Rôle: ${getRoleByNom(remainingPlayer)}</p>
                <p class='gagnant'>Vivant</p>
            </div>
        `;
    });
    updateScores();


}

function updateScores() {
    if (win === 'Undercover') {
        joueurs.forEach(joueur => {
            if (getRoleByNom(joueur.nom) === 'Undercover') {
                joueur.score += ptsUndercoverWin;
            }
        });
    }

    if (win === 'Mister White') {
        joueurs.forEach(joueur => {
            if (getRoleByNom(joueur.nom) === 'Mister White') {
                joueur.score += ptsMisterWin;
            }
        });
    }
    if (win === 'Civils') {
        joueurs.forEach(joueur => {
            if (getRoleByNom(joueur.nom) === 'Civil') {
                joueur.score += ptsCivilWin;
            }
        });
    }


    if (win === 'Undercover/Mister White') {
        joueurs.forEach(joueur => {
            if (getRoleByNom(joueur.nom) === 'Undercover') {
                joueur.score += ptsUndercoverWin;
            }
            if (getRoleByNom(joueur.nom) === 'Mister White') {
                joueur.score += ptsMisterWin;
            }
        });
    }
    
    const container = document.getElementById('scoreEndGame');
    container.innerHTML = '';
    
    joueurs.forEach((joueurs) => {
        container.innerHTML += `
            <div style="border: 2px solid #333; padding: 15px; margin: 10px 0; border-radius: 8px; background-color: #f0f0f0;">
                <h3>${joueurs.nom}</h3>
                <p style="font-size: 24px; font-weight: bold;">Score: ${joueurs.score}</p>
                
                
            </div>
            

        `;
    });
}

function replayWithSamePlayer() {
    // Réinitialiser les variables nécessaires
    remainingPlayer = [];
    playerEliminate = [];
    joueursAvecRoles.length = 0;
    roles = [];
    end = 'false';
    eliminatedPlayerValue = '';
    nbMister = 0;
    nbUndercover = 0;
    nbCivil = 0;
    win = "";

    // Réafficher la page de distribution des rôles
    document.getElementById("endGame").style.display = 'none';
    document.getElementById("roles").style.display = 'block';

    
    document.getElementById('remaining-player').innerHTML = '';
    document.getElementById('eliminated-player').innerHTML = '';
    document.getElementById('selector').innerHTML = '';

    choixMot(); 
}
