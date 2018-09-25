import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import Home from './Home';
import About from './About';
import Services from './Services';
import Contact from './Contact';
import NotFound from './NotFound';
import '../css/app.css';


class App extends React.Component {
  static propTypes = {
    match: PropTypes.object
  };

  renderContent() {
    const contentName = this.props.match.params.contentName;
    const isHome = this.props.match.path === '/';
    if (contentName === 'home' || isHome) {
      return <Home />;
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

  render() {
    return (
      <div className="tattoo-espanya">
        <Navigation history={this.props.history} options={['home', 'about', 'services', 'contact']} />
        { this.renderContent() }
      </div>
    );
  }
}

export default App;