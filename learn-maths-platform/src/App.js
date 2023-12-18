import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResponsiveAppBar from "./components/navbar";
import Algebra from './components/Algebra';
import AnalizaMatematyczna from './components/Analiza Matematyczna';
import Blog from './components/Matematyka Dyskretna';
import Footer from "./components/footer";

function App() {
    return (
        <Router>
            <div>
                <ResponsiveAppBar />
                <Routes>
                    <Route path="/Algebra" element={<Algebra />} />
                    <Route path="/AnalizaMatematyczna" element={<AnalizaMatematyczna />} />
                    <Route path="/Blog" element={<Blog />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;

