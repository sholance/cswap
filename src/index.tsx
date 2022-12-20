import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactGA from 'react-ga'
import { ContractKitProvider } from '@celo-tools/use-contractkit';
import '@celo-tools/use-contractkit/lib/styles.css';



ReactGA.initialize('test', { testMode: true, debug: true })

ReactGA.initialize('test', { redactEmail: false })

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'cswap',
        description: 'swap celo with cswap',
        url: 'https://cswap.top',
        icon: '',
      }}
    >
    <App/>
    </ContractKitProvider>

  </React.StrictMode>
  ,
  document.getElementById('root')
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
