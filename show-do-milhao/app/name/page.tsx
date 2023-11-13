"use client";
import React, { useState } from 'react';

const StartPage = () => {
    const [playerName, setPlayerName] = useState('');
  
    const startQuiz = () => {
      if (playerName.trim() !== '') {
        const existingDataString = localStorage.getItem('leaderboard') || '[]';
        const existingData = JSON.parse(existingDataString);
  

        existingData.push({
          playerName,
          score: 0,
          date: new Date().toLocaleString(),
        });
  
        localStorage.setItem('leaderboard', JSON.stringify(existingData));
  
        window.location.href = `/quiz`;
      } else {
        alert('Por favor, insira seu nome antes de começar o quiz.');
      }
    };

  return (
    <div>
      <h1>Bem-vindo ao Quiz!</h1>
      <p>Insira seu nome para começar:</p>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Seu Nome"
      />
      <button onClick={startQuiz}>Iniciar Quiz</button>
    </div>
  );
};

export default StartPage;