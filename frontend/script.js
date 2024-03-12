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

let spacing = 100;

let armySize = 6; //swordsmen/soldiers
swordsmenNumberP1.textContent = armySize;
swordsmenNumberP2.textContent = armySize;

let wizards = 3;
wizardsNumberP1.textContent = wizards;
wizardsNumberP2.textContent = wizards;

let healthP1 = 0;
let healthP2 = 0;

let troopsAddedP1 = 0;
let troopsAddedP2 = 0;
let wizardsAddedP1 = 0;
let wizardsAddedP2 = 0;


let battlingSoldiersP1 = [];
let battlingSoldiersP2 = [];

let battleInProgress = false;
let firstArrival = false; //first movement flag

let attackerIndex = 0; //turn to attack

let aSoldierWasMoved = false;
let swordsmenAddedFlag = false;
let wizardsAddedFlag = false;

//Troops left indicator
const troopsNumberSoldierP1 = new Soldier(-1, {
  position: { x: canvas.width - 250, y: 70 },
  velocity: { x: 0, y: 0 },
  offset: { x: -30, y: 0 }
});

const troopsNumberSoldierP2 = new Soldier(-2, {
  position: { x: 65, y: 70 },
  velocity: { x: 0, y: 0 },
  offset: { x: -30, y: 0 }
});

const troopsNumberWizardP1 = new Wizard(-1, {
  position: { x: canvas.width - 250, y: 150 }
});

const troopsNumberWizardP2 = new Wizard(-1, {
  position: { x: 65, y: 150 }
});

initializeArmies();

function initializeArmies() {
  let posY = canvas.height - 770; //armies initial y position

  //Initialize swordsmen
  for (let i = 0; i < armySize; i++) {
    // Create soldier for armyP1
    const soldierP1 = new Soldier(i, {
      position: { x: 0, y: posY },
      velocity: { x: 4, y: 4 },
      offset: { x: -30, y: 0 }
    });
    armyP1.push(soldierP1);

    // Create soldier for armyP2
    const soldierP2 = new Soldier(i, {
      position: { x: 0, y: posY },
      velocity: { x: 4, y: 4 },
      offset: { x: 0, y: 0 }
    });
    armyP2.push(soldierP2);

    // Adjusting posY for next soldier
    posY += spacing;
  }

  //Initialize wizards
  posY = canvas.height - 650;
  for (let i = 0; i < wizards; i++) {
    const wizardP1 = new Wizard(i, {
      position: { x: 0, y: posY }
    });
    wizardsArrayP1.push(wizardP1);

    const wizardP2 = new Wizard(i, {
      position: { x: 0, y: posY }
    });
    wizardsArrayP2.push(wizardP2);
    posY += spacing;
  }
}

function addSwordsman(playerIndex) {
  swordsmenAddedFlag = true;
  if (playerIndex === 1) {
    soldier = armyP1[troopsAddedP1];
    soldier.position.x = canvas.width - canvas.width / 3;
    soldier.update(soldier.position.x, soldier.position.y) //in order for the attack box to follow 
    troopsAddedP1++;

    swordsmenNumberP1.textContent = armySize - troopsAddedP1;
    healthP1 += soldier.health;
  }
  else if (playerIndex === 2) {
    soldier = armyP2[troopsAddedP2];
    soldier.position.x = canvas.width / 3;
    soldier.update(soldier.position.x, soldier.position.y)
    troopsAddedP2++;

    swordsmenNumberP2.textContent = armySize - troopsAddedP2;
    healthP2 += soldier.health;
  }

  healthBarP1.max = healthP1;
  healthBarP1.value = healthP1;

  healthBarP2.max = healthP2;
  healthBarP2.value = healthP2;
}

function addWizard(playerIndex) {
  console.log(wizardsAddedP1);
  wizardsAddedFlag = true;
  if (playerIndex === 1) {
    wizard = wizardsArrayP1[wizardsAddedP1];
    wizard.position.x = canvas.width - canvas.width / 3 + 120;
    wizardsAddedP1++;

    wizardsNumberP1.textContent = wizards - wizardsAddedP1;
    healthP1 += wizard.health;
  } else if (playerIndex === 2) {
    wizard = wizardsArrayP2[wizardsAddedP2];
    wizard.position.x = canvas.width / 3 - 120;
    wizardsAddedP2++;

    wizardsNumberP2.textContent = wizards - wizardsAddedP2;
    healthP2 += wizard.health;
  }
}

function battleFirstMovement() {
  if (!firstArrival) {
    spacing = 65;
    // Battling troops movement
    for (let i = 0; i < troopsAddedP1; i++) {
      soldier = armyP1[i];
      soldier.update(canvas.width / 2 + spacing, soldier.position.y);
      battlingSoldiersP1.push(soldier);
    }
    for (let i = 0; i < troopsAddedP2; i++) {
      soldier = armyP2[i];
      soldier.update(canvas.width / 2 - spacing, soldier.position.y);
      battlingSoldiersP2.push(soldier);
    }

    if (battlingSoldiersP1[battlingSoldiersP1.length - 1].position.x == canvas.width / 2 + spacing) { //if the soldiers have reached their destination
      firstArrival = true;
      console.log(armyP1[0].position.x, armyP2[0].position.x);
      attack();
    }
  }
}

function attack() {
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

  let length = Math.max(troopsAddedP1, troopsAddedP2);

  //Damage infliction and its consequences
  for (let i = 0; i < length; i++) {
    let opponent;

    defender.forEach(soldier => {
      if (soldier && attacker[i] && soldier.position.y === attacker[i].position.y && soldier.health > 0) {
        opponent = soldier;
      }
    });

    if (attacker[i] && opponent) {
      console.log("attack first pos", attacker[i].position.x);

      leap(attacker[i], 'forward');

      attacker[i].isAttacking = true;

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
          healthBarP1.value -= damage;
        } else {
          console.log(`P1: ${opponent.index} health: ${opponent.health}`);
          healthBarP2.value -= damage;
        }

        if (isDead(opponent)) {
          console.log("Soldier: ", opponent.index, " has died");
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
    if (attacker != null) {
      attacker.forEach(soldier => {
        if (soldier) {
          soldier.isAttacking = false;
          leap(soldier, 'backward');
        }
      });
    }
  }, 400);

  setTimeout(() => {
    defender.forEach(soldier => {
      if (soldier) {
        soldier.isAttacking = false; //unnecessary
        soldier.hasTakenDamageThisRound = false;
      }
    });


    setTimeout(() => { //Delay before calling attack() again 
      if (battlingSoldiersP1.some(soldier => soldier && soldier.health > 0) && battlingSoldiersP2.some(soldier => soldier && soldier.health > 0)) {
        attackerIndex++;
        console.log("reArrangeSoldiers was called");
        reArrangeSoldiers(attacker, defender); //Ik its being called twice
        if (aSoldierWasMoved) {
          setTimeout(attack, 300);
          attackerIndex--;
        }
        else {
          attack();
        }
      }
    }, 700);
  }, 700);
}

function reArrangeSoldiers(battlingSoldiersP1, battlingSoldiersP2) { //get the battling soldiers
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
    console.log("Soldiers need to be moved");
    let targetY = idleSoldierP2.position.y;

    // Check if the target position is occupied
    if (battlingSoldiersP1.some(soldier => soldier && soldier.position.y === idleSoldierP2.position.y && soldier.health > 0)) {
      isOccupied = true;
      console.log("ocuppied set to true");
    }

    if (!isOccupied) {
      for (let i = 0; i < armyP1.length; i++) {
        if (armyP1[i] === idleSoldierP1 && armyP1[i].position.y !== targetY) {
          armyP1[i].position.y = targetY;
          armyP1[i].attackbox.position.y = armyP1[i].position.y;
          console.log(`Soldier ${armyP1[i].index} was moved`);
          aSoldierWasMoved = true;
        }
      }
    } else {
      console.log("Target position is occupied. Cannot move soldiers.");
    }
  }
}

function renderArmy() {
  troopsNumberSoldierP1.draw('red');
  troopsNumberSoldierP2.draw('green');
  troopsNumberWizardP1.draw();
  troopsNumberWizardP2.draw();

  if (swordsmenAddedFlag) {
    for (let i = 0; i < troopsAddedP1; i++) {
      if (armyP1[i]) {
        armyP1[i].draw('red');

        //debugging text
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(i, armyP1[i].position.x, armyP1[i].position.y - 10);
      }
    }

    for (let i = 0; i < troopsAddedP2; i++) {
      if (armyP2[i]) {
        armyP2[i].draw('green');

        //debugging text
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(i, armyP2[i].position.x, armyP2[i].position.y - 10);
      }
    }
  }

  if (wizardsAddedFlag) {
    for (let i = 0; i < wizardsAddedP1; i++) {
      if (wizardsArrayP1[i]) {
        wizardsArrayP1[i].draw();
      }
    }

    for (let i = 0; i < wizardsAddedP2; i++) {
      if (wizardsArrayP2[i]) {
        wizardsArrayP2[i].draw();
      }
    }
  }

}

function isDead(soldier) {
  if (soldier.health > 0) {
    return false;
  }
  return true;
}

function isLinedUpOpponent(troop, array) {
  array.forEach(soldier => {
    if (soldier && troop.position.y === soldier.position.y) {
      return true;
    }
  });
  return false;
}

function toggleBattle() {
  battleInProgress = true; // Set flag to indicate battle in progress
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderArmy(); // Renders the army every frame

  if (battleInProgress && !firstArrival) {
    battleFirstMovement();
  }

  window.requestAnimationFrame(animate);
}

function leap(soldier, direction) {
  let targetX;
  if (soldier) {
    if (attackerIndex % 2 === 0) {
      targetX = direction === 'forward' ? soldier.position.x - 60 : 1015;
    } else {
      targetX = direction === 'forward' ? soldier.position.x + 60 : 885;
    }

    //Leap animation
    function moveSoldier() {
      if (soldier.position.x !== targetX) {
        soldier.update(targetX, soldier.position.y);
        requestAnimationFrame(moveSoldier);
      }
    }
    moveSoldier();

  }
}

animate();