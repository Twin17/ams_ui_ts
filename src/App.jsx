import { Routes, Route } from 'react-router-dom';
import { Main } from './components/Main';

export const App = () => {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="*" element={<h2>Неверный адрес</h2>}/>
        </Routes>
    )
}