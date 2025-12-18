import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/Home';
import HousieGame from './pages/HousieGame';
import DiceRoller from './pages/DiceRoller';
import ScoreKeeper from './pages/ScoreKeeper';
import FingerChooser from './pages/FingerChooser';
import GameTimer from './pages/GameTimer';
import TeamGen from './pages/TeamGen';
import LifeCounterPage from './pages/LifeCounterPage';
import CoinPage from './pages/CoinPage';
import BuzzerPage from './pages/BuzzerPage';
import DeckPage from './pages/DeckPage';

// Placeholder components for routes we haven't built yet
const Placeholder = ({ title }) => (
  <div className="text-center py-20">
    <h2 className="text-3xl font-bold text-slate-200 mb-4">{title}</h2>
    <p className="text-slate-400">This tool is currently under construction.</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/housie" element={<HousieGame />} />
          <Route path="/dice" element={<DiceRoller />} />
          <Route path="/score" element={<ScoreKeeper />} />
          <Route path="/finger" element={<FingerChooser />} />
          <Route path="/timer" element={<GameTimer />} />
          <Route path="/team" element={<TeamGen />} />
          <Route path="/life" element={<LifeCounterPage />} />
          <Route path="/coin" element={<CoinPage />} />
          <Route path="/buzzer" element={<BuzzerPage />} />
          <Route path="/deck" element={<DeckPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
