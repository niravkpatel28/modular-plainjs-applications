//create a result Modal
import { generateUniqueId } from "../../utils/generateUniqueId.js";
var Result = /** @class */ (function () {
    function Result(_a) {
        var header = _a.header, score = _a.score, footer = _a.footer;
        this.header = header;
        this.footer = footer;
        this.score = score;
        this.modalId = generateUniqueId({ prefix: "result" });
        this.mount();
    }
    Result.prototype.closeModal = function () {
        document.getElementById(this.modalId).remove();
    };
    Result.prototype.render = function () {
        var resultModal = document.createElement("div");
        var modalHeader = document.createElement("h2");
        var modalResult = document.createElement("p");
        var modalFooter = document.createElement("h4");
        var closeButton = document.createElement("button");
        // add text
        modalHeader.innerText = this.header;
        modalResult.innerText = "Your Score: " + this.score;
        modalFooter.innerText = this.footer;
        closeButton.innerText = "Close";
        // add id and properties
        resultModal.id = this.modalId;
        resultModal.classList.add("resultModal");
        closeButton.onclick = this.closeModal.bind(this);
        // append elements
        resultModal.appendChild(modalHeader);
        resultModal.appendChild(modalResult);
        resultModal.appendChild(closeButton);
        resultModal.appendChild(modalFooter);
        return resultModal;
    };
    Result.prototype.mount = function () {
        document.body.appendChild(this.render());
    };
    return Result;
}());
export { Result };
