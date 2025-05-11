//  game start
const modal = document.querySelector(".form__group");
const startGameBtn = document.querySelector(".button-85");
const gameBoard = document.getElementById("gameContainer");

let playerXName = "";
let playerOName = "";


startGameBtn.addEventListener("click", () => { 
    const playerXInput = document.querySelector(".playerXInput");
    const playerOInput = document.querySelector(".playerOInput");
    
    const playerXValue = playerXInput.value.trim();
    const playerOValue = playerOInput.value.trim();

    if (playerXValue && playerOValue) {
        playerXName = playerXValue;
        playerOName = playerOValue;

        modal.style.display = "none";
        gameBoard.style.display = "block";

        statusText.textContent = `${playerXName}'s (X) turn`;
        running = true;

        Initilizegame();
    } else {
        alert("Please enter names for both players!");
    }
});
   
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#StatusText");
const restartBtn = document.querySelector("#restartBtn");

const WinCondition = [
    [0 , 1 , 2],
    [3 , 4 , 5],   
    [6 , 7 , 8],
    [0 , 3 , 6],
    [1 , 4 , 7],
    [2 , 5 , 8],
    [0 , 4 , 8],
    [2 , 4 , 6]
];
let options = ["" , "" , "" , "" , "" , "" , "" , "" , ""];
let CurrentPlayer = "X";
let running = false;

function Initilizegame(){
    cells.forEach( cell => cell.addEventListener('click' , cellClicked));
    restartBtn.addEventListener('click',RestartGame);
    statusText.textContent = `${CurrentPlayer}'s turn`;
    running = true;
    
}

function cellClicked(){
    const cellIndex = this.dataset.index;
    
    if(options[cellIndex] != "" || !running) return;
    
    updatecell(this , cellIndex);
    
    CheckWinner();
}


function updatecell(cell , Index){
    options[Index] = CurrentPlayer;
    cell.textContent = CurrentPlayer;
}

function ChangePlayer() {
    CurrentPlayer = (CurrentPlayer === "X") ? "O" : "X";
    const name = CurrentPlayer === "X" ? playerXName : playerOName;
    statusText.textContent = `${name}'s (${CurrentPlayer}) Turn`;
}
    
function CheckWinner(){
        let roundWon = false;

        for(let i = 0 ; i < WinCondition.length ; i++ ){
            const condion = WinCondition[i];
            const cellA = options[condion[0]];
            const cellB = options[condion[1]];
            const cellC = options[condion[2]];


            if(cellA == ""|| cellB == "" || cellC == "" ) continue;
            
            // check cells are same string

            if(cellA == cellB && cellB == cellC ){
                roundWon = true;
                break;
            }
        }
            //display who won the round 

            if (roundWon) {
                const winnerName = CurrentPlayer === "X" ? playerXName : playerOName;
                statusText.textContent = `${winnerName} (${CurrentPlayer}) wins!`;
                statusText.classList.add("winner"); 
                document.getElementById("celebrationGif").display.style = "block";
                running = false;
            }
            
            //if no change 3 in a row display draw

            else if(!options.includes("")) {
                statusText.textContent = "Draw!";
            }

            else{ //moves to other player 
                ChangePlayer();
            }
    }

    function RestartGame(){
        CurrentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        statusText.classList.remove("winner"); // remove styling
        statusText.textContent = `${playerXName}'s (X) turn`; // reset text
        document.getElementById("celebrationGif").display.style = "block";
        running = true;
    }
    
