import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';
import registerServiceWorker from './registerServiceWorker';

let date = new Date();
date.setFullYear(2010);
date.setMonth(11);

ReactDOM.render(<Calendar />, document.getElementById('root'));

registerServiceWorker();