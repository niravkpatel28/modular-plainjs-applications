import { getQuizData } from "./utils/getAppData.js";
import { Quiz } from "./components/Quiz/Quiz.js";
import { Question } from "./components/Quiz/Question.js";
import { Option } from "./components/Quiz/Option.js";

const loadQuiz = async () => {
  let quiz: Quiz = await getQuizData();
  // converting the object to a class instance
  quiz = new Quiz({
    quizTitle: quiz.quizTitle,
    questions: quiz.questions.map((question) => {
      let options: Option[] = question.options.map((option) => {
        // create a list of Option objects
        return new Option({
          optionText: option.optionText,
          isCorrect: option.isCorrect,
        });
      });

      return new Question({
        text: question.questionText,
        points: question.points,
        options: [...options],
      });
    }),
  });

  quiz.mount();
};

loadQuiz();
