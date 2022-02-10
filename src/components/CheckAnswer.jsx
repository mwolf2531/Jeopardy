import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const CheckAnswer = (props) => {

  return (
    <>
      <Modal
        show={props.showAnswer}
        onHide={props.hideAnswerModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.correctAnswer === "Correct!" ? props.correctAnswer : `Incorrect! The correct answer is: ${props.answer}`}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CheckAnswer;