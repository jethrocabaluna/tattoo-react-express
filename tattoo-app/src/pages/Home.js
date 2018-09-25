import React from 'react';
import CardController from '../components/CardController';
import Sidebar from '../components/Sidebar';
import InquiryWidget from '../components/InquiryWidget';
import TattooModal from '../components/TattooModal';

class Home extends React.Component {
  state = {
    showModal: false,
    tattooPicked: {}
  }

  modalElement = '';

  openModal = (tattooPicked) => {
    this.setState({
      showModal: true,
      tattooPicked
    });
    this.modalElement = <TattooModal closeModal={this.closeModal} currentTattoo={tattooPicked} />;
    this.props.modalHandler();
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
    this.modalElement = '';
    this.props.modalHandler();
  }

  componentWillUnmount() {
    if (this.state.showModal) {
      this.closeModal();
    }
  }

  render() {
    return (
      <div className="home container">
        <Sidebar tattooStyles={['Traditional', 'Realism', 'Tribal', 'Neo Traditional', 'Others']}/>
        <CardController openModal={this.openModal} />
        <InquiryWidget />
        { this.modalElement }
      </div>
    );
  }
}

export default Home;