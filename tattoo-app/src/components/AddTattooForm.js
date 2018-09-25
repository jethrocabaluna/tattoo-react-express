import React from 'react';
import '../css/tattoo_form.css';

class AddTattooForm extends React.Component {
  tattooImageRef = React.createRef();
  tattooTitleRef = React.createRef();

  closeAddForm(e) {
    if (e.target === e.currentTarget) {
      this.props.closeAddForm();
    }
  }

  addTattoo = e => {
    e.preventDefault();
    console.log(this.tattooImageRef.current);
    const data = { tattooImage: this.tattooImageRef.current.value, tattooTitle: this.tattooTitleRef.current.value };
    console.log(data);

    fetch('/api/tattoos', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
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
              <label htmlFor="tattooImage">Image</label>
              <input ref={this.tattooImageRef} type="file" name="tattooImage" id="tattooImage" required />
            </div>

            <div className="form-group">
              <label htmlFor="tattooTitle">Title</label>
              <input ref={this.tattooTitleRef} type="text" name="tattooTitle" id="tattooTitle" required />
            </div>

            <button className="tattoo-form__submit-btn">Add</button>
          </form>
        </div>
      </div>
    )
  }
}

export default AddTattooForm;