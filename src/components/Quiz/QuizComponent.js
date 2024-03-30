import React, { Component } from 'react';

class QuizComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      answers: {},
      currentQuestionIndex: 0,
      results: null
    };
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  fetchQuestions = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/questions');
      const data = await response.json();
      this.setState({ questions: data.data });
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  handleAnswerChange = (questionId, option) => {
    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [questionId]: option
      }
    }));
  };

  handleNextQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex + 1
    }));
  };

  handlePrevQuestion = () => {
    this.setState(prevState => ({
      currentQuestionIndex: prevState.currentQuestionIndex - 1
    }));
  };

  handleSubmit = () => {
    const { questions, answers } = this.state;
    const results = questions.map(question => ({
      ...question,
      userAnswer: answers[question.id],
      isCorrect: answers[question.id] === question.correct_option
    }));
    this.setState({ results });
  };

  render() {
    const { questions, currentQuestionIndex, results } = this.state;
    const currentQuestion = questions[currentQuestionIndex];
    return (
      <div className="container">
        <h1 className="text-center mb-4">Quiz Questions</h1>
        {results ? (
          <div>
            <h2>Results</h2>
            <ul className="list-unstyled">
              {results.map(result => (
                <li key={result.id} className={`mb-2 ${result.isCorrect ? 'text-success' : 'text-danger'}`}>
                  {result.question} - Your answer: {result.userAnswer} - Correct Answer: {result.correct_option} - Result: {result.isCorrect ? 'Correct' : 'Incorrect'}
                </li>
              ))}
            </ul>
          </div>
        ) : currentQuestion ? (
          <div>
            <h2>Question {currentQuestionIndex + 1}</h2>
            <p>{currentQuestion.question}</p>
            <div className="form-check">
              {['option_a', 'option_b', 'option_c', 'option_d'].map(optionKey => (
                <div key={optionKey} className="form-check mb-3">
                  <input
                    type="radio"
                    id={optionKey}
                    name={currentQuestion.id}
                    className="form-check-input"
                    value={currentQuestion[optionKey]}
                    checked={this.state.answers[currentQuestion.id] === currentQuestion[optionKey]}
                    onChange={() => this.handleAnswerChange(currentQuestion.id, currentQuestion[optionKey])}
                  />
                  <label htmlFor={optionKey} className="form-check-label">{currentQuestion[optionKey]}</label>
                </div>
              ))}
            </div>
            <button
              className="btn btn-primary m-2"
              disabled={currentQuestionIndex === 0}
              onClick={this.handlePrevQuestion}
            >
              Previous
            </button>
            <button
              className="btn btn-primary m-2"
              disabled={currentQuestionIndex === questions.length - 1}
              onClick={this.handleNextQuestion}
            >
              Next
            </button>
            {currentQuestionIndex === questions.length - 1 && (
              <button className="btn btn-success" onClick={this.handleSubmit}>Submit Answers</button>
            )}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}

export default QuizComponent;
