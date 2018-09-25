import React from 'react';
import '../css/sidebar.css';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar">
        <h3 className="sidebar__heading">Tattoo Styles</h3>
        <ul className="tattoo__styles">
          {
            this.props.tattooStyles.map(style => (
              <li key={style} className="tattoo__style"><button>{style}</button></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Sidebar;