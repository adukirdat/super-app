import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';
import Movies from './pages/Movies';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requireCategories>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/movies"
          element={
            <ProtectedRoute requireCategories requireDashboard>
              <Movies />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
