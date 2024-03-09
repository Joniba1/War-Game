const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let armyP1 = [];
let armyP2 = [];

let spacing = 100;
let armySize = 5;
let firstArrival = false;

initializeArmies();


function initializeArmies() {

  let posY = canvas.height - 770; //armies initial y position

  for (let i = 0; i < armySize; i++) {
    let soldier = new Soldier(i, {
      position: { x: canvas.width - 70, y: posY },
      velocity: { x: 4, y: 4 },
      offset: {
        x: -30,
        y: 0
      }
    });
    armyP1.push(soldier);
    soldier.update(soldier.position.x, soldier.position.y)
    soldier = new Soldier(i, {
      position: { x: 40, y: posY },
      velocity: { x: 4, y: 4 },
      offset: {
        x: 0,
        y: 0
      }
    });
    armyP2.push(soldier);
    posY += spacing;

  }

}

let troopsAddedP1 = 0;
let troopsAddedP2 = 0;

let battlingSoldiersP1 = [];
let battlingSoldiersP2 = [];

let attackDuration = 100;
let battleInProgress = false;

let player1Turn = true;


function addTroop(playerIndex) {
  if (playerIndex === 1) {
    armyP1[troopsAddedP1].position.x = canvas.width - canvas.width / 3;
    armyP1[troopsAddedP1].update(armyP1[troopsAddedP1].position.x, armyP1[troopsAddedP1].position.y) //in order for the attack box to follow 
    troopsAddedP1++;
  }
  else if (playerIndex === 2) {
    armyP2[troopsAddedP2].position.x = canvas.width / 3;
    armyP2[troopsAddedP2].update(armyP2[troopsAddedP2].position.x, armyP2[troopsAddedP2].position.y)
    troopsAddedP2++;

  }
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



  for (let i = 0; i < attacker.length; i++) {
    attacker[i].isAttacking = true; // Set attacker to true first
    // Apply damage
    for (let j = 0; j < defender.length; j++) {
      const opponent = defender[j];
      //if (opponent === undefined) continue; // Skip if opponent is not in battle
      if (!opponent.hasTakenDamageThisRound && !isDead(opponent)) {
        const damage = Math.floor(Math.random() * (50 - 10 + 1)) + 10;
        opponent.health -= damage;
        opponent.hasTakenDamageThisRound = true;
        console.log("Opponent health:", opponent.health);
        if (isDead(opponent)) {
          console.log("Soldier: ", opponent.index, " has died");
          battlingSoldiersP1 = battlingSoldiersP1.filter(soldier => soldier.health > 0);
          battlingSoldiersP2 = battlingSoldiersP2.filter(soldier => soldier.health > 0);

          // Remove the soldier from the rendering array (armyP1 or armyP2)
          if (defender === battlingSoldiersP1) {
            armyP1.splice(armyP1.indexOf(opponent), 1);
          } else {
            armyP2.splice(armyP2.indexOf(opponent), 1);
          }
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



// function attack() {
//   // Turn
//   let attacker;
//   if (attackerIndex % 2 === 0) {
//     attacker = battlingSoldiersP1;
//     defender = battlingSoldiersP2;
//   } else {
//     attacker = battlingSoldiersP2;
//     defender = battlingSoldiersP1;
//   }

//   // Iterate through both sets of soldiers simultaneously
//   for (let i = 0; i < attacker.length; i++) {
//     const attacker = attacker[i];
//     const opponent = defender[i];
//     if (opponent && opponent.health > 0) { // Check if opponent exists and is alive
//       attacker.isAttacking = true;
//       setTimeout(() => {
//         attacker.isAttacking = false;
//         const damage = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
//         opponent.health -= damage;
//         console.log(opponent.health);
//         if (opponent.health <= 0) {
//           console.log("Soldier: ", opponent.index, " has died");
//           // Remove the dead soldier from the arrays
//           defender.splice(i, 1);
//           attacker.splice(i, 1);
//           if (defender === battlingSoldiersP1) {
//             armyP1.splice(armyP1.indexOf(opponent), 1);
//           } else {
//             armyP2.splice(armyP2.indexOf(opponent), 1);
//           }
//         }
//       }, 500);
//     }
//   }

//   setTimeout(() => {
//     if (battlingSoldiersP1.length > 0 && battlingSoldiersP2.length > 0) {
//       attackerIndex++; // Switch to the other player
//       attack();
//     }
//   }, 500);
// }





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


// function nextTurn() {
//   if (player1Turn) {
//     currentAttackerIndex++;
//   } else {
//     currentDefenderIndex++;
//   }

//   battle();
// }


animate();     