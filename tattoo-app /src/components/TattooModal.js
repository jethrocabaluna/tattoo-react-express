import React from 'react';

class TattooModal extends React.Component {
  state = {
    currentTattoo: this.props.tattoo
  }

  render() {
    <div className="tattoo-modal">
      <button onClick={this.props.closeModal}>X</button>
      <h1 className="tattoo-modal__heading">{this.props.tattoo.name}</h1>

    </div>
  }
}

export default TattooModal;