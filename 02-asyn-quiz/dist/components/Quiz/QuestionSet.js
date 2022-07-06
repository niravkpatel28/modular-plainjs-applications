// create a list of questions for the quiz and export that
import { Question } from "./Question.js";
import { Option } from "./Option.js";
export var questions = [
    new Question({
        text: "An equilateral triangle has?",
        points: 1,
        options: [
            new Option({
                optionText: "Two sides equal",
                isCorrect: false,
            }),
            new Option({ optionText: "All three sides unequal.", isCorrect: false }),
            new Option({ optionText: "All three sides equal", isCorrect: true }),
            new Option({ optionText: "None of these", isCorrect: false }),
        ],
    }),
    new Question({
        text: "What is the formula for area of rectangle? ",
        points: 1,
        options: [
            new Option({ optionText: "Length x Breadth", isCorrect: true }),
            new Option({ optionText: "Breadth + Length", isCorrect: false }),
            new Option({ optionText: "Breadth x 2 + Length ", isCorrect: false }),
            new Option({ optionText: "None of these", isCorrect: false }),
        ],
    }),
    new Question({
        text: "What is 2+2?",
        points: 1,
        options: [
            new Option({ optionText: "4", isCorrect: true }),
            new Option({ optionText: "2", isCorrect: false }),
            new Option({ optionText: "1", isCorrect: false }),
            new Option({ optionText: "0", isCorrect: false }),
        ],
    }),
];
