import { generateUniqueId } from "../../utils/generateUniqueId.js";

type OptionConfig = {
  optionText: string;
  isCorrect: boolean;
};

class Option {
  optionId: string;
  optionText: string;
  isCorrect: boolean;

  constructor({ optionText, isCorrect }: OptionConfig) {
    this.optionId = generateUniqueId({ prefix: "option" });
    this.optionText = optionText;
    this.isCorrect = isCorrect;
  }
}

export { Option };
