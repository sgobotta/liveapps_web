import React from 'react';
import logo from './live-dj-iso-white.svg';
import background from './background.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={background} className="App-background" alt="background" />

        <div className='absolute bottom-0'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>

        <div className='absolute top-3/4 right-10'>
          <span className='text-primary-500'>
            liveapps
            <span className="text-accent-p-500 pl-2">
              (づ ◕‿◕ )づ
            </span>
          </span>
        </div>
      </header>
    </div>
  );
}

export default App;
