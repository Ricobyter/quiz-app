import React, { useState } from 'react';
import { fetchQuizQuestions } from './API';
//Components
import QuestionCard from './components/QuestionCard';

//Types
import { QuestionState, Difficulty } from './API';
import Result from './components/Result';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}


const DEFAULT_TOTAL_QUES = 5;

function App() {

  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
  const [score, setScore] = useState(0);
  const [showStartButton, setShowStartButton] = useState(true)
  // const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(true)
  const [difficultyLevel, setDifficultyLevel] = useState(Difficulty.EASY);
  const [selectedTotalQues, setSelectedTotalQues] = useState(DEFAULT_TOTAL_QUES);// Default total questions

  // console.log(fetchQuizQuestions(selectedTotalQues, Difficulty.EASY))
  console.log(questions)


  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);
    setShowStartButton(false)

    const newQuestions = await fetchQuizQuestions(
      selectedTotalQues, difficultyLevel
    )

    setQuestions(newQuestions)
    setScore(0);
    setUserAnswers([])
    setNumber(0);
    setLoading(false);
    // setFinalScore(0)

  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value

      //Check if the answer is correct
      const correct = questions[number].correct_answer === answer;

      //Add score if answer is correct
      if (correct) {
        setScore(prev => prev + 1)
        // setFinalScore(prev => prev + 1)
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
    if (nextQuestion === selectedTotalQues) {
      setGameOver(true)
      setSelectedTotalQues(DEFAULT_TOTAL_QUES)
    }
    else {
      setNumber(nextQuestion)
    }
  }

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyLevel(e.target.value as Difficulty);
  };

  const handleTotalQuesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTotalQues(parseInt(e.target.value));
  };

  if(gameOver && userAnswers.length === selectedTotalQues){
    return (
      <Result 
      score = {score}
      totalQues={selectedTotalQues}/>
    )
  }

  return (
    <div className="text-white flex justify-center items-center flex-col  h-[100vh] w-[100vw] bg-stone-800" >
        <h1 className='text-5xl mb-14 text-center font-sedan text-stone-300 underline'>Quiz Mantra</h1>
      <div className='w-full md:w-[50vw] text-purple-600 h-full md:h-[50vh]'>

      {/* {gameOver || userAnswers.length === selectedTotalQues ? ( */}
  <div className={`flex flex-col gap-4 justify-center items-center ${showStartButton ? '' : 'hidden'}`}>
  <button className="px-3 py-2 rounded-xl bg-purple-600 font-montserrat text-white text-xl hover:bg-purple-800 hover:scale-105 duration-100 ease-in-out" onClick={startQuiz}>
    Start New Quiz
  </button>
  <div className="ml-4">
    <label htmlFor="difficulty" className='text-xl font-semibold'>Difficulty:</label>
    <select id="difficulty" className="ml-2" onChange={handleDifficultyChange}>
      <option value={Difficulty.EASY}>Easy</option>
      <option value={Difficulty.MEDIUM}>Medium</option>
      <option value={Difficulty.HARD}>Hard</option>
    </select>
  </div>
  <div className="ml-4">
    <label htmlFor="totalQues" className='text-xl font-semibold'>Total Questions:</label>
    <select id="totalQues" className="ml-2" onChange={handleTotalQuesChange}>
      <option value={5}>5</option>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      {/* Add more options as needed */}
    </select>
  </div>
</div>

{userAnswers.length === selectedTotalQues && (
        <Result 
        score = {score}
        totalQues={selectedTotalQues}/>
)}
      {/* ) : null} */}
      {/* {(!gameOver && !(userAnswers.length === selectedTotalQues)) ? <p className='text-2xl mb-6 text-right'><span className='text-purple-700 font-bold'>Score: </span>{score}</p> : null} */}
      {/* {((userAnswers.length === selectedTotalQues)) ? <p className='text-2xl mt-10 text-center'><span className='text-purple-700 font-bold'>FinalScore: </span> {finalScore}</p> : null} */}



      {loading &&
        <p className='text-purple-700 font-sedan text-center text-3xl'>Loading Questions...</p>
      }
      <div className='w-full flex justify-center items-center'>

     
      {(!loading && !gameOver && !(userAnswers.length === selectedTotalQues))  ? (
        <QuestionCard
          questionNum={number + 1}
          totalQues={selectedTotalQues}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer} />
      ): null}
       </div>

      {!loading && !gameOver && userAnswers.length === number + 1 && number !== selectedTotalQues - 1 ? (
        <button className='px-3 py-2 mt-4 text-montserrat text-lg rounded-lg bg-gradient-to-r from-green-600 to-green-500 text-white scale-105 duration-75 ' onClick={nextQuestion}>Next Question</button>
      ) : null}


      
      </div>
    </div>
  );
}

export default App;
