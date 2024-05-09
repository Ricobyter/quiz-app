import React from 'react';
//Components
import QuestionCard from './components/QuestionCard';


function App() {

  const startQuiz = async () => {

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div>
     <h1>Quiz App</h1>

     <button onClick={startQuiz}>Start</button>

     <p>Score: </p>

     <p>Loading Questions...</p>

     <QuestionCard />

     <button onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
