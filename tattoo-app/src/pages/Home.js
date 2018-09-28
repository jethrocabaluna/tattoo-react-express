import React from 'react';
import CardController from '../components/CardController';
import Sidebar from '../components/Sidebar';
import InquiryWidget from '../components/InquiryWidget';
import TattooModal from '../components/TattooModal';
import AddTattooForm from '../components/AddTattooForm';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import '../css/home.css';

class Home extends React.Component {
  state = {
    modalShown: false,
    tattooPicked: {},
    addFormShown: false,
    tattoos: {},
    isLoggedIn: false,
    tattooStyleFilter: ''
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
    fetch('/api/tattoos')
      .then(res => res.json())
      .then(tattoos => {
        this.setState({
          tattoos,
          tattooStyleFilter: ''
        });
      });
  }

  filterTattoos = (style) => {
    fetch(`/api/tattoos/${style.toLowerCase()}`)
      .then(res => res.json())
      .then(filteredTattoos => {
        this.setState({
          tattoos: filteredTattoos,
          tattooStyleFilter: style
        });
      });
  }

  userCheck = () => {
    if (this.state.isLoggedIn) {
      return (
        <div className="user-btns">
          <button className="btn-1" onClick={this.openAddForm}>Add New Tattoo</button>
          <a href="http://localhost:5000/logout" className="btn-1">Logout</a>
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
        console.log(status);
        this.setState({
          ...status
        });
      });

    fetch('/api/tattoos')
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
        <CardController tattoos={this.state.tattoos} openModal={this.openModal} tattooStyleFilter={this.state.tattooStyleFilter} />
        <InquiryWidget />
        { this.tattooModalElement }
      </div>
    );
  }
}

export default Home;