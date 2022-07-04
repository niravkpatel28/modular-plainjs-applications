//create a result Modal
import { generateUniqueId } from "../../utils/generateUniqueId.js";

type ResultConfig = {
  header: string;
  score: number;
  footer: string;
};
class Result {
  header: string;
  footer: string;
  score: number;
  modalId: string;

  constructor({ header, score, footer }: ResultConfig) {
    this.header = header;
    this.footer = footer;
    this.score = score;
    this.modalId = generateUniqueId({ prefix: "result" });

    this.mount();
  }

  closeModal() {
    (document.getElementById(this.modalId) as HTMLElement).remove();
  }

  render() {
    const resultModal = document.createElement("div");
    const modalHeader = document.createElement("h2");
    const modalResult = document.createElement("p");
    const modalFooter = document.createElement("h4");
    const closeButton = document.createElement("button");

    // add text
    modalHeader.innerText = this.header;
    modalResult.innerText = `Your Score: ${this.score}`;
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
  }

  mount() {
    document.body.appendChild(this.render());
  }
}

export { Result };
