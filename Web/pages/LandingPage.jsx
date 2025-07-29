import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth'; 
import styles from './LandingPage.module.css';

const LandingPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
   const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(t('loginFailed'));
    }
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder={t('email')} 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder={t('password')} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{t('login')}</button>
      </form>
      <button onClick={() => navigate('/register')}>{t('register')}</button>
    </div>
  );
};

export default LandingPage;