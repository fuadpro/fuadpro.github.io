const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;
let seconds = 0,  minutes = 0;
let movesCount = 0, winCount = 0;

const items = [
  { name: "bee", image: "img/bee.png" },
  { name: "crocodile", image: "img/crocodile.png" },
  { name: "macaw", image: "img/macaw.png" },
  { name: "gorilla", image: "img/gorilla.png" },
  { name: "tiger", image: "img/tiger.png" },
  { name: "monkey", image: "img/monkey.png" },
  { name: "chameleon", image: "img/chameleon.png" },
  { name: "piranha", image: "img/piranha.png" },
  { name: "anaconda", image: "img/anaconda.png" },
  { name: "sloth", image: "img/sloth.png" },
  { name: "cockatoo", image: "img/cockatoo.png" },
  { name: "toucan", image: "img/toucan.png" },
];

const timeGenerator = () => {
  seconds += 1;
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};
//Pick random objects from the items array
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //Simple shuffle cards
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*  before => front side ?  after => back side image
        data-card-values is a custom attribute which stores the names of the cards to match later  */
    gameContainer.innerHTML += `<div class="card-container" data-card-value="${cardValues[i].name}">
                                    <div class="card-before">?</div>
                                    <div class="card-after">
                                    <img src="${cardValues[i].image}" class="image"/></div>
                                </div> `;
      }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    //Remembering time 4 seconds
      card.classList.add("flipped");
      let delay = setTimeout(() => {
        card.classList.remove("flipped");
      }, 4000);

    card.addEventListener("click", () => {
      if (!card.classList.contains("matched") && !card.classList.contains("flipped") ) {
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          movesCounter();
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount == half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2> <h4>Moves: ${movesCount}</h4>`;      
              stopGame();
            }
          } else {
            //if the cards dont match, flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 1000);
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;
  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  let delay = setTimeout(() => {
    interval = setInterval(timeGenerator, 1000);
  }, 4000);
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});
//Stop game
stopButton.addEventListener("click", (stopGame = () => {
        controls.classList.remove("hide");
        stopButton.classList.add("hide");
        startButton.classList.remove("hide");
        clearInterval(interval);
      })
);
//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
