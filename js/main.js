import { listOfQuestions } from "./data.js";

const objectId = listOfQuestions.map((obj) => obj.id);

let amountOfQuestions = 0;
let askedQuestionsID = [];
let score = 0;
let notAskedQuestions = [];
//let hints = 0;

const initApp = () => {
  amountOfQuestions = 0;
  askedQuestionsID = [];
  score = 0;

  if (amountOfQuestions === 0) {
    form.style.display = "flex";
  }
};
document.addEventListener("DOMContentLoaded", initApp);
let randomQuesiton;

const form = document.getElementById("slider");
const stats = document.getElementById("stats");
const userRangeInput = (event) => {
  let inputValue = document.getElementById("sliderValue").value;
  event.preventDefault();

  amountOfQuestions = inputValue;
  form.style.display = "none";
  stats.style.display = "flex";
  questionAmountHandler();
};

const questionAmountHandler = () => {
  if (amountOfQuestions === 0) {
    winnerMessage();
  } else {
    amountOfQuestions -= 1;
    getQuesitonHandler();
  }
  //  getQuesitonHandler();
};

const getQuesitonHandler = () => {
  notAskedQuestions = listOfQuestions.filter(
    (obj) => !askedQuestionsID.includes(obj.id)
  );

  randomQuesiton =
    notAskedQuestions[Math.floor(Math.random() * listOfQuestions.length)];

  askedQuestionsID = [...askedQuestionsID, randomQuesiton.id];

  displayQuestion(randomQuesiton);
};

form.addEventListener("submit", userRangeInput);
const container = document.getElementById("displayQuestion");

const displayQuestion = () => {
  const div = document.createElement("div");
  const questionText = document.createElement("p");
  const labelAnswer = document.createElement("label");
  const inputAnswer = document.createElement("input");
  const buttonAnswer = document.createElement("button");
  const questionForm = document.createElement("form");
  div.id = "questionDiv";
  buttonAnswer.textContent = "Send answer";
  inputAnswer.id = "inputField";
  questionForm.id = "questionFormID";
  inputAnswer.type = "text";
  inputAnswer.textContent = "";

  questionText.textContent = randomQuesiton.question;

  questionForm.appendChild(questionText);
  questionForm.appendChild(labelAnswer);
  questionForm.appendChild(inputAnswer);
  questionForm.appendChild(buttonAnswer);
  div.appendChild(questionForm);

  container.appendChild(questionForm);

  questionForm.addEventListener("submit", processAnswer);
};

const clearPreviousQuestion = () => {
  questionFormID.remove();
};
const displaySore = () => {
  const scoreDiv = document.getElementById("score");
  scoreDiv.textContent = `Your score is ${score}`;
};
const incrementScore = () => {
  score += 1;

  displaySore();
};

const processAnswer = (event) => {
  event.preventDefault();
  const answer = document.getElementById("inputField").value;

  if (answer === randomQuesiton.answer) {
    incrementScore();
    clearPreviousQuestion();

    questionAmountHandler();
  } else if (answer !== randomQuesiton.answer) {
    document.getElementById("inputField").focus();
  }
};

const winnerMessage = () => {
  const winnerDiv = document.createElement("div");
  winnerDiv.id = "winnerDiv";
  const winnerMessage = document.createElement("p");
  winnerDiv.appendChild(winnerMessage);
  container.appendChild(winnerDiv);

  winnerMessage.textContent = `You won! Your score is ${score} app will reload in 5 seconds`;
  setTimeout(() => {
    location.reload();
  }, 5000);
};
