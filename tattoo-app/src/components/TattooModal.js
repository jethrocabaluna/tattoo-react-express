import React from 'react';
import '../css/tattoo_modal.css';

class TattooModal extends React.Component {
  state = {
    currentTattoo: this.props.currentTattoo
  }

  closeModal(e) {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div onClick={(e) => this.closeModal(e)} className="tattoo-modal__wrapper">
        <div className="tattoo-modal">
          <button className="tattoo-modal__close-btn" onClick={this.props.closeModal}>X</button>
          <h1 className="tattoo-modal__heading">{this.state.currentTattoo.name}</h1>
          <img className="tattoo-modal__image" src={this.state.currentTattoo.image} />
        </div>
      </div>
    )
  }
}

export default TattooModal;