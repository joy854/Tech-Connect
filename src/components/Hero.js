import React from 'react';

export default function Hero({ children }) {
  return (
    <div className='hero' style={{ marginBottom: '2%' }}>
      <div className='banner'>
        <h1>Eat, code, sleep, repeat!</h1>
        <p>Embrace your choices - we do</p>
        {children}
      </div>
    </div>
  );
}
