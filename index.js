console.log("Drag and Drop Feature");
// https://innotrailassignment-pr.netlify.app/

// Array for Undo History
let undoHistory = [];

//DIV DRAG FEATURE ___________________________________________________________

let boxes = document.querySelectorAll(".innerBoxDiv");

boxes.forEach((box) => {
  box.addEventListener("dragstart", dragStart);
  box.addEventListener("dragover", dragOver);
  box.addEventListener("drop", drop);
});

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
  event.preventDefault(); // Allow dropping
}

function drop(event) {
  event.preventDefault();

  const sourceId = event.dataTransfer.getData("text/plain");
  const sourceBox = document.getElementById(sourceId);
  const targetBox = event.target;

  if (
    sourceBox !== targetBox &&
    sourceBox.parentElement !== targetBox.parentElement
  ) {
    // Swap boxes from one to other div cell
    const sourceCell = sourceBox.parentElement;
    const targetCell = targetBox.parentElement;

    // Store last swap before swap
    const previousState = {
      sourceBoxId: sourceId,
      sourceBoxParent: sourceBox.parentElement,
      targetBoxId: targetBox.id,
      targetBoxParent: targetBox.parentElement,
    };

    sourceCell.appendChild(targetBox);
    targetCell.appendChild(sourceBox);

    undoHistory.push(previousState);
    // console.log(undoHistory);
  }
}

function undo() {
  if (undoHistory.length > 0) {
    // Get last data from history
    const lastState = undoHistory.pop();

    const sourceBox = document.getElementById(lastState.sourceBoxId);
    const sourceCell = lastState.sourceBoxParent;

    const targetBox = document.getElementById(lastState.targetBoxId);
    const targetCell = lastState.targetBoxParent;

    // Swap boxes back to their previous positions

    targetCell.appendChild(targetBox);
    sourceCell.appendChild(sourceBox);
  } else {
    alert("Nothing to Undo!!!");
  }
}

//ADD ROW FEATURE___________________________________________________________

let inp1Val = "";
let inp2Val = "";
let inp3Val = "";
let inp1Col = "";
let inp2Col = "";
let inp3Col = "";

const inputField1 = document.getElementById("inp1Val");
const inputField2 = document.getElementById("inp2Val");
const inputField3 = document.getElementById("inp3Val");
const inputField4 = document.getElementById("inp1Col");
const inputField5 = document.getElementById("inp2Col");
const inputField6 = document.getElementById("inp3Col");

inputField1.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp1Val = inputValue;
});
inputField2.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp2Val = inputValue;
});
inputField3.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp3Val = inputValue;
});
inputField4.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp1Col = inputValue;
});
inputField5.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp2Col = inputValue;
});
inputField6.addEventListener("input", (event) => {
  const inputValue = event.target.value;
  inp3Col = inputValue;
});

// function testBtn() {
//   console.log(inp1Val);
//   console.log(inp2Val);
//   console.log(inp3Val);
//   console.log(inp1Col);
//   console.log(inp2Col);
//   console.log(inp3Col);
// }

function addRow() {
  const table = document.querySelector("table");
  const newRow = table.insertRow(-1);

  // creating new cell and adding data to that div

  const newCell1 = newRow.insertCell();
  const newDiv1 = document.createElement("div");
  newCell1.id = `RC${Math.floor(Math.random() * 100)}`;
  newDiv1.id = `RC${Math.floor(Math.random() * 100)}`;
  newDiv1.draggable = true;
  newDiv1.textContent = inp1Val;
  newCell1.appendChild(newDiv1);
  newDiv1.style.backgroundColor = inp1Col;
  newDiv1.classList.add("innerBoxDiv");

  const newCell2 = newRow.insertCell();
  const newDiv2 = document.createElement("div");
  newCell2.id = `RC${Math.floor(Math.random() * 200)}`;
  newDiv2.id = `RC${Math.floor(Math.random() * 200)}`;

  newDiv2.draggable = true;
  newDiv2.textContent = inp2Val;
  newCell2.appendChild(newDiv2);
  newDiv2.style.backgroundColor = inp2Col;
  newDiv2.classList.add("innerBoxDiv");

  const newCell3 = newRow.insertCell();
  const newDiv3 = document.createElement("div");
  newCell3.id = `RC${Math.floor(Math.random() * 300)}`;
  newDiv3.id = `RC${Math.floor(Math.random() * 300)}`;
  newDiv3.draggable = true;
  newDiv3.textContent = inp3Val;
  newCell3.appendChild(newDiv3);
  newDiv3.style.backgroundColor = inp3Col;
  newDiv3.classList.add("innerBoxDiv");

  boxes = document.querySelectorAll(".innerBoxDiv");

  boxes.forEach((box) => {
    box.addEventListener("dragstart", dragStart);
    box.addEventListener("dragover", dragOver);
    box.addEventListener("drop", drop);
  });
}
