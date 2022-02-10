import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';

class QButton extends React.Component {
  handleClick = () => {
    console.log(this.props.points, this.props.category);
    let modalBody = '';
    let modalAnswer = '';
    let currentScore = '';
    let disabled = true;

    for (let i = 0; i < this.props.data.length; i++) {
      if (this.props.points === this.props.data[i].value && this.props.category.toLowerCase() === this.props.data[i].category.toLowerCase()) {
        modalBody = this.props.data[i].question;
        modalAnswer = this.props.data[i].answer;
        currentScore = Number(this.props.data[i].value.replace(/[^0-9\.]+/g, ""));
        break;
      }
    }
    this.props.onClick(modalBody, modalAnswer, currentScore, disabled, this.props.category);
  }

  render() {
    let hideClass = "";
    if (this.props.disabled) {
      hideClass = "opacity-0"
    }
    return (
      <Button
        disabled={this.props.disabled} className={hideClass} variant="outline-primary" id="button" onClick={this.handleClick}>{this.props.points}</Button>
    );
  }
}

export default QButton;