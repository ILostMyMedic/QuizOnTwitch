import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';
import './assets/styles/scss/index.scss';
import history from './utils/history';
import { Provider } from 'react-redux';
import store from './store';

const onRedirectCallback = (appState: any) => {
    history.push(appState && appState.returnTo ? appState.returnTo : window.location.pathname);
};

const config = {
    domain: 'quizontwitch.eu.auth0.com',
    clientId: '9D58SXUGyVl0BJudGkfLtzE5l4am94uv',
    onRedirectCallback,
    authorizationParams: {
        connection: 'twitch',
        audience: '',
    },
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Auth0Provider {...config}>
            <App />
        </Auth0Provider>
    </Provider>
);
