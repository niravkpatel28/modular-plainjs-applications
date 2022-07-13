import { generateUniqueId } from "../../utils/generateUniqueId.js";
import { Component } from "../ComponentInterface/ComponentInterface.js";
import { Option } from "./Option.js";

type QuestionConfig = {
  text: string;
  options: Option[];
  points: number;
};

class Question implements Component {
  questionId: string;
  questionText: string;
  options: Array<Option>;
  points: number;
  // this is not initialized in the constructor but will definitely get a value
  // selectedOption!: Option | undefined;
  // initializing the selected option array to empty array.
  // here since we are considering multiple correct answers
  // the idea is to add all the selected options into the array
  // another technique can be to add only the optionId into the array.
  // This can be modified based on the complexity of the logic
  selectedOptions: Option[];
  isAnswered: boolean;
  isAnsweredCorrectly: boolean | null;
  correctOptions: Option[];
  correctOptionsId: string[];
  selectedOptionsId: string[];

  constructor({ text, options, points }: QuestionConfig) {
    this.questionId = generateUniqueId({ prefix: "question" });
    this.questionText = text;
    this.options = [...options];
    this.points = points;
    // initializing the selectedOption to empty array
    this.selectedOptions = [];
    this.isAnswered = false;
    this.selectedOptionsId = [];
    this.isAnsweredCorrectly = null;
    this.correctOptions = this.options.filter((option) => option.isCorrect);
    this.correctOptionsId = this.correctOptions.map(
      (option) => option.optionId,
    );
  }

  // change handler will have to perform two operations
  //  1. when option is selected
  //  2. When option is unselected
  // Both can be written in a single change handler
  // or can call two different functions based on the event

  changeHandler(event: any) {
    const {
      target: { checked, id },
    } = event;
    if (checked) {
      // update selected options
      this.addOption(id);
    } else {
      // remove id from selected options
      this.removeOption(id);
    }
  }

  addOption(selectedOptionId: string) {
    // add the given id to this.selectedOptionsId
    this.selectedOptionsId.push(selectedOptionId);
    // add selected Option to this.selectedOptions
    this.selectedOptions.push(
      this.options.find(
        (option) => option.optionId === selectedOptionId,
      ) as Option,
    );
    // update isCorrectly answered (later can be its own method)
    return this.updateAnswerStatus();
  }

  removeOption(unCheckedOptionId: string) {
    // remove selected id from this.selectedOptionsId;
    this.selectedOptionsId = this.selectedOptionsId.filter((optionId) => {
      return optionId !== unCheckedOptionId;
    });
    // remove selected Option from this.selectedOptions
    this.selectedOptions = this.selectedOptions.filter((options) => {
      return options.optionId !== unCheckedOptionId;
    });
    // update isCorrectly answered (put it in its own method)
    return this.updateAnswerStatus();
  }

  updateAnswerStatus() {
    // check if the length of selectedOptions and correctOptions is same
    // check if all ids in correctOptionsId are present in selectedOptionsId
    if (this.selectedOptionsId.length === this.correctOptionsId.length) {
      this.isAnsweredCorrectly = this.correctOptionsId.every((optionId) => {
        return this.selectedOptionsId.includes(optionId);
      });
    } else {
      this.isAnsweredCorrectly = false;
    }
    console.log("Is answer correct", this.isAnsweredCorrectly);
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
    this.options.forEach((option: Option) => {
      let optionList: HTMLLIElement = document.createElement("li");
      let optionInput: HTMLInputElement = document.createElement("input");
      let optionLabel: HTMLLabelElement = document.createElement("label");

      // add ids to input and attach labels to input
      // this comes from option class.
      // this is to identify each option uniquely
      optionInput.name = this.questionId;
      optionInput.id = option.optionId;
      // optionInput.type = "radio";
      optionInput.type = "checkbox";

      // attach event listeners
      // optionInput.onchange = this.selectAnswer.bind(this);
      optionInput.onchange = this.changeHandler.bind(this);

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

  mount(el?: HTMLElement) {
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
