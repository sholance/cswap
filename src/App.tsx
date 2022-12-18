import React from 'react';
import './App.css';
import Swap from 'ubeswap-swap-dev';
import Navbar from './components/header';
function App() {

  return (
    <div className="App">
      <Navbar />
      <main className="main-body">
        <Swap
    //  minimaPartnerId={'115792089237316195423570985008687907853269984665640564039457584007913129639935'}
        />
      </main>

    </div>
  );
}

export default App;
