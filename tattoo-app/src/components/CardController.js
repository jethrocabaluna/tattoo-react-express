import React from 'react';
import '../css/card.css';

class CardController extends React.Component {
  state = {
    tattoos: {}
  }

  componentDidMount() {
    fetch('/api/sample-tattoos')
      .then(res => res.json())
      .then(tattoos => {
        this.setState({
          tattoos
        });
      });
  }

  render() {
    return (
      <div className="card-controller">
        <h1 className="card-controller__heading">Tattoo Images</h1>
        <ul className="tattoo__cards">
          {
            Object.keys(this.state.tattoos).map(tattoo => (
              <li key={this.state.tattoos[tattoo].name} className="tattoo__card"><button className="tattoo__btn" onClick={() => this.props.openModal(this.state.tattoos[tattoo])}><img className="tattoo__image" src={this.state.tattoos[tattoo].image} /></button></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default CardController;