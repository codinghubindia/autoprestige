import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layout components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import InventoryPage from './pages/InventoryPage';
import CarDetailsPage from './pages/CarDetailsPage';
import ComparePage from './pages/ComparePage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/admin/AdminLogin';
import NotFoundPage from './pages/NotFoundPage';

// Auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-primary-50">
        <Routes>
          {/* Admin routes without header/footer */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            } 
          />
          
          {/* Public routes with header/footer */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <AnimatePresence mode="wait">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/inventory" element={<InventoryPage />} />
                      <Route path="/inventory/:location" element={<InventoryPage />} />
                      <Route path="/car/:id" element={<CarDetailsPage />} />
                      <Route path="/compare" element={<ComparePage />} />
                      <Route path="/404" element={<NotFoundPage />} />
                      <Route path="*" element={<Navigate to="/404" replace />} />
                    </Routes>
                  </AnimatePresence>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;