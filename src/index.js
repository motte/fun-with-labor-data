import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { SpeedInsights } from "@vercel/speed-insights/react"

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
