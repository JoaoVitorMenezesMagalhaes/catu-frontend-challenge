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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <h1>Bem-vindo ao Quiz!</h1>
      <p>Insira seu nome para começar:</p>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Seu Nome"
        style={{
          margin: '10px',
          padding: '10px',
          fontSize: '1rem',
        }}
      />
      <button
        onClick={startQuiz}
        style={{
          margin: '10px',
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          backgroundColor: 'rgb(85, 85, 205)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          transition: 'background-color 0.3s, color 0.3s',
        }}
      >
        Iniciar Quiz
      </button>
    </div>
  );
};

export default StartPage;
