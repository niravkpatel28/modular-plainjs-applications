var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseLink = "https://niravkpatel28.github.io/modular-plainjs-applications/data";
const quizAPi = "/Quiz/Quiz.json";
export const getQuizData = () => __awaiter(void 0, void 0, void 0, function* () {
    let response = yield fetch(`${baseLink}/Quiz/Quiz.json`);
    let data = yield response.json();
    return data;
});
