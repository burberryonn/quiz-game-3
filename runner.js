const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const questions = {
  'Животные': [
    {
      question: "Как называется самое большое сухопутное млекопитающее?",
      options: ['Слон', 'Кит', 'Гиппопотам'],
      correctAnswer: 'Слон',
      isCompleted: false
    },
    {
      question: "Как называется самое большое сухопутное млекопитающее?",
      options: ['Слон', 'Кит', 'Гиппопотам'],
      correctAnswer: 'Слон',
      isCompleted: false
    },
    // Другие вопросы о животных
  ],
  'Роботы': [
    {
      question: "Кто создал первого промышленного робота?",
      options: ['Илон Маск', 'Джордж Девол', 'Эдвард Сноуден'],
      correctAnswer: 'Джордж Девол',
      isCompleted: false
    },
    // Другие вопросы о роботах
  ],
  'Бизнес': [
    {
      question: "Кто является основателем компании SpaceX?",
      options: ['Ларри Пейдж', 'Илон Маск', 'Джефф Безос'],
      correctAnswer: 'Илон Маск',
      isCompleted: false
    },
    // Другие вопросы о бизнесе
  ]
};

let currentQuestion = 0;
let score = 0;
let selectedCategory = '';

function chooseCategory() {
  console.log('Выберите категорию:');
  Object.keys(questions).forEach((category, index) => {
    const color = questions[category].some(question => question.isCompleted) ? '\x1b[32m' : '\x1b[0m';
    console.log(`${color}${index + 1}. ${category}\x1b[0m`);
  });

  rl.question('> ', (selectedCategoryIndex) => {
    selectedCategory = Object.keys(questions)[selectedCategoryIndex - 1];
    askQuestion();
  });
}

function askQuestion() {
  const currentQuestions = questions[selectedCategory];
  if (currentQuestion < currentQuestions.length) {
    const currentQuestionObj = currentQuestions[currentQuestion];
    console.log(currentQuestionObj.question);
    currentQuestionObj.options.forEach((option, index) => {
      console.log(`${index + 1}. ${option}`);
    });
    rl.question('> ', (answerIndex) => {
      const chosenAnswer = currentQuestionObj.options[parseInt(answerIndex) - 1];
      if (chosenAnswer === currentQuestionObj.correctAnswer) {
        console.log('Правильно!');
        score++;
      } else {
        console.log('Неправильно!');
      }
      currentQuestionObj.isCompleted = true;
      currentQuestion++;
      askQuestion();
    });
  } else {
    console.log(`Конец квиза. Ваш итоговый счет: ${score}/${currentQuestions.length}`);
    currentQuestion = 0; // Сброс текущего вопроса
    score = 0; // Сброс счета
    chooseCategory(); // Предоставляем выбор категории заново
  }
}

console.log('Добро пожаловать в квиз!');
chooseCategory();
