import "./style.css";

let counter: number = 0;
let autoInc: number = 0;
let upgradeCount: number = 0;
let upgradeCost: number = 10;

document.body.innerHTML = `
<div style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
  <h1 style="margin: 10;">The Baskin Bakery</h1>
  <p style="margin: 4px 20;">Department Funds: <span id="counter">0</span></p>
  <p style="margin: 4px 20;">Student Cake Engineers: <span id="upgradecount">0</span></p>
</div>

<div style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
  <button id="button1" style="
    border: none;
    color: white;
    text-align: center;
    font-size: 64px;
    background-color: #ffffff;
    cursor: pointer;
  ">🎂</button>
</div>

<div style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
  <p style="margin: 20px 20;"><button id="button2" style="
    border: solid;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background-color: #adadadff;
    cursor: pointer;
  ">New cake engineer: <span id="upgradecost">0</span></button></p>
</div>
`;

// Add click handler

const button1 = document.getElementById("button1")!;
const button2 = document.getElementById("button2")!;
const counterElement = document.getElementById("counter")!;
const upgradeCountElement = document.getElementById("upgradecount")!;
const upgradeCostElement = document.getElementById("upgradecost")!;

upgradeCostElement.textContent = upgradeCost.toString();

button1.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toFixed(4);
});

button2.addEventListener("click", () => {
  if (counter >= upgradeCost) {
    counter -= upgradeCost;
    upgradeCount += 1;
    autoInc += 1;
    upgradeCost *= 1.5;
    upgradeCost.toFixed(0);

    upgradeCountElement.textContent = upgradeCount.toString();
    upgradeCostElement.textContent = upgradeCost.toString();
  }
});

/*
function autoIncrement(): void {
  counter += autoInc;
  counterElement.innerHTML = counter.toString();
}

// Call the function every 1000ms (1 second)
setInterval(autoIncrement, 1000);
*/

let lastTime = performance.now();

function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms to seconds
  lastTime = currentTime;

  // Increase value by fraction based on elapsed time
  counter += autoInc * deltaTime;
  counterElement.textContent = counter.toFixed(4);

  // Continue next frame
  requestAnimationFrame(update);
}

// Start loop
requestAnimationFrame(update);

// const interval = setInterval(autoIncrease, 1000);

// function autoIncrease(a, b) {
//
//
// }

//<p style="margin: 4px 0;">Auto Increase: <span id="autoIncrease">0.0</span></p>

// let lastTime = performance.now();

// function update(currentTime: number): void {
//   const deltaTime = (currentTime - lastTime) / 1000;
//   lastTime = currentTime;

//   counter += autoInc * deltaTime;
//   counterDisplay.innerHTML = counter.toFixed(4);

//   requestAnimationFrame(update);
// }

// requestAnimationFrame(update);
