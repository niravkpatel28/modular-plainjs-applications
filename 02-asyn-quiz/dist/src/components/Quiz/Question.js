import { generateUniqueId } from "../../utils/generateUniqueId.js";
class Question {
    constructor({ text, options, points }) {
        this.questionId = generateUniqueId({ prefix: "question" });
        this.questionText = text;
        this.options = [...options];
        this.points = points;
        // this.selectedOption =;
        // this.selectedOptionId = "";
        this.isAnswered = false;
        // initialized to nothing
        this.isAnsweredCorrectly = null;
    }
    selectAnswer(event) {
        // this will be bound to the onSelect option of the input box
        const { target: { id: selectedOptionId }, } = event;
        // selecting the option chosen by user
        this.selectedOption = this.options.find((option) => option.optionId === selectedOptionId);
        // console.log("======Selected option", this.selectedOption);
        this.isAnswered = true;
        // is this question answered correctly
        this.isAnsweredCorrectly = this.selectedOption.isCorrect;
    }
    render() {
        const questionContainer = document.createElement("div");
        const questionText = document.createElement("h2");
        const optionsContainer = document.createElement("ul");
        // adding id to question container
        questionContainer.id = this.questionId;
        //adding text of question
        questionText.innerText = this.questionText;
        // each option will have to be rendered using some li
        // this can be abstracted to Option itself but currently its put in questions
        this.options.forEach((option) => {
            let optionList = document.createElement("li");
            let optionInput = document.createElement("input");
            let optionLabel = document.createElement("label");
            // add ids to input and attach labels to input
            // this comes from option class.
            // this is to identify each option uniquely
            optionInput.name = this.questionId;
            optionInput.id = option.optionId;
            optionInput.type = "radio";
            // attach event listeners
            optionInput.onchange = this.selectAnswer.bind(this);
            optionInput.value = JSON.stringify(option);
            // incase multiple options have the same id
            optionLabel.htmlFor = option.optionId;
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
        questionContainer.classList.add("question");
        return questionContainer;
    }
    mount(el) {
        if (el) {
            return el.appendChild(this.render());
        }
        // if no element is passed
        const questionAppContainer = document.createElement("div");
        questionAppContainer.id = generateUniqueId({
            prefix: "questionAppContainer",
        });
        // add the counter app to div
        questionAppContainer.appendChild(this.render());
        document.body.appendChild(questionAppContainer);
    }
}
export { Question };
