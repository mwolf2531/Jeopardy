import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';


const Score = (props) => {

  return (
    <>
      <Card style={{ width: '30rem' }} id="card">
        <Card.Img variant="top" src="wp4284365.jpeg" />
        <Card.Body>
          <h2>Welcome, {props.name}!</h2>
          <Row>
            <Col xs="auto">
              <h2>Current Score: {props.currentScore}</h2>
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={props.postScores}>Save Score</Button>{' '}
            </Col>
          </Row>
        </Card.Body>
        <h3>High Scores:</h3>
        <ListGroup variant="flush" id="list">
          {props.scoreData.map((scores) =>
            <ListGroup.Item >{scores.score} - {scores.name}</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
}

export default Score;