//Html elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let healthBarP1 = document.getElementById("healthBarP1");
let healthBarP2 = document.getElementById("healthBarP2");
const KnightsNumberP1 = document.getElementById("KnightsLeftNumberP1");
const KnightsNumberP2 = document.getElementById("KnightsLeftNumberP2");
const wizardsNumberP1 = document.getElementById("WizardsLeftNumberP1");
const wizardsNumberP2 = document.getElementById("WizardsLeftNumberP2");
const boltsNumberP1 = document.getElementById("BoltsLeftNumberP1");
const boltsNumberP2 = document.getElementById("BoltsLeftNumberP2");

const playerWonText = document.getElementsByClassName("playerWonText");



//Vars
let armyP1 = [];
let armyP2 = [];
let wizardsArrayP1 = [];
let wizardsArrayP2 = [];

let drawFireball = true;


//fireworks
let rndX1 = 500;
let rndX2 = 500;
let rndX3 = 1200;
let rndY1 = 200;
let rndY2 = 400;
let rndY3 = 600;

let spacing = 100;

let armySize = 6; //swordsmen/knights
KnightsNumberP1.textContent = armySize;
KnightsNumberP2.textContent = armySize;

let wizards = 3;
wizardsNumberP1.textContent = wizards;
wizardsNumberP2.textContent = wizards;

let healthP1 = 0;
let healthP2 = 0;

let battlingKnightsP1 = [];
let battlingKnightsP2 = [];
let battlingWizardsP1 = [];
let battlingWizardsP2 = [];


let battleInProgress = false;
let firstArrival = false; //first movement flag

let attackerIndex = 1; //turn to attack

let aKnightWasMoved = false;
let swordsmenAddedFlag = false;
let wizardsAddedFlag = false;

let fireFireball = false;
let roundWinner = '';


const thrust = (index) => {
    if (index === 1) {
        troopsNumberKnightP1.switchSprites('thrust');
    } else {
        troopsNumberKnightP2.switchSprites('thrust');

    }

}

//Background
const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: 'assets/imgs/background.png'
});

//Lightning bolt
const lightningBoltP1 = new Lightning(
    { x: 0, y: 0 },
    'assets/lightning.png', //img src
    12, //frames max
    1 //scale
);

const lightningBoltP2 = new Lightning(
    { x: 0, y: 0 },
    'assets/lightning.png', //img src
    12, //frames max
    1 //scale
);

let boltsLeftP1 = 180;
let boltsLeftP2 = 180;

let renderLightningBoltP1 = false;
let renderLightningBoltP2 = false;

boltsNumberP1.textContent = boltsLeftP1;
boltsNumberP2.textContent = boltsLeftP2;

//Troops left indicators
const troopsNumberKnightP1 = new Knight(-1, {
    position: { x: 50, y: 70 },
    velocity: { x: 0, y: 0 },
    offset: { x: -30, y: 0 },
    imageSrc: 'assets/knight/knightIdle.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/knight/knightIdle.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/knight/thrust.png',
            framesMax: 8
        }
    }
});

const troopsNumberKnightP2 = new Knight(-2, {
    position: { x: canvas.width - 150, y: 70 },
    velocity: { x: 0, y: 0 },
    offset: { x: -30, y: 0 },
    imageSrc: 'assets/knight/knightIdleMirrored.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/knight/knightIdleMirrored.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/knight/thrustMirrored.png',
            framesMax: 5
        }
    }
});

const troopsNumberWizardP1 = new Wizard(-1, {
    position: { x: 45, y: 165 },
    imageSrc: 'assets/wizard/wizardIdle.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/wizard/wizardIdle.png',
            framesMax: 6
        }
    },
    fireballSrc: 'assets/wizard/Fireball.png'
});

const troopsNumberWizardP2 = new Wizard(-2, {
    position: { x: 1665, y: 165 },
    imageSrc: 'assets/wizard/wizardIdleMirrored.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/wizard/wizardIdleMirrored.png',
            framesMax: 6
        }
    },
    fireballSrc: 'assets/wizard/FireballMirrored.png'
});

const purpleFirework = new Firework(
    { x: 500, y: 500 }, //Start position
    'assets/purpleFirework.png', //ImageSrc
    4, //FramesMax
    1);
const pinkFirework = new Firework(
    { x: 500, y: 800 }, //Start position
    'assets/pinkFirework.png', //ImageSrc
    4, //FramesMax
    1);
const yellowFirework = new Firework(
    { x: 500, y: 300 }, //Start position
    'assets/yellowFirework.png', //ImageSrc
    4, //FramesMax
    1);


const initializeArmies = () => {
    let posY = canvas.height - 770; //armies initial y position

    //Initialize swordsmen
    for (let i = 0; i < armySize; i++) {
        const knightP1 = new Knight(i, {
            position: { x: 670, y: posY },
            velocity: { x: 4, y: 4 },
            offset: { x: 0, y: 0 },
            imageSrc: 'assets/knight/knightIdle.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/knight/knightIdle.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/knight/walk.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/knight/thrust.png',
                    framesMax: 8
                }
            }
        });
        armyP1.push(knightP1);

        const knightP2 = new Knight(i, {
            position: { x: 1150, y: posY },
            velocity: { x: 4, y: 4 },
            offset: { x: -30, y: 0 },
            imageSrc: 'assets/knight/knightIdleMirrored.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/knight/knightIdleMirrored.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/knight/walkMirrored.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/knight/thrustMirrored.png',
                    framesMax: 8,
                }
            }
        });
        armyP2.push(knightP2);

        posY += spacing;
    }

    //Initialize wizards
    posY = canvas.height - 650;
    for (let i = 0; i < wizards; i++) {
        const wizardP1 = new Wizard(i, {
            position: { x: 500, y: posY },
            imageSrc: 'assets/wizard/wizardIdle.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/wizard/wizardIdle.png',
                    framesMax: 6
                }
            },
            fireballSrc: 'assets/wizard/Fireball.png'
        });
        wizardsArrayP1.push(wizardP1);

        const wizardP2 = new Wizard(i, {
            position: { x: 1220, y: posY },
            imageSrc: 'assets/wizard/wizardIdleMirrored.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/wizard/wizardIdleMirrored.png',
                    framesMax: 6
                }
            },
            fireballSrc: 'assets/wizard/FireballMirrored.png'
        });
        wizardsArrayP2.push(wizardP2);

        posY += spacing;
    }
}

initializeArmies();

const addKnight = (playerIndex) => {
    swordsmenAddedFlag = true;
    if (playerIndex === 1 && !battleInProgress) {
        knight = armyP1[battlingKnightsP1.length];
        knight.update(knight.position.x, knight.position.y);
        battlingKnightsP1.push(knight);

        //healthbar
        KnightsNumberP1.textContent = armySize - battlingKnightsP1.length;
        healthP1 += knight.health;
        healthBarP1.max = healthP1;
        healthBarP1.value = healthP1;
    }
    else if (playerIndex === 2 && !battleInProgress) {
        knight = armyP2[battlingKnightsP2.length];
        knight.update(knight.position.x, knight.position.y)
        battlingKnightsP2.push(knight);

        //healthbar
        KnightsNumberP2.textContent = armySize - battlingKnightsP2.length;
        healthP2 += knight.health;
        healthBarP2.max = healthP2;
        healthBarP2.value = healthP2;
    }




}

const addWizard = (playerIndex) => {
    wizardsAddedFlag = true;
    if (playerIndex === 1 && !battleInProgress) {
        wizard = wizardsArrayP1[battlingWizardsP1.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP1.push(wizard);

        console.log(battlingWizardsP1.length);

        wizardsNumberP1.textContent = wizards - battlingWizardsP1.length;
        healthP1 += wizard.health;
        healthBarP1.max = healthP1;
        healthBarP1.value = healthP1;

    } else if (playerIndex === 2 && !battleInProgress) {
        wizard = wizardsArrayP2[battlingWizardsP2.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP2.push(wizard);

        wizardsNumberP2.textContent = wizards - battlingWizardsP2.length;
        healthP2 += wizard.health;
        healthBarP2.max = healthP2;
        healthBarP2.value = healthP2;
    }





}

let attackWasCalledOnce = false;

const battleFirstCharge = () => {
    if (!firstArrival && battlingKnightsP1.length > 0 && battlingKnightsP1.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 1
        for (let i = 0; i < battlingKnightsP1.length; i++) {
            knight = armyP1[i];
            if (knight && knight.position.x !== 910 - spacing) {
                knight.update(910 - spacing, knight.position.y);
                knight.switchSprites('walk');
            }
        }
    }

    if (!firstArrival && battlingKnightsP2.length > 0 && battlingKnightsP2.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 2
        for (let i = 0; i < battlingKnightsP2.length; i++) {
            knight = armyP2[i];
            if (knight && knight.position.x !== 910 + spacing) {
                knight.update(910 + spacing, knight.position.y);
                knight.switchSprites('walk');
            }
        }
    }

    if (roundWinner === '2' || roundWinner === '') {
        if (battlingKnightsP1.length > 0 && battlingKnightsP1.some(knight => knight && knight.position.x === 910 - spacing)) {
            firstArrival = true;
            battlingKnightsP1.forEach(knight => {
                if (knight) {
                    knight.switchSprites('idle');
                }
            });
            attack();
        }
    } else if (roundWinner === '1') {
        if (battlingKnightsP2.length > 0 && battlingKnightsP2.some(knight => knight && knight.position.x === 910 + spacing)) {
            firstArrival = true;
            battlingKnightsP2.forEach(knight => {
                if (knight) {
                    knight.switchSprites('idle');
                }
            });
            attack();
        }
    }

}

const attack = () => {
    drawFireball = true;
    wizardsArrayP1.forEach(wizard => {
        if (wizard) {
            wizard.fireball.position.x = wizard.position.x;
            wizard.fireball.position.y = wizard.position.y + 60;
            wizard.collisionDetected = false;
            wizard.hasTakenDamage = false;
        }
    });

    wizardsArrayP2.forEach(wizard => {
        if (wizard) {
            wizard.fireball.position.x = wizard.position.x;
            wizard.fireball.position.y = wizard.position.y + 60;
            wizard.collisionDetected = false;
            wizard.hasTakenDamage = false;
        }
    });

    //Turn to attack
    let attacker;
    let defender;

    if (attackerIndex % 2 === 0) {
        attacker = battlingKnightsP1;
        defender = battlingKnightsP2;
    } else {
        attacker = battlingKnightsP2;
        defender = battlingKnightsP1;
    }

    let length = Math.max(battlingKnightsP1.length, battlingKnightsP2.length);

    fireFireball = true;
    //Damage infliction and its consequences
    for (let i = 0; i < length; i++) {
        let opponent;

        defender.forEach(defender => {
            if (defender && attacker[i] && defender.position.y === attacker[i].position.y && defender.health > 0) {
                opponent = defender;
            }
        });

        if (!opponent) {
            battlingWizardsP2.forEach(wizard => {
                if (wizard && attacker[i] && wizard.position.y + 30 === attacker[i].position.y && wizard.health > 0) {
                    opponent = wizard;
                }
            });
        }

        if (attacker[i] && opponent) {
            attacker[i].switchSprites('thrust');

            // Apply damage
            if (opponent && !opponent.hasTakenDamageThisRound && !isDead(opponent)) {
                let damage = Math.floor(Math.random() * (40 - 10 + 1)) + 10; //random damage for now
                if (damage > opponent.health) {
                    damage = opponent.health;
                }
                opponent.health -= damage;
                opponent.hasTakenDamageThisRound = true;

                //log debug and healthbar handling
                if (attackerIndex % 2 == 0) {
                    //console.log(`P2: ${opponent.index} health: ${opponent.health}`);
                    healthBarP2.value -= damage;
                } else {
                    //console.log(`P1: ${opponent.index} health: ${opponent.health}`);
                    healthBarP1.value -= damage;
                }

                if (isDead(opponent)) {
                    attacker[i].wasMoved = false;
                    attacker[i].occupied = false;
                    console.log(`Knight: ${opponent.index} has died`);
                    if (attackerIndex % 2 === 0) {
                        armyP2[armyP2.indexOf(opponent)] = null;
                        wizardsArrayP2[wizardsArrayP2.indexOf(opponent)] = null;
                    } else {
                        armyP1[armyP1.indexOf(opponent)] = null;
                        wizardsArrayP1[wizardsArrayP1.indexOf(opponent)] = null;

                    }

                    battlingKnightsP1[battlingKnightsP1.indexOf(opponent)] = null;
                    battlingKnightsP2[battlingKnightsP2.indexOf(opponent)] = null;
                    battlingWizardsP1[battlingWizardsP1.indexOf(opponent)] = null;
                    battlingWizardsP2[battlingWizardsP2.indexOf(opponent)] = null;

                    attacker[attacker.indexOf(opponent)] = null;
                    defender[defender.indexOf(opponent)] = null;
                }
            }
        }
    }

    setTimeout(() => { //Delay before calling attack() again 
        if ((battlingKnightsP1.some(knight => knight && knight.health > 0) && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
            (battlingKnightsP1.some(knight => knight && knight.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0))) {

            defender.forEach(knight => knight && (knight.hasTakenDamageThisRound = false));
            battlingWizardsP2.forEach(wizard => wizard && (wizard.hasTakenDamageThisRound = false));

            attackerIndex++;
            console.log(`attack was called`);
            fireFireball = false;

            attack();
        }
    }, 1200);

}

const numOfAliveTroops = (troops) => {
    let count = 0;
    troops.forEach(troop => {
        if (troop && troop.health > 0) {
            count++;
        }
    });
    return count;
}

const isLinedUpOpponentWizard = (wizard, knights) => knights.some(knight => knight && wizard && knight.position.y === wizard.position.y + 30);

const isLinedUpOpponent = (troop, knights) => knights.some(knight => knight && troop.position.y === knight.position.y);

let idleKnightsP1 = [];
let idleKnightsP2 = [];


const reArrangeKnights = (battlingKnightsP1, battlingKnightsP2) => {

    //All idle knights of P1
    for (let i = 0; i < battlingKnightsP1.length; i++) {
        if (battlingKnightsP1[i] && numOfAliveTroops(battlingKnightsP2) !== 0 && !isDead(battlingKnightsP1[i])
            && !isLinedUpOpponent(battlingKnightsP1[i], battlingKnightsP2)
            && !idleKnightsP1.includes(battlingKnightsP1[i])) {
            idleKnightsP1.push(battlingKnightsP1[i]);
            console.log(isLinedUpOpponent(battlingKnightsP1[i], battlingKnightsP2))
            console.log(idleKnightsP1);
        }

        // else if (battlingKnightsP1[i] && !isDead(battlingKnightsP1[i]) && numOfAliveTroops(battlingKnightsP2) === 0) {
        //     idleKnightsP1.push(battlingKnightsP1[i]);
        // }
    }

    //All idle knights of P2
    for (let i = 0; i < battlingKnightsP2.length; i++) {
        if (battlingKnightsP2[i] && !isDead(battlingKnightsP2[i])
            && !isLinedUpOpponent(battlingKnightsP2[i], battlingKnightsP1)
            && !idleKnightsP2.includes(battlingKnightsP2[i])) { //!battlingKnightsP1[i] 
            idleKnightsP2.push(battlingKnightsP2[i]);
        }
    }

    // Check if there are idle knights from both armies
    if (battleInProgress && idleKnightsP1.length > 0 && idleKnightsP2.length > 0) {
        console.log(`Knights need to be moved`);
        const numKnightsToMove = Math.min(idleKnightsP1.length, idleKnightsP2.length);
        console.log(numKnightsToMove);

        for (let i = 0; i < numKnightsToMove; i++) {
            if( idleKnightsP1[i] &&  idleKnightsP2[i]) {
                idleKnightsP1[i].switchSprites('walk');
                console.log(`idle1: ${idleKnightsP1.length}`);
                console.log(`idle2: ${idleKnightsP2.length}`);
    
                idleKnightsP1[i].update(idleKnightsP1[i].position.x, idleKnightsP2[i].position.y);
                console.log(`Knight ${idleKnightsP1[i].index} was moved to align with knight ${idleKnightsP2[i].index}`);
                if (idleKnightsP1[i].position.y === idleKnightsP2[i].position.y) {
                    idleKnightsP1[i].switchSprites('idle');
                    idleKnightsP1.splice(i, 1);
                    idleKnightsP2.splice(i, 1);
                }
            }

        }
    }

    else if (firstArrival && battleInProgress && numOfAliveTroops(battlingKnightsP2) === 0) {
        for (let i = 0; i < battlingWizardsP2.length; i++) {
            if (battlingKnightsP1[i] && battlingWizardsP2[i] && !isLinedUpOpponentWizard(battlingWizardsP2[i], battlingKnightsP1)) {
                battlingKnightsP1[i].switchSprites('walk');
                battlingKnightsP1[i].update(battlingWizardsP2[i].position.x, battlingWizardsP2[i].position.y + 30);
                if (battlingKnightsP1[i].position.y === battlingWizardsP2[i].position.y + 30) {
                    battlingKnightsP1[i].switchSprites('idle');
                }
            }
        }
    }



}

const renderArmy = () => {
    background.update();
    troopsNumberKnightP1.update(troopsNumberKnightP1.position.x, troopsNumberKnightP1.position.y);
    troopsNumberKnightP2.update(troopsNumberKnightP2.position.x, troopsNumberKnightP2.position.y);

    troopsNumberWizardP1.update();
    troopsNumberWizardP2.update();

    //Fireworks
    if (didBattleEnd()) {
        if (purpleFirework.framesElapsed === 36) {
            rndX1 = Math.random() * (1800 - 100) + 400; // Random value between 400 and 1500 for X
            rndX2 = Math.random() * (1900 - 100) + 400;
            rndX3 = Math.random() * (1700 - 300) + 400;
            rndY1 = Math.random() * (800 - 100) + 100;   // Random value between 100 and 800 for Y
            rndY2 = Math.random() * (800 - 100) + 100;
            rndY3 = Math.random() * (800 - 100) + 100;
            purpleFirework.framesElapsed = 0;
        }
        purpleFirework.update(rndX1, rndY1);
        pinkFirework.update(rndX2, rndY2);
        yellowFirework.update(rndX3, rndY3);
    }


    for (let i = 0; i < battlingKnightsP1.length; i++) {
        knight = battlingKnightsP1[i];
        if (knight) {
            knight.update(knight.position.x, knight.position.y); //also draws the knight
            // console.log(firstArrival);
            // console.log(knight.framesElapsed);
            if (knight.position.x === 845 && knight.framesElapsed === 30) {
                knight.switchSprites('idle');
                knight.framesElapsed = 0;
            }

            //debugging text
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(i, armyP1[i].position.x, armyP1[i].position.y + 30);
        }
    }

    for (let i = 0; i < battlingKnightsP2.length; i++) {
        knight = battlingKnightsP2[i];

        if (knight) {
            // console.log(firstArrival);
            // console.log(knight.framesElapsed);

            knight.update(knight.position.x, knight.position.y);  //also draws the knight
            if (knight.position.x === 975 && knight.framesElapsed === 30) {
                knight.switchSprites('idle');
                knight.framesElapsed = 0;
            }

            //debugging text
            ctx.fillStyle = "black";
            ctx.font = "12px Arial";
            ctx.fillText(i, knight.position.x, knight.position.y + 30);
        }
    }

    for (let i = 0; i < battlingWizardsP1.length; i++) {
        if (wizardsArrayP1[i]) {
            wizardsArrayP1[i].update();
        }
    }

    for (let i = 0; i < battlingWizardsP2.length; i++) {
        if (wizardsArrayP2[i]) {
            wizardsArrayP2[i].update();
        }
    }

    if (renderLightningBoltP1) {
        lightningBoltP1.update();
        if (lightningBoltP1.framesElapsed === 48) {
            renderLightningBoltP1 = false;
            lightningBoltP1.framesElapsed = 0;
        }
    }

    if (renderLightningBoltP2) {
        lightningBoltP2.update();
        if (lightningBoltP2.framesElapsed === 48) {
            renderLightningBoltP2 = false;
            lightningBoltP2.framesElapsed = 0;
        }

    }
}

const isDead = (knight) => (knight && knight.health > 0) ? false : true;

const toggleBattle = () => { battleInProgress = true; };

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderArmy(); // Renders the army every frame

    reArrangeKnights(battlingKnightsP1, battlingKnightsP2);

    animateWizardAttacks();

    if (battleInProgress && !firstArrival) {
        battleFirstCharge();
    }

    didBattleEnd();

    window.requestAnimationFrame(animate);
}

const didBattleEnd = () => {
    if (battleInProgress) {
        if ((battlingKnightsP1.length === 0 || !battlingKnightsP1.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP1.length === 0 || !battlingWizardsP1.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingKnightsP2.length !== 0 && battlingKnightsP2.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP2.length !== 0 && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)))) {
            if (KnightsNumberP1.textContent === '0' && wizardsNumberP1.textContent === '0') {
                for (let i = 0; i < playerWonText.length; i++) {
                    playerWonText[i].textContent = 'Player I Won';
                } return true;
            }
            else { //only the round ended
                firstArrival = false;
                roundWinner = '2';
                battleInProgress = false;
            }
        } else if ((battlingKnightsP2.length === 0 || !battlingKnightsP2.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP2.length === 0 || !battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingKnightsP1.length !== 0 && battlingKnightsP1.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP1.length !== 0 && battlingWizardsP1.some(wizard => wizard && wizard.health > 0)))) {

            if (KnightsNumberP2.textContent === '0' && wizardsNumberP2.textContent === '0') {
                for (let i = 0; i < playerWonText.length; i++) {
                    playerWonText[i].textContent = 'Player II Won';
                } return true;
            } else { //only the round ended
                firstArrival = false;
                roundWinner = '1';
                battleInProgress = false;
            }
        }
    }
    return false;
}

const animateWizardAttacks = () => {
    const attackEnemies = (wizardsArray, opponentKnights, opponentWizards) => {
        const aliveEnemyKnights = opponentKnights.filter(knight => knight && knight.health > 0);
        const aliveEnemyWizards = opponentWizards.filter(wizard => wizard && wizard.health > 0);

        if (aliveEnemyKnights.length > 0 && battleInProgress) {
            wizardsArray.forEach((wizard, index) => {
                const targetKnight = aliveEnemyKnights[index % aliveEnemyKnights.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetKnight && fireFireball && targetKnight.health > 0) {
                    wizard.fire(targetKnight.position.x, targetKnight.position.y, drawFireball);
                    if (detectCollision(wizard.fireball, targetKnight) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = Math.floor(Math.random() * 26) + 10; //Random damage

                        if (damage > targetKnight.health) {
                            damage = targetKnight.health;
                        }

                        targetKnight.health -= damage; // Damage infliction
                        targetKnight.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP2.value -= damage;
                        } else {
                            healthBarP1.value -= damage;
                        }

                        if (isDead(targetKnight)) {
                            drawFireball = false;
                            if (attackerIndex % 2 === 0) {
                                armyP2 = armyP2.map(knight => (knight === targetKnight) ? null : knight);
                            }
                            else {
                                armyP1 = armyP1.map(knight => (knight === targetKnight) ? null : knight);
                            }
                            battlingKnightsP1[battlingKnightsP1.indexOf(targetKnight)] = null;
                            battlingKnightsP2[battlingKnightsP2.indexOf(targetKnight)] = null;
                            opponentKnights[opponentKnights.indexOf(targetKnight)] = null;
                        }
                    }
                }
            });
        }
        else if (aliveEnemyWizards.length > 0 && battleInProgress) {
            wizardsArray.forEach((wizard, index) => {
                const targetWizard = aliveEnemyWizards[index % aliveEnemyWizards.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetWizard && fireFireball) {
                    if (attackerIndex % 2 == 0) {
                        wizard.fire(1270, targetWizard.position.y + 60, drawFireball);
                    } else {
                        wizard.fire(targetWizard.position.x, targetWizard.position.y + 60, drawFireball);
                    }

                    if (detectCollision(wizard.fireball, targetWizard) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = Math.floor(Math.random() * 26) + 10; //Random damage

                        if (damage > targetWizard.health) {
                            damage = targetWizard.health;
                        }
                        targetWizard.health -= damage; // Damage infliction
                        targetWizard.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP2.value -= damage;
                        } else {
                            healthBarP1.value -= damage;
                        }

                        if (isDead(targetWizard)) {
                            drawFireball = false;
                            console.log(`Wizard: ${targetWizard.index} has died`);
                            if (attackerIndex % 2 === 0) {
                                wizardsArrayP2[wizardsArrayP2.indexOf(targetWizard)] = null;
                            } else {
                                wizardsArrayP1[wizardsArrayP1.indexOf(targetWizard)] = null;
                            }
                            battlingWizardsP1[battlingWizardsP1.indexOf(targetWizard)] = null;
                            battlingWizardsP2[battlingWizardsP2.indexOf(targetWizard)] = null;
                            aliveEnemyWizards[aliveEnemyWizards.indexOf(targetWizard)] = null;
                        }
                    }
                }
            });
        }
    };

    if (attackerIndex % 2 == 0) {
        attackEnemies(battlingWizardsP1, battlingKnightsP2, battlingWizardsP2);
    } else {
        attackEnemies(battlingWizardsP2, battlingKnightsP1, battlingWizardsP1);
    }
}

const detectCollision = (fireball, opponent) => {
    let distX = Math.abs(fireball.position.x - opponent.position.x - 40 / 2);
    let distY = Math.abs(fireball.position.y - opponent.position.y - 60 / 2);

    if (distX > (40 / 2 + 10)) { return false; }
    if (distY > (60 / 2 + 10)) { return false; }

    if (distX <= (40 / 2) || distY <= (60 / 2)) {
        console.log('Collision detected');
        return true;
    }

    let dx = distX - 40 / 2;
    let dy = distY - 60 / 2;
    return (dx * dx + dy * dy <= (10 * 10));
}

const lightning = (turn) => {
    const findRndAliveTroopsIndex = (knights, wizards) => {
        const aliveKnightsIndexes = [];
        knights.forEach((knight, index) => {
            if (knight && knight.health > 0) {
                aliveKnightsIndexes.push({ type: 'knight', index });
            }
        });

        const aliveWizardsIndexes = [];
        wizards.forEach((wizard, index) => {
            if (wizard && wizard.health > 0) {
                aliveWizardsIndexes.push({ type: 'wizard', index });
            }
        });

        const allAliveIndexes = aliveKnightsIndexes.concat(aliveWizardsIndexes);

        if (allAliveIndexes.length > 0) {
            const rndIndex = Math.floor(Math.random() * allAliveIndexes.length);
            const { index, type } = allAliveIndexes[rndIndex];
            return { index, type };
        } else {
            return -1;
        }
    };

    let damage = Math.floor(Math.random() * (50 - 30 + 1)) + 30;

    if (battleInProgress && turn === 1 && boltsLeftP1 > 0) {
        let { index, type } = findRndAliveTroopsIndex(battlingKnightsP2, battlingWizardsP2);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingKnightsP2[index]) {

                    lightningBoltP1.position.x = battlingKnightsP2[index].position.x - 10;
                    lightningBoltP1.position.y = battlingKnightsP2[index].position.y - 360;
                }

                damage = Math.min(damage, battlingKnightsP2[index] ? battlingKnightsP2[index].health : 0);
                if (battlingKnightsP2[index]) {
                    battlingKnightsP2[index].health -= damage;
                }

                if (isDead(battlingKnightsP2[index])) {
                    armyP2[index] = null;
                    battlingKnightsP2[index] = null;
                }

                healthBarP2.value -= damage;

            }
            else if (type === 'wizard') {
                if (battlingWizardsP2[index]) {
                    lightningBoltP1.position.x = battlingWizardsP2[index].position.x + 80;
                    lightningBoltP1.position.y = battlingWizardsP2[index].position.y - 325;
                }

                damage = Math.min(damage, battlingWizardsP2[index] ? battlingWizardsP2[index].health : 0);

                if (battlingWizardsP2[index]) {
                    battlingWizardsP2[index].health -= damage;
                }

                if (isDead(battlingWizardsP2[index])) {
                    wizardsArrayP2[index] = null;
                    battlingWizardsP2[index] = null;
                }

                healthBarP2.value -= damage;
            }
            boltsLeftP1--;
            boltsNumberP1.textContent = boltsLeftP1;
            renderLightningBoltP1 = true;
        }
    }
    else if (battleInProgress && turn === 2 && boltsLeftP2 > 0) {
        let { index, type } = findRndAliveTroopsIndex(battlingKnightsP1, battlingWizardsP1);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingKnightsP1[index]) {
                    lightningBoltP2.position.x = battlingKnightsP1[index].position.x - 40;
                    lightningBoltP2.position.y = battlingKnightsP1[index].position.y - 360;
                }

                damage = Math.min(damage, battlingKnightsP1[index] ? battlingKnightsP1[index].health : 0);

                if (battlingKnightsP1[index]) {
                    battlingKnightsP1[index].health -= damage;
                }

                if (isDead(battlingKnightsP1[index])) {
                    armyP1[index] = null;
                    battlingKnightsP1[index] = null;
                }

                healthBarP1.value -= damage;

            }
            else if (type === 'wizard') {
                if (battlingWizardsP1[index]) {
                    lightningBoltP2.position.x = battlingWizardsP1[index].position.x - 30
                    lightningBoltP2.position.y = battlingWizardsP1[index].position.y - 325;
                }

                damage = Math.min(damage, battlingWizardsP1[index] ? battlingWizardsP1[index].health : 0);
                if (battlingWizardsP1[index]) {
                    battlingWizardsP1[index].health -= damage;
                }

                if (isDead(battlingWizardsP1[index])) {
                    wizardsArrayP1[index] = null;
                    battlingWizardsP1[index] = null;
                }

                healthBarP1.value -= damage;
            }
            boltsLeftP2--;
            boltsNumberP2.textContent = boltsLeftP2;
            renderLightningBoltP2 = true;
        }
    }
}

animate();