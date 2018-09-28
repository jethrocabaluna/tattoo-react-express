import React from 'react';
import '../css/card.css';

class CardController extends React.Component {
  tattooStyle() {
    if (this.props.tattooStyleFilter !== '') {
      return <p className="card-controller__filter">{this.props.tattooStyleFilter}</p>
    }
  }

  render() {
    return (
      <div className="card-controller">
        <h1 className="card-controller__heading">Tattoo Images</h1>
        { this.tattooStyle() }
        <ul className="tattoo__cards">
          {
            Object.keys(this.props.tattoos).map(tattoo => (
              <li key={this.props.tattoos[tattoo].name} className="tattoo__card"><button className="tattoo__btn" onClick={() => this.props.openModal(this.props.tattoos[tattoo])}><img className="tattoo__image" src={this.props.tattoos[tattoo].image} /></button></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default CardController;