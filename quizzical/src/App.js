import React from 'react';
import Question from './components/Question';
import Welcome from './components/Welcome';
import './styles.css';

export default function App() {
  const [start, setStart] = React.useState(true)

  function beginGame () {
    setStart(false)
  }

  return (
      <div className='container'> 
        {start ? <Welcome start={beginGame} /> : <Question/>}
        
      </div>
  );
}
