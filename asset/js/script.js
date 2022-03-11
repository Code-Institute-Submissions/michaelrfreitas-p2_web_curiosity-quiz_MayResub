document.addEventListener("DOMContentLoaded", function () {
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
			if (this.getAttribute("data-type") === "submit") {
                let name = document.getElementById("name").value;
                startQuiz(name);
			} else {
				let gameType = this.getAttribute("data-type");
			}
		});
	}
})

function startQuiz(name) {
    sessionStorage.setItem("name", name);
}

randomQuestion();

async function getQuestions() {
    try {
        let res = await fetch("./asset/js/questions.json");
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function randomQuestion() {
    let index = Math.floor(Math.random() * 20);
    let questions = await getQuestions();
    document.getElementById("name").textContent = sessionStorage.getItem("name");
    document.getElementById("question").textContent = questions[index].Questions;
    let letter = Math.floor(Math.random() * 3) + 1;
    if (letter === 1) {
        document.getElementById("img_a").src = "./asset/media/" + questions[index].B + ".jpg";
        document.getElementById("img_b").src = "./asset/media/" + questions[index].C + ".jpg";
        document.getElementById("img_c").src = "./asset/media/" + questions[index].A + ".jpg";
        document.getElementById("text_a").textContent = questions[index].B;
        document.getElementById("text_b").textContent = questions[index].C;
        document.getElementById("text_c").textContent = questions[index].A;
    } else if (letter === 2) {
        document.getElementById("img_a").src = "./asset/media/" + questions[index].C + ".jpg";
        document.getElementById("img_b").src = "./asset/media/" + questions[index].A + ".jpg";
        document.getElementById("img_c").src = "./asset/media/" + questions[index].B + ".jpg";
        document.getElementById("text_a").textContent = questions[index].C;
        document.getElementById("text_b").textContent = questions[index].A;
        document.getElementById("text_c").textContent = questions[index].B;
    } else {
        document.getElementById("img_a").src = "./asset/media/" + questions[index].A + ".jpg";
        document.getElementById("img_b").src = "./asset/media/" + questions[index].B + ".jpg";
        document.getElementById("img_c").src = "./asset/media/" + questions[index].C + ".jpg";
        document.getElementById("text_a").textContent = questions[index].A;
        document.getElementById("text_b").textContent = questions[index].B;
        document.getElementById("text_c").textContent = questions[index].C;
    }
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