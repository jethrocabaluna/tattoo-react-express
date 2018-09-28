import React from 'react';
import '../css/tattoo_form.css';

class AddTattooForm extends React.Component {
  imageRef = React.createRef();
  titleRef = React.createRef();
  styleRef = React.createRef();

  closeAddForm(e) {
    if (e.target === e.currentTarget) {
      this.props.closeAddForm();
    }
  }

  addTattoo = e => {
    e.preventDefault();
    const data = { image: this.imageRef.current.value, title: this.titleRef.current.value, style: this.styleRef.current.value };

    fetch('/api/tattoos', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        this.props.closeAddForm();
        this.props.updateTattoos();
      });
  };

  render() {
    return (
      <div className="tattoo-form__wrapper" onClick={(e) => this.closeAddForm(e)}>
        <div className="tattoo-form">
          <form action="/api/tattoos" id="add-tattoo" onSubmit={this.addTattoo}>
            <button type="button" className="tattoo-form__close-btn" onClick={this.props.closeAddForm}>X</button>
            <h1 className="tattoo-form__heading">Add New Tattoo</h1>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input ref={this.imageRef} type="text" name="image" id="image" required />
            </div>

            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input ref={this.titleRef} type="text" name="title" id="title" required />
            </div>

            <div className="form-group">
              <label htmlFor="style">Style</label>
              <select ref={this.styleRef} name="style" id="style">
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
}

export default AddTattooForm;