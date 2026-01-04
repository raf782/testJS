let joueurs = [];
let remainingPlayer = [];
    

let playerEliminate = [];

let joueursAvecRoles = [{
        nom :"",
        role :""
    }];

let roles = [] ;


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
    const Nbjoueurs =document.getElementById("nbJoueurs").value;
    const mister_white= "Mister";
    const sous_couv ="Undercover";
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

    const container = document.getElementById('etape3');
    container.innerHTML = '';
    
    joueurs.forEach((joueurs, index) => {
        container.innerHTML += `
            <div style="border: 2px solid #333; padding: 15px; margin: 10px 0; border-radius: 8px; background-color: #f0f0f0;">
                <h3>${joueurs.nom}</h3>
                <p style="font-size: 24px; font-weight: bold;">Score: ${joueurs.score}</p>
                
                
            </div>
            <button onclick="changementPage()">Continuer</button>

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
    const nbMister = parseInt(document.getElementById("nbMister").value);
    const nbUndercover = parseInt(document.getElementById("nbUndercover").value);
    const nbCivil = parseInt(document.getElementById("nbCivil").value) ;
    



    if ((nbCivil+nbMister+nbUndercover) < NbJoueurs){
        alert("Le nombre de roles ne correspond pas au nombre de joueurs")
        return;
    }
    
    for (let i = 0; i < nbMister; i++) {
        roles.push("Mister");
    }

    for (let i = 0; i < nbCivil; i++) {
        roles.push("Civil");
    }

    for (let i = 0; i < nbUndercover; i++) {
        roles.push("Undercover");
    }

    for (let i = roles.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [roles[i], roles[j]] = [roles[j], roles[i]];
    }
    const joueursAvecRoles = [];
    for (let i = 0; i < NbJoueurs; i++) {
        joueursAvecRoles.push({
            nom: joueurs[i].nom,
            role: roles[i]
        });
    }
    
    
    document.getElementById("roles").style.display= 'none';
    document.getElementById("game-page").style.display= 'block'; 
    console.log("role length :", roles.length);
    console.log("Rôles distribués :", joueursAvecRoles);
    FirstPlayer();
    affichageRemaining();

    
    
    return roles;


    

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

function eliminated() {

  
    eliminatedPlayer = document.getElementById('selector');

    if (eliminatedPlayer.value === ""   ){
        alert("Veuillez sélectionner un joueur à éliminer");
        return;
    }
    
    playerEliminate.push(eliminatedPlayer.value); 
    console.log("eliminés ",playerEliminate);

    remainingPlayer = remainingPlayer.filter(player => player !== eliminatedPlayer.value);
    console.log("restant ",remainingPlayer);

    container2 = document.getElementById('selector');
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

    playerEliminate.forEach((playerEliminate) => {
        eliminatedContainer.innerHTML += `
            <div class="eliminated-player">
                <h3>${playerEliminate}</h3>
            <div>
        `;
    });





}



