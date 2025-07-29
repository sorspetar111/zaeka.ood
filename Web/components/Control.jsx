import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import controlService from '../../api/controlService';
import styles from './Control.module.css';

const Control = ({ controlData }) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);
  const [eventId, setEventId] = useState(null);

  const handleClick = async () => {
    if (isActive) return;

    try {
       
        const response = await controlService.pressControl(controlData.id);
        // const fakeEventId = Math.floor(Math.random() * 10000);  
        setEventId(response?? fakeEventId);
        
     
        setIsActive(true);

       
        setTimeout(() => {
            setIsActive(false);
            setEventId(null);
        }, 5000);

    } catch (error) {
        console.error("Failed to press control:", error);
       
    }
  };

 
  const buttonStyle = {
    backgroundColor: isActive ? 'lightblue' : 'initial',
    transition: 'background-color 0.3s ease',
  };

  return (
    <button style={buttonStyle} onClick={handleClick} disabled={isActive}>
      {controlData.name} {eventId && `(${t('event')} #${eventId})`}
    </button>
  );
};

export default Control;