import { generateUniqueId } from "../../utils/generateUniqueId.js";

class Counter {
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
    let displayCount = document.querySelector(`#${this.counterAppId} p`);
    displayCount.innerText = `Count  ${this.count}`;
  }

  render() {
    const counterAppDiv = document.createElement("div");
    const countDisplay = document.createElement("p");
    const incrementButton = document.createElement("button");
    const decrementButton = document.createElement("button");

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

  mount(el) {
    if (el) {
      return el.appendChild(this.render());
    }
    // if no element is passed
    const counterAppContainer = document.createElement("div");
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
