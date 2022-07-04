import { generateUniqueId } from "../../utils/generateUniqueId.js";

class Option {
  constructor({ optionText, isCorrect }) {
    this.optionId = generateUniqueId({ prefix: "option" });
    this.optionText = optionText;
    this.isCorrect = isCorrect;
  }
}

export { Option };
