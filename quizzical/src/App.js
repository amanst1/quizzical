import React from 'react';
import Question from './components/Question';
import Welcome from './components/Welcome';
import './styles.css';

export default function App() {
  const [start, setStart] = React.useState(true)
  const [quizData, setQuizData] = React.useState([]) //remember lazy loading

  
  //fetch questions from api
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => setQuizData(data.results))
  }, [] )

  
  function beginGame () {
    setStart(false)
  }
  
 
  const questions = quizData.map( (quiz, index) => (<Question key={index} {...quiz} />) )

  return (
      <div className='container'> 
        { start ? 
          <Welcome start={beginGame} /> :
           questions
        }
        {!start && <button> Check Answer</button> }
      </div>
  );
}
