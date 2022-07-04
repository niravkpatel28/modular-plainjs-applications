var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { generateUniqueId } from "../../utils/generateUniqueId.js";
import { Result } from "./Result.js";
var Quiz = /** @class */ (function () {
    function Quiz(_a) {
        var quizTitle = _a.quizTitle, questions = _a.questions;
        this.quizId = generateUniqueId({ prefix: "quiz" });
        this.quizTitle = quizTitle;
        this.questions = __spreadArray([], questions);
        //each value is a question object
        this.totalPoints = this.questions.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue.points;
        }, 0);
        this.isSubmitted = false;
        this.finalScore = 0;
    }
    Quiz.prototype.submitQuiz = function (event) {
        var _this = this;
        event.preventDefault();
        if (!window.confirm("Are you sure you want to submit the quiz?")) {
            return;
        }
        this.isSubmitted = true;
        // calculate final score==>
        this.questions.forEach(function (question) {
            console.log("Selected answers", question.selectedOption);
            // incase no option is selected
            if (question.selectedOption && question.selectedOption.isCorrect) {
                _this.finalScore = _this.finalScore + question.points;
            }
        });
        var submitButton = document.querySelector("#" + this.quizId + " button[type=\"submit\"]");
        // what will this element be
        submitButton.disabled = this.isSubmitted;
        // create a result modal and display it
        var result = new Result({
            header: this.quizTitle,
            score: this.finalScore,
            footer: "Quiz Submitted",
        });
        console.log("Submit button", submitButton);
        console.log("Form submitted", this);
    };
    Quiz.prototype.render = function () {
        var quizForm = document.createElement("form");
        var submitButton = document.createElement("button");
        var quizTitle = document.createElement("h1");
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
        this.questions.forEach(function (question) {
            quizForm.appendChild(question.render());
        });
        quizForm.appendChild(submitButton);
        return quizForm;
    };
    Quiz.prototype.mount = function (el) {
        if (el) {
            return el.appendChild(this.render());
        }
        // if no element is passed
        var quizAppContainer = document.createElement("div");
        quizAppContainer.id = generateUniqueId({
            prefix: "quizAppContainer",
        });
        quizAppContainer.classList.add("quizContainer");
        // add the counter app to div
        quizAppContainer.appendChild(this.render());
        document.body.appendChild(quizAppContainer);
    };
    return Quiz;
}());
export { Quiz };
