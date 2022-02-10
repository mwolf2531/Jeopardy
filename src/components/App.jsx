import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Question from './Question.jsx';
import QButton from './QButton.jsx';
import CheckAnswer from './CheckAnswer.jsx';
import Score from './Score.jsx';
import IntroScreen from './IntroScreen.jsx';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      score: 0,
      modalQuestion: '',
      modalAnswer: '',
      showQuestion: false,
      showAnswer: false,
      answer: '',
      correctAnswer: 'Incorrect',
      currentScore: 0,
      buttonDisabled: false,
      name: '',
      showIntro: true,
      scoreData: [],
      currentCategory: '',
      answerLog: []
    }

    this.getQuestions = this.getQuestions.bind(this);
    this.getScores = this.getScores.bind(this);
    this.showQuestionModal = this.showQuestionModal.bind(this);
    this.hideQuestionModal = this.hideQuestionModal.bind(this);
    this.postScores = this.postScores.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.getScores()
  }

  getQuestions() {
    axios.get(`/questions`)
      .then((res) => {
        this.setState({
          data: res.data
        })
      })
      .catch((err) => {
        console.log("Axios /questions ERR", err);
      });
  }

  getScores() {
    axios.get(`/highScore`)
      .then((res) => {
        this.setState({
          scoreData: res.data
        })
      })
      .catch((err) => {
        console.log("Axios /highScore ERR", err);
      });
  }

  postScores() {
    axios.post('/highScore', {
      name: this.state.name,
      score: this.state.score
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showQuestionModal = (modalBody, modalAnswer, currentScore, disabled, currentCategory) => {
    this.setState(
      {
        showQuestion: true,
        modalQuestion: modalBody,
        modalAnswer: modalAnswer,
        currentScore: currentScore,
        buttonDisabled: disabled,
        currentCategory: currentCategory
      });
  };

  hideQuestionModal = () => {
    this.setState({ showQuestion: false });
  };


  hideIntroScreen = () => {
    this.setState({ showIntro: false });
  };

  answerUpdate = (event) => {
    event.preventDefault();
    this.setState({ answer: event.target.value })
  };

  nameUpdate = (event) => {
    event.preventDefault();
    this.setState({ name: event.target.value })
  };

  checkAnswer = () => {
    if (this.state.answer.toLowerCase() == this.state.modalAnswer.toLowerCase()) {
      this.setState({
        correctAnswer: 'Correct!',
        score: this.state.score + this.state.currentScore
      });

      this.showAnswerModal();
    }
    else {
      this.setState({
        correctAnswer: 'Incorrect',
        score: this.state.score - this.state.currentScore
      })
      this.showAnswerModal();
    }
    this.logAnswer();
  }


  logAnswer = () => {
    this.state.answerLog.push({ category: this.state.currentCategory, score: "$" + this.state.currentScore });
  }

  showAnswerModal = () => {
    this.setState(
      {
        showQuestion: false,
        showAnswer: true
      });
  };

  hideAnswerModal = () => {
    this.setState({ showAnswer: false });
  };

  createTable = () => {
    let table = []
    let points = ['$200', '$400', '$600', '$800', '$1000'];
    let categories = ['The Continents', 'The Summer Olympics', 'Not A Verb', 'Your New Class Schedule'];

    for (let i = 0; i < points.length; i++) {
      let children = []
      for (let j = 0; j < categories.length; j++) {
        children.push(<td>
          <QButton
            points={points[i]}
            category={categories[j]}
            onClick={this.showQuestionModal}
            data={this.state.data}
            disabled={this.questionDisabled(categories[j], points[i])}
          /></td>);
      }
      table.push(<tr>{children}</tr>)
    }
    return table;
  };

  questionDisabled = (category, score) => {
    for (let i = 0; i < this.state.answerLog.length; i++) {
      if (this.state.answerLog[i].category === category && this.state.answerLog[i].score === score) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate(prevProps) {
    if (this.state.scoreData !== prevProps.id) {
      this.getScores();
    }
  }

  render() {
    return (
      <div id="container">
        <Container id="container">
          <Row>
            <Col sm={8} className="border-right">
              <Table bordered id="table">
                <thead id="table-header">
                  <tr>
                    <th>The Continents</th>
                    <th>The Summer Olympics</th>
                    <th>Not A Verb</th>
                    <th>Your New Class Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {this.createTable()}
                </tbody>
              </Table>
              <IntroScreen
                showIntroScreen={this.state.showIntro}
                hideIntroScreen={this.hideIntroScreen}
                onUpdate={this.nameUpdate} />
              <Question
                showQuestionModal={this.showQuestionModal}
                hideQuestionModal={this.hideQuestionModal}
                showQuestion={this.state.showQuestion}
                modalInfo={this.state.modalQuestion}
                onUpdate={this.answerUpdate}
                answerCheck={this.checkAnswer} />
              <CheckAnswer
                showAnswerModal={this.showAnswerModal}
                hideAnswerModal={this.hideAnswerModal}
                showAnswer={this.state.showAnswer}
                correctAnswer={this.state.correctAnswer}
                answer={this.state.modalAnswer} />
            </Col>

            <Col sm={4}>
              <div>
                <Score
                  currentScore={this.state.score}
                  name={this.state.name}
                  postScores={this.postScores}
                  scoreData={this.state.scoreData} />
              </div>
            </Col>
          </Row>
        </Container >
      </div >
    )
  }
}

export default App;
