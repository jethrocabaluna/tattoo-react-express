import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../css/tattoo_modal.css';

function TattooModal({ closeModalHandler, tattooPicked }) {
  const [currentTattoo, setCurrentTattoo] = useState(tattooPicked);
  const [similarTattoos, setSimilarTattoos] = useState({});

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      closeModalHandler();
    }
  }

  function updateModal(similarTattoo) {
    setCurrentTattoo(similarTattoo);
  }

  function getSimilarTattoos() {
    fetch(`/api/tattoos/styles/${currentTattoo.style.toLowerCase()}`)
      .then(res => res.json())
      .then(similarTattoos => {
        setSimilarTattoos(similarTattoos);
      });
  }

  useEffect(() => {
    getSimilarTattoos();
  }, []);

  return (
    <div onClick={(e) => closeModal(e)} className="tattoo-modal__wrapper">
      <div className="tattoo-modal">
        <button className="tattoo-modal__close-btn" onClick={closeModal}>X</button>
        <h1 className="tattoo-modal__heading">{currentTattoo.name}</h1>
        <img className="tattoo-modal__image" src={currentTattoo.image} />
        <ul className="tattoo-modal__relateds">
          {
            Object.keys(similarTattoos).map(tattoo => (
              <li 
              key={similarTattoos[tattoo].name}>
                <button 
                className={currentTattoo._id === similarTattoos[tattoo]._id ? 'current' : '' } 
                onClick={() => updateModal(similarTattoos[tattoo])}>
                  <img src={similarTattoos[tattoo].image} />
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

TattooModal.propTypes = {
  closeModal: PropTypes.func,
  currentTattoo: PropTypes.object
}

export default TattooModal;