import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import authService from '../api/authService';

const RegisterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError(t('passwordsDoNotMatch'));
      return;
    }
    try {
      await authService.register(formData);
      alert(t('registrationSuccess'));
      navigate('/'); 
    } catch (err) {
      setError(t('registrationFailed'));
    }
  };

  return (
    <div>
      <h1>{t('registerTitle')}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="userName" placeholder={t('userName')} onChange={handleChange} required />
        <input type="email" name="email" placeholder={t('email')} onChange={handleChange} required />
        <input type="password" name="password" placeholder={t('password')} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder={t('confirmPassword')} onChange={handleChange} required />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">{t('registerMe')}</button>
      </form>
      <button onClick={() => navigate('/forgot-password')}>{t('forgotPasswordLink')}</button>
      <button onClick={() => navigate(-1)}>{t('back')}</button> 
    </div>
  );
};

export default RegisterPage;