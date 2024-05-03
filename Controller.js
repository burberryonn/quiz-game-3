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
  addQuestion(text, options, correctAnswerIndex) {
    const question = { text, options, correctAnswerIndex };
    this.model.addQuestion(question);
}
}



const model = new QuizModel();
const view = new QuizView();
const controller = new QuizController(model, view);


controller.addQuestion('\nВопрос: Что такое космический мусор?\n', ['Метеориты', 'Спутники', 'Человеческие космические аппараты', 'Остатки космических ракет\n'], 3);
controller.addQuestion('\nКто был первым президентом США?\n', ['Джордж Вашингтон', 'Томас Джефферсон', 'Авраам Линкольн', 'Джон Адамс\n'], 0);
controller.addQuestion('\n каком году состоялась Великая Французская революция?\n', ['1776', '1789', '1812', '1917\n'], 1);
controller.addQuestion('\nСемь раз отмерь, один раз...\n', ['Запуш', 'Отреж', 'Закомить', 'Засплить\n'], 0);
controller.addQuestion('\nКто учится в группе Тигры?\n', ['Пальма', 'Панин', 'Шпагат', 'Пага\n'], 3);
controller.addQuestion('\nКакое животное может превысить скорость бега олимпийского чемпиона Усэйна Болта?\n', ['Страус', 'Гепард', 'Быстроходная черепаха', 'Ученик Эльбруса опаздывающий на утренний стендап\n'], 3);

controller.startQuiz();



