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
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', textAlign: 'center', backgroundColor: '#f8f8f8', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ color: '#333' }}>Leaderboard</h1>
      <ul style={{ listStyle: 'none', padding: '0' }}>
        {leaderboardData.map((entry, index) => (
          <li key={index} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', color: '#333' }}>
            {entry.playerName} - {entry.score} points - {entry.date}
          </li>
        ))}
      </ul>
      <Link href="/">
        <button style={{ padding: '10px 20px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }} >
          Back to Menu
        </button>
      </Link>
    </div>
  );
};

export default Leaderboard;
