import React from 'react';
import CardController from './CardController';
import Sidebar from './Sidebar';
import InquiryWidget from './InquiryWidget';

class Home extends React.Component {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({
      showModal: true
    });
  }

  closeModal = () => {
    this.setState({
      showModal: false
    });
  }

  render() {
    return (
      <div className="home container">
        <Sidebar tattooStyles={['Traditional', 'Realism', 'Tribal', 'Neo Traditional', 'Others']}/>
        <CardController openModal={this.openModal} />
        <InquiryWidget />
      </div>
    );
  }
}

export default Home;