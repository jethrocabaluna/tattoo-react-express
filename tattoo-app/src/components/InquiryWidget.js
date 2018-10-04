import React from 'react';
import '../css/inquiry_widget.css';

class InquiryWidget extends React.Component {
  emailRef = React.createRef();
  messageef = React.createRef();

  state = {
    formOpened: false
  }

  openInquireForm = () => {
    this.setState({
      formOpened: true
    });
  }

  closeInquireForm = () => {
    this.setState({
      formOpened: false
    });
  }

  submitInquiry = (e) => {
    e.preventDefault();
  }

  renderInquireForm = () => {
    if (this.state.formOpened) {
      return (
        <form id="inquiry" className="inquiry-widget__form" onSubmit={this.submitInquiry}>
          <button className="inquiry-widget__close" type="button" onClick={ this.closeInquireForm }>X</button>
          <input className="inquiry-widget__email" type="email" name="email" id="email" placeholder="Email Address" autoComplete="off" required />
          <textarea className="inquiry-widget__message" name="message" id="message" placeholder="Please add message" required></textarea>
          <button className="inquiry-widget__submit">Submit</button>
        </form>
      );
    }
  }

  render() {
    return (
      <div className="inquiry-widget">
        <button className={ this.state.formOpened ? 'inquiry-widget__btn disabled' : 'inquiry-widget__btn' } onClick={this.openInquireForm}>
          <h3 className="inquiry__heading">Inquire</h3>
        </button>
        { this.renderInquireForm() }
      </div>
    )
  }
}

export default InquiryWidget;