var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// import { Counter } from "./components/Counter/Counter.js";
// import { Timer } from "./components/Timer/Timer.js";
// import { Timer } from "./components/Timer/Timer.js";
// import { Option } from "./components/Quiz/Option";
// import { Question } from "./components/Quiz/Question";
import { Quiz } from "./components/Quiz/Quiz.js";
import { questions } from "./components/Quiz/QuestionSet.js";
// create a options
// console.log("options", options);
// const quiz1 = new Quiz({
//   quizTitle: "Fundamentals of Mathematics",
//   questions: [...questions],
// });
// console.log("Quiz created", quiz1);
// // moment of truth
// quiz1.mount();
// const counter1 = new Counter();
// counter1.mount();
// const timer1 = new Timer();
// timer1.mount();
// const timer2 = new Timer();
// timer2.mount();
var quiz1 = new Quiz({
    questions: __spreadArray([], questions),
    quizTitle: "Fundamentals of Mathematics",
});
quiz1.mount();
