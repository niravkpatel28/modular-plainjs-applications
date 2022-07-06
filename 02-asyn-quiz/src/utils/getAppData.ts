const baseLink: string =
  "https://niravkpatel28.github.io/modular-plainjs-applications/data";
const quizAPi = "/Quiz/Quiz.json";

export const getQuizData = async () => {
  let response = await fetch(`${baseLink}/Quiz/Quiz.json`);
  let data = await response.json();
  return data;
};
