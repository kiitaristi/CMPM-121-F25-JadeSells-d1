import "./style.css";

// INTERFACE DEFINITION
// Define interface to dynamically create and alter HTML elements at runtime
interface Item {
  name: string;
  cost: number;
  rate: number;
  count: number;
  description: string;
  id: string;
}

// Create interface items for later use in the code
const availableItems: Item[] = [
  {
    name: "Cake Engineer",
    cost: 10,
    rate: 0.1,
    count: 0,
    description:
      "Student Cake Engineers - Cs get degrees (of the burn variety)",
    id: "bakerCount",
  },
  {
    name: "Stand Mixer",
    cost: 100,
    rate: 2,
    count: 0,
    description:
      "Stand Mixers Made as Student Projects - They'll be a good resume pieces",
    id: "mixerCount",
  },
  {
    name: "Old Oven",
    cost: 1000,
    rate: 50,
    count: 0,
    description:
      "Decades-Old Ovens - It's a miracle the department was able to even get these",
    id: "ovenCount",
  },
  {
    name: "Teaching Assistants",
    cost: 2000,
    rate: 100,
    count: 0,
    description:
      "Underpaid Teaching Assistants - Deserve more thanks than they get",
    id: "assistantCount",
  },
  {
    name: "Professor",
    cost: 5000,
    rate: 200,
    count: 0,
    description:
      "Professor with a Food Engineering Doctorate - Working asynchronously, course material is shaky at best",
    id: "professorCount",
  },
];

// END INTERFACE DEFINITION

// Create background image to fit aesthetic
document.body.style.backgroundImage =
  "url(https://www.shutterstock.com/image-photo/outside-view-bakery-glass-showcase-600nw-2207207873.jpg)"; // import image
document.body.style.backgroundSize = "cover"; // make it cover the whole page
document.body.style.backgroundPosition = "center"; // center alignment
document.body.style.backgroundRepeat = "no-repeat"; // make sure the bg doesn't tile

// Define HTML body to overlay over background image
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
  margin: 4px 20;
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

<p style="
  margin: 4px 20;
  text-align: center;
  padding: 0;
  ">
</p>

<div id="upgradebuttons" style="
  margin: 4px 20;
  text-align: center;
  padding: 0;
  ">
</div>
`;

// UI CONSTRUCTION

// Rate of incrementation and counter to track clicks and auto incrementation
let counter: number = 0;
const counterElem = document.getElementById("counter")!;

let autoIncrementRate: number = 0;

// Define variables for HTML elements to modify them in code later

// Define variable for descriptions container
const descContainerElem = document.getElementById("descriptions")!;

// Loop over the items in the interface defined above to dynamically create item
// descriptions and variables for how many there are of each to update later
availableItems.forEach((item) => {
  const desc = document.createElement("p");
  desc.textContent = `${item.description}: `;

  const descSpan = document.createElement("span");
  descSpan.id = item.id;
  descSpan.textContent = "0";

  desc.appendChild(descSpan);
  descContainerElem.appendChild(desc);
});

// Define variable for button container
const buttonContainerElem = document.getElementById("upgradebuttons")!;

// Loop over the items in the interface defined above to dynamically create buttons
// with items, their current costs, and their click events, which will dynamically
// update later in code
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

// Define variable for main player button
const cakeButton = document.getElementById("buttonCake")!;

// Button click event for the main button the player interacts with
cakeButton.addEventListener("click", () => {
  counter += 1;
  counterElem.textContent = counter.toFixed(4);
});

// END UI CONSTRUCTION

// GAME STATE
// Function that handles when an upgrade is bought upon clicking an upgrade button
function buyUpgrade(index: number) {
  const item = availableItems[index];
  if (counter >= item.cost) {
    autoIncrementRate += item.rate;
    counter -= item.cost;
    item.count++;
    item.cost *= 1.15;
    updateDisplay();
  }
}

// Function that handles updates to content within HTML elements
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

// END GAME STATE

// UPDATE LOOP
// Update loop function that updates the game state and visuals during runtime
function update(currentTime: number): void {
  const deltaTime = (currentTime - lastTime) / 1000; // convert ms to seconds
  lastTime = currentTime;

  // Increase value by fraction based on elapsed time
  counter += autoIncrementRate * deltaTime;
  counterElem.textContent = counter.toFixed(4);

  // Continue next frame
  requestAnimationFrame(update);
}

// Start loop
requestAnimationFrame(update);

// END UPDATE LOOP
