'use client'
import { useEffect, useState } from 'react';
import styles from './QuestionNumber.module.css'
import { changeAmount } from '@/utils/reducers';

const QuestionNumber = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch , amount}) => {
    const [value , setValue] = useState(amount) 
    const [percent , setPercent] = useState(20)
    const changeHandler = (e)=>{
        const newValue = e.target.value
        setValue(newValue)
        setPercent(newValue*2)
    }

    useEffect(()=>{
            setValue(amount)
            setPercent(amount*2)
    },[amount]) 
    
    const handleNumber = ()=>{
        dispatch(changeAmount(value))
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
