import React from 'react'

export default function Result({
  score,
  totalQues
}:{
  score:number,
  totalQues:number
}) 
 {
  const incorrectAnswer = totalQues - score
  const correctAnswer = score
  const result = Math.round((correctAnswer/totalQues)*100)

  const startNewGame = () => {
    window.location.reload()
  }
  return (
    <div className='bg-purple-700 p-4 rounded-xl flex flex-col gap-3 justify-center items-center'>
      <h1 className='text-4xl text-white'>You answered {correctAnswer} correctly</h1>
      <h1 className='text-4xl text-white'>You answered {incorrectAnswer} incorrectly</h1>
      <h1 className='text-4xl text-white'>Your Score is {result} out of 100</h1>
      <button className='bg-purple-600 text-stone-200 text-xl px-2 py-1 rounded-md hover:text-stone-100 hover:bg-purple-500 duration-150 ease-in-out' onClick={startNewGame}>New Game</button>
      
    </div>
  )
}
