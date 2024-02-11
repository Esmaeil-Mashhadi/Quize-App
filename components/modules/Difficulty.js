import styles from './Difficulty.module.css'
import { changeDifficulty } from '@/utils/reducers';
import { Fragment } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { userChoice } from '@/utils/userOptionChoice';

const Difficulty = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch ,selectedStyle , notSelectedStyle , difficulty}) => {

    const difficultyHandler = (diff)=>{
        dispatch(changeDifficulty(diff))
    }

    const diffList = {any:"" , easy :"easy"  , medium : "medium" , hard :"hard"}
    
    const selected = userChoice(difficulty , diffList) || "any"
    return (
        <div onMouseLeave={handleMouseLeave} className={styles.difficulty}>
            <button style={!selected ? notSelectedStyle : selectedStyle} data-name = "Difficulty" onMouseEnter={handleMouseEnter} className={styles.main} > difficulty : {selected}</button>
            <div onMouseLeave={handleMouseLeave} style={name == "Difficulty" ? style : originalStyle}  className={styles.diffs}>
                {Object.entries(diffList).map(([diff , code]) => (
                    <button key={code} title={diff == "easy" ? "10 points" : diff == "medium" ? "15 points" : diff == "hard" ? "20 points" : null}
                         onClick={()=>difficultyHandler({[diff] : code})}>
                         {diff == selected ? <Fragment> {diff} <FaCheckCircle/></Fragment> : diff}
                    </button>
                ))}
            </div>
       </div>
    );
};

export default Difficulty;