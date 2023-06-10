let secretNumber = Math.trunc(Math.random() * 20) + 1;
console.log(secretNumber);
let currentScore = 100;
let highScore = 0;
let deduct = 10;

// select all the required element
let wrapper = document.getElementById("wrapper");
let num = document.getElementById("number");
let checkBtn = document.getElementById("check");
let againBtn = document.getElementById("again");
let msg = document.querySelector(".msg");
let score = document.getElementById("score");
let maxScore = document.getElementById("max-score");
let showNumber = document.getElementById("mystery-box");
let mode = document.getElementById("mode");

let heading = document.querySelector(".heading");

// modal section
const modal = document.querySelector(".modal");
const modalBackground = document.querySelector(".back-modal");

// function for open the modal
const openModal = () => {
  modal.classList.add("active");
  modalBackground.classList.add("back-modal-active");
};

// function for modal
const closeModal = () => {
  modal.classList.remove("active");
  modalBackground.classList.remove("back-modal-active");
};

// function for shake the button
function shake(element, className, originalClass) {
  // we add shake class for shaking
  element.classList = `${originalClass} ${className}`;

  // after 3 second we remove that class
  let delay = setTimeout(function () {
    element.classList = `${originalClass}`;
  }, 3000);
}

// when user click on check btn
checkBtn.addEventListener("click", () => {
  // when the number is empty
  if (num.value === "") {
    msg.innerText = "👀 Kuch to likho yaar!";

    shake(checkBtn, "shake", "btn");

    // when the user guessing number and secret numbers are equal
  } else if (Number(num.value) === secretNumber) {
    win();
  } else {
    // when the user is lost the game
    if (
      (Number(score.innerText) == 10 && deduct == 10) ||
      (Number(score.innerText) == 10 && deduct == 15) ||
      (Number(score.innerText) == 20 && deduct == 20)
    ) {
      lost();
    } else if (Number(score.innerText) > 1) {
      currentScore -= deduct;
      score.innerText = currentScore;

      // msg update
      if (Number(num.value) < 1 || Number(num.value) > 20) {
        msg.innerText = "Out of Range!\nRange is 1 to 20";
      } else if (
        Number(num.value) >= secretNumber - 2 &&
        Number(num.value) <= secretNumber + 2
      ) {
        msg.innerText = "🤩 Very Close...\nTry another number";
      } else if (Number(num.value) > secretNumber) {
        msg.innerText = "📈 Too high...\nTry another number";
      } else {
        msg.innerText = "📉 Too low...\nTry another number";
      }
    }
  }
});

// restart the game
againBtn.addEventListener("click", () => {
  wrapper.style.backgroundColor = "#222222";
  currentScore = 100;
  num.value = "";
  score.innerText = currentScore;
  msg.innerText = "🤔 Start guessing...";
  showNumber.innerText = "?";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  showNumber.style.width = "8rem";
  heading.innerText = "Guess My Number!";
  mode.style.pointerEvents = "initial";
});

// function for lost
const lost = () => {
  msg.innerText = "😥 You Lost the Game";
  wrapper.style.backgroundColor = "#b30009";
  score.innerText = 0;
  shake(againBtn, "shake", "btn");
  shake(showNumber, "shake-mystery-box", "");
  heading.innerText = "Press The Again Button";
  mode.style.pointerEvents = "none";
};

// function for win the game
const win = () => {
  num.value = "";
  msg.innerText = "🎉 Correct Number";
  shake(againBtn, "shake", "btn");
  showNumber.innerText = secretNumber;
  showNumber.style.width = "20rem";
  wrapper.style.backgroundColor = "#60b347";
  heading.innerText = "Press The Again Button";
  mode.style.pointerEvents = "none";

  // set the high score
  if (Number(score.innerText) > Number(maxScore.innerText)) {
    highScore = Number(score.innerText);
    maxScore.innerText = highScore;
  }
};

// function for change mode
const changeMode = (mode) => {
  let esy = document.querySelector("#easy");
  let mid = document.querySelector("#medium");
  let had = document.querySelector("#hard");
  let modeType = document.querySelector("#modeType");

  if (mode === "easy") {
    deduct = 10;
    esy.style.backgroundColor = "#49e9797a";
    mid.style.backgroundColor = "#cbc8c8";
    had.style.backgroundColor = "#cbc8c8";
    modeType.innerText = "Easy";
  } else if (mode === "mid") {
    deduct = 15;
    esy.style.backgroundColor = "#cbc8c8";
    mid.style.backgroundColor = "#ffab3ee6";
    had.style.backgroundColor = "#cbc8c8";
    modeType.innerText = "Medium";
  } else {
    deduct = 20;
    esy.style.backgroundColor = "#cbc8c8";
    mid.style.backgroundColor = "#cbc8c8";
    had.style.backgroundColor = "#ff3e3efa";
    modeType.innerText = "Hard";
  }
  currentScore = 100;
  score.innerText = currentScore;

  const removeModal = setTimeout(() => {
    closeModal();
  }, 200);
};
