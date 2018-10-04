import React from 'react';
import '../css/sidebar.css';

class Sidebar extends React.Component {
  state = {
    currentFilter: 'All'
  }

  handleFilterClick(e, style = 'All') {
    if (style === 'All') {
      this.props.showAllTattoo();
    } else {
      this.props.filterTattoos(style);
    }
    this.setState({
      currentFilter: e.target.textContent
    });
  }

  render() {
    return (
      <div className="sidebar">
        <h3 className="sidebar__heading">Tattoo Styles</h3>
        <ul className="tattoo__styles">
          <li key="all" className={this.state.currentFilter === 'All' ? 'tattoo__style active-filter' : 'tattoo__style'}><button onClick={(e) => this.handleFilterClick(e)}>All</button></li>
          {
            this.props.tattooStyles.map(style => (
              <li key={style} className={this.state.currentFilter === style ? 'tattoo__style ml-1 active-filter' : 'tattoo__style ml-1' }><button onClick={(e) => this.handleFilterClick(e, style)}>{style}</button></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default Sidebar;