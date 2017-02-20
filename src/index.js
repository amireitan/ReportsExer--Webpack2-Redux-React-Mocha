import 'babel-polyfill';
window.Promise = window.Promise || require('es6-promise');
import React from 'react';
import {render} from 'react-dom';

import './assets/style.scss';
import Root from './components/Root';

render(<Root />,
	document.getElementById('root')
);