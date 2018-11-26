import React, { useState } from 'react';
import '../css/inquiry_widget.css';

function InquiryWidget() {
  const emailRef = React.createRef();
  const messageef = React.createRef();
  const [formOpened, setFormOpened] = useState(false);

  function openInquireForm() {
    setFormOpened(true);
  }

  function closeInquireForm() {
    setFormOpened(false);
  }

  function submitInquiry(e) {
    e.preventDefault();
  }

  function renderInquireForm() {
    if (formOpened) {
      return (
        <form id="inquiry" className="inquiry-widget__form" onSubmit={submitInquiry}>
          <button className="inquiry-widget__close" type="button" onClick={ closeInquireForm }>X</button>
          <input className="inquiry-widget__email" type="email" name="email" id="email" placeholder="Email Address" autoComplete="off" required />
          <textarea className="inquiry-widget__message" name="message" id="message" placeholder="Please add message" required></textarea>
          <button className="inquiry-widget__submit">Submit</button>
        </form>
      );
    }
  }

  return (
    <div className="inquiry-widget">
      <button className={ formOpened ? 'inquiry-widget__btn disabled' : 'inquiry-widget__btn' } onClick={openInquireForm}>
        <h3 className="inquiry__heading">Inquire</h3>
      </button>
      { renderInquireForm() }
    </div>
  )
}

export default InquiryWidget;