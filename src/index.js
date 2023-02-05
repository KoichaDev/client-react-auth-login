import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/auth-provider';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import './index.css';

if (process.env.NODE_ENV === 'production') {
	disableReactDevTools();
}

ReactDOM.render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
