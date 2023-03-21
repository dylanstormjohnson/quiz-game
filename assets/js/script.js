var mainEl = document.querySelector("main");
var startBtnEl = document.querySelector("#start-btn");
var timerEl = document.querySelector("#time-el");

var interval;
var time = 100;
var questionIndex = 0;
var lastQuestionCorrect = "";
var correctAnswers = 0;
var highScores = JSON.parse(localStorage.getItem("players")) || [];

var questions = [
  {
    questionText: "The mast located on the quarter deck is called:",
    questionChoices: ["Main Mast", "Fore Mast", "Aft Mast", "Mizzen Mast"],
    correctAnswer: 3,
  },
  {
    questionText: "Where is the figurehead on a ship usually located?",
    questionChoices: [
      "Above the Main Deck",
      "Above the Ratlines",
      "Below the Jib",
      "Near the Stern",
    ],
    correctAnswer: 2,
  },
  {
    questionText: "Which side of the ship is called Starboard?",
    questionChoices: ["The Front", "The Back", "The Left", "The Right"],
    correctAnswer: 3,
  },
  {
    questionText: "Which side of the ship is called Port?",
    questionChoices: ["The Front", "The Back", "The Left", "The Right"],
    correctAnswer: 2,
  },
  {
    questionText: "What does the phrase 'Hard to Starboard' mean?",
    questionChoices: [
      "The ship is about to make a hard right turn",
      "The ship is about to make a hard left turn",
      "The ship is about to be barraged with cannonfire coming from its right",
      "The ship is about to be barraged with cannonfire coming from its left",
    ],
    correctAnswer: 0,
  },
  {
    questionText: "Which of these insults was made up by pirates?",
    questionChoices: [
      "Son of a biscuit-eater",
      "Milk-drinker",
      "I bite my thumb at you",
      "Stupid-head",
    ],
    correctAnswer: 0,
  },
  {
    questionText: "What is the function of the keel?",
    questionChoices: [
      "To keep the ship afloat and prevent it from hitting things",
      "To prevent the ship from sailing sideways or floating on its side",
      "To protect the ship in the event of it ramming another ship",
      "To slice through waves so a break can be made to prevent capsizing",
    ],
    correctAnswer: 1,
  },
  {
    questionText: "Which of these was a pirate in real life?",
    questionChoices: [
      "Fox Mulder",
      "Dana Scully",
      "Robert Edwards",
      "Samantha McMillian",
    ],
    correctAnswer: 2,
  },
  {
    questionText: "What is a Jolly Roger?",
    questionChoices: [
      "A flag with a skull and crossbones on it",
      "A figurehead of a mermaid",
      "A tavern in Tortuga",
      "A well-know pirate ship",
    ],
    correctAnswer: 0,
  },
  {
    questionText: "What is the name of the rope net tied from the rails to the top of the main mast?",
    questionChoices: [
      "The nets",
      "The ratlines",
      "The web",
      "The sidelines",
    ],
    correctAnswer: 1,
  },
];

console.log(questions.length)

function displayQuestion() {
    console.log(correctAnswers)
  mainEl.innerHTML = "";
  var pEl = document.createElement("p");
  pEl.textContent = lastQuestionCorrect;
  pEl.classList.add("update");
  
  if(lastQuestionCorrect === "That last question was correct!") {
    pEl.style.color = 'green';
  } 
  if(lastQuestionCorrect === "That last question was incorrect!") {
    pEl.style.color = 'red';
  }

  mainEl.appendChild(pEl);
  if (questionIndex >= questions.length) {
    endGame();
    return;
  }
  var h1El = document.createElement("h1");
  h1El.textContent = questions[questionIndex].questionText;
  h1El.classList.add("title");
  mainEl.appendChild(h1El);

  var btnDivEl = document.createElement("div");
  btnDivEl.classList.add("btn");
  mainEl.appendChild(btnDivEl);


  for (var i = 0; i < questions[questionIndex].questionChoices.length; i++) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = questions[questionIndex].questionChoices[i];
    buttonEl.setAttribute("class", "btn");
    buttonEl.setAttribute("data-index", i);
    btnDivEl.appendChild(buttonEl);
  }

  btnDivEl.addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
  event.preventDefault();
  var target = event.target;
  

  if (target.getAttribute("class") !== "btn") return;

  var clickedQuestionIndex = parseInt(target.getAttribute("data-Index"));

  if (clickedQuestionIndex === questions[questionIndex].correctAnswer) {
    lastQuestionCorrect = "That last question was correct!";
    correctAnswers++
  } else {
    time = time - 10;
    lastQuestionCorrect = "That last question was incorrect!";
}
  questionIndex++;

  displayQuestion();
}

startBtnEl.addEventListener("click", function (event) {

  mainEl.innerHTML = "";

  interval = setInterval(function () {
    time--;
    timerEl.textContent = `Time: ${time}`;

    if (time <= 0) {
      clearInterval(interval);
      endGame();
      return;
    }
  }, 1000);

  displayQuestion();
});

function endGame() {
    console.log(correctAnswers)
  clearInterval(interval);
  //create a Form
  mainEl.innerHTML += `  <form id="score-submit">
  <label for="initials">Initials:</label><br>
  <input type="text" id="initials" name="initials" placeholder="Ex: JDJ or DSJ without periods"><br>
  <input type="submit">
</form>`
document.getElementById("score-submit").addEventListener("submit", handleForm)
}

function handleForm(event){
    event.preventDefault()
    console.log(event.target)
    var theInitials = document.getElementById("initials").value
    // console.dir only works on the element, not any of the attributes (remove .value to test ^)
    // console.dir(theInitials)
    if(theInitials.length > 3){
        alert("You can only enter three initials");
        return;
    } else if(theInitials.length < 3) {
        alert("You must enter at least three initials");
        return
    } else {
    console.log("You're set for storage");
    //add it Local Storage
    highScores.push({
        initials: theInitials,
        score: correctAnswers
    })
    console.log(highScores)
    localStorage.setItem("players", JSON.stringify(highScores))
    window.location.reload()
    }
}

// Yoyo
// Youyou