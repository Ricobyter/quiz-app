import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';
import bgImage from './images/quizbg2.jpg'

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
    <div className="text-white flex justify-center items-center flex-col" style={{backgroundImage: `url(${bgImage})` , backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}} >
      <h1 className='text-5xl mb-10'>Quiz Mantra</h1>

      {gameOver || userAnswers.length === TOTAL_QUES ? (
        <button className='px-3 py-2 rounded-xl bg-purple-600 text-white text-xl hover:bg-purple-800 hover:scale-105 duration-100 ease-in-out' onClick={startQuiz}>Start Quiz</button>
      ) : null}

      

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
        <button className='px-3 py-1 text-lg rounded-lg bg-blue-800 text-white' onClick={nextQuestion}>Next Question</button>
      ) : null}

{!gameOver ? <p className='text-2xl mt-6'>Score: {score}</p> : null}
    </div>
  );
}

export default App;
