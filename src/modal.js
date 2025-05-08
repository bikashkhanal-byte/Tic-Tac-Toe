const modal = document.querySelectorAll(".form__field");
const startGameBtn = document.querySelectorAll(".button-85");
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
});