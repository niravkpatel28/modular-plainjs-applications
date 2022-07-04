import { generateUniqueId } from "../../utils/generateUniqueId";
var Timer = /** @class */ (function () {
    function Timer() {
        // this.minute = 0;
        this.sec = 0;
        this.timerStarted = false;
        this.intervalId = "";
        this.timerAppId = generateUniqueId({ prefix: "timerApp" });
    }
    Timer.prototype.startTimer = function () {
        var _this = this;
        if (!this.timerStarted) {
            console.log("Timer " + this.timerAppId + " started");
            this.timerStarted = true;
            //to immediately update the timer
            this.sec = this.sec + 1;
            this.updateTimer();
            this.intervalId = setInterval(function () {
                _this.sec = _this.sec + 1;
                _this.updateTimer();
            }, 1000);
        }
    };
    Timer.prototype.pauseTimer = function () {
        console.log("Timer " + this.timerAppId + " paused");
        this.timerStarted = false;
        clearInterval(this.intervalId);
        this.updateTimer();
        this.timeOutId = "";
    };
    Timer.prototype.resetTimer = function () {
        console.log("Timer " + this.timerAppId + " reset");
        this.timerStarted = false;
        // might have to check if timeOut is set
        this.sec = 0;
        if (this.intervalId) {
            clearTimeout(this.intervalId);
            this.intervalId = "";
        }
        this.updateTimer();
    };
    Timer.prototype.updateTimer = function () {
        var displayTimer = document.querySelector("#" + this.timerAppId + " p");
        displayTimer.innerText = "Seconds : " + this.sec;
    };
    Timer.prototype.render = function () {
        // create Markup
        var timerAppDiv = document.createElement("div");
        var timerDisplay = document.createElement("p");
        var startButton = document.createElement("button");
        var pauseButton = document.createElement("button");
        var resetButton = document.createElement("button");
        // add id
        timerAppDiv.id = this.timerAppId;
        // add inner text
        timerDisplay.innerText = "Seconds : " + this.sec;
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
    };
    Timer.prototype.mount = function (el) {
        if (el) {
            return el.appendChild(this.render());
        }
        // if no element is passed
        var timerAppContainer = document.createElement("div");
        timerAppContainer.id = generateUniqueId({
            prefix: "timerAppContainer",
        });
        // add the counter app to div
        timerAppContainer.appendChild(this.render());
        document.body.appendChild(timerAppContainer);
    };
    return Timer;
}());
export { Timer };
