import "./style.css";

let counter: number = 0;

document.body.innerHTML = `
<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
">
  <div style="
    margin: 0;
    padding: 0;
    ">
    <h1 style="margin: 10;">CMPM 121 Incremental Game</h1>
    <p style="margin: 4px 20;">Counter: <span id="counter">0</span></p>
  </div>

  <button id="button" style="
    border: none;
    color: white;
    text-align: center;
    font-size: 64px;
    background-color: #ffffff;
    cursor: pointer;
  ">🎂</button>
</div>
`;

// Add click handler

const button = document.getElementById("button")!;
const counterElement = document.getElementById("counter")!;

button.addEventListener("click", () => {
  counter += 1;
  counterElement.textContent = counter.toString();
});

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