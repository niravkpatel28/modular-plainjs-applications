import { generateUniqueId } from "../../utils/generateUniqueId.js";
var Counter = /** @class */ (function () {
    function Counter() {
        this.count = 0;
        this.counterAppId = generateUniqueId({ prefix: "counterApp" });
    }
    Counter.prototype.increment = function () {
        this.count = this.count + 1;
        this.updateCount();
    };
    Counter.prototype.decrement = function () {
        this.count = this.count - 1;
        this.updateCount();
    };
    Counter.prototype.updateCount = function () {
        // find the element and update it
        var displayCount = document.querySelector("#" + this.counterAppId + " p");
        // to avoid display count as null
        if (displayCount) {
            return (displayCount.innerText = "Count  " + this.count);
        }
        throw new Error("Count element not found");
    };
    Counter.prototype.render = function () {
        var counterAppDiv = document.createElement("div");
        var countDisplay = document.createElement("p");
        var incrementButton = document.createElement("button");
        var decrementButton = document.createElement("button");
        // add id and text
        counterAppDiv.id = this.counterAppId;
        countDisplay.innerText = "Count  " + this.count;
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
    };
    Counter.prototype.mount = function (el) {
        if (el) {
            return el.appendChild(this.render());
        }
        // if no element is passed
        var counterAppContainer = document.createElement("div");
        counterAppContainer.id = generateUniqueId({
            prefix: "counterAppContainer",
        });
        // add the counter app to div
        counterAppContainer.appendChild(this.render());
        console.log("Counter app", counterAppContainer);
        document.body.appendChild(counterAppContainer);
    };
    return Counter;
}());
export { Counter };
