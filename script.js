console.log("Drag and Drop Feature");

// https://innotrailassignment-pr.netlify.app/

// Array for Undo History

let undoHistory = [];
let redoHistory = [];

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
  }
}

function redo() {
  console.log("REDO");

  console.log(redoHistory);

  if (redoHistory.length > 0) {
    // Get last data from history

    const lastState = redoHistory.pop();

    if (lastState.length === 6) {
      addRow(
        lastState[0],
        lastState[1],
        lastState[2],
        lastState[3],
        lastState[4],
        lastState[5],
        lastState[6]
      );
    } else {
      const sourceBox = document.getElementById(lastState.sourceBoxId);
      const sourceCell = lastState.sourceBoxParent;
      const targetBox = document.getElementById(lastState.targetBoxId);
      const targetCell = lastState.targetBoxParent;

      // Swap boxes back to their previous positions (opposite of undo)

      sourceCell.appendChild(targetBox);
      targetCell.appendChild(sourceBox);

      // Add current state to undo history
      undoHistory.push(lastState);
    }
  } else {
    alert("Nothing to Redo!!!");
  }
}

function undo() {
  if (undoHistory.length > 0) {
    // Get last data from history

    const lastState = undoHistory.pop();

    if (lastState.length === 6) {
      const table = document.getElementById("tableBodyId");
      if (table) {
        const lastRow = table.lastElementChild;
        if (lastRow && lastRow.tagName.toLowerCase() === "tr") {
          table.removeChild(lastRow);
        } else {
          console.warn(
            "The table has no rows to remove, or the last child is not a row."
          );
        }
      } else {
        console.error("The table with ID 'tableId' was not found.");
      }

      redoHistory.push(lastState);
    } else {
      const sourceBox = document.getElementById(lastState.sourceBoxId);
      const sourceCell = lastState.sourceBoxParent;
      const targetBox = document.getElementById(lastState.targetBoxId);
      const targetCell = lastState.targetBoxParent;

      // Add current state to redo history

      redoHistory.push(lastState);

      // Swap boxes back to their previous positions

      targetCell.appendChild(targetBox);
      sourceCell.appendChild(sourceBox);
    }
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

function addRow(
  id1 = null,
  id2 = null,
  id3 = null,
  dId1 = null,
  dId2 = null,
  dId3 = null
) {
  const table = document.querySelector("table");
  const newRow = table.insertRow(-1);

  let ls = [];

  if (id1 == null) {
    id1 = `RC${Math.floor(Math.random() * 1000)}`;
    dId1 = `RC${Math.floor(Math.random() * 1000)}`;
    console.log("NONE");
  }

  if (id2 == null) {
    id2 = `RC${Math.floor(Math.random() * 1000)}`;
    dId2 = `RC${Math.floor(Math.random() * 1000)}`;
  }

  if (id3 == null) {
    id3 = `RC${Math.floor(Math.random() * 1000)}`;
    dId3 = `RC${Math.floor(Math.random() * 1000)}`;
  }

  console.log(id1, id2);

  ls.push(id1, id2, id3, dId1, dId2, dId3);
  console.log(ls);

  // creating new cell and adding data to that div

  const newCell1 = newRow.insertCell();
  const newDiv1 = document.createElement("div");
  newCell1.id = id1;
  newDiv1.id = dId1;
  newDiv1.draggable = true;
  newDiv1.textContent = inp1Val;
  newCell1.appendChild(newDiv1);
  newDiv1.style.backgroundColor = inp1Col;
  newDiv1.classList.add("innerBoxDiv");

  const newCell2 = newRow.insertCell();
  const newDiv2 = document.createElement("div");
  newCell2.id = id2;
  newDiv2.id = dId2;
  newDiv2.draggable = true;
  newDiv2.textContent = inp2Val;
  newCell2.appendChild(newDiv2);
  newDiv2.style.backgroundColor = inp2Col;
  newDiv2.classList.add("innerBoxDiv");

  const newCell3 = newRow.insertCell();
  const newDiv3 = document.createElement("div");
  newCell3.id = id3;
  newDiv3.id = dId3;
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

  undoHistory.push(ls);
}
