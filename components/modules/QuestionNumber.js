'use client'
import { useState } from 'react';
import styles from './QuestionNumber.module.css'
import { changeNumber } from '@/utils/reducers';

const QuestionNumber = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch}) => {
    const [value , setValue] = useState(10)
    const [percent , setPercent] = useState(20)
    const changeHandler = (e)=>{
        const newValue = e.target.value
        setValue(newValue)
        setPercent(newValue*2)
    }

    const handleNumber = ()=>{
        dispatch(changeNumber(value))
    }
    const progressStyle = {
        '--progress' : `${percent}%`
    }

    return (
            <div onMouseLeave={handleMouseLeave} className={styles.questionNumber}>
                 <label data-name ="number" onMouseEnter={handleMouseEnter} className={styles.main}>{value} Question</label>
                 <div style={name =="number" ? style :originalStyle} className={styles.numbers}>
                 <input onMouseUp={handleNumber} onChange={changeHandler} type='range' value={value} min={1} max={50} />
                 <span style={progressStyle} className={styles.progress}></span>
                 </div>
            </div>
    );
};

export default QuestionNumber;
