import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const CreateItemPage = () => {
  const { t } = useTranslation();
  const [creationType, setCreationType] = useState('Region'); 

  const renderForm = () => {
    switch (creationType) {
      case 'Region':
        return (
          <form>
            <h3>{t('create')} {t('region')}</h3>
            <input type="text" placeholder={t('name')} />
            <button type="submit">{t('create')}</button>
          </form>
        );
      case 'Section':
        return (
          <form>
            <h3>{t('create')} {t('section')}</h3>
            <select>
              <option>-- {t('select')} {t('region')} --</option>
             
              <option value="1">Северен Регион</option>
            </select>
            <input type="text" placeholder={t('name')} />
            <button type="submit">{t('create')}</button>
          </form>
        );
      case 'Control':
        return (
          <form>
            <h3>{t('create')} {t('controls')}</h3>
            <select>
              <option>-- {t('select')} {t('region')} --</option>
            </select>
            <select>
              <option>-- {t('select')} {t('section')} --</option>
            </select>
            <input type="text" placeholder={t('name')} />
            <button type="submit">{t('create')}</button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>{t('createItem')}</h2>
      <div>
        <button onClick={() => setCreationType('Region')}>{t('region')}</button>
        <button onClick={() => setCreationType('Section')}>{t('section')}</button>
        <button onClick={() => setCreationType('Control')}>{t('controls')}</button>
      </div>
      <hr />
      {renderForm()}
    </div>
  );
};

export default CreateItemPage;