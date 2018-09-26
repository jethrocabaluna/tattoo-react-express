import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import '../css/app.css';


class App extends React.Component {
  static propTypes = {
    match: PropTypes.object
  };

  renderContent() {
    const contentName = this.props.match.params.contentName;
    const isHome = this.props.match.path === '/';
    if (contentName === 'home' || isHome) {
      return <Home modalHandler={this.modalOverlayToggle} />;
    } else if (contentName === 'about') {
      return <About />;
    } else if (contentName === 'services') {
      return <Services />;
    } else if(contentName === 'contact') {
      return <Contact />;
    } else {
      return <NotFound />;
    }
  }

  modalOverlayToggle = () => {
    if (!document.body.classList.contains('overlay-on')) {
      document.body.classList.add('overlay-on');
    } else {
      document.body.classList.remove('overlay-on');
    }
  }

  render() {
    return (
      <div className='tattoo-espanya'>
        <Navigation history={this.props.history} options={['home', 'about', 'services', 'contact']} />
        { this.renderContent() }
      </div>
    );
  }
}

export default App;