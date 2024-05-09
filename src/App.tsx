import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { Difficulty } from './API';

const TOTAL_QUES = 10;


function App() {

  const[loading, setLoading] = useState(false)
  const[questions, setQuestions] = useState([]);
  const[number, setNumber] = useState(0);
  const[userAnswers, setUserAnswers] = useState([])
  const[score, setScore] = useState(0);
  const[gameOver, setGameOver] = useState(true)

  console.log(fetchQuizQuestions(TOTAL_QUES, Difficulty.EASY))

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

     {/* <QuestionCard 
     questionNum={number + 1}
     totalQues={TOTAL_QUES}
     question={questions[number].question}
     answers={questions[number].answers}
     userAnswer={userAnswers ? userAnswers[number]: undefined}
     callback={checkAnswer}/> */}

     <button onClick={nextQuestion}>Next Question</button>
    </div>
  );
}

export default App;
