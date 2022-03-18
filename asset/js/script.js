document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");
    let number = 0;
    for (let button of buttons) {
        button.addEventListener("click", function () {
            if (this.getAttribute("data-type") === "submit") {
                let name = document.getElementById("name").value;
                nextPage(name);
            } else if (this.getAttribute("data-type") === "A" || this.getAttribute("data-type") === "B" || this.getAttribute("data-type") === "C") {
                let answer = this.getAttribute("data-type");
                number++;
                checkAnswer(answer, number);
            }
        });
    }
});

async function getQuestions() {
    try {
        let res = await fetch("./asset/js/questions.json");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

async function nextPage(name) {
    const nextURL = './quiz.html';
    window.location.assign(nextURL);
    sessionStorage.setItem("name", name)
}

startQuiz();

async function startQuiz() {
    if (document.getElementById("question") != null) {
        let index = Math.floor(Math.random() * 20);
        let questions = await getQuestions();
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
};

function checkAnswer(answer, number) {
    console.log(number);
    if (number < 10) {
        if (answer === sessionStorage.getItem("correct")) {
            addScore();
        } else {
            reduceScore();
        }
    } else {
        let oldScore = parseInt(document.getElementById("score").innerText);
        sessionStorage.setItem("oldScore", oldScore);
        displayResult();
    }
};

function addScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = oldScore + 10;
    startQuiz();
};

function reduceScore() {
    let oldScore = parseInt(document.getElementById("score").innerText);
    document.getElementById("score").innerText = oldScore - 5;
    startQuiz();
};

function timeAnswer() {

};

function displayResult() {
    window.location.href = "./result.html?name=" + sessionStorage.getItem("name") + "?score=" + sessionStorage.getItem("oldScore");
    document.getElementById("name").textContent = sessionStorage.getItem("name");
    document.getElementById("score").textContent = sessionStorage.getItem("oldScore");
    sessionStorage.clear;
};