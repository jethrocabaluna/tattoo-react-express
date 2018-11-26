import React from 'react';
import PropTypes from 'prop-types';
import '../css/card.css';

function CardController({ tattooStyleFilter, tattoos, openModal }) {
  function tattooStyle() {
    if (tattooStyleFilter !== '') {
      return <p className="card-controller__filter">{tattooStyleFilter}</p>
    }
  }

  return (
    <div className="card-controller">
      <h1 className="card-controller__heading">Tattoo Images</h1>
      { tattooStyle() }
      <ul className="tattoo__cards">
        {
          Object.keys(tattoos).map(tattoo => (
            <li key={tattoos[tattoo].name} className="tattoo__card"><button className="tattoo__btn" onClick={() => openModal(tattoos[tattoo])}><img className="tattoo__image" src={tattoos[tattoo].image} /></button></li>
          ))
        }
      </ul>
    </div>
  )
}

CardController.propTypes = {
  tattooStyleFilter: PropTypes.string,
  tattoos: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  openModal: PropTypes.func
}

export default CardController;