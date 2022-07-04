import { generateUniqueId } from "../../utils/generateUniqueId.js";

class Counter {
  // count: number;
  // counterAppId: string;
  private count: number;
  private counterAppId: string;

  constructor() {
    this.count = 0;
    this.counterAppId = generateUniqueId({ prefix: "counterApp" });
  }

  increment() {
    this.count = this.count + 1;
    this.updateCount();
  }

  decrement() {
    this.count = this.count - 1;
    this.updateCount();
  }
  updateCount() {
    // find the element and update it
    let displayCount: HTMLElement | null = document.querySelector(
      `#${this.counterAppId} p`,
    );
    // to avoid display count as null
    if (displayCount) {
      return (displayCount.innerText = `Count  ${this.count}`);
    }

    throw new Error("Count element not found");
  }

  render() {
    const counterAppDiv: HTMLDivElement = document.createElement("div");
    const countDisplay: HTMLParagraphElement = document.createElement("p");
    const incrementButton: HTMLButtonElement = document.createElement("button");
    const decrementButton: HTMLButtonElement = document.createElement("button");

    // add id and text
    counterAppDiv.id = this.counterAppId;
    countDisplay.innerText = `Count  ${this.count}`;
    incrementButton.innerText = "Increment";
    decrementButton.innerText = "Decrement";

    // attach click Handlers
    // in case this is not done. this will be bound to the button.
    incrementButton.onclick = this.increment.bind(this);
    decrementButton.onclick = this.decrement.bind(this);

    // attach styles
    counterAppDiv.classList.add("counterApp");

    // add elements to the counterApp div
    counterAppDiv.appendChild(countDisplay);
    counterAppDiv.appendChild(incrementButton);
    counterAppDiv.appendChild(decrementButton);

    return counterAppDiv;
  }

  mount(el?: HTMLElement) {
    if (el) {
      return el.appendChild(this.render());
    }
    // if no element is passed
    const counterAppContainer: HTMLDivElement = document.createElement("div");

    counterAppContainer.id = generateUniqueId({
      prefix: "counterAppContainer",
    });

    // add the counter app to div
    counterAppContainer.appendChild(this.render());
    console.log("Counter app", counterAppContainer);
    document.body.appendChild(counterAppContainer);
  }
}

export { Counter };
