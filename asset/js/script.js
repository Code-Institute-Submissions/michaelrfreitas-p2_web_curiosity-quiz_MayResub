let time = 15;
let number = 0;

document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                let name = document.getElementById("name").value;
                console.log(name)
                if (name == "") {
                    alert("Player Name is required, please don't forget to field a Player Name.")
                } else {
                    sessionStorage.removeItem("endScore");
                    sessionStorage.removeItem("endCorrect");
                    sessionStorage.removeItem("endIncorrect");
                    sessionStorage.removeItem("pastQ");
                    nextPage(name);
                }
            } else if (this.getAttribute("data-type") === "A" || this.getAttribute("data-type") === "B" || this.getAttribute("data-type") === "C") {
                let answer = this.getAttribute("data-type");
                number++;
                checkAnswer(answer);
            } else if (this.getAttribute("data-type") === "restart") {
                alert("You are starting a new quiz!");
                sessionStorage.removeItem("endScore");
                sessionStorage.removeItem("endCorrect");
                sessionStorage.removeItem("endIncorrect");
                sessionStorage.removeItem("pastQ");
                nextPage(sessionStorage.getItem("name"));
            } else {
                alert("Are you sure that you want to end the quiz?");
                displayResult();
            }
        });
    }
    setInterval(timeAnswer, 1000);
    startQuiz();
});

async function getQuestions() {
    try {
        let res = await fetch("./asset/js/questions.json");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

function nextPage(name) {
    const nextURL = './quiz.html';
    document.location.assign(nextURL);
    sessionStorage.setItem("name", name);
}

async function startQuiz() {
    if (document.getElementById("question") != null) {
        let index = Math.floor(Math.random() * 20);
        let pastQ = [];
        if (sessionStorage.getItem("pastQ") != null) {
            pastQ = JSON.parse(sessionStorage.getItem("pastQ"));
        }
        pastQ.forEach(e => {
            if (e === index) {
                index = Math.floor(Math.random() * 20);
            }
        });

        pastQ.push(index);
        sessionStorage.setItem("pastQ", JSON.stringify(pastQ));
        let questions = await getQuestions();
        let num = document.getElementById("number").innerText;
        document.getElementById("number").innerText = ++num;
        document.getElementById("name").textContent = sessionStorage.getItem("name");
        document.getElementById("question").textContent = questions[index].Questions;
        let correct = questions[index].Correct;
        let answerRandom = questions[index][correct];
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
        sessionStorage.setItem("correct", correct);
    }
    displayEndScore();
    const name = sessionStorage.getItem("name");
    document.getElementById("name").textContent = name;
}

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

function displayResult() {
    const nextURL = './result.html';
    return window.location.assign(nextURL);
}

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