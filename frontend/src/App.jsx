import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [serverStatus, setServerStatus] = useState('Connecting to Backend...');

  useEffect(() => {
    // Calling our Express API endpoint
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => {
        setServerStatus(data.message);
      })
      .catch((err) => {
        console.error('Error connecting to backend:', err);
        setServerStatus('Failed to connect to backend.');
      });
  }, []);

  return (
    <div className="app-container">
      <h1>E-Commerce Storefront</h1>
      <p>Phase 1: Full-Stack Architecture Handshake Test</p>
      
      <div className={`badge ${serverStatus.includes('smoothly') ? 'badge-success' : 'badge-loading'}`}>
        Backend Status: {serverStatus}
      </div>
    </div>
  );
}

export default App;