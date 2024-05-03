class QuizModel { 
    constructor() { 
        this.questions = []; 
        this.currentQuestionIndex = 0; 
        this.score = 0; 
    } 
   
    getCurrentQuestion() { 
        return this.questions[this.currentQuestionIndex]; 
    } 
   
    addQuestion(question) { 
        this.questions.push(question); 
    } 
   
    answerCurrentQuestion(answerIndex) { 
        const currentQuestion = this.getCurrentQuestion(); 
        if (currentQuestion.correctAnswerIndex === answerIndex) { 
            this.score++; 
        } 
        this.currentQuestionIndex++; 
        return currentQuestion.correctAnswerIndex === answerIndex; 
    } 
   
    isQuizFinished() { 
        return this.currentQuestionIndex >= this.questions.length; 
    } 
  } 
  module.exports = QuizModel;