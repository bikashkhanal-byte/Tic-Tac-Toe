
//   game start

const modal = document.querySelector(".form__group");
const startGameBtn = document.querySelector(".startGame");
const gameBoard = document.getElementById("gameContainer");
const playerXInput = document.querySelector(".playerXInput");
const playerOInput = document.querySelector(".playerOInput");
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#StatusText");
const WinText = document.querySelector("#win");
const FriendsMode = document.querySelector(".friends-mode");
const menue = document.querySelector("#menue");
const restartBtn = document.querySelector("#restartBtn");
const leaderboard = document.querySelector("#leaderboard");
const resetBtn = document.querySelector("#icon-reset")
const winLine = document.querySelector("#winLine line");


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


let playerXName = "";
let playerOName = "";

FriendsMode.addEventListener("click", () =>{
    modal.style.display = "flex";
    menue.style.display = "none";

    playerXInput.value = "";
    playerOInput.value = "";
});



startGameBtn.addEventListener("click", () => { 
    
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
   

function Initilizegame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    const name = CurrentPlayer === "X" ? playerXName : playerOName;
    restartBtn.addEventListener('click',RestartGame);
    statusText.textContent = `${name} ${CurrentPlayer}'s turn`;
    restartBtn.style.display ="block";
    statusText.style.display = "block";
    resetBtn.style.display="block";
    gameBoard.style.display="grid";

    
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
            if(cellA == cellB && cellB == cellC ){
                roundWon = true;
                break;
            }
        }
            //display who won the round 
            if (roundWon) {
                statusText.style.display="none";
                const winnerName = CurrentPlayer === "X" ? playerXName : playerOName;
                // statusText.textContent =`${winnerName} (${CurrentPlayer})'s Wins! `                
                WinText.textContent = `${winnerName} (${CurrentPlayer})'s wins!`;
            
                 // Animate the win text
                WinText.classList.remove('animate');
                void WinText.offsetWidth; // Force reflow
                WinText.classList.add('animate');


                confetti({
                    particleCount:1000,
                    spread: 220,
                    origin:{y: 0.6}
                });
                  //sound effect
                  const winSound = document.getElementById("winSound");

                  if (winSound) {
                      winSound.muted = false;
                      winSound.volume = 1.0;
                      winSound.currentTime = 0;
                  
                      winSound.play()
                          .then(() => {
                              setTimeout(() => {
                                  winSound.pause();
                                  winSound.currentTime = 0;
                              }, 4000);
                          })
                          .catch((err) => {
                              console.warn("Sound failed to play:", err);
                          });
                  } else {
                      console.warn("winSound element not found.");
                  }
                  
                  running = false;
            }
            //if no change 3 in a row display draw

            else if(!roundWon && !options.includes("")) {
                statusText.textContent = "Draw!";
            }
           
            else{
                ChangePlayer();
            }
}   

function RestartGame() {
        CurrentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        cells.forEach(cell => cell.textContent = "");
        statusText.textContent = `${playerXName || "Player X"}'s (X) turn`;

        running = true;
    }
    
    //go at the begining

    resetBtn.addEventListener("click", function reset() {
        CurrentPlayer = "X";
        options = ["", "", "", "", "", "", "", "", ""];
        statusText.textContent = `${playerXName}'s (X) turn`;

        cells.forEach(cell => cell.textContent = "");
        // Hide the game board
        gameBoard.style.display = "none";
    
        // Show the modal to input player names again
        modal.style.display = "flex";
    
        // Hide the reset button
        restartBtn.style.display = "none";
        resetBtn.style.display ="none";
        // Clear the player input fields
        playerXInput.value = "";
        playerOInput.value = "";
    
        // Reset stored player names
        playerXName = "";
        playerOName = "";
    
        
        // Clear status and win messages
        statusText.textContent = "";
        WinText.textContent = "";
        running = true;
    })
    
