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
        <h1>Tattoo Images</h1>
        <ul className="tattoo__cards">
          {
            Object.keys(this.state.tattoos).map(tattoo => (
              <li key={this.state.tattoos[tattoo].name} className="tattoo__card"><button onClick={() => this.props.openModal()}><img src={this.state.tattoos[tattoo].image} /></button></li>
            ))
          }
        </ul>
      </div>
    )
  }
}

export default CardController;