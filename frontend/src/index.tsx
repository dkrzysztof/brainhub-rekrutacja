import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';
import { Provider } from 'react-redux';
import store from './App/state/store';
import SuspenseLoader from './App/components';

function render(): void {
	ReactDOM.render(
		<Provider store={store}>
			<Suspense fallback={SuspenseLoader}>
				<App />
			</Suspense>
		</Provider>,
		document.getElementById('root')
	);
}

render();
