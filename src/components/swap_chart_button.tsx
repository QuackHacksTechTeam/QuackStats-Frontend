import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/menu_button.css';

interface SquareButtonProps {
  label: string;
  menuOptions: { label: string; route: string }[];
}

const SquareButton: React.FC<SquareButtonProps> = ({ label, menuOptions }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleButtonClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (route: string) => {
    navigate(route);
    setIsMenuOpen(false); 
  };

  return (
    <div className="menu-button-container">
      <button onClick={handleButtonClick}>
        {label}
      </button>

      {isMenuOpen && (
        <div className ="menu-options">
          {menuOptions.map((option, index) => (
            <div className="menu-options-row"
              key={index}
              onClick={() => handleMenuClick(option.route)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SquareButton;
