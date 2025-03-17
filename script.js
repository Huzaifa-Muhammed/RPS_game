

document.addEventListener("DOMContentLoaded", function (){

    let userScore = 0;
    let compScore = 0;

    const userChoices = document.querySelectorAll(".userChoices div");
    const compChoices = document.querySelectorAll(".compChoices img");
    const selectedUserChoice = document.querySelector("#selectedUserChoice");
    const selectedCompChoice = document.querySelector("#selectedCompChoice");
    const resultMsg = document.querySelector(".resultMsg");
    const userScoreText = document.querySelector("#userScore");
    const compScoreText = document.querySelector("#compScore");

    userChoices.forEach((choice) => {
      const userChoice = choice.getAttribute("id");

      choice.addEventListener("click", async () => {
        selectedUserChoice.textContent = `You Picked :${userChoice}`;
        let computerChoice = await computerPickingChoice();
        playGame(userChoice,computerChoice);
      });
    });

    function delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function computerPickingChoice() {
      let index = Math.floor(Math.random() * 3);
      const computerChoices = ["Rock", "Paper", "Scissor"];
      let computerChoice = computerChoices[index];

      selectedCompChoice.textContent = `Thinking...`;

      for (let img of compChoices) {
        img.style.opacity = "0.5";
        img.style.transform = "scale(1.1)";
        await delay(300);
        img.style.opacity = "1";
        img.style.transform = "scale(1)";
      }

      selectedCompChoice.textContent = `Guess What...?👀`;

      await delay(800);
      
      selectedCompChoice.textContent = `Computer Picked: ${computerChoice}`;

      return computerChoice;
    }

    function playGame(userChoice, computerChoice){

        if(computerChoice == userChoice){
            resultMsg.classList.remove("resultSuccessMsg");
            resultMsg.classList.remove("resultFailureMsg");
            resultMsg.classList.add("resultMsg");
            resultMsg.textContent = "It's a Draw!";
        }
        else{
            let isUserWin = false;

            if (
              (userChoice === "Rock" && computerChoice === "Scissor") ||
              (userChoice === "Paper" && computerChoice === "Rock") ||
              (userChoice === "Scissor" && computerChoice === "Paper")
            ) {
              isUserWin = true;
            }

            if (isUserWin) {
              resultMsg.textContent = "You Win! 🎉";
              resultMsg.classList.remove("resultMsg");
              resultMsg.classList.remove("resultFailureMsg");
              resultMsg.classList.add("resultSuccessMsg");
              userScore++;
              userScoreText.textContent = `Your Score :${userScore}`;
            } else {
              resultMsg.textContent = "Computer Wins! 😢";
              resultMsg.classList.remove("resultMsg");
              resultMsg.classList.remove("resultSuccessMsg");
              resultMsg.classList.add("resultFailureMsg");
              compScore++;
              compScoreText.textContent = `Computer's Score :${compScore}`;
            }
        }
    }

});
