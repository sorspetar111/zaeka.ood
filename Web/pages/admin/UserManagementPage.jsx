import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


const mockUsers = [
  { id: 1, userName: 'ivan.ivanov', email: 'ivan@test.com', role: 'User' },
  { id: 2, userName: 'admin.georgiev', email: 'admin@test.com', role: 'Administrator' },
  { id: 3, userName: 'petar.petrov', email: 'petar@test.com', role: 'User' },
];

const UserManagementPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleEdit = (userId) => {

    alert(`Editing user with ID: ${userId}`);
  };

  return (
    <div>
      <h2>{t('userList')}</h2>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>{t('id')}</th>
            <th>{t('userName')}</th>
            <th>{t('email')}</th>
            <th>{t('role')}</th>
            <th>{t('edit')}</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEdit(user.id)}>{t('edit')}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagementPage;