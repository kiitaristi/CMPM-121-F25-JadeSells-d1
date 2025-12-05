import "./style.css";

let counter: number = 0;
let autoInc: number = 0;

interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
  id: string;
}

const availableItems: Item[] = [
  {
    name: "Cake Engineer",
    cost: 10,
    rate: 0.1,
    count: 0,
    description: "Student Cake Engineers",
    id: "bakerCount",
  },
  {
    name: "Stand Mixer",
    cost: 100,
    rate: 2,
    count: 0,
    description: "Stand Mixers Made as Student Projects",
    id: "mixerCount",
  },
  {
    name: "Old Oven",
    cost: 1000,
    rate: 50,
    count: 0,
    description: "Decades-Old Ovens",
    id: "ovenCount",
  },
];

document.body.style.backgroundImage =
  "url(https://www.shutterstock.com/image-photo/outside-view-bakery-glass-showcase-600nw-2207207873.jpg)"; // import image
document.body.style.backgroundSize = "cover"; // make it cover the whole page
document.body.style.backgroundPosition = "center"; // center alignment
document.body.style.backgroundRepeat = "no-repeat"; // make sure the bg doesn't tile

document.body.innerHTML = `
<div style="
  margin: 0;
  color: white;
  font-weight: bold;
  text-align: center;
  padding: 0;
  ">
  <h1 style="margin: 10;">The Baskin Bakery</h1>
  <p id="descriptions" style="margin: 4px 20;">Department Funds: <span id="counter">0</span></p>
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
    background-color: transparent;
    cursor: pointer;
  ">🎂</button>
</div>

<div id="upgradebuttons" style="
  margin: 0;
  text-align: center;
  padding: 0;
  ">
</div>
`;

const cakeButton = document.getElementById("buttonCake")!;
const counterElem = document.getElementById("counter")!;
const buttonContainerElem = document.getElementById("upgradebuttons")!;
const descContainerElem = document.getElementById("descriptions")!;

availableItems.forEach((item) => {
  const desc = document.createElement("p");
  const descSpan = document.createElement("span");

  descSpan.id = item.id;
  descSpan.textContent = "0";
  desc.textContent = `${item.description}: `;

  desc.appendChild(descSpan);
  descContainerElem.appendChild(desc);
});

availableItems.forEach((item, index) => {
  const button = document.createElement("button");

  button.textContent = `${item.name}: ${item.cost.toFixed(0)}`;
  button.style.cssText = `
    border: solid;
    color: #000000;
    text-align: center;
    font-size: 16px;
    background-color: #dbb596ff;
    cursor: pointer;
    `;

  button.addEventListener("click", () => buyUpgrade(index));
  buttonContainerElem.appendChild(button);
});

cakeButton.addEventListener("click", () => {
  counter += 1;
  counterElem.textContent = counter.toFixed(4);
});

function buyUpgrade(index: number) {
  const item = availableItems[index];
  if (counter >= item.cost) {
    autoInc += item.rate;
    counter -= item.cost;
    item.count++;
    item.cost *= 1.15;
    updateDisplay();
  }
}

function updateDisplay() {
  counterElem.textContent = counter.toFixed(4);

  // Update buttons and descriptions
  const buttons = buttonContainerElem.querySelectorAll("button");
  availableItems.forEach((item, i) => {
    const currentDesc = document.getElementById(item.id)!;
    buttons[i].textContent = `${item.name}: ${item.cost.toFixed(2)}`;
    currentDesc.textContent = item.count.toString();
  });
}

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
