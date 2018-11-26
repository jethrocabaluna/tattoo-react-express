import React from 'react';
import PropTypes from 'prop-types';
import '../css/tattoo_form.css';

function AddTattooForm({ closeAddFormHandler, updateTattoos }) {
  const imageRef = React.createRef();
  const titleRef = React.createRef();
  const styleRef = React.createRef();

  function closeAddForm(e) {
    if (e.target === e.currentTarget) {
      closeAddFormHandler();
    }
  }

  function addTattoo(e) {
    e.preventDefault();
    const data = { image: imageRef.current.value, title: titleRef.current.value, style: styleRef.current.value };

    fetch('/api/tattoos', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        closeAddFormHandler();
        updateTattoos();
      });
  };

  return (
    <div className="tattoo-form__wrapper" onClick={closeAddForm}>
      <div className="tattoo-form">
        <form action="/api/tattoos" id="add-tattoo" onSubmit={addTattoo}>
          <button type="button" className="tattoo-form__close-btn" onClick={closeAddForm}>X</button>
          <h1 className="tattoo-form__heading">Add New Tattoo</h1>
          <div className="form-group">
            <label htmlFor="image">Image URL</label>
            <input ref={imageRef} type="text" name="image" id="image" required />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input ref={titleRef} type="text" name="title" id="title" required />
          </div>

          <div className="form-group">
            <label htmlFor="style">Style</label>
            <select ref={styleRef} name="style" id="style">
              <option value="traditional">traditional</option>
              <option value="realism">realism</option>
              <option value="tribal">tribal</option>
              <option value="neo traditional">neo traditional</option>
              <option value="others">others</option>
            </select>
            
          </div>

          <button className="tattoo-form__submit-btn">Add</button>
        </form>
      </div>
    </div>
  )
}

AddTattooForm.propTypes = {
  closeAddForm: PropTypes.func,
  updateTattoos: PropTypes.func
}

export default AddTattooForm;