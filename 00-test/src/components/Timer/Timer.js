import { generateUniqueId } from "../../utils/generateUniqueId.js";

class Timer {
  constructor() {
    // this.minute = 0;
    this.sec = 0;
    this.timerStarted = false;
    this.intervalId = "";
    this.timerAppId = generateUniqueId({ prefix: "timerApp" });
  }

  startTimer() {
    if (!this.timerStarted) {
      console.log(`Timer ${this.timerAppId} started`);

      this.timerStarted = true;

      //to immediately update the timer
      this.sec = this.sec + 1;
      this.updateTimer();

      this.intervalId = setInterval(() => {
        this.sec = this.sec + 1;
        this.updateTimer();
      }, 1000);
    }
  }

  pauseTimer() {
    console.log(`Timer ${this.timerAppId} paused`);

    this.timerStarted = false;
    clearInterval(this.intervalId);
    this.updateTimer();
    this.timeOutId = "";
  }

  resetTimer() {
    console.log(`Timer ${this.timerAppId} reset`);
    this.timerStarted = false;
    // might have to check if timeOut is set
    this.sec = 0;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = "";
    }
    this.updateTimer();
  }

  updateTimer() {
    let displayTimer = document.querySelector(`#${this.timerAppId} p`);
    displayTimer.innerText = `Seconds : ${this.sec}`;
  }

  render() {
    // create Markup

    const timerAppDiv = document.createElement("div");
    const timerDisplay = document.createElement("p");
    const startButton = document.createElement("button");
    const pauseButton = document.createElement("button");
    const resetButton = document.createElement("button");

    // add id
    timerAppDiv.id = this.timerAppId;

    // add inner text
    timerDisplay.innerText = `Seconds : ${this.sec}`;
    startButton.innerText = "Start";
    pauseButton.innerText = "Pause";
    resetButton.innerText = "Reset";

    // attach event listeners
    startButton.onclick = this.startTimer.bind(this);
    pauseButton.onclick = this.pauseTimer.bind(this);
    resetButton.onclick = this.resetTimer.bind(this);

    // attach styles
    timerAppDiv.classList.add("timerApp");

    // append elements
    timerAppDiv.appendChild(timerDisplay);
    timerAppDiv.appendChild(startButton);
    timerAppDiv.appendChild(pauseButton);
    timerAppDiv.appendChild(resetButton);

    //return markup
    return timerAppDiv;
  }

  mount(el) {
    if (el) {
      return el.appendChild(this.render());
    }
    // if no element is passed
    const timerAppContainer = document.createElement("div");
    timerAppContainer.id = generateUniqueId({
      prefix: "timerAppContainer",
    });

    // add the counter app to div
    timerAppContainer.appendChild(this.render());
    document.body.appendChild(timerAppContainer);
  }
}

export { Timer };
