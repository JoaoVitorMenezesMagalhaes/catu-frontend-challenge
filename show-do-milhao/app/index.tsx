// Home.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Home = () => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');

  const handleStartGame = () => {
    if (playerName.trim() !== '') {
      // Redirecionar para a página de jogo com o nome do jogador como parâmetro
      router.push({
        pathname: '/game',
        query: { playerName },
      });
    }
  };

  return (
    <div>
      <h1>Bem-vindo ao Show do Milhão!</h1>
      <TextField
        label="Digite seu nome"
        variant="outlined"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleStartGame}>
        Iniciar Jogo
      </Button>
    </div>
  );
};

export default Home;
