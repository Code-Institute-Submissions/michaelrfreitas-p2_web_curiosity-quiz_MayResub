/* All JavaScript code for the quiz game with actions and interactions */


let time = 15; // Variable for start timer with 15 seconds
let number = 0; // Variable for start number question with 0

/* DOM Function to listener events in the page */
document.addEventListener("DOMContentLoaded", function () {
    // Variable to receive the button element listener to list buttons
    let buttons = document.getElementsByTagName("button");
    // Loop to check all button details in list buttons
    for (let button of buttons) {
        // Event button listener action click
        button.addEventListener("click", function () {
            // Check if attribute data-type equal submit to do actions
            if (this.getAttribute("data-type") === "submit") {
                // Variable name to get player name from name attribute in index page
                let name = document.getElementById("name").value;
                // Check if player not provide a player name show an alert
                if (name == "") {
                    alert("Player Name is required, please don't forget to field a Player Name.")
                } else { // Else player provide a player name execute actions below
                    // Remove the items from the SessionStorage to avoid repeated values from the previous games
                    sessionStorage.removeItem("endScore"); 
                    sessionStorage.removeItem("endCorrect");
                    sessionStorage.removeItem("endIncorrect");
                    sessionStorage.removeItem("pastQ");
                    // Call fuction nextPage to start the quiz and send name to quiz page
                    nextPage(name);
                }
            // Check if the click button get attribute A, B or C and get an answer
            } else if (this.getAttribute("data-type") === "A" || this.getAttribute("data-type") === "B" || this.getAttribute("data-type") === "C") {
                let answer = this.getAttribute("data-type"); // Variable receive the answer
                number++; // Plus 1 to number to show the right question number
                // Function CheckAnswer valitate the correct answer
                checkAnswer(answer); 
            // Check if the click button get attribute restart and show an alert
            } else if (this.getAttribute("data-type") === "restart") {
                alert("You are starting a new quiz!");
                // Remove the items from the SessionStorage to avoid repeated values from the previous games
                sessionStorage.removeItem("endScore");
                sessionStorage.removeItem("endCorrect");
                sessionStorage.removeItem("endIncorrect");
                sessionStorage.removeItem("pastQ");
                 // Call fuction nextPage to start a new quiz and send name of the previous game
                nextPage(sessionStorage.getItem("name"));
            } else { // Else click in end game before the game completed show an alert
                alert("Are you sure that you want to end the quiz?");
                // Call function display results
                displayResult();
            }
        });
    }
    // Call fuction setInterval with timeAnswer each 1 second
    setInterval(timeAnswer, 1000);
    // Call function startQuiz to initialize the quiz
    startQuiz();
});

/* Function getQuestions open the json file with database questions */
async function getQuestions() {
    try {
        let res = await fetch("./asset/js/questions.json");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

/* Function nextPage send index page to quiz page with player name sessionStorage */
function nextPage(name) {
    const nextURL = './quiz.html';
    document.location.assign(nextURL);
    sessionStorage.setItem("name", name);
}

/* Function startQuiz to start the quiz and validate questions */
async function startQuiz() {
    // Check if the question is not null
    if (document.getElementById("question") != null) {
        // Variable index to do a random for question
        let index = Math.floor(Math.random() * 20);
        let pastQ = []; // Array to receive a previous question
        if (sessionStorage.getItem("pastQ") != null) {
            pastQ = JSON.parse(sessionStorage.getItem("pastQ"));
        }
        // Loop to change index if the question is already in pastQ list
        pastQ.forEach(e => {
            if (e === index) {
                index = Math.floor(Math.random() * 20);
            }
        });
        pastQ.push(index);
        sessionStorage.setItem("pastQ", JSON.stringify(pastQ));
        // Variable questions receive the questions from Json
        let questions = await getQuestions();
        // Variable num receive number of the question to show in quiz page
        let num = document.getElementById("number").innerText;
        // Show the number, name and question
        document.getElementById("number").innerText = ++num;
        document.getElementById("name").textContent = sessionStorage.getItem("name");
        document.getElementById("question").textContent = questions[index].Questions;
        // Get correct answer
        let correct = questions[index].Correct;
        // Get correct name of the answer to provide a answer after random
        let answerRandom = questions[index][correct];
        // Answer random 
        let letter = Math.floor(Math.random() * 3) + 1;
        if (letter === 1) {
            document.getElementById("img_a").src = "./asset/media/" + questions[index].B + ".jpg";
            document.getElementById("img_b").src = "./asset/media/" + questions[index].C + ".jpg";
            document.getElementById("img_c").src = "./asset/media/" + questions[index].A + ".jpg";
            document.getElementById("text_a").textContent = questions[index].B;
            document.getElementById("text_b").textContent = questions[index].C;
            document.getElementById("text_c").textContent = questions[index].A;
            if (answerRandom === document.getElementById("text_a").innerText) {
                correct = "A";
            } else if (answerRandom === document.getElementById("text_b").innerText) {
                correct = "B";
            } else {
                correct = "C";
            }
        } else if (letter === 2) {
            document.getElementById("img_a").src = "./asset/media/" + questions[index].C + ".jpg";
            document.getElementById("img_b").src = "./asset/media/" + questions[index].A + ".jpg";
            document.getElementById("img_c").src = "./asset/media/" + questions[index].B + ".jpg";
            document.getElementById("text_a").textContent = questions[index].C;
            document.getElementById("text_b").textContent = questions[index].A;
            document.getElementById("text_c").textContent = questions[index].B;
            if (answerRandom === document.getElementById("text_a").innerText) {
                correct = "A";
            } else if (answerRandom === document.getElementById("text_b").innerText) {
                correct = "B";
            } else {
                correct = "C";
            }
        } else {
            document.getElementById("img_a").src = "./asset/media/" + questions[index].A + ".jpg";
            document.getElementById("img_b").src = "./asset/media/" + questions[index].B + ".jpg";
            document.getElementById("img_c").src = "./asset/media/" + questions[index].C + ".jpg";
            document.getElementById("text_a").textContent = questions[index].A;
            document.getElementById("text_b").textContent = questions[index].B;
            document.getElementById("text_c").textContent = questions[index].C;
            if (answerRandom === document.getElementById("text_a").innerText) {
                correct = "A";
            } else if (answerRandom === document.getElementById("text_b").innerText) {
                correct = "B";
            } else {
                correct = "C";
            }
        }
        // Add correct answer in sessionStorage
        sessionStorage.setItem("correct", correct);
    }
    // Call function displayEndScore to show the score
    displayEndScore();
    const name = sessionStorage.getItem("name"); // Get a name from sessionStorage and send for result
    document.getElementById("name").textContent = name;
}

/* Function checkAnswer limite until 10 question for game and addScore if correct or reduceScore 
if wrong, after 10 questions show the result */
function checkAnswer(answer) {
    if (number <= 10) {
        if (answer === sessionStorage.getItem("correct")) {
            addScore();
        } else {
            reduceScore();
        }
    } else {
        displayResult();
    }
}

/* Function addScore receive the previous score and add 10 points and show new score add 15 seconds plus to the new question, 
if less than 10 question start a new question if not display result */
function addScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    let oldCount = parseInt(document.getElementById("correct").innerText);
    let score = oldScore + 10;
    time = time + 15;
    document.getElementById("correct").innerText = ++oldCount;
    document.getElementById("score").innerText = score;
    if (number < 10) {
        startQuiz();
        sessionStorage.setItem("endScore", score);
        sessionStorage.setItem("endCorrect", oldCount);
    } else {
        sessionStorage.setItem("endScore", score);
        sessionStorage.setItem("endCorrect", oldCount);
        displayResult();
    }
}

/* Function reduceScore receive the previous score and reduce 5 points and show new score keep same 15 seconds for the new question, 
if less than 10 question start a new question if not display result */
function reduceScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    let oldCount = parseInt(document.getElementById("incorrect").innerText);
    let score = oldScore - 5;
    time = 15;
    document.getElementById("incorrect").innerText = ++oldCount;
    document.getElementById("score").innerText = score;
    if (number < 10) {
        startQuiz();
        sessionStorage.setItem("endScore", score);
        sessionStorage.setItem("endIncorrect", oldCount);
    } else {
        sessionStorage.setItem("endScore", score);
        sessionStorage.setItem("endIncorrect", oldCount);
        displayResult();
    }
}

/* Function timeAnswer get the 15 seconds and start the timer and show in the page, less 1 sec answe 0 invalid answer */
function timeAnswer() {
    if (document.getElementById("time") != null) {
        let seconds = time;

        seconds = seconds < 10 ? '0' + seconds : seconds;

        document.getElementById("time").innerHTML = `00:${seconds}`;
        time--;

        if (seconds < 1) {
            let answer = 0;
            time = 15;
            number++;
            checkAnswer(answer);
        }
    }
}

/* Function displayResult goes to result page */
function displayResult() {
    const nextURL = './result.html';
    return window.location.assign(nextURL);
}

/* Function displayEndScore show all details to send all results to result page */
function displayEndScore() {
    if (document.getElementById("endScore") != null) {
        const endScore = sessionStorage.getItem("endScore");
        const endCorrect = sessionStorage.getItem("endCorrect");
        const endIncorrect = sessionStorage.getItem("endIncorrect");
        document.getElementById("endScore").innerText = endScore;
        document.getElementById("endCorrect").innerText = endCorrect;
        document.getElementById("endIncorrect").innerText = endIncorrect;
    }
}