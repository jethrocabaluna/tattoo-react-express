import React from 'react';
import '../css/tattoo_modal.css';

class TattooModal extends React.Component {
  state = {
    currentTattoo: this.props.currentTattoo,
    similarTattoos: {}
  }

  closeModal(e) {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  }

  updateModal(similarTattoo) {
    this.setState({
      currentTattoo: similarTattoo
    })
  }

  getSimilarTattoos = () => {
    fetch(`/api/tattoos/styles/${this.state.currentTattoo.style.toLowerCase()}`)
      .then(res => res.json())
      .then(similarTattoos => {
        this.setState({
          similarTattoos
        })
      });
  }

  componentDidMount() {
    this.getSimilarTattoos();
  }

  render() {
    return (
      <div onClick={(e) => this.closeModal(e)} className="tattoo-modal__wrapper">
        <div className="tattoo-modal">
          <button className="tattoo-modal__close-btn" onClick={this.props.closeModal}>X</button>
          <h1 className="tattoo-modal__heading">{this.state.currentTattoo.name}</h1>
          <img className="tattoo-modal__image" src={this.state.currentTattoo.image} />
          <ul className="tattoo-modal__relateds">
            {
              Object.keys(this.state.similarTattoos).map(tattoo => (
                <li key={this.state.similarTattoos[tattoo].name}><button onClick={() => this.updateModal(this.state.similarTattoos[tattoo])}><img src={this.state.similarTattoos[tattoo].image} /></button></li>
              ))
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default TattooModal;