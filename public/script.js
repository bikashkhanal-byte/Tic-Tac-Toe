//  game start

const modal = document.querySelector(".form__group");
const startGameBtn = document.querySelector(".startGame");
const gameBoard = document.getElementById("gameContainer");
let playerXName = "";
let playerOName = "";


//socket io
const socket = io();
    
// Assuming you already have logic to handle grid clicks
document.querySelectorAll('.cell').forEach(cell => {
  cell.addEventListener('click', (e) => {
    const index = e.target.dataset.index;
    makeMove(index, 'X'); // your local move

    // Send move to other player
    socket.emit('move', { index });
  });
});

// Receive move from opponent
socket.on('move', (data) => {
  makeMove(data.index, 'O'); // apply opponent move
});


//menue-option

const FriendsMode = document.querySelector(".friends-mode");
const menue = document.querySelector("#menue");

FriendsMode.addEventListener("click", () =>{
    modal.style.display = "flex";
    menue.style.display = "none";

});

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
const leaderboard = document.querySelector("#leaderboard");

let playerXwins = 0;
let playerOwins = 0;

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
    const name = CurrentPlayer === "X" ? playerXName : playerOName;
    restartBtn.addEventListener('click',RestartGame);
    statusText.textContent = `${name} ${CurrentPlayer}'s turn`;
    running = true;
    
}

function cellClicked(){
    const cellIndex = this.dataset.index;
    
    if(options[cellIndex] != "" || !running) return;
    
    updatecell(this , cellIndex);
    
    const KnockingOnBoard = document.getElementById('knocking-on-board');
     KnockingOnBoard.currentTime = 0;
     KnockingOnBoard.play();
    CheckWinner();
}


function updatecell(cell , Index){
    options[Index] = CurrentPlayer;
    cell.textContent = CurrentPlayer;
}

function ChangePlayer() {
    CurrentPlayer = (CurrentPlayer === "X") ? "O" : "X";
    const name = CurrentPlayer === "X" ? playerXName : playerOName;
    statusText.textContent = `${name} (${CurrentPlayer})'s Turn`;
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
                statusText.classList.add('winner');
                const winnerName = CurrentPlayer === "X" ? playerXName : playerOName;
                statusText.textContent = `${winnerName} (${CurrentPlayer})'s wins!`;
                
                //Animation 
                
                confetti({
                    particleCount:1000,
                    spread: 220,
                    origin:{y: 0.6}
                });
                   
                
                  //sound effect

                  const winSound = document.getElementById("winSound");
                  winSound.currentTime = 0; // Rewind to start
                  winSound.play();
                  
                  // Stop the sound after 3 seconds (or your confetti duration)
                  setTimeout(() => {
                      winSound.pause();
                      winSound.currentTime = 0;
                  }, 4000);

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
        statusText.classList.remove("winner")
        statusText.textContent = `${playerXName}'s (X) turn`;
        running = true;
    }
    
        
