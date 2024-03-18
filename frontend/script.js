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


//Vars
let armyP1 = [];
let armyP2 = [];
let wizardsArrayP1 = [];
let wizardsArrayP2 = [];

let drawFireball = true;

let spacing = 100;

let armySize = 6; //swordsmen/soldiers
KnightsNumberP1.textContent = armySize;
KnightsNumberP2.textContent = armySize;

let wizards = 3;
wizardsNumberP1.textContent = wizards;
wizardsNumberP2.textContent = wizards;

let healthP1 = 0;
let healthP2 = 0;

let battlingSoldiersP1 = [];
let battlingSoldiersP2 = [];
let battlingWizardsP1 = [];
let battlingWizardsP2 = [];


let battleInProgress = false;
let firstArrival = false; //first movement flag

let attackerIndex = 1; //turn to attack

let aSoldierWasMoved = false;
let swordsmenAddedFlag = false;
let wizardsAddedFlag = false;

let fireFireball = false;
let roundWinner = '';


const thrust = (index) => {
    if (index === 1) {
        troopsNumberSoldierP1.switchSprites('thrust');
    } else {
        troopsNumberSoldierP2.switchSprites('thrust');

    }

}

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
const troopsNumberSoldierP1 = new Soldier(-1, {
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

const troopsNumberSoldierP2 = new Soldier(-2, {
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


const initializeArmies = () => {
    let posY = canvas.height - 770; //armies initial y position

    //Initialize swordsmen
    for (let i = 0; i < armySize; i++) {
        const soldierP1 = new Soldier(i, {
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
        armyP1.push(soldierP1);

        const soldierP2 = new Soldier(i, {
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
        armyP2.push(soldierP2);

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
    if (playerIndex === 1) {
        soldier = armyP1[battlingSoldiersP1.length];
        soldier.update(soldier.position.x, soldier.position.y);
        battlingSoldiersP1.push(soldier);

        KnightsNumberP1.textContent = armySize - battlingSoldiersP1.length;
        healthP1 += soldier.health;
    }
    else if (playerIndex === 2) {
        soldier = armyP2[battlingSoldiersP2.length];
        soldier.update(soldier.position.x, soldier.position.y)
        battlingSoldiersP2.push(soldier);

        KnightsNumberP2.textContent = armySize - battlingSoldiersP2.length;
        healthP2 += soldier.health;
    }

    healthBarP1.max = healthP1;
    healthBarP1.value = healthP1;

    healthBarP2.max = healthP2;
    healthBarP2.value = healthP2;

}
let fireWizards = [];

const addWizard = (playerIndex) => {
    wizardsAddedFlag = true;
    if (playerIndex === 1) {
        wizard = wizardsArrayP1[battlingWizardsP1.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP1.push(wizard);

        console.log(battlingWizardsP1.length);

        wizardsNumberP1.textContent = wizards - battlingWizardsP1.length;
        healthP1 += wizard.health;
        fireWizards.push(wizard);

    } else if (playerIndex === 2) {
        wizard = wizardsArrayP2[battlingWizardsP2.length];
        wizard.update(wizard.position.x, wizard.position.y);
        battlingWizardsP2.push(wizard);

        wizardsNumberP2.textContent = wizards - battlingWizardsP2.length;
        healthP2 += wizard.health;
    }


    healthBarP1.max = healthP1;
    healthBarP1.value = healthP1;

    healthBarP2.max = healthP2;
    healthBarP2.value = healthP2;
}

let attackWasCalledOnce = false;

const battleFirstCharge = () => {
    if (!firstArrival && battlingSoldiersP1.length > 0 && battlingSoldiersP1.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 1
        for (let i = 0; i < battlingSoldiersP1.length; i++) {
            soldier = armyP1[i];
            if (soldier && soldier.position.x !== 910 - spacing) {
                soldier.update(910 - spacing, soldier.position.y);
                soldier.switchSprites('walk');
            }
        }
    }

    if (!firstArrival && battlingSoldiersP2.length > 0 && battlingSoldiersP2.some(knight => knight)) {
        spacing = 65;
        // Battling troops movement for Player 2
        for (let i = 0; i < battlingSoldiersP2.length; i++) {
            soldier = armyP2[i];
            if (soldier && soldier.position.x !== 910 + spacing) {
                soldier.update(910 + spacing, soldier.position.y);
                soldier.switchSprites('walk');
            }
        }
    }

    if (roundWinner === '2' || roundWinner === '') {
        if (battlingSoldiersP1.length > 0 && battlingSoldiersP1.some(knight => knight && knight.position.x === 910 - spacing)) {
            firstArrival = true;
            battlingSoldiersP1.forEach(soldier => {
                if (soldier) {
                    soldier.switchSprites('idle');
                }
            });
            battlingSoldiersP2.forEach(soldier => {
                if (soldier) {
                    soldier.switchSprites('idle');
                }
            });
            attack();
        } else if (battlingSoldiersP1.length === 0 && !attackWasCalledOnce) {
            attackWasCalledOnce = true;
            attack();
        }
    } else if (roundWinner === '1') {
        if (battlingSoldiersP2.length > 0 && battlingSoldiersP2.some(knight => knight && knight.position.x === 910 + spacing)) {
            firstArrival = true;
            console.log(`go`);
            battlingSoldiersP1.forEach(soldier => {
                if (soldier) {
                    soldier.switchSprites('idle');
                }
            });
            battlingSoldiersP2.forEach(soldier => {
                if (soldier) {
                    soldier.switchSprites('idle');
                }
            });
            attack();
        } else if (battlingSoldiersP2.length === 0 && !attackWasCalledOnce) {
            attackWasCalledOnce = true;
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
        attacker = battlingSoldiersP1;
        defender = battlingSoldiersP2;
    } else {
        attacker = battlingSoldiersP2;
        defender = battlingSoldiersP1;
    }

    let length = Math.max(battlingSoldiersP1.length, battlingSoldiersP2.length);

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
                    console.log(`Soldier: ${opponent.index} has died`);
                    if (attackerIndex % 2 === 0) {
                        armyP2[armyP2.indexOf(opponent)] = null;
                        wizardsArrayP2[wizardsArrayP2.indexOf(opponent)] = null;
                    } else {
                        armyP1[armyP1.indexOf(opponent)] = null;
                        wizardsArrayP1[wizardsArrayP1.indexOf(opponent)] = null;

                    }

                    battlingSoldiersP1[battlingSoldiersP1.indexOf(opponent)] = null;
                    battlingSoldiersP2[battlingSoldiersP2.indexOf(opponent)] = null;
                    battlingWizardsP1[battlingWizardsP1.indexOf(opponent)] = null;
                    battlingWizardsP2[battlingWizardsP2.indexOf(opponent)] = null;

                    attacker[attacker.indexOf(opponent)] = null;
                    defender[defender.indexOf(opponent)] = null;
                }
            }
        }
    }

    setTimeout(() => { //Delay before calling attack() again 
        if ((battlingSoldiersP1.some(soldier => soldier && soldier.health > 0) && battlingSoldiersP2.some(soldier => soldier && soldier.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) ||
            (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) && battlingSoldiersP2.some(soldier => soldier && soldier.health > 0)) ||
            (battlingSoldiersP1.some(soldier => soldier && soldier.health > 0) && battlingWizardsP2.some(wizard => wizard && wizard.health > 0))) {

            defender.forEach(soldier => soldier && (soldier.hasTakenDamageThisRound = false));
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

const isLinedUpOpponent = (troop, array) => array.some(soldier => soldier && troop.position.y === soldier.position.y);


const reArrangeSoldiers = (battlingSoldiersP1, battlingSoldiersP2) => {
    let idleSoldiersP1 = [];
    let idleSoldiersP2 = [];

    //All idle knights of P1
    for (let i = 0; i < battlingSoldiersP1.length; i++) {
        if (battlingSoldiersP1[i] && numOfAliveTroops(battlingSoldiersP2) !== 0 && !isDead(battlingSoldiersP1[i]) &&
            !isLinedUpOpponent(battlingSoldiersP1[i], battlingSoldiersP2)) { //!battlingSoldiersP2[i] 
            idleSoldiersP1.push(battlingSoldiersP1[i]);
        } else if (battlingSoldiersP1[i] && !isDead(battlingSoldiersP1[i]) && numOfAliveTroops(battlingSoldiersP2) === 0) {
            idleSoldiersP1.push(battlingSoldiersP1[i]);
        }
    }

    //All idle knights of P2
    for (let i = 0; i < battlingSoldiersP2.length; i++) {
        if (battlingSoldiersP2[i] && !isDead(battlingSoldiersP2[i]) &&
            !isLinedUpOpponent(battlingSoldiersP2[i], battlingSoldiersP1)) { //!battlingSoldiersP1[i] 
            idleSoldiersP2.push(battlingSoldiersP2[i]);
        }
    }

    // Check if there are idle soldiers from both armies
    if (idleSoldiersP1.length > 0 && idleSoldiersP2.length > 0) {
        console.log(`Soldiers need to be moved`);
        const numSoldiersToMove = Math.min(idleSoldiersP1.length, idleSoldiersP2.length);

        for (let i = 0; i < numSoldiersToMove; i++) {
            //if (!idleSoldiersP1[i].wasMoved) {
            idleSoldiersP1[i].switchSprites('walk');
            idleSoldiersP1[i].update(idleSoldiersP1[i].position.x, idleSoldiersP2[i].position.y);
            console.log(`Soldier ${idleSoldiersP1[i].index} was moved to align with soldier ${idleSoldiersP2[i].index}`);
            if (idleSoldiersP1[i].position.y === idleSoldiersP2[i].position.y) {
                //idleSoldiersP1[i].wasMoved = true;
                idleSoldiersP1[i].switchSprites('idle');
            }
            //}
        }
    }
    // else if (firstArrival && numOfAliveTroops(battlingSoldiersP2) === 0) {
    //     for (let i = 0; i < battlingWizardsP2.length; i++) {
    //         if (battlingSoldiersP1[i] && battlingWizardsP2[i] && !isLinedUpOpponentWizard(battlingWizardsP2[i], battlingSoldiersP1)) {
    //             battlingSoldiersP1[i].switchSprites('walk');
    //             battlingSoldiersP1[i].update(battlingWizardsP2[i].position.x, battlingWizardsP2[i].position.y + 30);
    //             if (battlingSoldiersP1[i].position.y === battlingWizardsP2[i].position.y + 30) {
    //                 battlingSoldiersP1[i].switchSprites('idle');
    //             }
    //         }
    //     }
    // }


}


const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: 'assets/background.png'
});

const renderArmy = () => {
    background.update();
    troopsNumberSoldierP1.update(troopsNumberSoldierP1.position.x, troopsNumberSoldierP1.position.y);
    troopsNumberSoldierP2.update(troopsNumberSoldierP2.position.x, troopsNumberSoldierP2.position.y);

    troopsNumberWizardP1.update();
    troopsNumberWizardP2.update();

    if (swordsmenAddedFlag) {
        for (let i = 0; i < battlingSoldiersP1.length; i++) {
            if (armyP1[i]) {
                armyP1[i].update(armyP1[i].position.x, armyP1[i].position.y);


                if (firstArrival && armyP1[i].framesElapsed === 30) {
                    armyP1[i].switchSprites('idle');
                    armyP1[i].framesElapsed = 0;
                }

                //debugging text
                ctx.fillStyle = "black";
                ctx.font = "12px Arial";
                ctx.fillText(i, armyP1[i].position.x, armyP1[i].position.y - 10);
            }
        }

        for (let i = 0; i < battlingSoldiersP2.length; i++) {

            if (armyP2[i]) {
                armyP2[i].update(armyP2[i].position.x, armyP2[i].position.y);

                if (firstArrival && armyP2[i].framesElapsed === 30) {
                    armyP2[i].switchSprites('idle');
                    armyP2[i].framesElapsed = 0;
                }

                //debugging text
                ctx.fillStyle = "black";
                ctx.font = "12px Arial";
                ctx.fillText(i, armyP2[i].position.x, armyP2[i].position.y - 10);
            }
        }
    }

    if (wizardsAddedFlag) {
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

const isDead = (soldier) => (soldier && soldier.health > 0) ? false : true;

const toggleBattle = () => battleInProgress = true;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderArmy(); // Renders the army every frame

    reArrangeSoldiers(battlingSoldiersP1, battlingSoldiersP2);

    animateWizardAttacks();

    if (battleInProgress && !firstArrival) {
        battleFirstCharge();
    }

    didBattleEnd();

    window.requestAnimationFrame(animate);
}

const didBattleEnd = () => {
    if (battleInProgress) {
        if ((battlingSoldiersP1.length === 0 || !battlingSoldiersP1.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP1.length === 0 || !battlingWizardsP1.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingSoldiersP2.length !== 0 && battlingSoldiersP2.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP2.length !== 0 && battlingWizardsP2.some(wizard => wizard && wizard.health > 0)))) {
            if (KnightsNumberP1.textContent === '0' && wizardsNumberP1.textContent === '0') {
                console.log(`Player 2 won`);
            }
            else {
                firstArrival = false;
                roundWinner = '2';
            }
        } else if ((battlingSoldiersP2.length === 0 || !battlingSoldiersP2.some(knight => knight && knight.health > 0)) &&
            (battlingWizardsP2.length === 0 || !battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) &&
            ((battlingSoldiersP1.length !== 0 && battlingSoldiersP1.some(knight => knight && knight.health > 0)) ||
                (battlingWizardsP1.length !== 0 && battlingWizardsP1.some(wizard => wizard && wizard.health > 0)))) {

            if (KnightsNumberP2.textContent === '0' && wizardsNumberP2.textContent === '0') {
                console.log(`Player 1 won`);
            } else {
                firstArrival = false;
                roundWinner = '1';
            }
        }
    }
}

const animateWizardAttacks = () => {
    const attackEnemies = (wizardsArray, opponentKnights, opponentWizards) => {
        const aliveEnemyKnights = opponentKnights.filter(soldier => soldier && soldier.health > 0);
        const aliveEnemyWizards = opponentWizards.filter(wizard => wizard && wizard.health > 0);

        if (aliveEnemyKnights.length > 0) {
            wizardsArray.forEach((wizard, index) => {
                const targetSoldier = aliveEnemyKnights[index % aliveEnemyKnights.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetSoldier && fireFireball && targetSoldier.health > 0) {
                    wizard.fire(targetSoldier.position.x, targetSoldier.position.y, drawFireball);
                    if (detectCollision(wizard.fireball, targetSoldier) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = Math.floor(Math.random() * 26) + 10; //Random damage

                        if (damage > targetSoldier.health) {
                            damage = targetSoldier.health;
                        }

                        targetSoldier.health -= damage; // Damage infliction
                        targetSoldier.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP2.value -= damage;
                        } else {
                            healthBarP1.value -= damage;
                        }

                        if (isDead(targetSoldier)) {
                            drawFireball = false;
                            if (attackerIndex % 2 === 0) {
                                armyP2 = armyP2.map(soldier => (soldier === targetSoldier) ? null : soldier);
                            }
                            else {
                                armyP1 = armyP1.map(soldier => (soldier === targetSoldier) ? null : soldier);
                            }
                            battlingSoldiersP1[battlingSoldiersP1.indexOf(targetSoldier)] = null;
                            battlingSoldiersP2[battlingSoldiersP2.indexOf(targetSoldier)] = null;
                            opponentKnights[opponentKnights.indexOf(targetSoldier)] = null;
                        }
                    }
                }
            });
        }
        else if (aliveEnemyWizards.length > 0) {
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
        attackEnemies(battlingWizardsP1, battlingSoldiersP2, battlingWizardsP2);
    } else {
        attackEnemies(battlingWizardsP2, battlingSoldiersP1, battlingWizardsP1);
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
        let { index, type } = findRndAliveTroopsIndex(battlingSoldiersP2, battlingWizardsP2);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingSoldiersP2[index]) {

                    lightningBoltP1.position.x = battlingSoldiersP2[index].position.x - 10;
                    lightningBoltP1.position.y = battlingSoldiersP2[index].position.y - 360;
                }

                damage = Math.min(damage, battlingSoldiersP2[index] ? battlingSoldiersP2[index].health : 0);
                if (battlingSoldiersP2[index]) {
                    battlingSoldiersP2[index].health -= damage;
                }

                if (isDead(battlingSoldiersP2[index])) {
                    armyP2[index] = null;
                    battlingSoldiersP2[index] = null;
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
        let { index, type } = findRndAliveTroopsIndex(battlingSoldiersP1, battlingWizardsP1);
        if (index >= 0) {
            if (type === 'knight') {
                if (battlingSoldiersP1[index]) {
                    lightningBoltP2.position.x = battlingSoldiersP1[index].position.x - 40;
                    lightningBoltP2.position.y = battlingSoldiersP1[index].position.y - 360;
                }

                damage = Math.min(damage, battlingSoldiersP1[index] ? battlingSoldiersP1[index].health : 0);

                if (battlingSoldiersP1[index]) {
                    battlingSoldiersP1[index].health -= damage;
                }

                if (isDead(battlingSoldiersP1[index])) {
                    armyP1[index] = null;
                    battlingSoldiersP1[index] = null;
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