import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f5f5f5' }}>
      <Header />

      <main className="flex-1 flex items-center justify-center p-10">
        <div 
          className="bg-white p-8 w-full max-w-[400px] shadow-md"
          style={{ borderRadius: '4px' }}
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="username" 
                className="block mb-2 text-sm font-medium"
                style={{ color: '#333333', fontSize: '14px', fontWeight: 500 }}
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#d0d0d0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7cb342'}
                onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block mb-2 text-sm font-medium"
                style={{ color: '#333333', fontSize: '14px', fontWeight: 500 }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border focus:outline-none focus:ring-2"
                style={{ 
                  borderColor: '#d0d0d0',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#7cb342'}
                onBlur={(e) => e.target.style.borderColor = '#d0d0d0'}
              />
            </div>

            <button
              type="submit"
              className="w-full text-white font-medium transition-colors"
              style={{
                backgroundColor: '#7cb342',
                borderRadius: '4px',
                padding: '12px',
                fontSize: '14px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#689f38'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#7cb342'}
            >
              Login
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
