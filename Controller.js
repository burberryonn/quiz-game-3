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
