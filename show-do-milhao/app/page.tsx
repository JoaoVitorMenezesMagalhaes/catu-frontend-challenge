import Link from 'next/link';

export default function Main() {
  return (
    <main style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>SHOW DO MILHÃO</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <Link href="/name">
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
            New Game
          </button>
        </Link>
        <Link href="/leaderboard">
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
            Leaderboard
          </button>
        </Link>
      </div>
    </main>
  );
}
