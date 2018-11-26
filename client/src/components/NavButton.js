import React from 'react';
import PropTypes from 'prop-types';

function NavButton({ isActive, onClick, value }) {
  const className = isActive ? 'active' : '';
  return (
    <button 
    className={className} 
    onClick={() => onClick(value)}>
      {value}
    </button>
  );
}

NavButton.propTypes = {
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  value: PropTypes.string
}

export default NavButton;