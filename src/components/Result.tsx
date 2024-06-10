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

  var scoreclass = 'font-semibold '
  if(score >=40){
  scoreclass+= 'text-blue-400' 
  }else if(score>= 70){
    scoreclass+= 'text-green-400'
  }else{
    scoreclass+= 'text-red-600'
  }
  return (
    <div className='w-full  flex justify-center items-center'>
    <div className='bg-blue-400 max-md:mt-[10rem]  w-[90%] border-2 border-orange-500  p-4 rounded-xl flex flex-col gap-3 justify-center items-center'>
      <img src={trophy} alt=""  className='w-[10rem] h-[10rem] bg-center'/>
      <h1 className='text-2xl text-white'><span className='text-blue-700 font-semibold'>{correctAnswer} </span>answered <span className='text-green-300 font-semibold'>correctly</span></h1>
      <h1 className='text-2xl text-white'><span className='text-blue-700 font-semibold'>{incorrectAnswer}</span> answered <span className='text-red-500 font-semibold'>incorrectly</span></h1>
      <h1 className='text-2xl text-white'>Your Score: <span className={scoreclass}>{result}</span></h1>
      <button className='bg-blue-700 hover:bg-blue-600 text-stone-200 text-xl mt-2 px-2 py-1 rounded-md hover:text-stone-100 duration-150 ease-in-out' onClick={startNewGame}>New Game</button>
      
    </div>
    </div>
  )
}
