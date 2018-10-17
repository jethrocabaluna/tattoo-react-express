import React from 'react';
import PropTypes from 'prop-types';
import CardController from '../components/CardController';
import Sidebar from '../components/Sidebar';
import InquiryWidget from '../components/InquiryWidget';
import TattooModal from '../components/TattooModal';
import AddTattooForm from '../components/AddTattooForm';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import '../css/home.css';

class Home extends React.Component {
  constructor() {
    super();
    window.onscroll = () => {
      if (this.state.tattoosLimitReached) return;
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        setTimeout(() => {
          this.loadMoreTattoos(this.state.tattoosBatch);
          this.setState({
            tattoosBatch: this.state.tattoosBatch + 1
          });
        }, 300);
      }
    }
  }

  static propTypes = {
    modalHandler: PropTypes.func
  }
  
  state = {
    modalShown: false,
    tattooPicked: {},
    addFormShown: false,
    tattoos: {},
    isLoggedIn: false,
    tattooStyleFilter: '',
    tattoosLimitReached: false,
    tattoosBatch: 2
  }

  tattooModalElement = '';
  addFormModalElement = '';

  openModal = (tattooPicked) => {
    this.setState({
      modalShown: true,
      tattooPicked
    });
    this.tattooModalElement = <TattooModal closeModal={this.closeModal} currentTattoo={tattooPicked} />;
    this.props.modalHandler();
  }

  closeModal = () => {
    this.setState({
      modalShown: false
    });
    this.tattooModalElement = '';
    this.props.modalHandler();
  }

  openAddForm = () => {
    this.setState({
      addFormShown: true
    });
    this.addFormModalElement = <AddTattooForm closeAddForm={ this.closeAddForm } updateTattoos={ this.updateTattoos } />;
    this.props.modalHandler();
  }

  closeAddForm = () => {
    this.setState({
      addFormShown: false
    });
    this.addFormModalElement = '';
    this.props.modalHandler();
  }

  updateTattoos = () => {
    fetch('/api/tattoos/batch/1')
      .then(res => res.json())
      .then(tattoos => {
        this.setState({
          tattoos,
          tattooStyleFilter: '',
          tattoosLimitReached: false,
          tattoosBatch: 2
        });
      });
  }

  loadMoreTattoos = (batch) => {
    fetch(`/api/tattoos${this.state.tattooStyleFilter !== '' ? '/styles/' + this.state.tattooStyleFilter.toLowerCase() : '/batch'}/${batch}`)
      .then(res => res.json())
      .then(moreTattoos => {
        if (moreTattoos.limitReached) {
          this.setState({
            tattoosLimitReached: false
          });
          return;
        }
        const newTattoos = [...this.state.tattoos, ...moreTattoos];
        this.setState({
          tattoos: newTattoos
        });
      });
  }

  filterTattoos = (style) => {
    fetch(`/api/tattoos/styles/${style.toLowerCase()}/1`)
      .then(res => res.json())
      .then(filteredTattoos => {
        this.setState({
          tattoos: filteredTattoos,
          tattooStyleFilter: style,
          tattoosLimitReached: false,
          tattoosBatch: 2
        });
      });
  }

  userCheck = () => {
    if (this.state.isLoggedIn) {
      return (
        <div className="user-btns">
          <button className="btn-1" onClick={this.openAddForm}>Add New Tattoo</button>
          <a href="https://tattoo-app.herokuapp.com:5000/logout" className="btn-1">Logout</a>
        </div>
      );
    } else {
      return <GoogleLoginBtn />;
    }
  }

  componentDidMount() {
    fetch('/isLoggedIn')
      .then(res => res.json())
      .then(status => {
        this.setState({
          ...status
        });
      });

    fetch('/api/tattoos/batch/1')
      .then(res => res.json())
      .then(tattoos => {
        this.setState({
          tattoos
        });
      });
  }

  componentWillUnmount() {
    if (this.state.modalShown) {
      this.closeModal();
    } else if (this.state.addFormShown) {
      this.closeAddForm();
    }
  }

  render() {
    return (
      <div className="home container">
        { this.userCheck() }
        { this.addFormModalElement }
        <Sidebar tattooStyles={['Traditional', 'Realism', 'Tribal', 'Neo Traditional', 'Others']} filterTattoos={this.filterTattoos} showAllTattoo={this.updateTattoos}/>
        <CardController tattoos={this.state.tattoos} openModal={this.openModal} tattooStyleFilter={this.state.tattooStyleFilter} loadMoreTattoos={this.loadMoreTattoos} limitReached={this.state.tattoosLimitReached} batch={2} />
        <InquiryWidget />
        { this.tattooModalElement }
      </div>
    );
  }
}

export default Home;