const griddisplay = document.querySelector("#grid");
const resultdisplay = document.querySelector("#score");
const restartButton = document.querySelector(".restart");

const cardArray = [
  { name: "ace-heart", img: "images/ace-hearts.jpg" },
  { name: "ace-diamond", img: "images/ace-diamonds.jpg" },
  { name: "ace-clubs", img: "images/ace-clubs.jpg" },
  { name: "three-diamond", img: "images/three-diamonds.jpg" },
  { name: "four-heart", img: "images/four-hearts.jpg" },
  { name: "two-spade", img: "images/two-spades.jpg" },
  { name: "ace-heart", img: "images/ace-hearts.jpg" },
  { name: "ace-diamond", img: "images/ace-diamonds.jpg" },
  { name: "ace-clubs", img: "images/ace-clubs.jpg" },
  { name: "three-diamond", img: "images/three-diamonds.jpg" },
  { name: "four-heart", img: "images/four-hearts.jpg" },
  { name: "two-spade", img: "images/two-spades.jpg" },
];

// cardArray.sort(() => 0.5 - Math.random());

let card_chosen = [];
let card_chosen_id = [];
let cardsWon = [];

generateboard();

// Generate the game board
function generateboard() {
  griddisplay.innerHTML = ""; // Clear the grid
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement("img");
    card.setAttribute("src", "images/back.jpg");
    card.setAttribute("data-id", i);
    card.addEventListener("click", flipcard);
    griddisplay.appendChild(card);
  }
  console.log(cardArray);
}

// Flip a card
function flipcard() {
  const card_id = this.getAttribute("data-id");
  this.setAttribute("src", cardArray[card_id].img);
  card_chosen_id.push(card_id);
  card_chosen.push(cardArray[card_id].name);

  if (card_chosen.length === 2) {
    setTimeout(checkmatch, 500);
  }
}

// Check for matching cards
function checkmatch() {
  const cards = document.querySelectorAll("img");

  if (card_chosen[0] === card_chosen[1]) {
    alert("You have found a match");
    cards[card_chosen_id[0]].setAttribute("src", "images/done.jpg");
    cards[card_chosen_id[1]].setAttribute("src", "images/done.jpg");
    cards[card_chosen_id[0]].removeEventListener("click", flipcard);
    cards[card_chosen_id[1]].removeEventListener("click", flipcard);
    cardsWon.push(card_chosen);
    resultdisplay.innerHTML = cardsWon.length;
  } else {
    cards[card_chosen_id[0]].setAttribute("src", "images/back.jpg");
    cards[card_chosen_id[1]].setAttribute("src", "images/back.jpg");
  }

  card_chosen = [];
  card_chosen_id = [];

  if (cardsWon.length === cardArray.length / 2) {
    resultdisplay.innerHTML =
      "Congratulations... You have successfully completed the game";
  }
}

// Restart the game
function restartGame() {
  cardArray.sort(() => 0.5 - Math.random()); // Shuffle the cards
  card_chosen = [];
  card_chosen_id = [];
  cardsWon = [];
  resultdisplay.innerHTML = 0; // Reset score
  generateboard(); // Re-generate the board
}

// Event listener for the restart button
restartButton.addEventListener("click", restartGame);
