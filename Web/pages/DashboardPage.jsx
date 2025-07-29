import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Region from '../components/dashboard/Region';
import LanguageSwitcher from '../components/layout/LanguageSwitcher';
import controlService from '../api/controlService';
import { useAuth } from '../hooks/useAuth';

const mockDashboardData = [
  { 
    id: 1, name: 'Северен Регион', 
    sections: [
      { id: 10, name: 'Секция А', controls: [{id: 101, name: 'Контрола 1'}, {id: 102, name: 'Контрола 2'}] },
      { id: 11, name: 'Секция Б', controls: [{id: 103, name: 'Контрола 3'}] }
    ]
  },
    { 
    id: 2, name: 'Южен Регион', 
    sections: [
      { id: 12, name: 'Секция В', controls: [{id: 104, name: 'Контрола 4'}] }
    ]
  }
];

const DashboardPage = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data = await controlService.getDashboardControls();
        setDashboardData(mockDashboardData); // Използваме мок данни за момента
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>{t('loading')}...</div>;
  }
  
  const isAdmin = user.role === 'Administrator' || user.role === 'PowerAdmin';

  return (
    <div>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>{t('dashboard')}</h1>
        <div>
           {isAdmin && <button onClick={() => navigate('/admin')}>Админ Панел</button>} 
          <LanguageSwitcher />
          <button onClick={() => logout() }>{t('logout')}</button>
        </div>
      </header>
      
      <main>
        {dashboardData.map(region => (
          <Region key={region.id} regionData={region} />
        ))}
      </main>
    </div>
  );
};

export default DashboardPage;