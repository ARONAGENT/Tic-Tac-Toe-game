let boxes = document.querySelectorAll(".box");
let turn = true;
let winnerbox = document.querySelector(".msg-container");
let win = document.querySelector("#win");
let resetgm = document.querySelector(".resetbtn");
let moveCount = 0;
let gameEnded = false;

const winningPatterns = [
  [0, 1, 2], 
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
]

const resetgame = () => {
  turn = true;
  moveCount = 0;
  gameEnded = false;
  enabledBoxes();
  winnerbox.classList.add("hide");  
}

const disabledBoxes = () => {
  for(let box of boxes){
    box.disabled = true;
  }
}

const enabledBoxes = () => {
  for(let box of boxes){
    box.disabled = false;
    box.innerText = "";
  }
}

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameEnded) return;
    
    box.style.fontSize = "100px";
    if(turn){
      box.innerText = "X";
      box.style.color = "red";
      turn = false;
    }
    else{
      box.innerText = "O";
      box.style.color = "blue";
      turn = true;
    }
    box.disabled = true;
    moveCount++;
    
    if (checkWinner()) {
      gameEnded = true;
    }
    
    if (moveCount === 9) {
      showDraw();
      gameEnded = true;
    }
  })
})

const showWinner = (winner) => {
  win.innerText = `Congrats, Winner is ${winner}`;
  winnerbox.classList.remove("hide");
  disabledBoxes();
}

const showDraw = () => {
  win.innerText = "It's a draw!";
  winnerbox.classList.remove("hide");
  disabledBoxes();
}

const checkWinner = () => {
  for(let pattern of winningPatterns){
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if(pos1val != "" && pos2val != "" && pos3val != "") {
      if(pos1val === pos2val && pos1val === pos3val){
        console.log("Winner", pos1val);
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
}

resetgm.addEventListener("click", resetgame);