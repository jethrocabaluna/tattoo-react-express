import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CardController from '../components/CardController';
import Sidebar from '../components/Sidebar';
import InquiryWidget from '../components/InquiryWidget';
import TattooModal from '../components/TattooModal';
import AddTattooForm from '../components/AddTattooForm';
import GoogleLoginBtn from '../components/GoogleLoginBtn';
import '../css/home.css';

function Home({ modalHandler }) {
  window.onscroll = () => {
    if (tattoosLimitReached) return;
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      setTimeout(() => {
        loadMoreTattoos(tattoosBatch);
        setTattoosBatch(tattoosBatch + 1);
      }, 300);
    }
  }

  const [modalShown, setModalShown] = useState(false);
  const [tattooPicked, setTattooPicked] = useState({});
  const [addFormShown, setAddFormShown] = useState(false);
  const [tattoos, setTattoos] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tattooStyleFilter, setTattooStyleFilter] = useState('');
  const [tattoosLimitReached, setTattoosLimitReached] = useState(false);
  const [tattoosBatch, setTattoosBatch] = useState(2);
  const [tattooModalElement, setTattooModalElement] = useState('');
  const [addFormModalElement, setAddFormModalElement] = useState('');

  function openModal(tattooPicked) {
    setTattooPicked(tattooPicked);
    setModalShown(true);
    setTattooModalElement(<TattooModal closeModalHandler={closeModal} tattooPicked={tattooPicked} />);
    modalHandler();
  }

  function closeModal() {
    setModalShown(false);
    setTattooModalElement('');
    modalHandler();
  }

  function openAddForm() {
    setAddFormShown(true);
    setAddFormModalElement(<AddTattooForm closeAddFormHandler={closeAddForm} updateTattoos={updateTattoos} />);
    modalHandler();
  }

  function closeAddForm() {
    setAddFormShown(false);
    setAddFormModalElement('');
    modalHandler();
  }

  function updateTattoos() {
    fetch('/api/tattoos/batch/1')
      .then(res => res.json())
      .then(tattoos => {
        setTattoos(tattoos);
        setTattooStyleFilter('');
        setTattoosLimitReached(false);
        setTattoosBatch(2);
      });
  }

  function loadMoreTattoos(batch) {
    fetch(`/api/tattoos${tattooStyleFilter !== '' ? '/styles/' + tattooStyleFilter.toLowerCase() : '/batch'}/${batch}`)
      .then(res => res.json())
      .then(moreTattoos => {
        if (moreTattoos.limitReached) {
          setTattoosLimitReached(false);
          return;
        }
        setTattoos([...tattoos, ...moreTattoos]);
      });
  }

  function filterTattoos(style) {
    fetch(`/api/tattoos/styles/${style.toLowerCase()}/1`)
      .then(res => res.json())
      .then(filteredTattoos => {
        setTattoos(filteredTattoos);
        setTattooStyleFilter(style);
        setTattoosLimitReached(false);
        setTattoosBatch(2);
      });
  }

  function userCheck() {
    if (isLoggedIn) {
      return (
        <div className="user-btns">
          <button className="btn-1" onClick={openAddForm}>Add New Tattoo</button>
          <a href="http://localhost:5000/logout" className="btn-1">Logout</a>
        </div>
      );
    } else {
      return <GoogleLoginBtn />;
    }
  }

  useEffect(() => {
    fetch('/isLoggedIn')
      .then(res => res.json())
      .then(status => {
        setIsLoggedIn(status.isLoggedIn);
      });

    fetch('/api/tattoos/batch/1')
      .then(res => res.json())
      .then(tattoos => {
        setTattoos(tattoos);
      });

    return () => {
      if (modalShown) {
        closeModal();
      } else if (addFormShown) {
        closeAddForm();
      }
    };
  }, []);

  return (
    <div className="home container">
      { userCheck() }
      { addFormModalElement }
      <Sidebar 
      tattooStyles={ ['Traditional', 'Realism', 'Tribal', 'Neo Traditional', 'Others'] } 
      filterTattoos={ filterTattoos } showAllTattoo={ updateTattoos }/>

      <CardController 
      tattoos={ tattoos } 
      openModal={ openModal } 
      tattooStyleFilter={ tattooStyleFilter } />
      <InquiryWidget />
      { tattooModalElement }
    </div>
  );
}

Home.propTypes = {
  modalHandler: PropTypes.func
}

export default Home;