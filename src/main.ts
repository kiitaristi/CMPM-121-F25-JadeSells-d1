import "./style.css";

let counter: number = 0;
let autoInc: number = 0;
let bakerCount: number = 0;
let bakerCost: number = 10;
let mixerCount: number = 0;
let mixerCost: number = 100;
let ovenCount: number = 0;
let ovenCost: number = 1000;

document.body.innerHTML = `
<div style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
  <h1 style="margin: 10;">The Baskin Bakery</h1>
  <p style="margin: 4px 20;">Department Funds: <span id="counter">0</span></p>
  <p style="margin: 4px 20;">Student Cake Engineers: <span id="bakerCount">0</span></p>
  <p style="margin: 4px 20;">Stand Mixers Made as Student Projects: <span id="mixerCount">0</span></p>
  <p style="margin: 4px 20;">Decades-Old Ovens: <span id="ovenCount">0</span></p>
</div>

<div style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
  <button id="buttonCake" style="
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
  <p style="margin: 20px 20;"><button id="buttonBaker" style="
    border: solid;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background-color: #adadadff;
    cursor: pointer;
  ">Cake engineer: <span id="bakerCost">0</span></button>
  <button id="buttonMixer" style="
    border: solid;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background-color: #adadadff;
    cursor: pointer;
  ">Stand mixer: <span id="mixerCost">0</span></button></p>
  <p style="margin: 20px 20;"><button id="buttonOven" style="
    border: solid;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background-color: #adadadff;
    cursor: pointer;
  ">Old oven: <span id="ovenCost">0</span></button></p>
</div>
`;

const cakeButton = document.getElementById("buttonCake")!;
const bakerButton = document.getElementById("buttonBaker")!;
const mixerButton = document.getElementById("buttonMixer")!;
const ovenButton = document.getElementById("buttonOven")!;

const counterElem = document.getElementById("counter")!;

const bakerCountElem = document.getElementById("bakerCount")!;
const bakerCostElem = document.getElementById("bakerCost")!;
const mixerCountElem = document.getElementById("mixerCount")!;
const mixerCostElem = document.getElementById("mixerCost")!;
const ovenCountElem = document.getElementById("ovenCount")!;
const ovenCostElem = document.getElementById("ovenCost")!;

bakerCostElem.textContent = bakerCost.toString();
mixerCostElem.textContent = mixerCost.toString();
ovenCostElem.textContent = ovenCost.toString();

cakeButton.addEventListener("click", () => {
  counter += 1;
  counterElem.textContent = counter.toFixed(4);
});

bakerButton.addEventListener("click", () => {
  if (counter >= bakerCost) {
    counter -= bakerCost;
    bakerCount += 1;
    autoInc += 1;
    // bakerCost *= 1.5;

    bakerCountElem.textContent = bakerCount.toString();
    bakerCostElem.textContent = bakerCost.toFixed(0);
  }
});

mixerButton.addEventListener("click", () => {
  if (counter >= mixerCost) {
    counter -= mixerCost;
    mixerCount += 1;
    autoInc += 2;
    // mixerCost *= 1.5;

    mixerCountElem.textContent = mixerCount.toString();
    mixerCostElem.textContent = mixerCost.toFixed(0);
  }
});

ovenButton.addEventListener("click", () => {
  if (counter >= ovenCost) {
    counter -= ovenCost;
    ovenCount += 1;
    autoInc += 50;
    // ovenCost *= 1.5;

    ovenCountElem.textContent = ovenCount.toString();
    ovenCostElem.textContent = ovenCost.toFixed(0);
  }
});

let lastTime = performance.now();

function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms to seconds
  lastTime = currentTime;

  // Increase value by fraction based on elapsed time
  counter += autoInc * deltaTime;
  counterElem.textContent = counter.toFixed(4);

  // Continue next frame
  requestAnimationFrame(update);
}

// Start loop
requestAnimationFrame(update);
