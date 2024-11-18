import { Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';
import { ModelInfo } from './components/ModelInfo';

export const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/info" element={<ModelInfo/>}/>
            <Route path="*" element={<header className="header">Неверный адрес</header>}/>
        </Routes>
    )
}