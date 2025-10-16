import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  const { siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';

  const cardBg = theme === 'dark' ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-gray-200';
  const inputBg = theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300';
  const inputText = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const labelText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = login(username, password);
    if (success) {
      navigate('/admin');
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة.');
    }
  };

  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md">
        <div className={`${cardBg} p-8 rounded-lg border shadow-xl`}>
          <h1 className="text-3xl font-bold text-amber-400 mb-6 text-center">تسجيل دخول الأدمن</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className={`block text-sm font-medium ${labelText}`}>اسم المستخدم</label>
              <input 
                type="text" 
                id="username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
                className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} 
              />
            </div>
            <div>
              <label htmlFor="password" aria-label="كلمة المرور" className={`block text-sm font-medium ${labelText}`}>كلمة المرور</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} 
              />
            </div>
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105 shadow-lg">
              تسجيل الدخول
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;