import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const IntroScreen = (props) => {

  return (
    <>
      <Modal
        show={props.showIntroScreen}
        onHide={props.hideIntroScreen}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Please enter your name:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/action_page.php">
            <input type="text" className="modal-inputs" placeholder="Name..." name="name" onChange={props.onUpdate} />
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.hideIntroScreen}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default IntroScreen;