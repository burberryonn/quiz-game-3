const QuizModel = require('./Model.js'); 
const QuizView = require('./View.js'); 
const readline = require('readline'); 
class QuizController { 
  constructor(model, view) { 
      this.model = model; 
      this.view = view; 
  } 
 
  async startQuiz() { 
      while (!this.model.isQuizFinished()) { 
          const currentQuestion = this.model.getCurrentQuestion(); 
          this.view.displayQuestion(currentQuestion); 
 
          const userAnswer = await this.getUserAnswer(); 
          const isCorrect = this.model.answerCurrentQuestion(userAnswer); 
          this.view.displayResult(isCorrect, this.model.score); 
      } 
 
      this.view.displayQuizFinished(this.model.score, this.model.questions.length); 
  } 
 
  getUserAnswer() { 
      return new Promise(resolve => { 
          const rl = readline.createInterface({ 
              input: process.stdin, 
              output: process.stdout 
          }); 
          rl.question('Введите номер вашего ответа: ', answer => { 
              rl.close(); 
              resolve(parseInt(answer) - 1); 
          }); 
      }); 
  } 
}

addQuestion(text, options, correctAnswerIndex) {
    const question = { text, options, correctAnswerIndex };
    this.model.addQuestion(question);
}


const model = new QuizModel();
const view = new QuizView();
const controller = new QuizController(model, view);

controller.addQuestion('Что является столицей Франции?', ['Мадрид', 'Париж', 'Лондон', 'Рим'], 1);
controller.addQuestion('Какое самое большое озеро в мире?', ['Озеро Байкал', 'Озеро Виктория', 'Озеро Танганьика', 'Озеро Супериор'], 1);
controller.addQuestion('Сколько планет в Солнечной системе?', ['8', '9', '10', '7'], 0);
controller.addQuestion('Сколько ОЛЕГ СЬЕСТ БУРГЕРЬЕВ?', ['100', '1000', '100000', 'INFINITY'], 3);

controller.startQuiz();



