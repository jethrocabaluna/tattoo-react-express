import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import Navigation from './Navigation';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';
import '../css/app.css';

function App({ match, location, history }) {
  document.body.addEventListener('mousedown', () => {
    document.body.classList.add('using-mouse');
  });

  document.body.addEventListener('keydown', () => {
    document.body.classList.remove('using-mouse');
  });

  function renderContent() {
    const contentName = match.params.contentName;
    const isHome = match.path === '/';
    if (contentName === 'home' || isHome) {
      return <Home modalHandler={ modalOverlayToggle } />;
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

  function modalOverlayToggle () {
    if (!document.body.classList.contains('overlay-on')) {
      document.body.classList.add('overlay-on');
    } else {
      document.body.classList.remove('overlay-on');
    }
  }

  useEffect(() => {
    const query = qs.parse(location.search);
    if (query.token) {
      window.localStorage.setItem("jwt", query.token);
      history.push("/");
    }
  }, []);

  return (
    <div className='tattoo-espanya'>
      <Navigation history={history} options={['home', 'about', 'services', 'contact']} />
      { renderContent() }
    </div>
  );
}

App.propTypes = {
  match: PropTypes.object
}

export default App;
