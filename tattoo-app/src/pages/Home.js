import React from 'react';
import CardController from '../components/CardController';
import Sidebar from '../components/Sidebar';
import InquiryWidget from '../components/InquiryWidget';
import TattooModal from '../components/TattooModal';
import AddTattooForm from '../components/AddTattooForm';
import '../css/home.css';

class Home extends React.Component {
  state = {
    modalShown: false,
    tattooPicked: {},
    addFormShown: false,
    tattoos: {}
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
          tattoos
        });
      });
  }

  componentDidMount() {
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
        <button className="add-tattoo-btn" onClick={this.openAddForm}>Add New Tattoo</button>
        { this.addFormModalElement }
        <Sidebar tattooStyles={['Traditional', 'Realism', 'Tribal', 'Neo Traditional', 'Others']}/>
        <CardController tattoos={this.state.tattoos} openModal={this.openModal} />
        <InquiryWidget />
        { this.tattooModalElement }
      </div>
    );
  }
}

export default Home;