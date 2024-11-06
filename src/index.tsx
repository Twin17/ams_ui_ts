import ReactDOM from 'react-dom/client';
import {App} from './App';
import './css/main.css'

//npm i react
//npm i react-dom
//npm i react-scripts
//npm i react-icons
//npm i axios
//npm install --save typescript @types/node @types/react @types/react-dom @types/jest

const rootElem = document.getElementById('root');

if (rootElem) {
    const root = ReactDOM.createRoot(rootElem);
  
    root.render(
        <App />
    );
}