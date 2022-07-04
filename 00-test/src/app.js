// import { Counter } from "./components/Counter/Counter.js";
// import { Timer } from "./components/Timer/Timer.js";
import { Option } from "./components/Quiz/Option.js";
import { Question } from "./components/Quiz/Question.js";
import { Quiz } from "./components/Quiz/Quiz.js";
import { questions } from "./components/Quiz/QuestionSet.js";
// create a options

// console.log("options", options);

const quiz1 = new Quiz({
  quizTitle: "Fundamentals of Mathematics",
  questions: [...questions],
});

console.log("Quiz created", quiz1);
// moment of truth
quiz1.mount();
