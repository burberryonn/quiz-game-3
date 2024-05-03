class QuizView {
    constructor() {}
    displayQuestion(question) {
        console.log(question.text);
        question.options.forEach((option, index) => {
            console.log(`${index + 1}. ${option}`);
        });
    }
    displayResult(isCorrect, score) {
        console.log(isCorrect ? 'Правильно!' : 'Неправильно!');
        console.log(`Ваш текущий счет: ${score}`);
    }
    displayQuizFinished(score, totalQuestions) {
        console.log(`Поздравляем! Квиз завершен.`);
        console.log(`Ваш итоговый счет: ${score}/${totalQuestions}`);
    }
  }
  module.exports = QuizView;