import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Car, Shield, AlertCircle, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';
import useAuthStore from '../../store/useAuthStore';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  
  const from = location.state?.from?.pathname || '/admin/dashboard';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 to-primary-800">
      {/* Back to Home Link */}
      <div className="absolute top-4 left-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-white/80 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          <span>Back to Website</span>
        </Link>
      </div>
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="max-w-md w-full bg-white rounded-xl shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Logo and Title */}
          <div className="bg-primary-900 rounded-t-xl p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-3 rounded-full">
                <Car size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sony's Auto Admin</h1>
            <p className="text-primary-200">
              Sign in to access the administration dashboard
            </p>
          </div>
          
          <div className="p-8">
            {error && (
              <div className="mb-6 p-3 bg-error-50 border border-error-200 rounded-lg flex items-start">
                <AlertCircle size={18} className="text-error-600 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-error-800 text-sm">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  placeholder="admin@sonysauto.com"
                  required
                />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-primary-700">
                    Password
                  </label>
                  <button 
                    type="button"
                    className="text-sm text-accent-600 hover:text-accent-500 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                className="py-2.5"
              >
                Sign In to Dashboard
              </Button>
            </form>
            
            <div className="mt-8 pt-6 border-t border-primary-100">
              <div className="flex items-center justify-center text-sm text-primary-500">
                <Shield size={16} className="mr-1" />
                <span>Secure admin access only</span>
              </div>
            </div>
            
            {/* Demo Credentials */}
            <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
              <p className="text-sm text-primary-600 mb-2 font-medium text-center">Demo Credentials</p>
              <div className="space-y-1 text-sm text-primary-600">
                <div className="flex justify-between items-center">
                  <span>Email:</span>
                  <code className="bg-white px-2 py-1 rounded">admin@sonysauto.com</code>
                </div>
                <div className="flex justify-between items-center">
                  <span>Password:</span>
                  <code className="bg-white px-2 py-1 rounded">password</code>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;