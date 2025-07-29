import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setMessage(t('passwordsDoNotMatch'));
      return;
    }
   
    console.log('Changing password for:', formData.email);
    setMessage(t('passwordChangeSuccess'));
  
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div>
      <h1>{t('forgotPasswordTitle')}</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" name="email" placeholder={t('email')} onChange={handleChange} required />
        <input type="password" name="newPassword" placeholder={t('newPassword')} onChange={handleChange} required />
        <input type="password" name="confirmNewPassword" placeholder={t('confirmNewPassword')} onChange={handleChange} required />
        {message && <p>{message}</p>}
        <button type="submit">{t('changePassword')}</button>
      </form>
       <button onClick={() => navigate(-1)}>{t('back')}</button>
    </div>
  );
};

export default ForgotPasswordPage;