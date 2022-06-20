import React from 'react';
import Question from './components/Question';
import Welcome from './components/Welcome';
import './styles.css';

export default function App() {
  const [start, setStart] = React.useState(true)
  const [quizData, setQuizData] = React.useState([]) //remember lazy loading
  const [selectedChoices, setSelectedChoices] = React.useState({})
  const [correctCount, setCorrectCount] = React.useState(0) 

  //fetch questions from api
  React.useEffect(()=>{
    fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
        .then(res => res.json())
        .then(data => setQuizData(data.results))
  }, [] )

  
  function beginGame () {
    setStart(false)
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
  // console.log(selectedChoices, "object")
  // console.log(correctCount, "count")

  // counts the correct answers selected by user
  function countCorrect() {
      if(quizData.length === Object.keys(selectedChoices).length) {
        let count = 0
        for(const selected in selectedChoices) {
          console.log(selectedChoices.selected)
          selected && count++ //work on object attr names
        }
        setCorrectCount(count)
       }
       
  }

  //populates each question in to a Question js components array
  const questions = quizData.map( (quiz, index) => 
                (<Question recordChoices={addSelectedChoice} key={index} qnum={index} {...quiz} />) )

  return (
      <div className='container'> 
        { start ? 
          <Welcome start={beginGame} /> :
           questions
        }
        {!start && <button onClick={countCorrect}> Check Answer</button> }
      </div>
  );
}
