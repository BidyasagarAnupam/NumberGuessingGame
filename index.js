let secretNumber = Math.trunc(Math.random() * 20) + 1;

let currentScore = 20;
let highScore = 0;

// select all the required element
let wrapper = document.getElementById("wrapper");
let num = document.getElementById("number");

let checkBtn = document.getElementById("check");
let againBtn = document.getElementById("again");

let msg = document.querySelector(".msg");

let score = document.getElementById("score");
let maxScore = document.getElementById("max-score");
let showNumber = document.getElementById("mystery-box");

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

    shake(checkBtn, 'shake', 'btn');

    // when the user guessing number and secret numbers are equal
  } else if (Number(num.value) === secretNumber) {
    num.value = "";
    msg.innerText = "🎉 Correct Number";
    shake(againBtn, 'shake', 'btn');
    showNumber.innerText = secretNumber;
    showNumber.style.width = "20rem";
    wrapper.style.backgroundColor = "#60b347";

    // console.log(
    //   `${Number(score.innerText)} and ${Number(maxScore.innerText)} `
    // );

    // set the high score
    if (Number(score.innerText) > Number(maxScore.innerText)) {
      highScore = Number(score.innerText);
      maxScore.innerText = highScore;
    }
  } else {
    if (Number(score.innerText) > 1) {
      currentScore--;
      score.innerText = currentScore;

      // msg update
      Number(num.value) > secretNumber
        ? (msg.innerText = "📈 Too high...\nTry another number")
        : (msg.innerText = "📉 Too low...\nTry another number");
    } else {
      // when the score is zero
      msg.innerText = "😥 You Lost the Game";
      wrapper.style.backgroundColor = "red";
      score.innerText = 0;
      shake(againBtn, 'shake', 'btn');
      shake(showNumber, 'shake-mystery-box', '')
    }
  }
});

// restart the game
againBtn.addEventListener("click", () => {
  wrapper.style.backgroundColor = "#222222";
  currentScore = 20;
  score.innerText = currentScore;
  msg.innerText = "🤔 Start guessing...";
  showNumber.innerText = "?";
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  showNumber.style.width = "8rem";
});
