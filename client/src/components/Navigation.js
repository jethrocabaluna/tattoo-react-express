import React from 'react';
import PropTypes from 'prop-types';
import '../css/navigation.css';

class Navigation extends React.Component {
  state = {
    activeLink: 'home'
  }

  static propTypes = {
    history: PropTypes.object,
    options: PropTypes.arrayOf(PropTypes.string)
  }

  changeContent = value => {
    const contentName = value;
    this.props.history.push(`/section/${value}`);
    this.setState({
      activeLink: value
    });
  }

  render() {
    return (
      <nav className="navigation">
        <ul className="navigation__items container">
          {
            this.props.options.map(option => (
              <li key={option} className="navigation__item"><NavButton value={option} isActive={option === this.state.activeLink} onClick={this.changeContent} /></li>
            ))
          }
        </ul>
      </nav>
    );
  }
}

const NavButton = props => {
  const className = props.isActive ? 'active' : '';
  return (
    <button className={className} onClick={() => props.onClick(props.value)}>{props.value}</button>
  );
}

export default Navigation;