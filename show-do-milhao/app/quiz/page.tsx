"use client";
import React, { useEffect, useState } from 'react';
import './quiz.css';
import Link from 'next/link';

interface Question {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  difficulty: string;
}

const QuizPage = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showNextButton, setShowNextButton] = useState(false);
    const [userChoice, setUserChoice] = useState<string | null>(null);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);

    const playerName = localStorage.getItem('playerName') || '';
    const existingDataString = localStorage.getItem('leaderboard') || '[]';
    const existingData = JSON.parse(existingDataString);
  
    const difficultyScores: Record<string, number> = {
      easy: 1,
      medium: 1.5,
      hard: 2,
    };
  
    useEffect(() => {
      const getData = async () => {
        try {
          const easyResponse = await fetch('https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple');
          const mediumResponse = await fetch('https://opentdb.com/api.php?amount=4&difficulty=medium&type=multiple');
          const hardResponse = await fetch('https://opentdb.com/api.php?amount=2&difficulty=hard&type=multiple');
  
          if (easyResponse.ok && mediumResponse.ok && hardResponse.ok) {
            const easyData = await easyResponse.json();
            const mediumData = await mediumResponse.json();
            const hardData = await hardResponse.json();
  
            const categorizedData = [
              ...easyData.results.map((q: Question) => ({ ...q, difficulty: 'easy' })),
              ...mediumData.results.map((q: Question) => ({ ...q, difficulty: 'medium' })),
              ...hardData.results.map((q: Question) => ({ ...q, difficulty: 'hard' })),
            ];
  
            setQuestions(categorizedData);
            setShuffledAnswers(shuffleArray(categorizedData[0].incorrect_answers.concat(categorizedData[0].correct_answer)));
          } else {
            console.error('Erro ao buscar perguntas.');
          }
        } catch (error) {
          console.error('Erro ao buscar perguntas:', error);
        }
      };
  
      getData();
    }, []);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
          if (!quizCompleted && event.key >= '1' && event.key <= '4') {
            const selectedAnswer = shuffledAnswers[parseInt(event.key) - 1];
            handleAnswer(selectedAnswer);
          }
        };
    
        document.addEventListener('keydown', handleKeyPress);

        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [quizCompleted, shuffledAnswers]);

      useEffect(() => {
        if (quizCompleted) {
          if (playerName.trim() !== '') {
            const quizData = {
              playerName,
              score,
              date: new Date().toLocaleString(),
            };
    
            const existingDataString = localStorage.getItem('leaderboard') || '[]';
            const existingData = JSON.parse(existingDataString);

            existingData.push(quizData);
            console.log(existingData);
            localStorage.setItem('leaderboard', JSON.stringify(existingData));
          }
        }
      }, [quizCompleted, score, playerName]);
  
    const nextQuestion = () => {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setShowNextButton(false);
      setUserChoice(null);
      setShuffledAnswers(shuffleArray(questions[currentQuestion + 1].incorrect_answers.concat(questions[currentQuestion + 1].correct_answer)));
    };
  
    const handleAnswer = (selectedAnswer: string) => {
      if (!showNextButton) {
        const currentQuestionData: Question = questions[currentQuestion];
  
        if (selectedAnswer === currentQuestionData.correct_answer) {
          setScore((prevScore) => prevScore + difficultyScores[currentQuestionData.difficulty]);
        }
  
        setUserChoice(selectedAnswer);
  
        if (currentQuestion < questions.length - 1) {
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
          return <p>Loading questions...</p>;
        }
      
        const question: Question = questions[currentQuestion];
      
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <h1>Question {currentQuestion + 1}</h1>
              <h2>Score: {score}</h2>
              <h3>Difficulty: {question.difficulty}</h3>
              <h3>{question.question}</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {shuffledAnswers.map((answer, index) => (
                  <li key={index} style={{ margin: '10px' }}>
                    <button
                      onClick={() => handleAnswer(answer)}
                      disabled={showNextButton}
                      className={
                        showNextButton
                          ? answer === question.correct_answer
                            ? 'correct-answer'
                            : answer === userChoice
                            ? 'wrong-answer'
                            : 'disabled-answer'
                          : ''
                      }
                      style={{
                        padding: '10px 20px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s, color 0.3s',
                      }}
                    >
                      {answer}
                    </button>
                  </li>
                ))}
              </ul>
              {showNextButton && (
                <button
                  onClick={nextQuestion}
                  style={{
                    padding: '10px 20px',
                    fontSize: '1rem',
                    backgroundColor: 'rgb(85, 85, 205)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s, color 0.3s',
                    marginTop: '20px',
                  }}
                >
                  Next Question
                </button>
              )}
            </div>
          );
          
      };
  
    
    if (quizCompleted) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h1 style={{ color: 'rgb(85, 85, 205)' }}>Quiz Completed!</h1>
        <p style={{ fontSize: '1.2rem' }}>Final Score: {score} points</p>
        <Link href='/'>
            <button
            style={{
                padding: '10px 20px',
                fontSize: '1rem',
                backgroundColor: 'rgb(85, 85, 205)',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'background-color 0.3s, color 0.3s',
            }}
            >
            Back to Menu
            </button>
        </Link>
        </div>
    );
    }

    return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
        {renderQuestion()}
        {quizCompleted && (
        <p style={{ fontSize: '1.2rem', marginTop: '20px' }}>
            Final Score: {score} points
        </p>
        )}
    </div>
    );
  };
  
  export default QuizPage;