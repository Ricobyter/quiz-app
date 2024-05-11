import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUES = 10;


function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)

  // console.log(fetchQuizQuestions(TOTAL_QUES, Difficulty.EASY))
  console.log(questions)


  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUES,
      Difficulty.EASY
    )

    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false)

  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      //Check if the answer is correct
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1)
      }

      //Save answer in the array for user answers
      const answerObject = {
        question: questions[number].question,
        //answer:answer,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      }

      setUserAnswers(prev => [...prev, answerObject])

    }

  }

  const nextQuestion = () => {
    //Move to the next question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUES) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  }

  return (
    <div className=''>
      <h1 className='text-5xl font-extrabold'>Quiz App</h1>

      {gameOver || userAnswers.length === TOTAL_QUES ? (
        <button onClick={startQuiz}>Start</button>
      ) : null}

      {!gameOver ? <p>Score: {score}</p> : null}

      {loading &&
        <p>Loading Questions...</p>
      }

      {!loading && !gameOver && (
        <QuestionCard
          questionNum={number + 1}
          totalQues={TOTAL_QUES}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />
      )}

      {!loading && !gameOver && userAnswers.length === number + 1 && number !== TOTAL_QUES - 1 ? (
        <button onClick={nextQuestion}>Next Question</button>
      ) : null}
    </div>
  );
}

export default App;
