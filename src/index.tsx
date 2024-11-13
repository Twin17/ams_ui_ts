import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { App } from './App';
import './css/main.css'

//npm i react
//npm i react-dom
//npm i react-scripts
//npm i react-icons
//npm i axios
//npm install --save typescript @types/node @types/react @types/react-dom @types/jest
//npm i react-router-dom --legacy-peer-deps

const rootElem = document.getElementById('root');

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
  
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
        </BrowserRouter>
    );
}