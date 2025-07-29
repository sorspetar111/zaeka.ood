import React from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLayout = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div>
      <header>
        <h1>{t('adminPanel')}</h1>
        <nav>
          <Link to="users"><button>{t('users')}</button></Link>
          <Link to="controls"><button>{t('controls')}</button></Link>
          <Link to="create"><button>{t('create')}</button></Link>
        </nav>
      </header>
      <hr />
      <main>
      
        <Outlet />
      </main>
      <footer>
        <hr />
        <button onClick={() => navigate('/dashboard')}>{t('back')}</button>
        <button onClick={logout}>{t('logout')}</button> 
      </footer>
    </div>
  );
};

export default AdminLayout;