import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QButton from './QButton.jsx';

const Question = (props) => {

  return (
    <>
      <Modal
        show={props.showQuestion}
        onHide={props.hideQuestionModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {props.modalInfo}
        </Modal.Body>
        <Modal.Footer>
          What is..
          <form action="/action_page.php">
            <input type="text" className="modal-inputs" placeholder="Answer..." name="answer" onChange={props.onUpdate} />
          </form>
          <Button variant="primary" onClick={props.answerCheck}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default Question;
