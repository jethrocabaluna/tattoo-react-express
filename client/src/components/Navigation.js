import React, { useState } from 'react';
import PropTypes from 'prop-types';
import NavButton from './NavButton';
import '../css/navigation.css';

function Navigation({ history, options }) {
  const [activeLink, setActiveLink] = useState('home');

  function changeContent(value) {
    const contentName = value;
    history.push(`/section/${value}`);
    setActiveLink(value);
  }
  return (
    <nav className="navigation">
      <ul className="navigation__items container">
        {
          options.map(option => (
            <li 
            key={option} 
            className="navigation__item">
              <NavButton 
              value={option} 
              isActive={option === activeLink} 
              onClick={changeContent} />
            </li>
          ))
        }
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  history: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string)
}

export default Navigation;