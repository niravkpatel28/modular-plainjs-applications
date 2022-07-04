var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { generateUniqueId } from "../../utils/generateUniqueId";
var Question = /** @class */ (function () {
    function Question(_a) {
        var text = _a.text, options = _a.options, points = _a.points;
        this.questionId = generateUniqueId({ prefix: "question" });
        this.questionText = text;
        this.options = __spreadArray([], options);
        this.points = points;
        this.selectedOption = {};
        // this.selectedOptionId = "";
        this.isAnswered = false;
        // initialized to nothing
        this.isAnsweredCorrectly = null;
    }
    Question.prototype.selectAnswer = function (event) {
        // this will be bound to the onSelect option of the input box
        var selectedOptionId = event.target.id;
        // selecting the option chosen by user
        this.selectedOption = this.options.find(function (option) { return option.optionId === selectedOptionId; });
        // console.log("======Selected option", this.selectedOption);
        this.isAnswered = true;
        // is this question answered correctly
        this.isAnsweredCorrectly = this.selectedOption.isCorrect;
    };
    Question.prototype.render = function () {
        var _this = this;
        var questionContainer = document.createElement("div");
        var questionText = document.createElement("h2");
        var optionsContainer = document.createElement("ul");
        // adding id to question container
        questionContainer.id = this.questionId;
        //adding text of question
        questionText.innerText = this.questionText;
        // each option will have to be rendered using some li
        // this can be abstracted to Option itself but currently its put in questions
        this.options.forEach(function (option) {
            var optionList = document.createElement("li");
            var optionInput = document.createElement("input");
            var optionLabel = document.createElement("label");
            // add ids to input and attach labels to input
            // this comes from option class.
            // this is to identify each option uniquely
            optionInput.name = _this.questionId;
            optionInput.id = option.optionId;
            optionInput.type = "radio";
            // attach event listeners
            optionInput.onchange = _this.selectAnswer.bind(_this);
            // incase multiple options have the same id
            optionLabel.htmlFor = option.optionId;
            optionLabel.value = JSON.stringify(option);
            optionLabel.innerText = option.optionText;
            // attach each of these to the optionsContainer
            optionList.appendChild(optionInput);
            optionList.appendChild(optionLabel);
            // attach the list to container
            optionsContainer.appendChild(optionList);
            // end of forEach
        });
        // adding all elements to the question container
        questionContainer.appendChild(questionText);
        questionContainer.appendChild(optionsContainer);
        return questionContainer;
    };
    Question.prototype.mount = function (el) {
        if (el) {
            return el.appendChild(this.render());
        }
        // if no element is passed
        var questionAppContainer = document.createElement("div");
        questionAppContainer.id = generateUniqueId({
            prefix: "questionAppContainer",
        });
        // add the counter app to div
        questionAppContainer.appendChild(this.render());
        document.body.appendChild(questionAppContainer);
    };
    return Question;
}());
export { Question };
