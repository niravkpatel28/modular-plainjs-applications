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

const quiz1 = new Quiz({
  questions: [...questions],
  quizTitle: "Fundamentals of Mathematics",
});

quiz1.mount();
