import trophy from '../images/trophy.png'

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
    <div className='w-full flex justify-center items-center'>
    <div className='bg-blue-400 w-[90%] border-2 border-orange-500 p-4 rounded-xl flex flex-col gap-3 justify-center items-center'>
      <img src={trophy} alt=""  className='w-[10rem] h-[10rem] bg-center'/>
      <h1 className='text-2xl text-white'>{correctAnswer} answered correctly</h1>
      <h1 className='text-2xl text-white'>{incorrectAnswer} answered incorrectly</h1>
      <h1 className='text-2xl text-white'>Your Score: {result}</h1>
      <button className='bg-blue-700 hover:bg-blue-600 text-stone-200 text-xl px-2 py-1 rounded-md hover:text-stone-100 duration-150 ease-in-out' onClick={startNewGame}>New Game</button>
      
    </div>
    </div>
  )
}
