import React from 'react'

type Props = {
    question: string;
    answers: string[];
    callback: any;
    userAnswer: boolean;
    questionNum: number;
    totalQues: number
}

const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNum,
    totalQues }) => (
    <div>
        <p className='number'>
            Question : {questionNum} / {totalQues}
        </p>
        <p dangerouslySetInnerHTML={{ __html: question }} />
        <div>
            {answers.map(answer => (
                <div>
                    <button disabled={userAnswer} onClick={callback} />
                    <span dangerouslySetInnerHTML={{ __html: answer }} />
                </div>
            ))}
        </div>
    </div>
)

export default QuestionCard;
