"use client";
import React, { useEffect, useState } from 'react';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const QuizPage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
        const data = await response.json();
        setQuestions(data.results);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    };

    getData();
  }, []);

  const nextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    // Ocultar o botão "Próxima Pergunta" após mudar de pergunta
    setShowNextButton(false);
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (!showNextButton) {
      const currentQuestionData: Question = questions[currentQuestion];

      if (selectedAnswer === currentQuestionData.correct_answer) {
        // A resposta está correta, adicione um ponto à pontuação
        setScore((prevScore) => prevScore + 1);
      }

      // Avance para a próxima pergunta ou marque o quiz como concluído
      if (currentQuestion < questions.length - 1) {
        // Exibir o botão "Próxima Pergunta" após responder
        setShowNextButton(true);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const shuffleArray = (array: string[]) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const renderQuestion = () => {
    if (questions.length === 0 || currentQuestion >= questions.length) {
      return <p>Carregando perguntas...</p>;
    }

    const question: Question = questions[currentQuestion];
    const allAnswers = [...question.incorrect_answers, question.correct_answer];
    const shuffledAnswers = shuffleArray(allAnswers);

    return (
      <div>
        <h1>Pergunta {currentQuestion + 1}</h1>
        <h2>Score: {score}</h2>
        <h3>{question.question}</h3>
        <ul>
          {shuffledAnswers.map((answer, index) => (
            <li key={index}>
              <button onClick={() => handleAnswer(answer)} disabled={showNextButton}>
                {answer}
              </button>
            </li>
          ))}
        </ul>
        {showNextButton && (
          <button onClick={nextQuestion}>Próxima Pergunta</button>
        )}
      </div>
    );
  };

  if (quizCompleted) {
    return (
        <div>
            <h1>Quiz Concluído!</h1>
            <p>Pontuação Final: {score} pontos</p>
        </div>
    )
  }

  return (
    <div>
      <h1>Quiz Page</h1>
      {renderQuestion()}
    </div>
  );
};

export default QuizPage;
