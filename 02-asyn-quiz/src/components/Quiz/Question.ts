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
  selectedOption: Option[];
  isAnswered: boolean;
  isAnsweredCorrectly: boolean | null;

  constructor({ text, options, points }: QuestionConfig) {
    this.questionId = generateUniqueId({ prefix: "question" });
    this.questionText = text;
    this.options = [...options];
    this.points = points;
    // this.selectedOption =;
    // this.selectedOptionId = "";
    // initializing the selectedOption to empty array
    this.selectedOption = [];
    this.isAnswered = false;
    // initialized to nothing
    this.isAnsweredCorrectly = null;
  }

  selectAnswer(event: any) {
    // this will be bound to the onSelect option of the input box
    const {
      target: { id: selectedOptionId },
    } = event;

    // selecting the option chosen by user
    // this.selectedOption = this.options.find(
    //   (option) => option.optionId === selectedOptionId,
    // );

    // forcing the typeconverion to Option
    // let selectedAnswer: Option = this.options.find(
    //   (option) => option.optionId === selectedOptionId,
    // ) as Option;

    // this.selectedOption.push(selectedAnswer);

    //  the above two steps are combined into a single step
    this.selectedOption.push(
      this.options.find(
        (option) => option.optionId === selectedOptionId,
      ) as Option,
    );

    this.isAnswered = true;
    // is this question answered correctly

    // AND operation for all the answers that are correct
    this.isAnsweredCorrectly = this.selectedOption.every(
      (answer) => answer.isCorrect,
    );
    // this.isAnsweredCorrectly = this.selectedOption!.isCorrect;
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
