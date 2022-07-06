var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getQuizData } from "./utils/getAppData.js";
import { Quiz } from "./components/Quiz/Quiz.js";
import { Question } from "./components/Quiz/Question.js";
import { Option } from "./components/Quiz/Option.js";
const loadQuiz = () => __awaiter(void 0, void 0, void 0, function* () {
    let quiz = yield getQuizData();
    // converting the object to a class instance
    quiz = new Quiz({
        quizTitle: quiz.quizTitle,
        questions: quiz.questions.map((question) => {
            let options = question.options.map((option) => {
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
});
loadQuiz();
