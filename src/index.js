import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Calendar language={"ru"}/>, document.getElementById('root'));

registerServiceWorker();