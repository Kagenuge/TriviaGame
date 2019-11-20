import React, { useState, useEffect } from 'react';
import TriviaBox from './TriviaBox';
import '../style/Quiz.css';
import buttonSound from '../sounds/hastalavista.mp3';
import { fetchData } from '../serviceClient';

const Quiz = () => {
  const [hastalavista] = useState(new Audio(buttonSound));
  const [questions, setQuestions] = useState([{
    question: "A little question for you:",
    choices: ["o","a","a","r"]
  }]);
  const [questionNumber, setQuestionNumber] = useState(0);

  const question = questions[questionNumber].question;
  const rightAnswer = questions[questionNumber].correct;
  const answers = [questions[questionNumber].q1, questions[questionNumber].q2, questions[questionNumber].q3, questions[questionNumber].q4];

  const shuffle = (arr) => {
    let i,
      j,
      temp;
    for (i = answers.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }
  const shuffled = shuffle(answers);

  const getData = () => {
    fetchData().then(res => setQuestions(res));
  };

  useEffect(() => {
    hastalavista.play();
    getData();
  }, [])
  console.log(questions)

  return (
    <div className="quizPage">
      <h1 className="quizTitle"> Arnold Schwarzenegger </h1>
      <TriviaBox setQuestionNumber={() => setQuestionNumber(a => a + 1)} questionNumber={questionNumber} answers={shuffled} question={question} rightAnswer={rightAnswer}/>
    </div>
  )
};

export default Quiz;