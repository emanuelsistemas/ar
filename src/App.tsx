import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Redirecionar para a página static.html
    window.location.href = '/static.html';
  }, []);

  return (
    <div style={{ 
      padding: '20px', 
      textAlign: 'center', 
      backgroundColor: '#111', 
      color: 'white', 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Redirecionando...</h1>
    </div>
  );
}

export default App;
