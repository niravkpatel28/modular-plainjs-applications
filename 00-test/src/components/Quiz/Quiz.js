import { generateUniqueId } from "../../utils/generateUniqueId.js";
import { Result } from "./Result.js";
class Quiz {
  constructor({ quizTitle, questions }) {
    this.quizId = generateUniqueId({ prefix: "quiz" });
    this.quizTitle = quizTitle;
    this.questions = [...questions];

    //each value is a question object
    this.totalPoints = this.questions.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.points;
    }, 0);

    this.isSubmitted = false;
    this.finalScore = 0;
  }

  submitQuiz(event) {
    event.preventDefault();

    if (!window.confirm("Are you sure you want to submit the quiz?")) {
      return;
    }

    this.isSubmitted = true;

    // calculate final score==>
    this.questions.forEach((question) => {
      console.log("Selected answers", question.selectedOption);
      if (question.selectedOption.isCorrect) {
        this.finalScore = this.finalScore + question.points;
      }
    });

    const submitButton = document.querySelector(
      `#${this.quizId} button[type="submit"]`,
    );
    submitButton.disabled = this.isSubmitted;

    // create a result modal and display it
    const result = new Result({
      header: this.quizTitle,
      score: this.finalScore,
      footer: "Quiz Submitted",
    });

    console.log("Submit button", submitButton);
    console.log("Form submitted", this);
  }

  render() {
    const quizForm = document.createElement("form");
    const submitButton = document.createElement("button");
    const quizTitle = document.createElement("h1");

    // add text in elements
    quizTitle.innerText = this.quizTitle;
    submitButton.innerText = "Submit Quiz";
    // add ids and other properties
    quizForm.id = this.quizId;
    quizForm.onsubmit = this.submitQuiz.bind(this);
    submitButton.type = "submit";
    submitButton.onclick = this.submitQuiz.bind(this);

    // add elements
    quizForm.appendChild(quizTitle);
    // append questions
    this.questions.forEach((question) => {
      quizForm.appendChild(question.render());
    });

    quizForm.appendChild(submitButton);

    return quizForm;
  }

  mount(el) {
    if (el) {
      return el.appendChild(this.render());
    }
    // if no element is passed
    const quizAppContainer = document.createElement("div");
    quizAppContainer.id = generateUniqueId({
      prefix: "quizAppContainer",
    });

    // add the counter app to div
    quizAppContainer.appendChild(this.render());
    document.body.appendChild(quizAppContainer);
  }
}

export { Quiz };
