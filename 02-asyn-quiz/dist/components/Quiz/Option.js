import { generateUniqueId } from "../../utils/generateUniqueId.js";
var Option = /** @class */ (function () {
    function Option(_a) {
        var optionText = _a.optionText, isCorrect = _a.isCorrect;
        this.optionId = generateUniqueId({ prefix: "option" });
        this.optionText = optionText;
        this.isCorrect = isCorrect;
    }
    return Option;
}());
export { Option };
