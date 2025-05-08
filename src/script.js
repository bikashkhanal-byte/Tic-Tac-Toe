//  game start
const modal = document.querySelector(".form__group");
const startGameBtn = document.querySelector(".button-85");
const gameBoard = document.getElementById("gameContainer");

let playerXName = "";
let playerOName = "";

startGameBtn.addEventListener("click", () => {
    const playerXInput = document.getElementById("playerX").value.trim();
    const playerOInput = document.getElementById("playerO").value.trim();
    
    if (playerXInput && playerOInput) {
      playerXName = playerXInput;
      playerOName = playerOInput;
    
      modal.style.display = "none";
      gameBoard.style.display = "block";
    
      statusText.textContent = `${playerXName}'s (X) turn`;
      running = true;
    }
     else {
      alert("Please enter names for both players!");
    }

    Initilizegame();
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

Initilizegame();
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

    function ChangePlayer(){
        CurrentPlayer = (CurrentPlayer == "X") ? "O" : "X"
        statusText.textContent = `${CurrentPlayer}'s Turn`;
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

            if(roundWon){
                statusText.textContent = `${CurrentPlayer}'s wins!`;
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
        options =  ["" , "" , "" , "" , "" , "" , "" , "" , ""];
        cells.forEach(cells => cells.textContent = "");
        running = true;
    }


