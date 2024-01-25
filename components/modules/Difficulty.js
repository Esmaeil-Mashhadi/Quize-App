import Link from 'next/link';
import styles from './Difficulty.module.css'
import { changeDifficulty } from '@/utils/reducers';

const Difficulty = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch}) => {
    const difficultyHandler = (diff , e)=>{
        e.preventDefault()
        dispatch(changeDifficulty(diff))
    }
    return (
        <div onMouseLeave={handleMouseLeave} className={styles.difficulty}>
            <button onClick={(e)=>difficultyHandler("any" , e)} data-name = "Difficulty" onMouseEnter={handleMouseEnter} className={styles.main} >any difficulty</button>
            <div onMouseLeave={handleMouseLeave} style={name == "Difficulty" ? style : originalStyle}  className={styles.diffs}>
                <button onClick={()=>difficultyHandler('easy')} >Easy</button>
                <button onClick={()=>difficultyHandler('medium')} >Medium</button>
                <button onClick={()=>difficultyHandler('hard')} >Hard</button>
            </div>
       </div>
    );
};

export default Difficulty;