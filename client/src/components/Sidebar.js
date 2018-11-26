import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '../css/sidebar.css';

function Sidebar({ showAllTattoo, filterTattoos, tattooStyles }) {
  const [currentFilter, setCurrentFilter] = useState('All');

  function handleFilterClick(e, style = 'All') {
    if (style === 'All') {
      showAllTattoo();
    } else {
      filterTattoos(style);
    }
    setCurrentFilter(e.target.textContent);
  }

  return (
    <div className="sidebar">
      <h3 className="sidebar__heading">Tattoo Styles</h3>
      <ul className="tattoo__styles">
        <li 
        key="all" 
        className={currentFilter === 'All' ? 'tattoo__style active-filter' : 'tattoo__style'}>
          <button 
          onClick={handleFilterClick}>All
          </button>
        </li>
        {
          tattooStyles.map(style => (
            <li 
            key={style} 
            className={currentFilter === style ? 'tattoo__style ml-1 active-filter' : 'tattoo__style ml-1' }>
              <button 
              onClick={(e) => handleFilterClick(e, style)}>{style}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

Sidebar.propTypes = {
  showAllTattoo: PropTypes.func,
  filterTattoos: PropTypes.func,
  tattooStyles: PropTypes.arrayOf(PropTypes.string)
}

export default Sidebar;