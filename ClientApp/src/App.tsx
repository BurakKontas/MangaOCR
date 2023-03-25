import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes.tsx';

const App: React.FC = () => {
    return (
        <Routes>
            {AppRoutes.map((route) => (
                <Route key={route.path} {...route} />
            ))}
        </Routes>
    );
};

export default App;