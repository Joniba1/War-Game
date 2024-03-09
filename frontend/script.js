const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let armyP1 = [];
let armyP2 = [];

let spacing = 100;
let armySize = 6;
let firstArrival = false;

let healthP1 = 0;
let healthP2 = 0;

let healthBarP1 = document.getElementById("healthBarP1");
let healthBarP2 = document.getElementById("healthBarP2");


initializeArmies();




function initializeArmies() {
  let posY = canvas.height - 770; //armies initial y position

  for (let i = 0; i < armySize; i++) {
    // Create soldier for armyP1
    let soldierP1 = new Soldier(i, {
      position: { x: canvas.width - 70, y: posY },
      velocity: { x: 4, y: 4 },
      offset: { x: -30, y: 0 }
    });
    armyP1.push(soldierP1);

    // Create soldier for armyP2
    let soldierP2 = new Soldier(i, {
      position: { x: 40, y: posY },
      velocity: { x: 4, y: 4 },
      offset: { x: 0, y: 0 }
    });
    armyP2.push(soldierP2);

    // Increment posY for next soldier
    posY += spacing;
  }
}

let troopsAddedP1 = 0;
let troopsAddedP2 = 0;

let battlingSoldiersP1 = [];
let battlingSoldiersP2 = [];

let attackDuration = 100;
let battleInProgress = false;

// let player1Turn = true;


function addTroop(playerIndex) {

  if (playerIndex === 1) {
    soldier = armyP1[troopsAddedP1];
    soldier.position.x = canvas.width - canvas.width / 3;
    soldier.update(armyP1[troopsAddedP1].position.x, soldier.position.y) //in order for the attack box to follow 
    troopsAddedP1++;

    healthP1 += soldier.health;
  }
  else if (playerIndex === 2) {
    soldier = armyP2[troopsAddedP2];
    soldier.position.x = canvas.width / 3;
    soldier.update(soldier.position.x, soldier.position.y)
    troopsAddedP2++;
    healthP2 += soldier.health;
  }

  healthBarP1.max = healthP1;
  healthBarP1.value = healthP1;

  healthBarP2.max = healthP1;
  healthBarP2.value = healthP1;
}


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderArmy(); // Render the army every frame

  if (battleInProgress) {
    battleFirstMovement();
  }

  window.requestAnimationFrame(animate);
}


function renderArmy() {
  for (let i = 0; i < armyP1.length; i++) {
    armyP1[i].draw();
  }

  for (let i = 0; i < armyP2.length; i++) {
    armyP2[i].draw();
  }

}


function toggleBattle() {
  battleInProgress = true; // Set flag to indicate battle in progress

}


function battleFirstMovement() {
  spacing = 65;
  if (!firstArrival) {
    console.log(firstArrival);
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


    if (battlingSoldiersP1[battlingSoldiersP1.length - 1].position.x == canvas.width / 2 + spacing) {
      firstArrival = true;
      attack();
    }
  }
}


let attackerIndex = 0;

function attack() {
  // Turn
  let attacker;
  let defender;

  if (attackerIndex % 2 === 0) {
    attacker = battlingSoldiersP1;
    defender = battlingSoldiersP2;
  } else {
    attacker = battlingSoldiersP2;
    defender = battlingSoldiersP1;
  }

  let length = Math.min(troopsAddedP1, troopsAddedP2);

  for (let i = 0; i < length; i++) {

    attacker[i].isAttacking = true; //isAttacking controls the attack box rendering.
    // Apply damage
    for (let j = 0; j < length; j++) {
      const opponent = defender[j];
      //if (opponent === undefined) continue; // Skip if opponent is not in battle
      if (opponent && !opponent.hasTakenDamageThisRound && !isDead(opponent)) {
        const damage = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        opponent.health -= damage;
        opponent.hasTakenDamageThisRound = true;

        //log debug
        if (attackerIndex % 2 == 0) {
          console.log("P2: ", j, " health:", opponent.health);
          healthBarP1.value -= damage;

        } else {
          console.log("P1: ", j, " health:", opponent.health);
          healthBarP2.value -= damage;

        }

        if (isDead(opponent)) {
          console.log("Soldier: ", opponent.index, " has died");

          // Remove the soldier from the rendering array (armyP1 or armyP2)
          if (defender === battlingSoldiersP1) {
            console.log("P1 spliced");
            armyP1.splice(armyP1.indexOf(opponent), 1);
          } else {
            console.log("P2 spliced");
            armyP2.splice(armyP2.indexOf(opponent), 1);
          }

          battlingSoldiersP1 = battlingSoldiersP1.filter(soldier => soldier.health > 0);
          battlingSoldiersP2 = battlingSoldiersP2.filter(soldier => soldier.health > 0);


        }
        //break; // Exit the loop after applying damage to one opponent
      }
    }
  }


  setTimeout(() => {
    attacker.forEach(soldier => {
      soldier.isAttacking = false;
    });

    setTimeout(() => {
      defender.forEach(soldier => {
        soldier.isAttacking = false;
        soldier.hasTakenDamageThisRound = false;
      });

      if (battlingSoldiersP1.length > 0 && battlingSoldiersP2.length > 0) {
        attackerIndex++; // Switch to the other player
        attack();
      }
    }, 500);
  }, 500);
}


function isDead(soldier) {
  if (soldier.health > 0) {
    return false;
  }
  return true;
}


// function battle() {
//   // Assign attacking and defending armies based on the turn
//   if (player1Turn) {
//     attackingArmy = battlingSoldiersP1;
//     defendingArmy = battlingSoldiersP2;
//   } else {
//     attackingArmy = battlingSoldiersP2;
//     defendingArmy = battlingSoldiersP1;
//   }

//   // Iterate through each attacker and initiate attack
//   //for (let i = 0; i < attackingArmy.length; i++) {
//   let attacker = attackingArmy[2];
//   let defender = defendingArmy[2];

//   // Move attacker forward and initiate attack
//   moveForward(attacker, 1015 - 120, () => {
//     setTimeout(() => {
//       // Check if the defender's health is still positive before inflicting damage
//       if (defender.health > 0) {
//         // Inflict damage to the defender
//         defender.health -= 20;
//         console.log(defender.health);

//         // Check if defender is defeated
//         if (defender.health <= 0) {
//           console.log(`a soldier has been defeated!`);
//         }
//       }

//       // Move attacker back to original position
//       moveBack(attacker, 1015, () => {
//         // Check if all attackers have attacked
//         //if (i === attackingArmy.length - 1) {
//         // Advance to the next turn
//         // if (attacker.position.x == 1015) {
//         //   nextTurn();
//         // }
//         player1Turn = !player1Turn;
//         setTimeout(() => {
//           battle();
//         }, 2000);
//       });
//     }, 500);
//   });
// }


// function moveForward(soldier, targetX, callback) {
//   let startX = soldier.position.x;
//   let startTime = Date.now();

//   function move() {
//     let timePassed = Date.now() - startTime;
//     let progress = timePassed / attackDuration;

//     if (progress > 1) {
//       progress = 1;
//     }

//     let newX = startX + (targetX - startX) * progress;
//     soldier.update(newX, soldier.position.y);

//     if (progress < 1) {
//       requestAnimationFrame(move);
//     } else {
//       if (typeof callback === 'function') {
//         callback();
//       }
//     }
//   }

//   move();
// }


// function moveBack(soldier, initialX, callback) {
//   let targetX = initialX;
//   let startX = soldier.position.x;
//   let startTime = Date.now();

//   function move() {
//     let timePassed = Date.now() - startTime;
//     let progress = timePassed / attackDuration;

//     if (progress > 1) {
//       progress = 1;
//     }

//     let newX = startX + (targetX - startX) * progress;
//     soldier.update(newX, soldier.position.y);

//     if (progress < 1) {
//       requestAnimationFrame(move);
//     } else {
//       if (typeof callback === 'function') {
//         callback();
//       }
//     }
//   }

//   move();
// }




animate();     