import React from 'react';
import Question from './components/Question';
import Welcome from './components/Welcome';
import './styles.css';

export default function App() {
  const [start, setStart] = React.useState(false)
  const [quizData, setQuizData] = React.useState([]) //remember lazy loading
  const [selectedChoices, setSelectedChoices] = React.useState({})
  const [correctCount, setCorrectCount] = React.useState(0) 
  const [displayResult, setDisplayResult] = React.useState(false)

  let showCheckAnswer = start && quizData.length === Object.keys(selectedChoices).length 
                      && !displayResult

  //fetch questions from api
  React.useEffect(()=>{
    if(quizData.length === 0) {
      fetch("https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple")
          .then(res => res.json())
          .then(data => setQuizData(data.results))
    }
  }, [start] )

  //function that creates a new game either for the first time or once a round is completed
  function beginGame () {
    if(!displayResult)  {
      setStart(true)
    }  else {
      setDisplayResult(false)
      setSelectedChoices({})
      setQuizData([])
      setStart(false)
    } 
  }
  
  //adds user's selected answer for each question to a single selectedChoices object
  function addSelectedChoice(index, isCorrect) {
    setSelectedChoices(prevSelected => {
      return {
              ...prevSelected, 
              [index] : isCorrect 
            }
          })     
  }

  // counts the correct answers selected by user
  function countCorrect() {
      if(quizData.length === Object.keys(selectedChoices).length) {
        let count = 0
        
        for(const selected in selectedChoices) {
          selectedChoices[selected] && count++ 
        }
        setCorrectCount(count)
        setDisplayResult(true)
       } 
  }

  //populates each question in to a Question js components array
  const questions = quizData.map( (quiz, index) => 
                (<Question recordChoices={addSelectedChoice} 
                  key={index} 
                  qnum={index} 
                  {...quiz} 
                  displayResult={displayResult} />) )


  return (
      <div className='container'> 
        { !start ? 
          <Welcome start={beginGame} /> :
           questions
        }
        
        {showCheckAnswer &&
        <button className="btn--check" onClick={countCorrect}> Check Answer</button> }

        {displayResult && 
        <span className='score-text'> You scored {correctCount}/5 correct answer{correctCount === 1 ? " " : 's ' }
          <button className="btn--check" onClick={beginGame}> Play Again </button> </span> 
        }
      </div>
  );
}
