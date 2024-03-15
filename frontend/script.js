//Html elements
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let healthBarP1 = document.getElementById("healthBarP1");
let healthBarP2 = document.getElementById("healthBarP2");
const swordsmenNumberP1 = document.getElementById("SwordsmenLeftNumberP1");
const swordsmenNumberP2 = document.getElementById("SwordsmenLeftNumberP2");
const wizardsNumberP1 = document.getElementById("WizardsLeftNumberP1");
const wizardsNumberP2 = document.getElementById("WizardsLeftNumberP2");

//Vars
let armyP1 = [];
let armyP2 = [];
let wizardsArrayP1 = [];
let wizardsArrayP2 = [];

let drawFireball = true;

let spacing = 100;

let armySize = 6; //swordsmen/soldiers
swordsmenNumberP1.textContent = armySize;
swordsmenNumberP2.textContent = armySize;

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

let fireballInFlight = false;
let fireFireball = false;

let firstThrust = true;

const thrust = (index) => {
    if (index === 1) {
        troopsNumberSoldierP1.switchSprites('thrust');
    } else {
        troopsNumberSoldierP2.switchSprites('thrust');

    }

}

let fireballbutton = false;
const fireball = () => {
    fireballbutton = true;
}

//Troops left indicators
const troopsNumberSoldierP1 = new Soldier(-1, {
    position: { x: 50, y: 70 },
    velocity: { x: 0, y: 0 },
    offset: { x: -30, y: 0 },
    imageSrc: 'assets/idle.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/idle.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/thrust.png',
            framesMax: 8
        }
    }
});

const troopsNumberSoldierP2 = new Soldier(-2, {
    position: { x: canvas.width - 150, y: 70 },
    velocity: { x: 0, y: 0 },
    offset: { x: -30, y: 0 },
    imageSrc: 'assets/idleMirrored.png',
    framesMax: 5,
    scale: 0.4,
    sprites: {
        idle: {
            imageSrc: 'assets/idleMirrored.png',
            framesMax: 5
        },
        thrust: {
            imageSrc: 'assets/thrustFlipped.png',
            framesMax: 5
        }
    }
});

const troopsNumberWizardP1 = new Wizard(-1, {
    position: { x: 45, y: 165 },
    imageSrc: 'assets/mageIdle.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/mageIdle.png',
            framesMax: 6
        },
        fireballSrc: 'assets/Fireball/Fireball.png'

    }
});

const troopsNumberWizardP2 = new Wizard(-1, {
    position: { x: 1665, y: 165 },
    imageSrc: 'assets/mageIdleMirrored.png',
    framesMax: 6,
    scale: 1,
    sprites: {
        idle: {
            imageSrc: 'assets/mageIdleMirrored.png',
            framesMax: 6
        },
        fireballSrc: 'assets/Fireball/FireballMirrored.png'
    }
});


const initializeArmies = () => {
    let posY = canvas.height - 770; //armies initial y position

    //Initialize swordsmen
    for (let i = 0; i < armySize; i++) {
        const soldierP1 = new Soldier(i, {
            position: { x: 0, y: posY },
            velocity: { x: 4, y: 4 },
            offset: { x: 0, y: 0 },
            imageSrc: 'assets/idle.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/idle.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/walk.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/thrust.png',
                    framesMax: 8
                }
            }
        });
        armyP1.push(soldierP1);

        const soldierP2 = new Soldier(i, {
            position: { x: 0, y: posY },
            velocity: { x: 4, y: 4 },
            offset: { x: -30, y: 0 },
            imageSrc: 'assets/idleMirrored.png',
            framesMax: 5,
            scale: 0.4,
            sprites: {
                idle: {
                    imageSrc: 'assets/idleMirrored.png',
                    framesMax: 5
                },
                walk: {
                    imageSrc: 'assets/walkMirrored.png',
                    framesMax: 6,
                },
                thrust: {
                    imageSrc: 'assets/thrustMirrored.png',
                    framesMax: 8,
                }
            }
        });
        armyP2.push(soldierP2);

        // Adjusting posY for next soldier
        posY += spacing;
    }

    //Initialize wizards
    posY = canvas.height - 650;
    for (let i = 0; i < wizards; i++) {
        const wizardP1 = new Wizard(i, {
            position: { x: 420, y: posY },
            imageSrc: 'assets/mageIdle.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/mageIdle.png',
                    framesMax: 6
                }
            },
            fireballSrc: 'assets/Fireball/Fireball.png'
        });
        wizardsArrayP1.push(wizardP1);

        const wizardP2 = new Wizard(i, {
            position: { x: 1400, y: posY },
            imageSrc: 'assets/mageIdleMirrored.png',
            framesMax: 6,
            scale: 1,
            sprites: {
                idle: {
                    imageSrc: 'assets/mageIdleMirrored.png',
                    framesMax: 6
                }
            },
            //fireballSrc: 'assets/Fireball/FireballMirrored.png'
        });
        wizardsArrayP2.push(wizardP2);
        posY += spacing;
    }
}

initializeArmies();

const addSwordsman = (playerIndex) => {
    swordsmenAddedFlag = true;
    if (playerIndex === 1) {
        soldier = armyP1[battlingSoldiersP1.length];
        soldier.position.x = canvas.width / 3;
        soldier.update(soldier.position.x, soldier.position.y) //in order for the attack box to follow 
        battlingSoldiersP1.push(soldier);

        swordsmenNumberP1.textContent = armySize - battlingSoldiersP1.length;
        healthP1 += soldier.health;
    }
    else if (playerIndex === 2) {
        soldier = armyP2[battlingSoldiersP2.length];
        soldier.position.x = canvas.width - canvas.width / 3;
        soldier.update(soldier.position.x, soldier.position.y)
        battlingSoldiersP2.push(soldier);


        swordsmenNumberP2.textContent = armySize - battlingSoldiersP2.length;
        healthP2 += soldier.health;
    }

    healthBarP1.max = healthP1;
    healthBarP1.value = healthP1;

    healthBarP2.max = healthP2;
    healthBarP2.value = healthP2;

}

const addWizard = (playerIndex) => {
    wizardsAddedFlag = true;
    if (playerIndex === 1) {
        wizard = wizardsArrayP1[battlingWizardsP1.length];
        battlingWizardsP1.push(wizard);

        wizardsNumberP1.textContent = wizards - battlingWizardsP1.length;
        healthP1 += wizard.health;
    } else if (playerIndex === 2) {
        wizard = wizardsArrayP2[battlingWizardsP2.length];
        battlingWizardsP2.push(wizard);

        wizardsNumberP2.textContent = wizards - battlingWizardsP2.length;
        healthP2 += wizard.health;
    }


    healthBarP1.max = healthP1;
    healthBarP1.value = healthP1;

    healthBarP2.max = healthP2;
    healthBarP2.value = healthP2;
}

const battleFirstMovement = () => {
    if (!firstArrival) {
        spacing = 65;
        // Battling troops movement
        for (let i = 0; i < battlingSoldiersP1.length; i++) {
            soldier = armyP1[i];
            soldier.update(canvas.width / 2 - spacing, soldier.position.y);
            soldier.switchSprites('walk');

        }
        for (let i = 0; i < battlingSoldiersP2.length; i++) {
            soldier = armyP2[i];
            soldier.update(canvas.width / 2 + spacing, soldier.position.y);
            soldier.switchSprites('walk');
        }

        if (battlingSoldiersP1[battlingSoldiersP1.length - 1].position.x == canvas.width / 2 - spacing) { //if the soldiers have reached their destination
            firstArrival = true;
            battlingSoldiersP1.forEach(soldier => {
                soldier.switchSprites('idle');
            });
            battlingSoldiersP2.forEach(soldier => {
                soldier.switchSprites('idle');
            });
            attack();
        }
    }
}

const attack = () => {
    drawFireball = true;
    wizardsArrayP1.forEach(wizard => {
        if (wizard.fireball != null) {
            wizard.fireball.position.x = wizard.position.x;
            wizard.fireball.position.y = wizard.position.y + 55;
        }

        wizard.collisionDetected = false;
        wizard.hasTakenDamage = false;
    });

    wizardsArrayP2.forEach(wizard => {
        wizard.fireball.position.x = wizard.position.x;
        wizard.fireball.position.y = wizard.position.y + 55;
        wizard.collisionDetected = false;
        wizard.hasTakenDamage = false;
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

        defender.forEach(soldier => {
            if (soldier && attacker[i] && soldier.position.y === attacker[i].position.y && soldier.health > 0) {
                opponent = soldier;
            }
        });

        if (attacker[i] && opponent) {



            attacker[i].isAttacking = true;
            attacker[i].switchSprites('thrust');
            // attacker[i].scale = 1;


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
                    console.log(`P2: ${opponent.index} health: ${opponent.health}`);
                    healthBarP2.value -= damage;
                } else {
                    console.log(`P1: ${opponent.index} health: ${opponent.health}`);
                    healthBarP1.value -= damage;

                }


                if (isDead(opponent)) {
                    console.log(`Soldier: ${opponent.index} has died`);
                    if (attackerIndex % 2 === 0) {
                        armyP2[armyP2.indexOf(opponent)] = null;
                    } else {
                        armyP1[armyP1.indexOf(opponent)] = null;
                    }

                    battlingSoldiersP1[battlingSoldiersP1.indexOf(opponent)] = null;
                    battlingSoldiersP2[battlingSoldiersP2.indexOf(opponent)] = null;
                    attacker[attacker.indexOf(opponent)] = null;
                    defender[defender.indexOf(opponent)] = null;
                    reArrangeSoldiers(attacker, defender);
                }
            }
        }
    }



    setTimeout(() => {
        if (attacker) {
            attacker.forEach(soldier => {
                if (soldier) {
                    soldier.isAttacking = false;
                    //soldier.switchSprites('idle');

                }
            });
        }
    }, 5000);

    setTimeout(() => {
        defender.forEach(soldier => {
            if (soldier) {
                soldier.isAttacking = false; //unnecessary
                soldier.hasTakenDamageThisRound = false;
            }
        });


        setTimeout(() => { //Delay before calling attack() again 
            if (battlingSoldiersP1.some(soldier => soldier && soldier.health > 0) &&
                battlingSoldiersP2.some(soldier => soldier && soldier.health > 0)) {
                attackerIndex++;
                console.log(`reArrangeSoldiers was called`);
                reArrangeSoldiers(attacker, defender); //Ik its being called twice
                if (aSoldierWasMoved) {
                    setTimeout(attack, 300);
                    attackerIndex--;
                } else {
                    console.log(`attack was called`);
                    fireFireball = false;
                    attack();
                }
            }
            else if (battlingWizardsP1.some(wizard => wizard && wizard.health > 0) &&
                battlingWizardsP2.some(wizard => wizard && wizard.health > 0)) {
                attackerIndex++;
                attack();
            }
        }, 700);
    }, 700);
}

const reArrangeSoldiers = (battlingSoldiersP1, battlingSoldiersP2) => { //get the battling soldiers
    let idleSoldierP1;
    let idleSoldierP2;
    let isOccupied = false;
    aSoldierWasMoved = false;


    for (let i = 0; i < battlingSoldiersP1.length; i++) {
        if (battlingSoldiersP1[i] && battlingSoldiersP1[i].health > 0 && !battlingSoldiersP2[i] && !isLinedUpOpponent(battlingSoldiersP1[i], battlingSoldiersP2)) {
            idleSoldierP1 = battlingSoldiersP1[i];
        }
    }

    for (let i = 0; i < battlingSoldiersP2.length; i++) {
        if (battlingSoldiersP2[i] && battlingSoldiersP2[i].health > 0 && !battlingSoldiersP1[i] && !isLinedUpOpponent(battlingSoldiersP2[i], battlingSoldiersP1)) {
            idleSoldierP2 = battlingSoldiersP2[i];
        }
    }

    if (idleSoldierP1 && idleSoldierP2) {
        console.log(`Soldiers need to be moved`);
        let targetY = idleSoldierP2.position.y;

        // Check if the target position is occupied
        if (battlingSoldiersP1.some(soldier => soldier && soldier.position.y === idleSoldierP2.position.y && soldier.health > 0)) {
            isOccupied = true;
            console.log(`ocuppied set to true`);
        }

        if (!isOccupied) {
            for (let i = 0; i < armyP1.length; i++) {
                if (armyP1[i] === idleSoldierP1 && armyP1[i].position.y !== targetY) {
                    armyP1[i].position.y = targetY;
                    console.log(`Soldier ${armyP1[i].index} was moved`);
                    aSoldierWasMoved = true;
                }
            }
        } else {
            console.log(`Target position is occupied. Cannot move soldiers.`);
        }
    }
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

    //troopsNumberWizardP1.fire(0, troopsNumberWizardP1.position.y, true);


    //debugging - REMOVE    
    if (troopsNumberSoldierP1.framesElapsed === 40) {
        troopsNumberSoldierP1.switchSprites('idle');

    }
    if (troopsNumberSoldierP2.framesElapsed === 35) {
        troopsNumberSoldierP2.switchSprites('idle');
    }


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
}

// const leap = (soldier, direction) => {
//     let targetX;
//     if (soldier) {
//         if (attackerIndex % 2 === 0) {
//             targetX = direction === 'forward' ? soldier.position.x - 60 : 1015;
//         } else {
//             targetX = direction === 'forward' ? soldier.position.x + 60 : 885;
//         }

//         //Leap animation
//         const moveSoldier = () => {
//             if (soldier.position.x !== targetX) {
//                 soldier.update(targetX, soldier.position.y);
//                 requestAnimationFrame(moveSoldier);
//             }
//         }
//         moveSoldier();

//     }
// }

const isDead = (soldier) => {
    if (soldier && soldier.health > 0) {
        return false;
    }
    return true;
}

const isLinedUpOpponent = (troop, array) => {
    array.forEach(soldier => {
        if (soldier && troop.position.y === soldier.position.y) {
            return true;
        }
    });
    return false;
}

const toggleBattle = () => battleInProgress = true;

const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderArmy(); // Renders the army every frame

    animateWizardAttacks();

    if (battleInProgress && !firstArrival) {
        battleFirstMovement();
    }

    window.requestAnimationFrame(animate);
}

const animateWizardAttacks = () => {
    const attackEnemies = (wizardsArray, opponentSoldiers, opponentWizards) => {
        const aliveSoldiers = opponentSoldiers.filter(soldier => soldier && soldier.health > 0);
        const aliveEnemyWizards = opponentWizards.filter(wizard => wizard && wizard.health > 0);

        if (aliveSoldiers.length > 0) {
            wizardsArray.forEach((wizard, index) => {
                const targetSoldier = aliveSoldiers[index % aliveSoldiers.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetSoldier && fireFireball && targetSoldier.health > 0) {
                    console.log(`position x: ${targetSoldier.position.x}`);
                    console.log(`position y: ${targetSoldier.position.y}`);

                    wizard.fire(targetSoldier.position.x, targetSoldier.position.y, drawFireball);
                    if (detectCollision(wizard.fireball, targetSoldier) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        let damage = 35;
                        targetSoldier.health -= damage; // Damage infliction
                        targetSoldier.hasTakenDamage = true;

                        if (attackerIndex % 2 == 0) {
                            healthBarP1.value -= damage;
                        } else {
                            healthBarP2.value -= damage;
                        }

                        if (isDead(targetSoldier)) {
                            drawFireball = false;
                            if (attackerIndex % 2 === 0) {
                                armyP2[armyP2.indexOf(targetSoldier)] = null;
                                console.log(armyP1[armyP1.indexOf(targetSoldier)]);
                                console.log(`P1 Soldier: ${targetSoldier.index} has died by a wizard`);
                            }
                            else {
                                armyP1[armyP1.indexOf(targetSoldier)] = null;
                                console.log(`P2 Soldier: ${targetSoldier.index} has died by a wizard`);
                                console.log(armyP2[0]);
                            }

                            battlingSoldiersP1[battlingSoldiersP1.indexOf(targetSoldier)] = null;
                            battlingSoldiersP2[battlingSoldiersP2.indexOf(targetSoldier)] = null;
                            opponentSoldiers[opponentSoldiers.indexOf(targetSoldier)] = null;
                        }
                    }
                }
            });
        }
        else if (aliveEnemyWizards.length > 0) {
            wizardsArray.forEach((wizard, index) => {
                const targetWizard = aliveEnemyWizards[index % aliveEnemyWizards.length]; // Cycle through alive enemies
                if (wizard && wizard.health > 0 && targetWizard && fireFireball) {
                    wizard.fire(targetWizard.position.x, targetWizard.position.y, drawFireball);

                    if (detectCollision(wizard.fireball, targetWizard) && !wizard.collisionDetected) {
                        wizard.collisionDetected = true;
                        targetWizard.health -= 35; // Damage infliction
                        targetWizard.hasTakenDamage = true;

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
                            opponentWizards[opponentWizards.indexOf(targetWizard)] = null;
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
    var distX = Math.abs(fireball.position.x - opponent.position.x - 40 / 2);
    var distY = Math.abs(fireball.position.y - opponent.position.y - 60 / 2);

    if (distX > (40 / 2 + 10)) { return false; }
    if (distY > (60 / 2 + 10)) { return false; }

    if (distX <= (40 / 2)) { return true; }
    if (distY <= (60 / 2)) { return true; }

    var dx = distX - 40 / 2;
    var dy = distY - 60 / 2;
    return (dx * dx + dy * dy <= (10 * 10));
}

animate();