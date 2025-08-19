// Beginner-friendly image names for each theme
var images = {
  fruits: [
    "apple.png",
    "banana.png",
    "grapes.png",
    "orange.png",
    "watermelon.png",
    "pineapple.png",
    "strawberry.png",
    "kiwi.png",
  ],
  animals: [
    "dog.png",
    "cat.png",
    "lion.png",
    "panda.png",
    "frog.png",
    "fox.png",
    "monkey.png",
    "bear.png",
  ],
  flags: [
    "india.png",
    "usa.png",
    "japan.png",
    "brazil.png",
    "uk.png",
    "france.png",
    "italy.png",
    "china.png",
  ],
  languages: [
    "python.png",
    "java.png",
    "c.png",
    "javascript.png",
    "html.png",
    "css.png",
    "php.png",
  ],
};

var firstCard = null;
var secondCard = null;
var attempts = 0;
var score = 0;
var lock = false;

function toggleMenu() {
  var sb = document.getElementById("sidebar");
  if (sb.style.display === "none" || sb.style.display === "") {
    sb.style.display = "block";
  } else {
    sb.style.display = "none";
  }
}

function showSection(id) {
  var sections = document.getElementsByClassName("info-page");
  for (var i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  document.getElementById(id).style.display = "block";
}

function startGame() {
  var layout = document.getElementById("layout").value;
  var theme = document.getElementById("theme").value;
  var board = document.getElementById("gameBoard");
  board.innerHTML = "";

  var rows = 2;
  var cols = 2;
  if (layout == "2x2") {
    rows = 2;
    cols = 2;
  }
  if (layout == "3x4") {
    rows = 3;
    cols = 4;
  }
  if (layout == "4x4") {
    rows = 4;
    cols = 4;
  }
  if (layout == "4x5") {
    rows = 4;
    cols = 5;
  }
  board.style.gridTemplateColumns = "repeat(" + cols + ", 1fr)";

  var icons = images[theme];
  var numPairs = (rows * cols) / 2;
  var gameCards = icons.slice(0, numPairs);
  gameCards = gameCards.concat(gameCards);
  gameCards.sort(function () {
    return 0.5 - Math.random();
  });

  attempts = 0;
  score = 0;
  document.getElementById("attempts").innerText = attempts;
  document.getElementById("score").innerText = score;

  for (var i = 0; i < gameCards.length; i++) {
    var c = document.createElement("div");
    c.className = "card";
    c.dataset.value = gameCards[i];
    c.innerHTML =
      '<img src="img/card-back.png" class="card-back">' +
      '<img src="img/' +
      gameCards[i] +
      '" class="card-front">';
    c.onclick = function () {
      flipCard(this);
    };
    board.appendChild(c);
  }
}

function flipCard(card) {
  if (lock || card.classList.contains("open") || card.classList.contains("matched"))
    return;
  card.classList.add("open");
  if (firstCard === null) {
    firstCard = card;
  } else {
    secondCard = card;
    attempts++;
    document.getElementById("attempts").innerText = attempts;
    lock = true;
    if (firstCard.dataset.value === secondCard.dataset.value) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      score++;
      document.getElementById("score").innerText = score;
      saveScore(score);
      resetTurn();
    } else {
      setTimeout(function () {
        firstCard.classList.remove("open");
        secondCard.classList.remove("open");
        resetTurn();
      }, 1000);
    }
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lock = false;
}

function saveScore(score) {
  var best = localStorage.getItem("bestScore");
  if (!best || score > best) {
    localStorage.setItem("bestScore", score);
  }
}
