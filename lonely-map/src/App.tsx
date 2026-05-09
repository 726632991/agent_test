import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import MapPage from './pages/MapPage';
import AddMarkPage from './pages/AddMarkPage';
import MarkListPage from './pages/MarkListPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/add" element={<AddMarkPage />} />
          <Route path="/marks" element={<MarkListPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
