"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface LeaderboardEntry {
  playerName: string;
  date: string;
  score: number; // Alterado de 'points' para 'score'
}

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const storedDataString = localStorage.getItem('leaderboard') || '';

    try {
      const storedData: LeaderboardEntry[] = JSON.parse(storedDataString);

      if (Array.isArray(storedData)) {
        // Ordene os dados antes de definir o estado
        const sortedData = storedData.sort((a, b) => b.score - a.score);
        setLeaderboardData(sortedData);
      }
    } catch (error) {
      console.error('Error parsing leaderboard data:', error);
    }
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ul>
        {leaderboardData.map((entry, index) => (
          <li key={index}>
            {entry.playerName} - {entry.score} points - {entry.date}
          </li>
        ))}
      </ul>
      <Link href="/">
        <button>Back to Menu</button>
      </Link>
    </div>
  );
};

export default Leaderboard;
