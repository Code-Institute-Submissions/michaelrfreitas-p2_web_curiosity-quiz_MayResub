document.addEventListener("DOMContentLoaded", function(){

})

async function getQuestions() {
    try {
        let res = await fetch("./asset/js/questions.json");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function readQuestions() {
    let index = Math.floor(Math.random() * 20);
    let questions = await getQuestions();
        document.getElementById("question").textContent = questions[index].Questions;

}

readQuestions();


function playerName () {

}

function startQuiz() {

}

function randomQuestion() {
    
}

function checkAnswer() {

}

function addScore() {

}

function reduceScore() {

}

function timeAnswer() {

}

function displayResult() {

}
